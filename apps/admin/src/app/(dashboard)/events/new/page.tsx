import { createClient } from '@/lib/supabase/server'
import EventForm from '@/components/EventForm'

export default async function NewEventPage() {
  const supabase = await createClient()
  const { data: categories } = await supabase.from('categories').select('*').order('name_en')

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">New Event</h1>
      <EventForm categories={categories ?? []} />
    </div>
  )
}
