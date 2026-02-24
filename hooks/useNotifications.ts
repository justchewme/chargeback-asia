'use client'

import { useState, useEffect } from 'react'

export interface Notification {
  id: string
  type: string
  title: string
  body: string
  read: boolean
  data?: Record<string, unknown>
  createdAt: string
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(true)

  const fetchNotifications = async () => {
    try {
      const res = await fetch('/api/notifications')
      if (res.ok) {
        const data = await res.json()
        setNotifications(data)
        setUnreadCount(data.filter((n: Notification) => !n.read).length)
      }
    } catch {
      // Silently fail — notifications are non-critical
    } finally {
      setLoading(false)
    }
  }

  const markAllRead = async () => {
    await fetch('/api/notifications/mark-read', { method: 'POST' })
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
    setUnreadCount(0)
  }

  useEffect(() => {
    fetchNotifications()
    // Poll every 30 seconds
    const interval = setInterval(fetchNotifications, 30000)
    return () => clearInterval(interval)
  }, [])

  return { notifications, unreadCount, loading, markAllRead, refetch: fetchNotifications }
}
