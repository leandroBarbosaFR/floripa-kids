import { createClient } from '@/lib/supabase/server'
import EventForm from '@/components/EventForm'
import { notFound } from 'next/navigation'

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const [{ data: event }, { data: categories }] = await Promise.all([
    supabase
      .from('events')
      .select('*, event_photos(*)')
      .eq('id', id)
      .single(),
    supabase.from('categories').select('*').order('name_en'),
  ])

  if (!event) notFound()

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Event</h1>
      <EventForm categories={categories ?? []} event={event} />
    </div>
  )
}
