import Link from 'next/link'
import { Logo } from '@/components/shared/Logo'
import { Footer } from '@/components/layout/Footer'
import { btnPrimary, btnSecondary } from '@/lib/styles'

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
      {/* Nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between"
        style={{
          background: 'rgba(8,14,24,0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <Logo size="md" showBeta />

        <div className="hidden md:flex items-center gap-6">
          {[
            { href: '/how-it-works', label: 'How It Works' },
            { href: '/pricing', label: 'Pricing' },
            { href: '/blog', label: 'Blog' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm transition-colors"
              style={{ color: 'var(--text-secondary)' }}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link href="/sign-in" className={btnSecondary} style={{ padding: '8px 16px' }}>
            Sign in
          </Link>
          <Link href="/sign-up" className={btnPrimary} style={{ padding: '8px 16px' }}>
            Start Free →
          </Link>
        </div>
      </nav>

      <main className="pt-16">
        {children}
      </main>

      <Footer />
    </div>
  )
}
