import Link from 'next/link'
import { Palmtree, Waves, UtensilsCrossed, CalendarDays, Apple, Play } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24 bg-[#fff7ed]">
        <div className="mb-6 text-[#f97316]">
          <Palmtree size={56} strokeWidth={1.5} />
        </div>
        <h1 className="text-5xl font-extrabold text-gray-900 mb-2">Floripa</h1>
        <p className="text-3xl font-bold text-[#f97316] mb-6">with Kids</p>
        <p className="text-lg text-gray-600 max-w-md mb-10">
          Discover the best activities to do with your kids in Florianópolis —
          beaches, parks, restaurants, events and more.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="https://apps.apple.com/app/floripa-with-kids"
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-gray-700 transition"
          >
            <Apple size={18} />
            App Store
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.floripawithkids.app"
            className="inline-flex items-center gap-2 bg-[#f97316] text-white px-6 py-3 rounded-2xl font-semibold hover:bg-orange-600 transition"
          >
            <Play size={18} />
            Google Play
          </a>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {[
            { icon: <Waves size={36} strokeWidth={1.5} />, title: 'Beaches & Parks', desc: 'Family-friendly spots rated by real parents.' },
            { icon: <UtensilsCrossed size={36} strokeWidth={1.5} />, title: 'Restaurants', desc: 'Kid-friendly restaurants with high chairs and menus.' },
            { icon: <CalendarDays size={36} strokeWidth={1.5} />, title: 'Events', desc: 'Local events and activities updated weekly.' },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center gap-3">
              <span className="text-[#f97316]">{icon}</span>
              <h3 className="font-bold text-lg text-gray-900">{title}</h3>
              <p className="text-gray-500 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-100 text-center text-sm text-gray-400">
        <p>© {new Date().getFullYear()} Floripa with Kids · Made with love in Floripa</p>
        <div className="mt-2 flex justify-center gap-4">
          <Link href="/privacy" className="hover:text-[#f97316] transition">Privacy Policy</Link>
          <a href="mailto:hello@1367studio.com" className="hover:text-[#f97316] transition">Contact</a>
        </div>
      </footer>
    </main>
  )
}
