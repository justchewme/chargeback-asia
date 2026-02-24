'use client'

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, defs, linearGradient, stop
} from 'recharts'

const data = [
  { month: 'Mar', recovered: 2400, disputes: 8 },
  { month: 'Apr', recovered: 1800, disputes: 6 },
  { month: 'May', recovered: 3200, disputes: 11 },
  { month: 'Jun', recovered: 2800, disputes: 9 },
  { month: 'Jul', recovered: 4100, disputes: 14 },
  { month: 'Aug', recovered: 3600, disputes: 12 },
  { month: 'Sep', recovered: 5200, disputes: 17 },
  { month: 'Oct', recovered: 4800, disputes: 15 },
  { month: 'Nov', recovered: 6100, disputes: 20 },
  { month: 'Dec', recovered: 7400, disputes: 24 },
  { month: 'Jan', recovered: 9800, disputes: 31 },
  { month: 'Feb', recovered: 12840, disputes: 38 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="rounded-[10px] p-3 text-sm"
        style={{
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <p className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{label}</p>
        <p className="font-mono" style={{ color: 'var(--green-500)' }}>
          ${payload[0]?.value?.toLocaleString()} recovered
        </p>
        <p style={{ color: 'var(--text-secondary)' }}>
          {payload[1]?.value} disputes
        </p>
      </div>
    )
  }
  return null
}

export function RecoveryChart() {
  return (
    <div
      className="rounded-[14px] border p-5"
      style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-display font-[600] text-[16px]" style={{ color: 'var(--text-primary)' }}>
            Recovery Over Time
          </h3>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
            Last 12 months
          </p>
        </div>
        <span
          className="text-xs px-2.5 py-1 rounded-full font-medium"
          style={{
            background: 'var(--won-bg)',
            border: '1px solid var(--won-border)',
            color: 'var(--won)',
          }}
        >
          +112% YTD
        </span>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00E676" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#00E676" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--border-subtle)"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
            axisLine={{ stroke: 'var(--border)' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={55}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
          <Area
            type="monotone"
            dataKey="recovered"
            stroke="#00E676"
            strokeWidth={2}
            fill="url(#greenGrad)"
            dot={false}
            activeDot={{ r: 5, fill: '#00E676', stroke: 'var(--bg-card)', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
