import type { Metadata } from 'next'
import "./globals.css";
export const metadata = {
  title: "USDThoy - Cotizaciones en tiempo real",
  description: "Cotizaciones de USDT, dólares financieros y criptomonedas en tiempo real",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className="min-h-screen bg-[#1a1a1a] text-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <main className="flex-1 py-6">{children}</main>
        </div>
      </body>

    </html>
  );
}
