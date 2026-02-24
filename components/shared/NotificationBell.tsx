'use client'

import { useState } from 'react'
import { Bell, AlertCircle, CheckCircle, FileText, Send, XCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { formatDistanceToNow } from 'date-fns'

const mockNotifications = [
  {
    id: '1',
    type: 'won',
    title: '🎉 Dispute won!',
    body: 'USD 340 recovered from Stripe chargeback',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 15),
  },
  {
    id: '2',
    type: 'detected',
    title: 'New chargeback detected',
    body: 'SGD 89 via Xendit — letter generated automatically',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: '3',
    type: 'submitted',
    title: 'Dispute letter submitted',
    body: 'PHP 4,500 dispute submitted to PayMongo',
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
]

const typeIcon: Record<string, React.ElementType> = {
  won: CheckCircle,
  detected: AlertCircle,
  submitted: Send,
  lost: XCircle,
  letter_ready: FileText,
}

const typeColor: Record<string, string> = {
  won: 'var(--won)',
  detected: 'var(--pending)',
  submitted: 'var(--submitted)',
  lost: 'var(--lost)',
  letter_ready: 'var(--draft)',
}

export function NotificationBell() {
  const [open, setOpen] = useState(false)
  const [notifications, setNotifications] = useState(mockNotifications)
  const unread = notifications.filter(n => !n.read).length

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-[10px] transition-all duration-150"
        style={{ color: 'var(--text-secondary)' }}
        onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-card)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
      >
        <Bell size={18} />
        {unread > 0 && (
          <span
            className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 rounded-full text-[10px] font-bold flex items-center justify-center px-1"
            style={{ background: 'var(--lost)', color: 'white' }}
          >
            {unread}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-10 w-[360px] z-50 rounded-[14px] overflow-hidden"
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <div
                className="flex items-center justify-between px-4 py-3 border-b"
                style={{ borderColor: 'var(--border)' }}
              >
                <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                  Notifications
                </span>
                {unread > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-xs"
                    style={{ color: 'var(--text-accent)' }}
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto">
                {notifications.map(n => {
                  const Icon = typeIcon[n.type] || Bell
                  return (
                    <div
                      key={n.id}
                      className="flex gap-3 px-4 py-3.5 cursor-pointer transition-all"
                      style={{
                        borderLeft: !n.read ? `2px solid var(--green-500)` : '2px solid transparent',
                        background: !n.read ? 'var(--green-glow-sm)' : 'transparent',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-card)')}
                      onMouseLeave={e => (e.currentTarget.style.background = !n.read ? 'var(--green-glow-sm)' : 'transparent')}
                    >
                      <div
                        className="mt-0.5 p-1.5 rounded-[8px] shrink-0"
                        style={{ background: 'var(--bg-card)', color: typeColor[n.type] || 'var(--text-muted)' }}
                      >
                        <Icon size={14} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                          {n.title}
                        </p>
                        <p className="text-xs mt-0.5 truncate" style={{ color: 'var(--text-secondary)' }}>
                          {n.body}
                        </p>
                        <p className="text-[11px] mt-1" style={{ color: 'var(--text-muted)' }}>
                          {formatDistanceToNow(n.createdAt, { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div
                className="px-4 py-3 border-t text-center"
                style={{ borderColor: 'var(--border)' }}
              >
                <button className="text-xs" style={{ color: 'var(--text-accent)' }}>
                  View all notifications
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
