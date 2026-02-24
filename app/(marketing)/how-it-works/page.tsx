import Link from 'next/link'
import { btnPrimary } from '@/lib/styles'

export const metadata = { title: 'How It Works' }

const steps = [
  {
    icon: '🔌',
    num: '01',
    title: 'Connect Your Processor',
    desc: 'Link your Xendit, Midtrans, Stripe, PayMongo, iPay88 or 2C2P account in under 30 seconds. No code, no engineering required — just API keys.',
    detail: 'We use secure, read-only API connections and store all credentials with AES-256 encryption.',
  },
  {
    icon: '⚡',
    num: '02',
    title: 'Auto-Detect Every Chargeback',
    desc: 'Our webhook system monitors your payment processor 24/7. The moment a chargeback is filed, we know instantly — usually before you receive any email notification.',
    detail: 'Average detection time: under 60 seconds from chargeback filing.',
  },
  {
    icon: '✍️',
    num: '03',
    title: 'AI Writes the Dispute Letter',
    desc: 'Claude AI analyzes the chargeback reason, collects all available evidence, and writes a tailored, compelling rebuttal letter in seconds.',
    detail: 'Letters cite Visa/Mastercard rules by name, include your transaction evidence, and are formatted to processor specifications.',
  },
  {
    icon: '🌏',
    num: '04',
    title: 'Auto-Translated to Local Language',
    desc: 'For disputes in Indonesia, Philippines, Thailand, or Malaysia, we automatically generate a version in the local language — Bahasa Indonesia, Filipino, Thai, or Bahasa Melayu.',
    detail: 'All translations maintain formal legal tone and preserve reference numbers exactly.',
  },
  {
    icon: '📤',
    num: '05',
    title: 'Submit or Review',
    desc: 'In auto-submit mode, the letter goes out immediately — fully hands-off. In review mode, you get a one-click approval before submission.',
    detail: 'Our average submission time is 4.2 days vs the industry average of 8 days.',
  },
  {
    icon: '💰',
    num: '06',
    title: 'Win. We Take 20%.',
    desc: 'When the dispute is decided in your favor, the funds are returned to your account. We invoice you 20% of the recovered amount. No win = no charge, ever.',
    detail: 'Our current merchant win rate: 67%. Industry average for manual disputes: 8%.',
  },
]

export default function HowItWorksPage() {
  return (
    <div className="py-20 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="font-display font-[800] text-[48px] tracking-[-0.02em] mb-4" style={{ color: 'var(--text-primary)' }}>
          How ChargeBack.asia works
        </h1>
        <p className="text-xl" style={{ color: 'var(--text-secondary)' }}>
          From chargeback detected to funds recovered — fully automated.
        </p>
      </div>

      <div className="space-y-4">
        {steps.map((step, i) => (
          <div
            key={i}
            className="rounded-[16px] border p-6 flex gap-6 items-start"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
          >
            <div className="text-4xl shrink-0">{step.icon}</div>
            <div className="flex-1">
              <div className="font-mono text-[11px] mb-1" style={{ color: 'var(--green-500)' }}>STEP {step.num}</div>
              <h3 className="font-display font-[700] text-[20px] mb-2" style={{ color: 'var(--text-primary)' }}>
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
                {step.desc}
              </p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                ℹ️ {step.detail}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-14">
        <Link href="/sign-up" className={`${btnPrimary} btn-green-glow text-base px-8 py-4`}>
          Start Recovering Free →
        </Link>
        <p className="text-sm mt-3" style={{ color: 'var(--text-muted)' }}>
          No credit card required. First 3 disputes free.
        </p>
      </div>
    </div>
  )
}
