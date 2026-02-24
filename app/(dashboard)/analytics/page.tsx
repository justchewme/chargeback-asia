'use client'

import { useState } from 'react'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell
} from 'recharts'
import { motion } from 'framer-motion'
import { Sparkles, TrendingUp, TrendingDown, Award } from 'lucide-react'

const recoveryData = [
  { month: 'Sep', recovered: 5200, disputes: 17, winRate: 58 },
  { month: 'Oct', recovered: 4800, disputes: 15, winRate: 60 },
  { month: 'Nov', recovered: 6100, disputes: 20, winRate: 62 },
  { month: 'Dec', recovered: 7400, disputes: 24, winRate: 63 },
  { month: 'Jan', recovered: 9800, disputes: 31, winRate: 65 },
  { month: 'Feb', recovered: 12840, disputes: 38, winRate: 67 },
]

const processorData = [
  { name: 'Stripe', won: 18, lost: 4, amount: 6200 },
  { name: 'Xendit', won: 12, lost: 3, amount: 4100 },
  { name: 'PayMongo', won: 8, lost: 5, amount: 2100 },
  { name: 'Midtrans', won: 6, lost: 2, amount: 1800 },
]

const countryData = [
  { country: '🇸🇬 Singapore', disputes: 22, winRate: 72, recovered: 5800 },
  { country: '🇮🇩 Indonesia', disputes: 18, winRate: 65, recovered: 4200 },
  { country: '🇵🇭 Philippines', disputes: 15, winRate: 61, recovered: 3200 },
  { country: '🇲🇾 Malaysia', disputes: 9, winRate: 70, recovered: 2100 },
]

const insights = [
  'Your win rate for UNAUTHORIZED disputes (72%) is significantly above the SEA average (54%). Your 3DS authentication data is compelling evidence.',
  'Consider adding tracking number evidence for all PRODUCT_NOT_RECEIVED cases. This alone could boost your win rate by ~15%.',
  'Stripe disputes have your highest win rate (82%). Prioritize collecting more detailed customer communication logs for other processors.',
  'You have 3 disputes older than 14 days still in DRAFT status. These are at risk of expiring — submit immediately.',
  'Your friendly fraud detection rate has improved 34% since adding device fingerprinting to your evidence collection.',
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="rounded-[10px] p-3 text-sm" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)' }}>
        <p className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ color: p.color || 'var(--text-secondary)' }}>
            {p.name}: {typeof p.value === 'number' && p.name === 'recovered' ? `$${p.value.toLocaleString()}` : `${p.value}${p.name === 'winRate' ? '%' : ''}`}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('6m')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display font-[700] text-[24px]" style={{ color: 'var(--text-primary)' }}>Analytics</h1>
        <div className="flex gap-1">
          {['1m', '3m', '6m', '1y', 'all'].map(r => (
            <button
              key={r}
              onClick={() => setDateRange(r)}
              className="px-3 py-1.5 rounded-[8px] text-xs font-medium transition-all"
              style={{
                background: dateRange === r ? 'var(--green-500)' : 'var(--bg-card)',
                color: dateRange === r ? 'var(--text-inverse)' : 'var(--text-secondary)',
                border: '1px solid var(--border)',
              }}
            >
              {r.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chart */}
      <div className="rounded-[14px] border p-5" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
        <h3 className="font-display font-[600] text-[16px] mb-4" style={{ color: 'var(--text-primary)' }}>Recovery & Win Rate</h3>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={recoveryData}>
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00E676" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#00E676" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={{ stroke: 'var(--border)' }} tickLine={false} />
            <YAxis yAxisId="left" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
            <YAxis yAxisId="right" orientation="right" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
            <Tooltip content={<CustomTooltip />} />
            <Area yAxisId="left" type="monotone" dataKey="recovered" stroke="#00E676" strokeWidth={2} fill="url(#g1)" dot={false} activeDot={{ r: 5, fill: '#00E676', stroke: 'var(--bg-card)', strokeWidth: 2 }} />
            <Line yAxisId="right" type="monotone" dataKey="winRate" stroke="var(--chart-blue)" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: 'var(--chart-blue)' }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Processor + Country */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Processor */}
        <div className="rounded-[14px] border p-5" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
          <h3 className="font-display font-[600] text-[16px] mb-4" style={{ color: 'var(--text-primary)' }}>By Processor</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={processorData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="won" fill="var(--chart-green)" radius={[3,3,0,0]} name="Won" />
              <Bar dataKey="lost" fill="var(--chart-red)" radius={[3,3,0,0]} name="Lost" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Country */}
        <div className="rounded-[14px] border p-5" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
          <h3 className="font-display font-[600] text-[16px] mb-4" style={{ color: 'var(--text-primary)' }}>By Country</h3>
          <div className="space-y-3">
            {countryData.map(c => (
              <div key={c.country}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm" style={{ color: 'var(--text-primary)' }}>{c.country}</span>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs" style={{ color: 'var(--text-secondary)' }}>{c.disputes} disputes</span>
                    <span className="font-mono text-xs font-medium" style={{ color: c.winRate >= 65 ? 'var(--won)' : 'var(--pending)' }}>{c.winRate}%</span>
                  </div>
                </div>
                <div className="h-1.5 rounded-full" style={{ background: 'var(--bg-secondary)' }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: 'var(--chart-green)' }}
                    initial={{ width: 0 }}
                    animate={{ width: `${c.winRate}%` }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benchmarking */}
      <div className="rounded-[14px] border p-5" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2 mb-4">
          <Award size={16} style={{ color: 'var(--chart-amber)' }} />
          <h3 className="font-display font-[600] text-[16px]" style={{ color: 'var(--text-primary)' }}>Win Rate Benchmarking</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'Your win rate', value: '67%', delta: '+13%', vs: 'vs SEA average (54%)', positive: true },
            { label: 'Response time', value: '4.2 days', delta: '-3.8 days', vs: 'vs industry avg (8 days)', positive: true },
            { label: 'Recovery rate', value: '78%', delta: 'Top 22%', vs: 'of all merchants', positive: true },
          ].map(m => (
            <div key={m.label} className="rounded-[10px] p-4" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
              <p className="text-[11px] uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>{m.label}</p>
              <p className="font-mono text-[22px] font-[700]" style={{ color: 'var(--text-primary)' }}>{m.value}</p>
              <p className="text-xs mt-1 flex items-center gap-1" style={{ color: m.positive ? 'var(--green-500)' : 'var(--lost)' }}>
                {m.positive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                {m.delta} {m.vs}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* AI Insights */}
      <div className="rounded-[14px] border p-5" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={16} style={{ color: 'var(--chart-purple)' }} />
          <h3 className="font-display font-[600] text-[16px]" style={{ color: 'var(--text-primary)' }}>AI Dispute Insights</h3>
          <span className="text-[11px] px-2 py-0.5 rounded-full" style={{ background: 'var(--submitted-bg)', color: 'var(--submitted)', border: '1px solid var(--submitted-border)' }}>
            Powered by Claude
          </span>
        </div>
        <div className="space-y-3">
          {insights.map((insight, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              className="flex gap-3 p-3 rounded-[10px]"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}
            >
              <span
                className="text-[11px] font-mono font-bold mt-0.5 shrink-0 w-5 h-5 flex items-center justify-center rounded-full"
                style={{ background: 'var(--green-glow)', color: 'var(--green-500)' }}
              >
                {i+1}
              </span>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {insight}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
