import { NextRequest } from 'next/server'
import { createHmac } from 'crypto'
import { prisma } from '@/lib/prisma'
import { inngest } from '@/lib/inngest'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('paymongo-signature')

  if (!signature) {
    return new Response('Missing signature', { status: 400 })
  }

  // Verify PayMongo webhook signature
  const [timestampPart, testSigPart, liveSigPart] = signature.split(',')
  const timestamp = timestampPart?.split('=')[1]
  const receivedSig = testSigPart?.split('=')[1] || liveSigPart?.split('=')[1]

  const computedSig = createHmac('sha256', process.env.PAYMONGO_WEBHOOK_SECRET || '')
    .update(`${timestamp}.${body}`)
    .digest('hex')

  if (computedSig !== receivedSig) {
    return new Response('Invalid signature', { status: 401 })
  }

  const payload = JSON.parse(body)
  const eventType = payload.data?.attributes?.type

  if (eventType === 'payment.dispute.created' || eventType === 'chargeback.created') {
    const disputeData = payload.data?.attributes?.data?.attributes

    const connection = await prisma.processorConnection.findFirst({
      where: { processor: 'PAYMONGO', isActive: true },
    })

    if (connection) {
      const deadline = new Date()
      deadline.setDate(deadline.getDate() + 30)

      await inngest.send({
        name: 'chargeback/detected',
        data: {
          merchantId: connection.merchantId,
          connectionId: connection.id,
          processorDisputeId: payload.data?.id || 'PGO-' + Date.now(),
          processor: 'PAYMONGO',
          country: 'PH',
          amount: (disputeData?.amount || 0) / 100,
          currency: 'PHP',
          reasonCode: disputeData?.reason || 'general',
          reasonCategory: 'UNAUTHORIZED',
          reasonDescription: disputeData?.reason || 'Disputed transaction',
          customerEmail: disputeData?.payer?.email,
          transactionDate: new Date((disputeData?.created_at || 0) * 1000).toISOString(),
          chargebackDate: new Date().toISOString(),
          evidenceDeadline: deadline.toISOString(),
        },
      })
    }
  }

  return new Response('OK', { status: 200 })
}
