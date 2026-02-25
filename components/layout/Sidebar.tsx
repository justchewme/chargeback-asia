'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  LayoutDashboard, AlertCircle, Plug, BarChart3,
  Users, Gift, Settings, CreditCard,
  ChevronLeft, ChevronRight, Shield, Languages,
  Upload, Key, Trophy, MessageCircle,
} from 'lucide-react'
import { Logo } from '@/components/shared/Logo'
import { cn } from '@/lib/styles'
import { useState } from 'react'

const navItems = [
  { href: '/dashboard',     label: 'Dashboard',     icon: LayoutDashboard },
  { href: '/disputes',      label: 'Disputes',      icon: AlertCircle },
  { href: '/integrations',  label: 'Integrations',  icon: Plug },
  { href: '/analytics',     label: 'Analytics',     icon: BarChart3 },
  { href: '/prevention',    label: 'Prevention AI', icon: Shield },
  { href: '/letters',       label: 'Letters',       icon: Languages },
  { href: '/benchmarks',    label: 'Benchmarks',    icon: Trophy },
  { href: '/import',        label: 'Import',        icon: Upload },
  { href: '/api-access',    label: 'API Access',    icon: Key },
  { href: '/team',          label: 'Team',          icon: Users },
  { href: '/referrals',     label: 'Referrals',     icon: Gift },
]

const bottomItems = [
  { href: '/settings/whatsapp', label: 'WhatsApp',  icon: MessageCircle },
  { href: '/settings',          label: 'Settings',  icon: Settings },
  { href: '/settings/billing',  label: 'Billing',   icon: CreditCard },
]

interface NavItemProps {
  href: string
  label: string
  icon: React.ElementType
  active: boolean
  collapsed: boolean
}

function NavItem({ href, label, icon: Icon, active, collapsed }: NavItemProps) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ x: collapsed ? 0 : 2 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className={cn(
          'relative flex items-center gap-3 px-3 py-2.5 rounded-[10px] transition-all duration-150 cursor-pointer',
          collapsed && 'justify-center'
        )}
        style={{
          background: active ? 'var(--green-glow)' : 'transparent',
          color: active ? 'var(--green-500)' : 'var(--text-secondary)',
        }}
        onMouseEnter={e => {
          if (!active) {
            ;(e.currentTarget as HTMLElement).style.background = 'var(--bg-card)'
            ;(e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'
          }
        }}
        onMouseLeave={e => {
          if (!active) {
            ;(e.currentTarget as HTMLElement).style.background = 'transparent'
            ;(e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'
          }
        }}
        title={collapsed ? label : undefined}
      >
        {active && (
          <span
            className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r-full"
            style={{ background: 'var(--green-500)' }}
          />
        )}
        <Icon size={16} />
        {!collapsed && (
          <span className="text-sm font-medium">{label}</span>
        )}
      </motion.div>
    </Link>
  )
}

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        'h-screen flex flex-col fixed left-0 top-0 z-30 transition-all duration-200',
        collapsed ? 'w-[68px]' : 'w-[240px]'
      )}
      style={{
        background: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border)',
      }}
    >
      {/* Logo */}
      <div
        className={cn('px-5 py-5 flex items-center justify-between', collapsed && 'px-3 justify-center')}
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        {!collapsed && <Logo size="md" showBeta />}
        {collapsed && (
          <span className="font-display font-[700] text-lg" style={{ color: 'var(--green-500)' }}>
            CB
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn('p-1 rounded-[6px] transition-all', collapsed && 'ml-0')}
          style={{ color: 'var(--text-muted)' }}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-card)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >
          {collapsed
            ? <ChevronRight size={14} />
            : <ChevronLeft size={14} />
          }
        </button>
      </div>

      {/* Nav */}
      <nav className="px-3 mt-4 flex flex-col gap-1 flex-1">
        {navItems.map(item => (
          <NavItem
            key={item.href}
            {...item}
            active={pathname === item.href || pathname.startsWith(item.href + '/')}
            collapsed={collapsed}
          />
        ))}
      </nav>

      {/* Bottom */}
      <div
        className="p-3 border-t space-y-1"
        style={{ borderColor: 'var(--border)' }}
      >
        {bottomItems.map(item => (
          <NavItem
            key={item.href}
            {...item}
            active={pathname === item.href}
            collapsed={collapsed}
          />
        ))}
      </div>
    </aside>
  )
}
