import { inngest } from '@/lib/inngest'
import { prisma } from '@/lib/prisma'
import { generateDisputeLetter, translateLetter } from '@/lib/dispute/letter-generator'

export const generateLetterFunction = inngest.createFunction(
  { id: 'generate-letter', retries: 3 },
  { event: 'dispute/generate-letter' },
  async ({ event, step }) => {
    const { disputeId, language } = event.data as { disputeId: string; language?: string }

    const dispute = await step.run('fetch-dispute', async () => {
      return prisma.dispute.findUniqueOrThrow({
        where: { id: disputeId },
        include: { evidence: true },
      })
    })

    const letter = await step.run('generate', async () => {
      if (language && language !== 'en') {
        const enLetter = await prisma.disputeLetter.findFirst({
          where: { disputeId, language: 'en' },
          orderBy: { createdAt: 'desc' },
        })
        if (enLetter) {
          return translateLetter(enLetter.content, language)
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return generateDisputeLetter(dispute as any)
    })

    const savedLetter = await step.run('save', async () => {
      return prisma.disputeLetter.create({
        data: {
          disputeId,
          language: language || 'en',
          content: letter,
          claudeModel: 'claude-sonnet-4-6',
        },
      })
    })

    await step.run('update-dispute-status', async () => {
      return prisma.dispute.update({
        where: { id: disputeId },
        data: { status: 'REVIEW_NEEDED' },
      })
    })

    return { letterId: savedLetter.id }
  }
)
