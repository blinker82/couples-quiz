import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Couples Quiz - Test Your Compatibility',
  description: 'Take a fun quiz with your partner to discover your compatibility and learn more about each other.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
        {children}
      </body>
    </html>
  )
}
