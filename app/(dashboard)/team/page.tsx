'use client'

import { useState } from 'react'
import { UserPlus, Shield, Eye, Settings2, Trash2, MoreHorizontal } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { btnPrimary, btnSecondary, inputBase, labelBase } from '@/lib/styles'

const mockTeam = [
  { id: '1', email: 'sarah@company.com', name: 'Sarah Chen', role: 'ADMIN', acceptedAt: new Date(Date.now() - 1000*60*60*24*30), initials: 'SC' },
  { id: '2', email: 'michael@company.com', name: 'Michael Tan', role: 'MANAGER', acceptedAt: new Date(Date.now() - 1000*60*60*24*14), initials: 'MT' },
  { id: '3', email: 'nina@company.com', name: 'Nina Wijaya', role: 'VIEWER', acceptedAt: new Date(Date.now() - 1000*60*60*24*5), initials: 'NW' },
  { id: '4', email: 'alex@company.com', name: 'Alex Park', role: 'VIEWER', acceptedAt: null, initials: 'AP' },
]

const roleConfig = {
  ADMIN: { label: 'Admin', icon: Shield, color: 'var(--chart-purple)', description: 'Full access, billing, team management' },
  MANAGER: { label: 'Manager', icon: Settings2, color: 'var(--chart-blue)', description: 'Disputes, integrations, analytics' },
  VIEWER: { label: 'Viewer', icon: Eye, color: 'var(--text-muted)', description: 'Read-only access' },
}

export default function TeamPage() {
  const [showInvite, setShowInvite] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState('VIEWER')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-[700] text-[24px]" style={{ color: 'var(--text-primary)' }}>Team</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{mockTeam.length} members</p>
        </div>
        <button className={btnPrimary} onClick={() => setShowInvite(true)}>
          <UserPlus size={14} /> Invite Member
        </button>
      </div>

      {/* Roles legend */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {Object.entries(roleConfig).map(([role, config]) => {
          const Icon = config.icon
          return (
            <div key={role} className="rounded-[10px] border p-4 flex items-start gap-3" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
              <Icon size={15} style={{ color: config.color, marginTop: 2 }} />
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{config.label}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{config.description}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Team table */}
      <div className="rounded-[14px] border overflow-hidden" style={{ borderColor: 'var(--border)' }}>
        {mockTeam.map((member, i) => {
          const role = roleConfig[member.role as keyof typeof roleConfig]
          const Icon = role.icon
          return (
            <div
              key={member.id}
              className="flex items-center gap-4 px-5 py-4 transition-all"
              style={{
                background: i % 2 === 0 ? 'var(--bg-card)' : 'rgba(15,28,46,0.6)',
                borderBottom: i < mockTeam.length - 1 ? '1px solid var(--border-subtle)' : 'none',
              }}
            >
              {/* Avatar */}
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                style={{ background: 'var(--green-glow)', color: 'var(--green-500)', border: '1px solid var(--green-500)' }}
              >
                {member.initials}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                  {member.name}
                </p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{member.email}</p>
              </div>

              {/* Role badge */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: role.color }}>
                <Icon size={11} />
                {role.label}
              </div>

              {/* Status */}
              <span
                className="text-[11px] px-2 py-0.5 rounded-full"
                style={{
                  background: member.acceptedAt ? 'var(--won-bg)' : 'var(--pending-bg)',
                  color: member.acceptedAt ? 'var(--won)' : 'var(--pending)',
                  border: `1px solid ${member.acceptedAt ? 'var(--won-border)' : 'var(--pending-border)'}`,
                }}
              >
                {member.acceptedAt ? 'Active' : 'Pending'}
              </span>

              {/* Actions */}
              <button className="p-1.5 rounded-[6px] transition-all" style={{ color: 'var(--text-muted)' }}>
                <MoreHorizontal size={14} />
              </button>
            </div>
          )
        })}
      </div>

      {/* Invite Modal */}
      <AnimatePresence>
        {showInvite && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowInvite(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm rounded-[20px] p-6 z-10 space-y-4"
              style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}
            >
              <h3 className="font-display font-[700] text-[18px]" style={{ color: 'var(--text-primary)' }}>Invite Team Member</h3>
              <div className="space-y-1.5">
                <label className={labelBase}>Email Address</label>
                <input className={inputBase} placeholder="teammate@company.com" value={inviteEmail} onChange={e => setInviteEmail(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <label className={labelBase}>Role</label>
                <select className={inputBase} value={inviteRole} onChange={e => setInviteRole(e.target.value)}>
                  {Object.entries(roleConfig).map(([r, c]) => (
                    <option key={r} value={r}>{c.label} — {c.description}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2">
                <button className={btnSecondary} onClick={() => setShowInvite(false)}>Cancel</button>
                <button className={btnPrimary} style={{ flex: 1, justifyContent: 'center' }} onClick={() => setShowInvite(false)}>
                  Send Invite
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
