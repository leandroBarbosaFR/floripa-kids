'use client'

import { useSession, signOut } from 'next-auth/react'
import { Heart, LogOut } from 'lucide-react'
import { useFavorites } from '@/components/FavoritesProvider'
import { activities } from '@/lib/data'
import ActivityCard from '@/components/ActivityCard'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const { favorites } = useFavorites()

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400 text-sm">
        Loading…
      </div>
    )
  }

  const favorited = activities.filter((a) => favorites.includes(a.slug))

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-b from-brand-pink/40 to-white border-b border-brand-pink/30 px-6 py-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            {session?.user?.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={session.user.image}
                alt=""
                className="w-14 h-14 rounded-full border-2 border-white shadow-sm object-cover"
              />
            )}
            <div>
              <h1 className="text-2xl font-extrabold text-slate-800">
                Hi, {session?.user?.name?.split(' ')[0]} 👋
              </h1>
              <p className="text-slate-400 text-sm mt-0.5">{session?.user?.email}</p>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-700 transition-colors"
          >
            <LogOut size={15} />
            Sign out
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center gap-2 mb-6">
          <Heart size={18} className="text-brand-pink fill-brand-pink" />
          <h2 className="text-lg font-bold text-slate-800">
            Saved activities
            {favorited.length > 0 && (
              <span className="ml-2 text-sm font-normal text-slate-400">({favorited.length})</span>
            )}
          </h2>
        </div>

        {favorited.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🤍</div>
            <p className="font-semibold text-slate-700 mb-1">No favourites yet</p>
            <p className="text-slate-400 text-sm">
              Tap the heart on any activity to save it here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {favorited.map((a) => (
              <ActivityCard key={a.slug} activity={a} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
