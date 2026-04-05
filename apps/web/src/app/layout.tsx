import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import './globals.css'
import { LanguageProvider } from '@/components/LanguageProvider'
import Providers from '@/components/Providers'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Floripa with Kids — Family Activities in Florianópolis',
  description:
    'Discover the best activities for kids in Florianópolis. Filter by age, zone, weather and budget. Beaches, parks, restaurants and more.',
  keywords: ['Florianópolis', 'kids', 'family', 'activities', 'children', 'beach', 'Floripa'],
  openGraph: {
    title: 'Floripa with Kids',
    description: 'The ultimate guide for families with kids in Florianópolis, Brazil.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-white text-slate-900 antialiased font-sans">
        <LanguageProvider>
          <Providers>
            <Navbar />
            {children}
            <Footer />
          </Providers>
        </LanguageProvider>
      </body>
    </html>
  )
}
