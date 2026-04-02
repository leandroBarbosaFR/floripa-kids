import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Floripa with Kids',
  description: 'Discover the best activities to do with your kids in Florianópolis.',
  openGraph: {
    title: 'Floripa with Kids',
    description: 'Discover the best activities to do with your kids in Florianópolis.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased">{children}</body>
    </html>
  )
}
