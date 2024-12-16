import { Suspense } from "react"
import { fetchUSDTQuotes, fetchDollarQuotes, fetchCryptoQuotes } from "@/lib/api"
import { QuoteCard } from "@/components/quote-card"
import { USDTQuotes } from "@/components/usdt-quotes"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bitcoin, DollarSign, ArrowUpIcon, ArrowDownIcon } from 'lucide-react'

export const revalidate = 60 // Revalidate every minute

async function USDTQuotesSection() {
  const quotes = await fetchUSDTQuotes()
  return <USDTQuotes quotes={quotes} />
}

async function DollarQuotes() {
  const quotes = await fetchDollarQuotes()
  
  const relevantQuotes = [
    { key: 'oficial', name: 'Dólar Oficial', type: 'oficial' as const },
    { key: 'tarjeta', name: 'Dólar Tarjeta', type: 'tarjeta' as const },
    { key: 'blue', name: 'Dólar Blue', type: 'blue' as const },
    { key: 'mep', name: 'Dólar MEP', type: 'mep' as const },
    { key: 'ccl', name: 'Dólar CCL', type: 'ccl' as const },
  ]
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      {relevantQuotes.map((quote) => {
        const quoteData = quotes[quote.key]
        return (
          <QuoteCard
            key={quote.key}
            title={quote.name}
            singlePrice={quoteData?.price}
            variation={quoteData?.variation}
            icon={<DollarSign className="h-4 w-4" />}
            type={quote.type}
          />
        )
      })}
    </div>
  )
}

async function CryptoQuotes() {
  const quotes = await fetchCryptoQuotes()
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {quotes.map((crypto, index) => (
        <Card key={crypto.id} className="overflow-hidden bg-[#2A2A2A] border-[1px] border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              {crypto.image && (
                <img
                  src={crypto.image}
                  alt={crypto.name}
                  className="h-4 w-4"
                />
              )}
              {crypto.name}
            </CardTitle>
            <span className="text-xs text-gray-400">#{index + 1}</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $ {crypto.current_price?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) ?? 'N/A'}
            </div>
            {crypto.price_change_percentage_24h !== undefined && (
              <div className={`flex items-center gap-2 ${
                crypto.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                {crypto.price_change_percentage_24h > 0 ? (
                  <ArrowUpIcon className="h-4 w-4" />
                ) : (
                  <ArrowDownIcon className="h-4 w-4" />
                )}
                <p className="text-sm">
                  {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center px-4">
          <span className="font-bold">USDThoy</span>
        </div>
      </header>
      
      <main className="flex-1">
        <div className="container py-6 space-y-8 px-4">
          <section>
            <h2 className="text-xl font-bold mb-4 text-gray-100">Cotizaciones USDT</h2>
            <Suspense fallback={<div>Cargando cotizaciones USDT...</div>}>
              <USDTQuotesSection />
            </Suspense>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-gray-100">Cotizaciones Dólar</h2>
            <Suspense fallback={<div>Cargando cotizaciones de dólar...</div>}>
              <DollarQuotes />
            </Suspense>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-gray-100">Cotizaciones Criptomonedas</h2>
            <Suspense fallback={<div>Cargando cotizaciones de criptomonedas...</div>}>
              <CryptoQuotes />
            </Suspense>
          </section>
        </div>
      </main>

      <footer className="border-t border-gray-800 py-6 md:py-0">
        <div className="container flex h-14 items-center justify-between px-4">
          <p className="text-sm text-gray-400">
            Hecho con ❤️ por Jamie
          </p>
          <p className="text-sm text-gray-400">
            hey@jamie.agency
          </p>
        </div>
      </footer>
    </div>
  )
}

