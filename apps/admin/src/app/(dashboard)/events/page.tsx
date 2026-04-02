import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import DeleteEventButton from '@/components/DeleteEventButton'

export default async function EventsPage() {
  const supabase = await createClient()

  const { data: events } = await supabase
    .from('events')
    .select('id, title_en, title_pt, is_published, date_start, price_type, categories(name_en, icon, color)')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Events</h1>
        <Link
          href="/events/new"
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
        >
          <Plus size={16} /> Add Event
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left text-xs text-gray-500 font-medium uppercase tracking-wide">
              <th className="px-6 py-3">Event</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {events?.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                  No events yet. <Link href="/events/new" className="text-orange-500 underline">Add your first event</Link>
                </td>
              </tr>
            )}
            {events?.map(event => {
              const cat = event.categories as { name_en: string; icon: string; color: string } | null
              return (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{event.title_en}</div>
                    <div className="text-xs text-gray-400">{event.title_pt}</div>
                  </td>
                  <td className="px-6 py-4">
                    {cat && (
                      <span className="inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-full font-medium" style={{ backgroundColor: cat.color + '20', color: cat.color }}>
                        {cat.icon} {cat.name_en}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {event.date_start
                      ? new Date(event.date_start).toLocaleDateString('en-AU')
                      : <span className="text-gray-400">Ongoing</span>
                    }
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      event.price_type === 'free' ? 'bg-green-100 text-green-700'
                      : event.price_type === 'paid' ? 'bg-blue-100 text-blue-700'
                      : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {event.price_type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${event.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {event.is_published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/events/${event.id}/edit`} className="p-1.5 text-gray-400 hover:text-orange-500 transition">
                        <Pencil size={15} />
                      </Link>
                      <DeleteEventButton id={event.id} />
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
