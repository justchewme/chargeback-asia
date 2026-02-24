import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import { btnPrimary, btnSecondary } from '@/lib/styles'

export const metadata = { title: 'Pricing' }

const features = {
  free: [
    'Unlimited processor connections',
    'Auto-detect chargebacks (webhook)',
    'First 3 dispute letters free',
    'Basic dashboard',
    'Email notifications',
  ],
  performance: [
    'Everything in Free',
    'Unlimited dispute letters',
    'Multi-language (EN/ID/TH/TL/MY)',
    'Auto-submit mode',
    'Priority AI processing',
    'WhatsApp notifications',
    'Team collaboration (3 seats)',
    'Monthly PDF reports',
    'Dispute health score',
    'Win rate benchmarking',
    'Past dispute import',
    'API access',
  ],
  enterprise: [
    'Everything in Performance',
    'Custom seat count',
    'Dedicated success manager',
    'SLA guarantees',
    'Custom integrations',
    'Volume pricing',
    'White-label available',
  ],
}

export default function PricingPage() {
  return (
    <div className="py-20 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="font-display font-[800] text-[48px] tracking-[-0.02em] mb-4" style={{ color: 'var(--text-primary)' }}>
          Pay only when you win
        </h1>
        <p className="text-xl" style={{ color: 'var(--text-secondary)' }}>
          No monthly fees. No contracts. We succeed when you succeed.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Free */}
        <div className="rounded-[20px] border p-7" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
          <p className="text-sm font-semibold mb-2" style={{ color: 'var(--text-muted)' }}>FREE</p>
          <div className="mb-5">
            <span className="font-display font-[800] text-[40px]" style={{ color: 'var(--text-primary)' }}>$0</span>
          </div>
          <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>Try before you commit</p>
          <div className="space-y-2.5 mb-7">
            {features.free.map(f => (
              <div key={f} className="flex items-center gap-2">
                <CheckCircle size={13} style={{ color: 'var(--green-500)' }} />
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{f}</span>
              </div>
            ))}
          </div>
          <Link href="/sign-up" className={`${btnSecondary} w-full justify-center`} style={{ display: 'flex' }}>
            Get Started Free
          </Link>
        </div>

        {/* Performance */}
        <div className="rounded-[20px] border p-7 relative" style={{ background: 'var(--bg-card)', borderColor: 'rgba(0,230,118,0.4)', boxShadow: 'var(--shadow-green)' }}>
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold whitespace-nowrap" style={{ background: 'var(--green-500)', color: 'var(--text-inverse)' }}>
            Most Popular
          </div>
          <p className="text-sm font-semibold mb-2" style={{ color: 'var(--green-500)' }}>PERFORMANCE</p>
          <div className="mb-5">
            <span className="font-display font-[800] text-[40px]" style={{ color: 'var(--text-primary)' }}>20%</span>
            <span className="text-sm ml-1" style={{ color: 'var(--text-muted)' }}>of recovered only</span>
          </div>
          <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>No recovery = no charge</p>
          <div className="space-y-2.5 mb-7">
            {features.performance.map(f => (
              <div key={f} className="flex items-center gap-2">
                <CheckCircle size={13} style={{ color: 'var(--green-500)' }} />
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{f}</span>
              </div>
            ))}
          </div>
          <Link href="/sign-up" className={`${btnPrimary} btn-green-glow w-full justify-center`} style={{ display: 'flex' }}>
            Start Recovering →
          </Link>
          <p className="text-center text-xs mt-3" style={{ color: 'var(--text-muted)' }}>Cancel anytime</p>
        </div>

        {/* Enterprise */}
        <div className="rounded-[20px] border p-7" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
          <p className="text-sm font-semibold mb-2" style={{ color: 'var(--text-muted)' }}>ENTERPRISE</p>
          <div className="mb-5">
            <span className="font-display font-[800] text-[40px]" style={{ color: 'var(--text-primary)' }}>Custom</span>
          </div>
          <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>For high-volume merchants</p>
          <div className="space-y-2.5 mb-7">
            {features.enterprise.map(f => (
              <div key={f} className="flex items-center gap-2">
                <CheckCircle size={13} style={{ color: 'var(--green-500)' }} />
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{f}</span>
              </div>
            ))}
          </div>
          <a href="mailto:enterprise@chargebackasia.com" className={`${btnSecondary} w-full justify-center`} style={{ display: 'flex' }}>
            Contact Sales
          </a>
        </div>
      </div>
    </div>
  )
}
