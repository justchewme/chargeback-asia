import { NextRequest } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return new Response('Unauthorized', { status: 401 })

  const merchant = await prisma.merchant.findUnique({ where: { clerkUserId: userId } })
  if (!merchant) return new Response('Merchant not found', { status: 404 })

  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')
  const processor = searchParams.get('processor')
  const limit = parseInt(searchParams.get('limit') || '25')
  const offset = parseInt(searchParams.get('offset') || '0')

  const disputes = await prisma.dispute.findMany({
    where: {
      merchantId: merchant.id,
      ...(status && status !== 'ALL' ? { status: status as any } : {}),
      ...(processor && processor !== 'ALL' ? { processor: processor as any } : {}),
    },
    include: {
      letters: { orderBy: { createdAt: 'desc' }, take: 1 },
      evidence: { select: { id: true, type: true } },
    },
    orderBy: { chargebackDate: 'desc' },
    take: limit,
    skip: offset,
  })

  return Response.json(disputes)
}
