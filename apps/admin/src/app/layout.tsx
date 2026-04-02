import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Floripa with Kids — Admin',
  description: 'Admin dashboard for Floripa with Kids',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
