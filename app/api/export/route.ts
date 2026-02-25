import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  const { userId } = await auth()
  if (!userId) return new NextResponse('Unauthorized', { status: 401 })

  const merchant = await prisma.merchant.findUnique({ where: { clerkUserId: userId } })
  if (!merchant) return new NextResponse('Merchant not found', { status: 404 })

  const { searchParams } = new URL(req.url)
  const format = searchParams.get('format') || 'csv'
  const from = searchParams.get('from')
  const to = searchParams.get('to')

  const disputes = await prisma.dispute.findMany({
    where: {
      merchantId: merchant.id,
      ...(from || to ? {
        createdAt: {
          ...(from ? { gte: new Date(from) } : {}),
          ...(to ? { lte: new Date(to) } : {}),
        },
      } : {}),
    },
    include: { evidence: true },
    orderBy: { createdAt: 'desc' },
  })

  if (format === 'csv') {
    const headers = [
      'dispute_id', 'processor', 'processor_dispute_id', 'amount', 'currency',
      'status', 'reason_code', 'reason_category', 'country',
      'customer_email', 'transaction_date', 'chargeback_date',
      'evidence_deadline', 'evidence_count', 'created_at',
    ]

    const rows = disputes.map(d => [
      d.id,
      d.processor,
      d.processorDisputeId,
      d.amount,
      d.currency,
      d.status,
      d.reasonCode,
      d.reasonCategory,
      d.country,
      d.customerEmail ?? '',
      d.transactionDate.toISOString().split('T')[0],
      d.chargebackDate.toISOString().split('T')[0],
      d.evidenceDeadline.toISOString().split('T')[0],
      d.evidence.length,
      d.createdAt.toISOString().split('T')[0],
    ].map(v => `"${String(v).replace(/"/g, '""')}"`).join(','))

    const csv = [headers.join(','), ...rows].join('\n')

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="chargebackasia-disputes-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    })
  }

  return NextResponse.json({ disputes })
}
