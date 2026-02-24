import { NextRequest } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'
import { inngest } from '@/lib/inngest'
import { ReasonCategory } from '@prisma/client'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-06-20',
})

function mapReasonToCategory(reason: string): ReasonCategory {
  const map: Record<string, ReasonCategory> = {
    'fraudulent': 'UNAUTHORIZED',
    'unrecognized': 'UNAUTHORIZED',
    'product_not_received': 'PRODUCT_NOT_RECEIVED',
    'product_unacceptable': 'ITEM_NOT_AS_DESCRIBED',
    'duplicate': 'DUPLICATE',
    'subscription_canceled': 'SUBSCRIPTION_CANCELLED',
    'credit_not_processed': 'CREDIT_NOT_PROCESSED',
    'general': 'GENERAL',
  }
  return map[reason] || 'GENERAL'
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig) {
    return new Response('Missing signature', { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET || '')
  } catch {
    return new Response('Webhook signature verification failed', { status: 400 })
  }

  if (event.type === 'charge.dispute.created') {
    const dispute = event.data.object as Stripe.Dispute

    const connection = await prisma.processorConnection.findFirst({
      where: { processor: 'STRIPE', isActive: true },
    })

    if (connection) {
      const deadline = new Date()
      deadline.setDate(deadline.getDate() + (dispute.evidence_details?.due_by
        ? Math.ceil((dispute.evidence_details.due_by * 1000 - Date.now()) / (1000 * 60 * 60 * 24))
        : 21))

      await inngest.send({
        name: 'chargeback/detected',
        data: {
          merchantId: connection.merchantId,
          connectionId: connection.id,
          processorDisputeId: dispute.id,
          processor: 'STRIPE',
          country: 'SG', // Would be derived from charge metadata
          amount: dispute.amount / 100,
          currency: dispute.currency.toUpperCase(),
          reasonCode: dispute.reason,
          reasonCategory: mapReasonToCategory(dispute.reason),
          reasonDescription: dispute.reason.replace(/_/g, ' '),
          transactionDate: new Date((dispute.charge as any).created * 1000).toISOString(),
          chargebackDate: new Date(dispute.created * 1000).toISOString(),
          evidenceDeadline: deadline.toISOString(),
        },
      })
    }
  }

  if (event.type === 'charge.dispute.closed') {
    const dispute = event.data.object as Stripe.Dispute
    const outcome = dispute.status === 'won' ? 'WON' : 'LOST'

    const dbDispute = await prisma.dispute.findFirst({
      where: { processorDisputeId: dispute.id },
    })

    if (dbDispute) {
      await inngest.send({
        name: 'dispute/outcome',
        data: { disputeId: dbDispute.id, outcome },
      })
    }
  }

  return new Response('OK', { status: 200 })
}
