'use client'

import { cn } from '@/lib/styles'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-[8px]',
        className
      )}
      style={{ background: 'var(--bg-card-hover)' }}
    />
  )
}

export function StatCardSkeleton() {
  return (
    <div
      className="rounded-[14px] border p-5 space-y-3"
      style={{
        background: 'var(--bg-card)',
        borderColor: 'var(--border)',
      }}
    >
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-3 w-16" />
    </div>
  )
}

export function TableRowSkeleton({ cols = 6 }: { cols?: number }) {
  return (
    <tr>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-3.5">
          <Skeleton className="h-4 w-full" style={{ maxWidth: `${60 + i * 10}px` }} />
        </td>
      ))}
    </tr>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div
          className="lg:col-span-3 rounded-[14px] border p-5"
          style={{ background: 'var(--bg-card)', borderColor: 'var(--border)', height: 320 }}
        >
          <Skeleton className="h-5 w-40 mb-4" />
          <Skeleton className="h-full w-full" />
        </div>
        <div
          className="lg:col-span-2 rounded-[14px] border p-5"
          style={{ background: 'var(--bg-card)', borderColor: 'var(--border)', height: 320 }}
        >
          <Skeleton className="h-5 w-32 mb-4" />
          <Skeleton className="h-48 w-48 rounded-full mx-auto" />
        </div>
      </div>
    </div>
  )
}
