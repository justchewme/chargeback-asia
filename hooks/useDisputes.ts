'use client'

import { useState, useEffect, useCallback } from 'react'
import { DisputeSummary } from '@/types/dispute'

export function useDisputes(filters?: {
  status?: string
  processor?: string
  limit?: number
}) {
  const [disputes, setDisputes] = useState<DisputeSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDisputes = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      if (filters?.status) params.set('status', filters.status)
      if (filters?.processor) params.set('processor', filters.processor)
      if (filters?.limit) params.set('limit', String(filters.limit))

      const res = await fetch(`/api/disputes?${params}`)
      if (!res.ok) throw new Error('Failed to fetch disputes')
      const data = await res.json()
      setDisputes(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }, [filters?.status, filters?.processor, filters?.limit])

  useEffect(() => {
    fetchDisputes()
  }, [fetchDisputes])

  return { disputes, loading, error, refetch: fetchDisputes }
}
