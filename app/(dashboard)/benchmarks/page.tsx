'use client'

import { motion } from 'framer-motion'
import { Award, TrendingUp, TrendingDown, Users, Globe, BarChart3 } from 'lucide-react'
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell,
} from 'recharts'

const radarData = [
  { metric: 'Win Rate', you: 67, avg: 54 },
  { metric: 'Response Time', you: 78, avg: 60 },
  { metric: 'Evidence Quality', you: 72, avg: 55 },
  { metric: 'Prevention', you: 45, avg: 48 },
  { metric: 'Recovery Rate', you: 82, avg: 65 },
]

const processorBenchmarks = [
  { processor: 'Stripe', yourWinRate: 82, industryAvg: 64, sample: 'n=2,400' },
  { processor: 'Xendit', yourWinRate: 71, industryAvg: 52, sample: 'n=1,800' },
  { processor: 'Midtrans', yourWinRate: 75, industryAvg: 49, sample: 'n=1,200' },
  { processor: 'PayMongo', yourWinRate: 61, industryAvg: 55, sample: 'n=400' },
]

const categoryBenchmarks = [
  { category: 'UNAUTHORIZED', you: 72, avg: 58, trend: '+8%' },
  { category: 'PRODUCT_NOT_RECEIVED', you: 65, avg: 61, trend: '+4%' },
  { category: 'FRIENDLY_FRAUD', you: 58, avg: 41, trend: '+17%' },
  { category: 'CREDIT_NOT_PROCESSED', you: 81, avg: 72, trend: '+9%' },
  { category: 'SUBSCRIPTION_CANCELLED', you: 44, avg: 38, trend: '+6%' },
]

const CustomBarTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="rounded-[10px] p-3 text-xs" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)' }}>
        <p className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{label}</p>
        <p style={{ color: 'var(--won)' }}>You: {payload[0]?.value}%</p>
        <p style={{ color: 'var(--text-muted)' }}>Industry avg: {payload[1]?.value}%</p>
      </div>
    )
  }
  return null
}

export default function BenchmarksPage() {
  const totalScore = radarData.reduce((s, r) => s + r.you, 0)
  const avgScore = radarData.reduce((s, r) => s + r.avg, 0)
  const pctAbove = Math.round(((totalScore - avgScore) / avgScore) * 100)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-[700] text-[24px]" style={{ color: 'var(--text-primary)' }}>
            Win Rate Benchmarking
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            See how you stack up against 6,200 SEA merchants on ChargeBack.asia
          </p>
        </div>
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
          style={{ background: 'var(--won-bg)', border: '1px solid var(--won-border)', color: 'var(--won)' }}
        >
          <Award size={12} />
          Top 22% merchant
        </div>
      </div>

      {/* Summary scores */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Overall win rate', value: '67%', vs: 'SEA avg: 54%', delta: '+13%', positive: true },
          { label: 'Percentile ranking', value: 'Top 22%', vs: 'of 6,200 merchants', delta: '', positive: true },
          { label: 'Performance score', value: `+${pctAbove}%`, vs: 'above industry average', delta: '', positive: true },
        ].map(m => (
          <div
            key={m.label}
            className="rounded-[14px] border p-5"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
          >
            <p className="text-[11px] uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>{m.label}</p>
            <p className="font-mono font-[700] text-[26px]" style={{ color: 'var(--text-primary)' }}>{m.value}</p>
            <p className="text-xs mt-1 flex items-center gap-1" style={{ color: 'var(--won)' }}>
              <TrendingUp size={11} />
              {m.delta && <span className="font-semibold">{m.delta} · </span>}{m.vs}
            </p>
          </div>
        ))}
      </div>

      {/* Radar chart + by category */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Radar */}
        <div className="rounded-[14px] border p-5" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 size={15} style={{ color: 'var(--chart-purple)' }} />
            <h3 className="font-display font-[600] text-[16px]" style={{ color: 'var(--text-primary)' }}>Performance Radar</h3>
          </div>
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-1.5 text-xs">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--won)' }} />
              <span style={{ color: 'var(--text-secondary)' }}>You</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--chart-blue)' }} />
              <span style={{ color: 'var(--text-secondary)' }}>Industry avg</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="var(--border-subtle)" />
              <PolarAngleAxis dataKey="metric" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
              <Radar name="You" dataKey="you" stroke="var(--won)" fill="var(--won)" fillOpacity={0.15} strokeWidth={2} dot={{ r: 3, fill: 'var(--won)' }} />
              <Radar name="Avg" dataKey="avg" stroke="var(--chart-blue)" fill="var(--chart-blue)" fillOpacity={0.08} strokeWidth={1.5} strokeDasharray="4 2" dot={false} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* By category */}
        <div className="rounded-[14px] border p-5" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-2 mb-4">
            <Globe size={15} style={{ color: 'var(--chart-blue)' }} />
            <h3 className="font-display font-[600] text-[16px]" style={{ color: 'var(--text-primary)' }}>By Dispute Category</h3>
          </div>
          <div className="space-y-3">
            {categoryBenchmarks.map((c, i) => (
              <motion.div
                key={c.category}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>
                    {c.category.replace(/_/g, ' ')}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>avg {c.avg}%</span>
                    <span
                      className="font-mono text-xs font-bold"
                      style={{ color: c.you >= c.avg ? 'var(--won)' : 'var(--lost)' }}
                    >
                      you {c.you}%
                    </span>
                    <span
                      className="text-[10px] px-1.5 py-0.5 rounded-full"
                      style={{ background: 'var(--won-bg)', border: '1px solid var(--won-border)', color: 'var(--won)' }}
                    >
                      {c.trend}
                    </span>
                  </div>
                </div>
                <div className="relative h-1.5 rounded-full" style={{ background: 'var(--bg-secondary)' }}>
                  <div
                    className="absolute top-0 left-0 h-full rounded-full opacity-40"
                    style={{ width: `${c.avg}%`, background: 'var(--chart-blue)' }}
                  />
                  <motion.div
                    className="absolute top-0 left-0 h-full rounded-full"
                    style={{ background: 'var(--won)' }}
                    initial={{ width: 0 }}
                    animate={{ width: `${c.you}%` }}
                    transition={{ duration: 0.8, delay: i * 0.08 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* By Processor */}
      <div className="rounded-[14px] border p-5" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2 mb-4">
          <Users size={15} style={{ color: 'var(--chart-amber)' }} />
          <h3 className="font-display font-[600] text-[16px]" style={{ color: 'var(--text-primary)' }}>By Processor</h3>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={processorBenchmarks} barGap={6}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
            <XAxis dataKey="processor" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
            <Tooltip content={<CustomBarTooltip />} />
            <Bar dataKey="yourWinRate" name="You" radius={[4, 4, 0, 0]}>
              {processorBenchmarks.map((_, i) => (
                <Cell key={i} fill="var(--chart-green)" />
              ))}
            </Bar>
            <Bar dataKey="industryAvg" name="Avg" radius={[4, 4, 0, 0]}>
              {processorBenchmarks.map((_, i) => (
                <Cell key={i} fill="var(--border-strong)" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center gap-1.5 text-xs">
            <div className="w-2.5 h-2.5 rounded-sm" style={{ background: 'var(--chart-green)' }} />
            <span style={{ color: 'var(--text-muted)' }}>Your win rate</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <div className="w-2.5 h-2.5 rounded-sm" style={{ background: 'var(--border-strong)' }} />
            <span style={{ color: 'var(--text-muted)' }}>Industry average</span>
          </div>
        </div>
      </div>
    </div>
  )
}
