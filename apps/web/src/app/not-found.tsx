import Link from 'next/link'
import { MapPin, ArrowLeft, Waves } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-brand-cream/60 to-white flex items-center justify-center px-6">
      <div className="text-center max-w-sm">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-brand-blue mb-6 shadow-sm">
          <Waves size={40} strokeWidth={1.2} className="text-slate-700" />
        </div>
        <h1 className="text-6xl font-extrabold text-slate-800 mb-2">404</h1>
        <p className="text-xl font-bold text-slate-700 mb-2">Page not found</p>
        <p className="text-slate-400 text-sm leading-relaxed mb-8">
          Looks like this beach doesn&apos;t exist. Let&apos;s get you back to dry land.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold px-6 py-3 rounded-2xl transition-colors text-sm"
          >
            <ArrowLeft size={15} /> Back to home
          </Link>
          <Link
            href="/activities"
            className="flex items-center justify-center gap-2 bg-brand-blue text-slate-700 font-semibold px-6 py-3 rounded-2xl hover:opacity-80 transition-opacity text-sm"
          >
            <MapPin size={15} /> Browse activities
          </Link>
        </div>
      </div>
    </main>
  )
}
