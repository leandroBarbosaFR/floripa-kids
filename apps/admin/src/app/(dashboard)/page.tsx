import { createClient } from '@/lib/supabase/server'
import { CalendarDays, Eye, EyeOff, Tag } from 'lucide-react'

export default async function DashboardPage() {
  const supabase = await createClient()

  const [{ count: total }, { count: published }, { count: categories }] = await Promise.all([
    supabase.from('events').select('*', { count: 'exact', head: true }),
    supabase.from('events').select('*', { count: 'exact', head: true }).eq('is_published', true),
    supabase.from('categories').select('*', { count: 'exact', head: true }),
  ])

  const { data: recentEvents } = await supabase
    .from('events')
    .select('id, title_en, title_pt, is_published, created_at, categories(name_en, icon)')
    .order('created_at', { ascending: false })
    .limit(5)

  const stats = [
    { label: 'Total Events', value: total ?? 0, icon: CalendarDays, color: 'text-sky-600 bg-sky-50' },
    { label: 'Published', value: published ?? 0, icon: Eye, color: 'text-green-600 bg-green-50' },
    { label: 'Drafts', value: (total ?? 0) - (published ?? 0), icon: EyeOff, color: 'text-gray-600 bg-gray-100' },
    { label: 'Categories', value: categories ?? 0, icon: Tag, color: 'text-orange-600 bg-orange-50' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className={`inline-flex p-2 rounded-lg ${color} mb-3`}>
              <Icon size={18} />
            </div>
            <div className="text-2xl font-bold text-gray-900">{value}</div>
            <div className="text-sm text-gray-500">{label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-100 font-semibold text-gray-900">Recent Events</div>
        <div className="divide-y divide-gray-50">
          {recentEvents?.map(event => (
            <div key={event.id} className="px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xl">{(event.categories as { icon: string } | null)?.icon ?? '📍'}</span>
                <div>
                  <div className="text-sm font-medium text-gray-900">{event.title_en}</div>
                  <div className="text-xs text-gray-400">{event.title_pt}</div>
                </div>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${event.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {event.is_published ? 'Published' : 'Draft'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
