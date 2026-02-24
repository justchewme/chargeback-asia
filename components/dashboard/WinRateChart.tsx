'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

const data = [
  { name: 'Won', value: 67, color: 'var(--chart-green)' },
  { name: 'Lost', value: 18, color: 'var(--chart-red)' },
  { name: 'Pending', value: 10, color: 'var(--chart-amber)' },
  { name: 'Submitted', value: 5, color: 'var(--chart-purple)' },
]

const reasonData = [
  { name: 'Friendly Fraud', value: 38, color: 'var(--chart-amber)' },
  { name: 'Not Received', value: 26, color: 'var(--chart-blue)' },
  { name: 'Unauthorized', value: 20, color: 'var(--chart-purple)' },
  { name: 'Not As Described', value: 11, color: 'var(--chart-teal)' },
  { name: 'Other', value: 5, color: 'var(--chart-red)' },
]

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="rounded-[10px] p-2.5 text-sm"
        style={{
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <p style={{ color: payload[0].payload.color }}>{payload[0].name}</p>
        <p className="font-mono font-medium" style={{ color: 'var(--text-primary)' }}>
          {payload[0].value}%
        </p>
      </div>
    )
  }
  return null
}

export function WinRateChart() {
  return (
    <div
      className="rounded-[14px] border p-5"
      style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
    >
      <h3 className="font-display font-[600] text-[16px] mb-1" style={{ color: 'var(--text-primary)' }}>
        Disputes by Reason
      </h3>
      <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
        All time distribution
      </p>

      <div className="flex items-center gap-6">
        <ResponsiveContainer width={140} height={140}>
          <PieChart>
            <Pie
              data={reasonData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={60}
              paddingAngle={3}
              dataKey="value"
            >
              {reasonData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        <div className="flex-1 space-y-2">
          {reasonData.map(item => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: item.color }}
                />
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  {item.name}
                </span>
              </div>
              <span className="font-mono text-xs font-medium" style={{ color: 'var(--text-primary)' }}>
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
