'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, CalendarDays, Tag, LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/cn'

const links = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/events', label: 'Events', icon: CalendarDays },
  { href: '/categories', label: 'Categories', icon: Tag },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <aside className="w-56 bg-white border-r border-gray-200 flex flex-col">
      <div className="px-6 py-6 border-b border-gray-100">
        <div className="font-bold text-gray-900 text-sm mt-1 leading-tight">
          Floripa<br />with Kids
        </div>
        <div className="text-xs text-gray-400 mt-0.5">Admin</div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition',
              pathname === href
                ? 'bg-orange-50 text-orange-600'
                : 'text-gray-600 hover:bg-gray-50'
            )}
          >
            <Icon size={16} />
            {label}
          </Link>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-gray-100">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 w-full transition"
        >
          <LogOut size={16} />
          Sign out
        </button>
      </div>
    </aside>
  )
}
