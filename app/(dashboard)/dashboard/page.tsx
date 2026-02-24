import { StatCard } from '@/components/dashboard/StatCard'
import { RecoveryChart } from '@/components/dashboard/RecoveryChart'
import { WinRateChart } from '@/components/dashboard/WinRateChart'
import { ActivityFeed } from '@/components/dashboard/ActivityFeed'
import { RecentDisputes } from '@/components/dashboard/RecentDisputes'
import { HealthScore } from '@/components/dashboard/HealthScore'
import { format } from 'date-fns'

export const metadata = {
  title: 'Dashboard',
}

export default function DashboardPage() {
  const today = format(new Date(), 'EEEE, MMMM d')

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div>
        <h1
          className="font-display font-[800] text-[28px] tracking-[-0.01em]"
          style={{ color: 'var(--text-primary)' }}
        >
          Good morning 👋
        </h1>
        <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
          {today}
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Recovered"
          value={12840}
          prefix="$"
          delta={23}
          deltaLabel="vs last month"
          accentColor="var(--green-500)"
        />
        <StatCard
          label="Win Rate"
          value={67}
          suffix="%"
          delta={5}
          deltaLabel="vs last month"
          accentColor="var(--chart-blue)"
          isPercentage
        />
        <StatCard
          label="Active Disputes"
          value={23}
          delta={0}
          subLabel="8 need review"
          accentColor="var(--pending)"
        />
        <StatCard
          label="Avg Response Time"
          value={4.2}
          suffix=" days"
          decimals={1}
          deltaLabel="industry avg: 8 days"
          accentColor="var(--submitted)"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3">
          <RecoveryChart />
        </div>
        <div className="lg:col-span-2">
          <WinRateChart />
        </div>
      </div>

      {/* Activity + Recent Disputes */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3">
          <RecentDisputes />
        </div>
        <div className="lg:col-span-2">
          <ActivityFeed />
        </div>
      </div>

      {/* Health Score */}
      <div className="max-w-sm">
        <HealthScore />
      </div>
    </div>
  )
}
