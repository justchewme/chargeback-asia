'use client'

import { UserButton } from '@clerk/nextjs'
import { NotificationBell } from '@/components/shared/NotificationBell'
import { Search } from 'lucide-react'
import { usePathname } from 'next/navigation'

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/disputes': 'Disputes',
  '/integrations': 'Integrations',
  '/analytics': 'Analytics',
  '/team': 'Team',
  '/referrals': 'Referrals',
  '/settings': 'Settings',
  '/settings/billing': 'Billing',
  '/settings/notifications': 'Notifications',
  '/onboarding': 'Onboarding',
}

export function Topbar() {
  const pathname = usePathname()
  const title = pageTitles[pathname] || pageTitles[Object.keys(pageTitles).find(k => pathname.startsWith(k)) || ''] || 'Dashboard'

  return (
    <header
      className="h-14 flex items-center justify-between px-6 border-b fixed right-0 top-0 z-20 transition-all duration-200"
      style={{
        background: 'var(--bg-primary)',
        borderColor: 'var(--border)',
        left: 240,
      }}
    >
      <h1
        className="font-display font-[600] text-[16px]"
        style={{ color: 'var(--text-primary)' }}
      >
        {title}
      </h1>

      <div className="flex items-center gap-2">
        {/* Search */}
        <button
          className="flex items-center gap-2 px-3 py-1.5 rounded-[8px] text-sm transition-all"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            color: 'var(--text-muted)',
          }}
        >
          <Search size={13} />
          <span className="text-[12px] hidden md:block">Search disputes...</span>
          <kbd
            className="hidden md:inline-flex items-center px-1.5 py-0.5 rounded text-[10px]"
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              color: 'var(--text-muted)',
            }}
          >
            ⌘K
          </kbd>
        </button>

        <NotificationBell />

        <UserButton
          appearance={{
            elements: {
              avatarBox: 'w-8 h-8',
            },
          }}
        />
      </div>
    </header>
  )
}
