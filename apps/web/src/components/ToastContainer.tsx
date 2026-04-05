'use client'

import { X } from 'lucide-react'
import { useNotifications } from './NotificationsProvider'

export default function ToastContainer() {
  const { notifications, dismiss } = useNotifications()
  if (!notifications.length) return null

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2">
      {notifications.map((n) => (
        <div
          key={n.id}
          className="flex items-center gap-3 bg-slate-800 text-white text-sm px-4 py-3 rounded-2xl shadow-lg max-w-xs animate-in slide-in-from-bottom-2"
        >
          <span className="flex-1 leading-snug">{n.message}</span>
          <button
            onClick={() => dismiss(n.id)}
            className="text-slate-400 hover:text-white transition-colors shrink-0"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  )
}
