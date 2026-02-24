import { NextRequest } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { inngest } from '@/lib/inngest'

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth()
  if (!userId) return new Response('Unauthorized', { status: 401 })

  const merchant = await prisma.merchant.findUnique({ where: { clerkUserId: userId } })
  if (!merchant) return new Response('Merchant not found', { status: 404 })

  const dispute = await prisma.dispute.findFirst({
    where: { id: params.id, merchantId: merchant.id },
  })
  if (!dispute) return new Response('Not found', { status: 404 })

  const body = await req.json().catch(() => ({}))
  const language = body.language || 'en'

  await inngest.send({
    name: 'dispute/generate-letter',
    data: { disputeId: params.id, language },
  })

  return Response.json({ queued: true, disputeId: params.id, language })
}
