# ChargeBack.asia

> AI-powered chargeback recovery SaaS for Asian merchants. Win back what's yours.

## Stack

- **Framework**: Next.js 14 App Router + TypeScript
- **Styling**: Tailwind CSS v3 + shadcn/ui + custom design system
- **Auth**: Clerk
- **Database**: Supabase (PostgreSQL) + Prisma ORM
- **Jobs**: Inngest
- **AI**: Anthropic Claude (claude-sonnet-4-6)
- **Email**: Resend
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Hosting**: Vercel

## Quick Start

```bash
# 1. Clone & install
git clone https://github.com/yourname/chargeback-asia
cd chargeback-asia
npm install

# 2. Copy env
cp .env.example .env.local
# Fill in all values in .env.local

# 3. Push database schema
npx prisma db push
npx prisma generate

# 4. Run dev server
npm run dev
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Description |
|---|---|
| `DATABASE_URL` | Supabase PostgreSQL connection string |
| `DIRECT_URL` | Supabase direct connection URL |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk public key |
| `CLERK_SECRET_KEY` | Clerk secret key |
| `ANTHROPIC_API_KEY` | Claude API key |
| `RESEND_API_KEY` | Resend email API key |
| `INNGEST_EVENT_KEY` | Inngest event key |
| `INNGEST_SIGNING_KEY` | Inngest signing key |
| `XENDIT_WEBHOOK_SECRET` | Xendit callback token |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `MIDTRANS_WEBHOOK_SECRET` | Midtrans server key |
| `PAYMONGO_WEBHOOK_SECRET` | PayMongo webhook secret |
| `ENCRYPTION_KEY` | 32-char key for encrypting processor API keys |
| `NEXT_PUBLIC_APP_URL` | Your app URL |

## Supported Processors

| Processor | Countries | Webhook Path |
|---|---|---|
| Xendit | 🇮🇩🇵🇭🇹🇭🇻🇳 | `/api/webhooks/xendit` |
| Midtrans | 🇮🇩 | `/api/webhooks/midtrans` |
| Stripe | 🇸🇬🇲🇾🇵🇭🇹🇭 | `/api/webhooks/stripe` |
| PayMongo | 🇵🇭 | `/api/webhooks/paymongo` |
| iPay88 | 🇲🇾🇮🇩🇵🇭🇹🇭 | `/api/webhooks/ipay88` |
| 2C2P | 🇹🇭🇸🇬🇲🇾🇮🇩🇻🇳 | `/api/webhooks/twoc2p` |

## Pages

| Route | Description |
|---|---|
| `/` | Landing page |
| `/pricing` | Pricing page |
| `/how-it-works` | How it works |
| `/sign-in` `/sign-up` | Auth (Clerk) |
| `/onboarding` | 4-step setup wizard |
| `/dashboard` | Main analytics dashboard |
| `/disputes` | Disputes table + filters |
| `/disputes/[id]` | Dispute detail with letter |
| `/integrations` | Connect payment processors |
| `/analytics` | Charts + AI insights |
| `/referrals` | Referral program |
| `/team` | Team management |
| `/settings` | Account settings |

## Deploy to Vercel

```bash
vercel deploy --prod
```

Set all environment variables in Vercel dashboard.
Add webhook URLs to your payment processor dashboards after deployment.

---

*ChargeBack.Asia — Win Back What's Yours* 🌏
