'use client'

import { useState, useEffect } from 'react'
import { DisputeStats } from '@/types/dispute'

export function useAnalytics() {
  const [stats, setStats] = useState<DisputeStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/analytics')
      .then(r => r.json())
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return { stats, loading }
}
