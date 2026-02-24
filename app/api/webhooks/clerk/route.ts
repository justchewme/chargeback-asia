import { NextRequest } from 'next/server'
import { Webhook } from 'svix'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const svixId = req.headers.get('svix-id')
  const svixTimestamp = req.headers.get('svix-timestamp')
  const svixSignature = req.headers.get('svix-signature')

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response('Missing svix headers', { status: 400 })
  }

  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || '')
  let evt: any

  try {
    evt = wh.verify(body, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    })
  } catch {
    return new Response('Webhook verification failed', { status: 400 })
  }

  if (evt.type === 'user.created') {
    const { id, email_addresses, first_name, last_name } = evt.data
    const email = email_addresses[0]?.email_address

    if (email) {
      await prisma.merchant.upsert({
        where: { clerkUserId: id },
        update: {},
        create: {
          clerkUserId: id,
          email,
          businessName: `${first_name || ''} ${last_name || ''}`.trim() || 'My Business',
        },
      })
    }
  }

  if (evt.type === 'user.deleted') {
    const { id } = evt.data
    await prisma.merchant.deleteMany({ where: { clerkUserId: id } })
  }

  return new Response('OK', { status: 200 })
}
