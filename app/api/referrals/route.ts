import { NextRequest } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return new Response('Unauthorized', { status: 401 })

  const merchant = await prisma.merchant.findUnique({ where: { clerkUserId: userId } })
  if (!merchant) return new Response('Merchant not found', { status: 404 })

  const referrals = await prisma.referral.findMany({
    where: { referrerId: merchant.id },
    orderBy: { createdAt: 'desc' },
  })

  const totalEarnings = referrals.reduce((sum, r) => sum + r.earningsTotal, 0)

  return Response.json({
    referralCode: merchant.referralCode,
    referralUrl: `${process.env.NEXT_PUBLIC_APP_URL}/signup?ref=${merchant.referralCode}`,
    referrals,
    totalEarnings,
  })
}
