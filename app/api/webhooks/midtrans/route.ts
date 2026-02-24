import { NextRequest } from 'next/server'
import { createHash } from 'crypto'
import { prisma } from '@/lib/prisma'
import { inngest } from '@/lib/inngest'

export async function POST(req: NextRequest) {
  const payload = await req.json()

  // Verify Midtrans signature
  const signatureKey = createHash('sha512')
    .update(`${payload.order_id}${payload.status_code}${payload.gross_amount}${process.env.MIDTRANS_SERVER_KEY || process.env.MIDTRANS_WEBHOOK_SECRET}`)
    .digest('hex')

  if (signatureKey !== payload.signature_key) {
    return new Response('Invalid signature', { status: 401 })
  }

  if (payload.transaction_status === 'chargeback' || payload.fraud_status === 'challenge') {
    const connection = await prisma.processorConnection.findFirst({
      where: { processor: 'MIDTRANS', isActive: true },
    })

    if (connection) {
      const deadline = new Date()
      deadline.setDate(deadline.getDate() + 21)

      await inngest.send({
        name: 'chargeback/detected',
        data: {
          merchantId: connection.merchantId,
          connectionId: connection.id,
          processorDisputeId: payload.transaction_id,
          processor: 'MIDTRANS',
          country: 'ID',
          amount: parseFloat(payload.gross_amount),
          currency: 'IDR',
          reasonCode: payload.fraud_status || 'UNAUTHORIZED',
          reasonCategory: 'UNAUTHORIZED',
          reasonDescription: 'Disputed transaction via Midtrans',
          transactionDate: payload.transaction_time || new Date().toISOString(),
          chargebackDate: new Date().toISOString(),
          evidenceDeadline: deadline.toISOString(),
        },
      })
    }
  }

  return new Response('OK', { status: 200 })
}
