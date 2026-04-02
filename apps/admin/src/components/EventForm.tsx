'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Category, Event, EventPhoto } from '@floripa/shared'
import { Upload, X, Star } from 'lucide-react'
import Image from 'next/image'

type Props = {
  categories: Category[]
  event?: Event & { event_photos: EventPhoto[] }
}

export default function EventForm({ categories, event }: Props) {
  const router = useRouter()
  const supabase = createClient()
  const isEdit = !!event

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [photos, setPhotos] = useState<EventPhoto[]>(event?.event_photos ?? [])
  const [uploading, setUploading] = useState(false)

  const [form, setForm] = useState({
    title_en: event?.title_en ?? '',
    title_pt: event?.title_pt ?? '',
    description_en: event?.description_en ?? '',
    description_pt: event?.description_pt ?? '',
    category_id: event?.category_id ?? '',
    date_start: event?.date_start ? event.date_start.slice(0, 16) : '',
    date_end: event?.date_end ? event.date_end.slice(0, 16) : '',
    is_recurring: event?.is_recurring ?? false,
    recurring_description_en: event?.recurring_description_en ?? '',
    recurring_description_pt: event?.recurring_description_pt ?? '',
    location_name: event?.location_name ?? '',
    location_address: event?.location_address ?? '',
    price_type: event?.price_type ?? 'free' as 'free' | 'paid' | 'varies',
    price_description_en: event?.price_description_en ?? '',
    price_description_pt: event?.price_description_pt ?? '',
    age_min: event?.age_min?.toString() ?? '',
    age_max: event?.age_max?.toString() ?? '',
    website: event?.website ?? '',
    phone: event?.phone ?? '',
    is_published: event?.is_published ?? false,
  })

  function set<K extends keyof typeof form>(key: K, value: typeof form[K]) {
    setForm(f => ({ ...f, [key]: value }))
  }

  async function uploadPhoto(file: File) {
    setUploading(true)
    const ext = file.name.split('.').pop()
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const { error: uploadError } = await supabase.storage.from('event-photos').upload(path, file)
    if (uploadError) { setError(uploadError.message); setUploading(false); return }

    const { data: { publicUrl } } = supabase.storage.from('event-photos').getPublicUrl(path)
    const isPrimary = photos.length === 0
    setPhotos(p => [...p, { id: path, event_id: event?.id ?? '', url: publicUrl, is_primary: isPrimary, sort_order: p.length }])
    setUploading(false)
  }

  async function removePhoto(photo: EventPhoto) {
    if (event?.id) {
      await supabase.from('event_photos').delete().eq('id', photo.id)
    }
    setPhotos(p => p.filter(x => x.url !== photo.url))
  }

  async function setPrimary(photo: EventPhoto) {
    setPhotos(p => p.map(x => ({ ...x, is_primary: x.url === photo.url })))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const payload = {
      ...form,
      age_min: form.age_min ? parseInt(form.age_min) : null,
      age_max: form.age_max ? parseInt(form.age_max) : null,
      date_start: form.date_start || null,
      date_end: form.date_end || null,
      category_id: form.category_id || null,
    }

    let eventId = event?.id

    if (isEdit) {
      const { error } = await supabase.from('events').update(payload).eq('id', eventId!)
      if (error) { setError(error.message); setSaving(false); return }
    } else {
      const { data, error } = await supabase.from('events').insert(payload).select('id').single()
      if (error) { setError(error.message); setSaving(false); return }
      eventId = data.id
    }

    // Upsert photos
    if (photos.length > 0 && eventId) {
      const photosToSave = photos.map((p, i) => ({
        event_id: eventId,
        url: p.url,
        is_primary: p.is_primary,
        sort_order: i,
      }))
      if (isEdit) {
        await supabase.from('event_photos').delete().eq('event_id', eventId)
      }
      await supabase.from('event_photos').insert(photosToSave)
    }

    router.push('/events')
    router.refresh()
  }

  const inputClass = 'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400'
  const labelClass = 'block text-sm font-medium text-gray-700 mb-1'

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">{error}</div>}

      {/* Titles */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 className="font-semibold text-gray-900">Title & Category</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Title (English) *</label>
            <input className={inputClass} value={form.title_en} onChange={e => set('title_en', e.target.value)} required />
          </div>
          <div>
            <label className={labelClass}>Título (Português) *</label>
            <input className={inputClass} value={form.title_pt} onChange={e => set('title_pt', e.target.value)} required />
          </div>
        </div>
        <div>
          <label className={labelClass}>Category</label>
          <select className={inputClass} value={form.category_id} onChange={e => set('category_id', e.target.value)}>
            <option value="">— Select category —</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.icon} {c.name_en} / {c.name_pt}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Descriptions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 className="font-semibold text-gray-900">Description</h2>
        <div>
          <label className={labelClass}>Description (English)</label>
          <textarea className={inputClass} rows={4} value={form.description_en} onChange={e => set('description_en', e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>Descrição (Português)</label>
          <textarea className={inputClass} rows={4} value={form.description_pt} onChange={e => set('description_pt', e.target.value)} />
        </div>
      </div>

      {/* Date & Recurrence */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 className="font-semibold text-gray-900">Date & Schedule</h2>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input type="checkbox" checked={form.is_recurring} onChange={e => set('is_recurring', e.target.checked)} className="rounded" />
          Recurring / ongoing event
        </label>
        {form.is_recurring ? (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Schedule (English)</label>
              <input className={inputClass} placeholder="e.g. Every Saturday 9am–12pm" value={form.recurring_description_en} onChange={e => set('recurring_description_en', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Horário (Português)</label>
              <input className={inputClass} placeholder="ex: Todo sábado 9h–12h" value={form.recurring_description_pt} onChange={e => set('recurring_description_pt', e.target.value)} />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Start date & time</label>
              <input type="datetime-local" className={inputClass} value={form.date_start} onChange={e => set('date_start', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>End date & time</label>
              <input type="datetime-local" className={inputClass} value={form.date_end} onChange={e => set('date_end', e.target.value)} />
            </div>
          </div>
        )}
      </div>

      {/* Location */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 className="font-semibold text-gray-900">Location</h2>
        <div>
          <label className={labelClass}>Place name</label>
          <input className={inputClass} placeholder="e.g. Praia do Campeche" value={form.location_name} onChange={e => set('location_name', e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>Address</label>
          <input className={inputClass} placeholder="Street, neighbourhood, Florianópolis" value={form.location_address} onChange={e => set('location_address', e.target.value)} />
        </div>
      </div>

      {/* Price */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 className="font-semibold text-gray-900">Price</h2>
        <div className="flex gap-4">
          {(['free', 'paid', 'varies'] as const).map(pt => (
            <label key={pt} className="flex items-center gap-2 text-sm cursor-pointer capitalize">
              <input type="radio" name="price_type" value={pt} checked={form.price_type === pt} onChange={() => set('price_type', pt)} />
              {pt}
            </label>
          ))}
        </div>
        {form.price_type !== 'free' && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Price details (English)</label>
              <input className={inputClass} placeholder="e.g. R$30 per child" value={form.price_description_en} onChange={e => set('price_description_en', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Detalhes do preço (Português)</label>
              <input className={inputClass} placeholder="ex: R$30 por criança" value={form.price_description_pt} onChange={e => set('price_description_pt', e.target.value)} />
            </div>
          </div>
        )}
      </div>

      {/* Age & Contact */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 className="font-semibold text-gray-900">Age Range & Contact</h2>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className={labelClass}>Age min</label>
            <input type="number" min="0" max="18" className={inputClass} value={form.age_min} onChange={e => set('age_min', e.target.value)} placeholder="0" />
          </div>
          <div>
            <label className={labelClass}>Age max</label>
            <input type="number" min="0" max="18" className={inputClass} value={form.age_max} onChange={e => set('age_max', e.target.value)} placeholder="18" />
          </div>
          <div>
            <label className={labelClass}>Website</label>
            <input className={inputClass} type="url" placeholder="https://…" value={form.website} onChange={e => set('website', e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Phone / WhatsApp</label>
            <input className={inputClass} placeholder="+55 48 9…" value={form.phone} onChange={e => set('phone', e.target.value)} />
          </div>
        </div>
      </div>

      {/* Photos */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 className="font-semibold text-gray-900">Photos</h2>
        <div className="flex flex-wrap gap-3">
          {photos.map(photo => (
            <div key={photo.url} className="relative w-24 h-24 rounded-lg overflow-hidden border-2 border-gray-200">
              <Image src={photo.url} alt="" fill className="object-cover" />
              {photo.is_primary && (
                <div className="absolute top-1 left-1 bg-yellow-400 rounded-full p-0.5">
                  <Star size={10} className="text-white" fill="white" />
                </div>
              )}
              <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition flex items-center justify-center gap-1 opacity-0 hover:opacity-100">
                <button type="button" onClick={() => setPrimary(photo)} className="p-1 bg-white rounded-full text-yellow-500"><Star size={12} /></button>
                <button type="button" onClick={() => removePhoto(photo)} className="p-1 bg-white rounded-full text-red-500"><X size={12} /></button>
              </div>
            </div>
          ))}
          <label className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-orange-400 transition text-gray-400 hover:text-orange-400">
            {uploading ? <span className="text-xs">Uploading…</span> : <><Upload size={20} /><span className="text-xs">Add photo</span></>}
            <input type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && uploadPhoto(e.target.files[0])} disabled={uploading} />
          </label>
        </div>
        <p className="text-xs text-gray-400">Click ⭐ on a photo to set it as the cover image.</p>
      </div>

      {/* Publish & Save */}
      <div className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-6">
        <label className="flex items-center gap-2 text-sm cursor-pointer font-medium">
          <input type="checkbox" checked={form.is_published} onChange={e => set('is_published', e.target.checked)} className="rounded" />
          Publish this event (visible to users)
        </label>
        <div className="flex gap-3">
          <button type="button" onClick={() => router.push('/events')} className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg transition">
            Cancel
          </button>
          <button type="submit" disabled={saving} className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-lg transition disabled:opacity-50">
            {saving ? 'Saving…' : isEdit ? 'Save changes' : 'Create event'}
          </button>
        </div>
      </div>
    </form>
  )
}
