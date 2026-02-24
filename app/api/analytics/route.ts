import { NextRequest } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const { userId } = auth()
  if (!userId) return new Response('Unauthorized', { status: 401 })

  const merchant = await prisma.merchant.findUnique({ where: { clerkUserId: userId } })
  if (!merchant) return new Response('Merchant not found', { status: 404 })

  const [
    totalDisputes,
    wonDisputes,
    totalRecovered,
    activeDisputes,
  ] = await Promise.all([
    prisma.dispute.count({ where: { merchantId: merchant.id } }),
    prisma.dispute.count({ where: { merchantId: merchant.id, status: 'WON' } }),
    prisma.recovery.aggregate({
      where: { merchantId: merchant.id },
      _sum: { recoveredAmount: true },
    }),
    prisma.dispute.count({
      where: {
        merchantId: merchant.id,
        status: { in: ['DETECTED', 'EVIDENCE_COLLECTING', 'DRAFT', 'REVIEW_NEEDED', 'SUBMITTED'] },
      },
    }),
  ])

  const winRate = totalDisputes > 0 ? Math.round((wonDisputes / totalDisputes) * 100) : 0

  return Response.json({
    totalDisputes,
    wonDisputes,
    winRate,
    totalRecovered: totalRecovered._sum.recoveredAmount || 0,
    activeDisputes,
  })
}
