import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'USDThoy - Cotizaciones en tiempo real',
  description: 'Cotizaciones de USDT, dólares financieros y criptomonedas en tiempo real',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="dark">
      <body className="min-h-screen bg-[#1a1a1a] text-gray-200">
        {children}
      </body>
    </html>
  )
}

