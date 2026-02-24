import { NextRequest } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { userId } = auth()
  if (!userId) return new Response('Unauthorized', { status: 401 })

  const merchant = await prisma.merchant.findUnique({ where: { clerkUserId: userId } })
  if (!merchant) return new Response('Merchant not found', { status: 404 })

  const dispute = await prisma.dispute.findFirst({
    where: { id: params.id, merchantId: merchant.id },
    include: { letters: { orderBy: { createdAt: 'desc' }, take: 1 } },
  })
  if (!dispute) return new Response('Not found', { status: 404 })

  const letter = dispute.letters[0]
  if (!letter) return new Response('No letter generated yet', { status: 400 })

  // Update letter as submitted
  await prisma.disputeLetter.update({
    where: { id: letter.id },
    data: { submittedAt: new Date() },
  })

  // Update dispute status
  await prisma.dispute.update({
    where: { id: params.id },
    data: { status: 'SUBMITTED' },
  })

  // Create notification
  await prisma.notification.create({
    data: {
      merchantId: merchant.id,
      type: 'dispute_submitted',
      title: 'Dispute submitted',
      body: `${dispute.processorDisputeId} submitted to ${dispute.processor}`,
      data: { disputeId: params.id },
    },
  })

  return Response.json({ submitted: true })
}
