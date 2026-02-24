import { inngest } from '@/lib/inngest'
import { prisma } from '@/lib/prisma'
import { collectEvidence } from '@/lib/dispute/evidence-collector'
import { generateDisputeLetter, translateLetter } from '@/lib/dispute/letter-generator'
import { sendDisputeDetectedEmail } from '@/lib/resend'
import { Processor, ReasonCategory } from '@prisma/client'

const countryToLanguage: Record<string, string> = {
  'ID': 'id',
  'TH': 'th',
  'PH': 'tl',
  'MY': 'ms',
}

export const processChargeback = inngest.createFunction(
  {
    id: 'process-chargeback',
    retries: 3,
    concurrency: { limit: 10 },
  },
  { event: 'chargeback/detected' },
  async ({ event, step }) => {
    const data = event.data as {
      merchantId: string
      connectionId: string
      processorDisputeId: string
      processor: Processor
      country: string
      amount: number
      currency: string
      reasonCode: string
      reasonCategory: ReasonCategory
      reasonDescription?: string
      customerEmail?: string
      customerName?: string
      transactionDate: string
      chargebackDate: string
      evidenceDeadline: string
    }

    // Step 1: Create dispute record
    const dispute = await step.run('create-dispute', async () => {
      return prisma.dispute.create({
        data: {
          merchantId: data.merchantId,
          connectionId: data.connectionId,
          processorDisputeId: data.processorDisputeId,
          processor: data.processor,
          country: data.country,
          amount: data.amount,
          currency: data.currency,
          reasonCode: data.reasonCode,
          reasonCategory: data.reasonCategory,
          reasonDescription: data.reasonDescription,
          customerEmail: data.customerEmail,
          customerName: data.customerName,
          transactionDate: new Date(data.transactionDate),
          chargebackDate: new Date(data.chargebackDate),
          evidenceDeadline: new Date(data.evidenceDeadline),
          status: 'EVIDENCE_COLLECTING',
        },
      })
    })

    // Step 2: Collect evidence
    const evidenceItems = await step.run('collect-evidence', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return collectEvidence(dispute as any)
    })

    // Step 3: Save evidence
    await step.run('save-evidence', async () => {
      return prisma.evidence.createMany({
        data: evidenceItems,
      })
    })

    // Step 4: Get full dispute with evidence
    const disputeWithEvidence = await step.run('fetch-dispute-evidence', async () => {
      return prisma.dispute.findUniqueOrThrow({
        where: { id: dispute.id },
        include: { evidence: true },
      })
    })

    // Step 5: Generate English letter
    const englishLetter = await step.run('generate-letter-en', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return generateDisputeLetter(disputeWithEvidence as any)
    })

    // Step 6: Save English letter
    await step.run('save-letter-en', async () => {
      return prisma.disputeLetter.create({
        data: {
          disputeId: dispute.id,
          language: 'en',
          content: englishLetter,
          claudeModel: 'claude-sonnet-4-6',
        },
      })
    })

    // Step 7: Auto-generate local language translation
    const localLang = countryToLanguage[dispute.country]
    if (localLang) {
      const localLetter = await step.run(`generate-letter-${localLang}`, async () => {
        return translateLetter(englishLetter, localLang)
      })
      await step.run('save-letter-local', async () => {
        return prisma.disputeLetter.create({
          data: {
            disputeId: dispute.id,
            language: localLang,
            content: localLetter,
            claudeModel: 'claude-sonnet-4-6',
          },
        })
      })
    }

    // Step 8: Auto-submit or queue for review
    const merchant = await step.run('fetch-merchant', async () => {
      return prisma.merchant.findUnique({ where: { id: dispute.merchantId } })
    })

    if (merchant?.autoSubmit) {
      await step.run('update-status-submitted', async () => {
        return prisma.dispute.update({
          where: { id: dispute.id },
          data: { status: 'SUBMITTED' },
        })
      })
    } else {
      await step.run('update-status-review', async () => {
        return prisma.dispute.update({
          where: { id: dispute.id },
          data: { status: 'REVIEW_NEEDED' },
        })
      })
    }

    // Step 9: Create notification + send email
    await step.run('notify', async () => {
      if (!merchant) return

      await prisma.notification.create({
        data: {
          merchantId: dispute.merchantId,
          type: 'dispute_detected',
          title: `New chargeback: ${dispute.currency} ${dispute.amount}`,
          body: `${dispute.reasonCategory} via ${dispute.processor}. Letter ${merchant.autoSubmit ? 'submitted automatically' : 'ready for review'}.`,
          data: { disputeId: dispute.id },
        },
      })

      if (merchant.notifyEmail) {
        await sendDisputeDetectedEmail(merchant.email, {
          id: dispute.id,
          currency: dispute.currency,
          amount: dispute.amount,
          processor: dispute.processor,
          reasonCategory: dispute.reasonCategory,
          evidenceDeadline: dispute.evidenceDeadline as unknown as Date,
          autoSubmit: merchant.autoSubmit,
        })
      }
    })

    return { disputeId: dispute.id, status: 'processed' }
  }
)
