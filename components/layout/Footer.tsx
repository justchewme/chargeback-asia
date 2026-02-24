import Link from 'next/link'
import { Logo } from '@/components/shared/Logo'

export function Footer() {
  return (
    <footer
      className="border-t py-12 px-6"
      style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <Logo size="md" className="mb-3" />
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              AI-powered chargeback recovery for Asian merchants. Pay only when you win.
            </p>
            <div className="flex gap-1 mt-4 text-lg">
              🇮🇩 🇸🇬 🇲🇾 🇵🇭 🇹🇭 🇻🇳
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>Product</h4>
            <ul className="space-y-2">
              {['How It Works', 'Pricing', 'Integrations', 'Blog'].map(item => (
                <li key={item}>
                  <Link href="#" className="text-sm transition-colors" style={{ color: 'var(--text-secondary)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                  >{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>Processors</h4>
            <ul className="space-y-2">
              {['Xendit', 'Midtrans', 'Stripe', 'PayMongo', 'iPay88', '2C2P'].map(item => (
                <li key={item}>
                  <Link href="#" className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>Legal</h4>
            <ul className="space-y-2">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(item => (
                <li key={item}>
                  <Link href="#" className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="flex flex-col md:flex-row items-center justify-between pt-8 border-t gap-4"
          style={{ borderColor: 'var(--border)' }}
        >
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            © 2025 ChargeBack.asia. All rights reserved.
          </p>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Built with AI for SEA merchants 🌏
          </p>
        </div>
      </div>
    </footer>
  )
}
