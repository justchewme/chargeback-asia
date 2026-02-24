import { NextRequest } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth()
  if (!userId) return new Response('Unauthorized', { status: 401 })

  const merchant = await prisma.merchant.findUnique({ where: { clerkUserId: userId } })
  if (!merchant) return new Response('Merchant not found', { status: 404 })

  const dispute = await prisma.dispute.findFirst({
    where: { id: params.id, merchantId: merchant.id },
    include: {
      evidence: true,
      letters: { orderBy: { createdAt: 'desc' } },
      recovery: true,
    },
  })

  if (!dispute) return new Response('Not found', { status: 404 })

  return Response.json(dispute)
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth()
  if (!userId) return new Response('Unauthorized', { status: 401 })

  const merchant = await prisma.merchant.findUnique({ where: { clerkUserId: userId } })
  if (!merchant) return new Response('Merchant not found', { status: 404 })

  const body = await req.json()

  const dispute = await prisma.dispute.updateMany({
    where: { id: params.id, merchantId: merchant.id },
    data: { notes: body.notes, status: body.status },
  })

  return Response.json({ updated: dispute.count })
}
