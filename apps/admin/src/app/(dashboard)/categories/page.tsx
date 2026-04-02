import { createClient } from '@/lib/supabase/server'

export default async function CategoriesPage() {
  const supabase = await createClient()
  const { data: categories } = await supabase.from('categories').select('*').order('name_en')

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Categories</h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {categories?.map(cat => (
          <div key={cat.id} className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4">
            <div className="text-3xl w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: cat.color + '20' }}>
              {cat.icon}
            </div>
            <div>
              <div className="font-semibold text-gray-900 text-sm">{cat.name_en}</div>
              <div className="text-xs text-gray-400">{cat.name_pt}</div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-400 mt-6">Categories are seeded from the database migration. Edit them directly in Supabase if needed.</p>
    </div>
  )
}
