import { inngest } from '@/lib/inngest'
import { prisma } from '@/lib/prisma'
import { sendWonEmail } from '@/lib/resend'

export const sendNotificationsFunction = inngest.createFunction(
  { id: 'send-notifications', retries: 2 },
  { event: 'dispute/outcome' },
  async ({ event, step }) => {
    const { disputeId, outcome } = event.data as { disputeId: string; outcome: 'WON' | 'LOST' }

    const dispute = await step.run('fetch-dispute', async () => {
      return prisma.dispute.findUniqueOrThrow({
        where: { id: disputeId },
        include: { merchant: true },
      })
    })

    if (outcome === 'WON') {
      const fee = dispute.amount * 0.2

      await step.run('create-recovery', async () => {
        return prisma.recovery.create({
          data: {
            disputeId,
            merchantId: dispute.merchantId,
            recoveredAmount: dispute.amount,
            ourFee: fee,
            currency: dispute.currency,
          },
        })
      })

      await step.run('update-dispute-won', async () => {
        return prisma.dispute.update({
          where: { id: disputeId },
          data: { status: 'WON' },
        })
      })

      await step.run('notify-won', async () => {
        await prisma.notification.create({
          data: {
            merchantId: dispute.merchantId,
            type: 'dispute_won',
            title: `🎉 Won! ${dispute.currency} ${dispute.amount} recovered`,
            body: `Dispute ${dispute.processorDisputeId} was decided in your favor. Our fee: ${dispute.currency} ${fee.toFixed(2)}.`,
            data: { disputeId },
          },
        })

        if (dispute.merchant.notifyEmail) {
          await sendWonEmail(dispute.merchant.email, {
            disputeId,
            amount: dispute.amount,
            currency: dispute.currency,
            fee,
          })
        }
      })
    } else {
      await step.run('update-dispute-lost', async () => {
        return prisma.dispute.update({
          where: { id: disputeId },
          data: { status: 'LOST' },
        })
      })

      await step.run('notify-lost', async () => {
        await prisma.notification.create({
          data: {
            merchantId: dispute.merchantId,
            type: 'dispute_lost',
            title: `Dispute result: Not in our favor`,
            body: `${dispute.processorDisputeId} — ${dispute.currency} ${dispute.amount}. No charge from us.`,
            data: { disputeId },
          },
        })
      })
    }

    return { disputeId, outcome }
  }
)
