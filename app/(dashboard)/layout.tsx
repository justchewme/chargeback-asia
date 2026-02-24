import { Sidebar } from '@/components/layout/Sidebar'
import { Topbar } from '@/components/layout/Topbar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className="min-h-screen"
      style={{ background: 'var(--bg-primary)' }}
    >
      <Sidebar />
      <Topbar />
      <main
        className="pt-14 min-h-screen"
        style={{ marginLeft: 240 }}
      >
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  )
}
