'use client'

import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function DeleteEventButton({ id }: { id: string }) {
  const router = useRouter()

  async function handleDelete() {
    if (!confirm('Delete this event? This cannot be undone.')) return
    const supabase = createClient()
    await supabase.from('events').delete().eq('id', id)
    router.refresh()
  }

  return (
    <button onClick={handleDelete} className="p-1.5 text-gray-400 hover:text-red-500 transition">
      <Trash2 size={15} />
    </button>
  )
}
