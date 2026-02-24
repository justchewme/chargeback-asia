import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { inngest } from '@/lib/inngest'
import { ReasonCategory } from '@prisma/client'

function mapXenditReason(reason: string): ReasonCategory {
  const map: Record<string, ReasonCategory> = {
    'not_authorized': 'UNAUTHORIZED',
    'not_received': 'PRODUCT_NOT_RECEIVED',
    'not_as_described': 'ITEM_NOT_AS_DESCRIBED',
    'duplicate': 'DUPLICATE',
    'subscription_cancelled': 'SUBSCRIPTION_CANCELLED',
    'credit_not_processed': 'CREDIT_NOT_PROCESSED',
  }
  return map[reason] || 'GENERAL'
}

export async function POST(req: NextRequest) {
  const callbackToken = req.headers.get('x-callback-token')

  if (callbackToken !== process.env.XENDIT_WEBHOOK_SECRET) {
    return new Response('Unauthorized', { status: 401 })
  }

  const payload = await req.json()

  // Xendit dispute event types
  if (payload.event === 'dispute.created' || payload.type === 'DISPUTE') {
    const connection = await prisma.processorConnection.findFirst({
      where: { processor: 'XENDIT', isActive: true },
    })

    if (connection) {
      const deadline = new Date()
      deadline.setDate(deadline.getDate() + 30)

      await inngest.send({
        name: 'chargeback/detected',
        data: {
          merchantId: connection.merchantId,
          connectionId: connection.id,
          processorDisputeId: payload.id || payload.dispute_id,
          processor: 'XENDIT',
          country: payload.currency === 'IDR' ? 'ID' : payload.currency === 'PHP' ? 'PH' : 'ID',
          amount: payload.amount || payload.disputed_amount,
          currency: payload.currency || 'IDR',
          reasonCode: payload.reason_code || 'UNAUTHORIZED',
          reasonCategory: mapXenditReason(payload.reason || 'not_authorized'),
          reasonDescription: payload.reason || 'Unauthorized transaction',
          customerEmail: payload.payer_email || payload.customer_email,
          customerName: payload.payer_name,
          transactionDate: payload.created || new Date().toISOString(),
          chargebackDate: payload.updated || new Date().toISOString(),
          evidenceDeadline: deadline.toISOString(),
        },
      })
    }
  }

  return new Response('OK', { status: 200 })
}
