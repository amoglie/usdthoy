"use client"

import { useState } from 'react'
import { Bitcoin, ArrowUpDown } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface USDTQuote {
  exchange: string
  totalAsk: number
  totalBid: number
  spread: number
}

interface USDTQuotesProps {
  quotes: USDTQuote[]
}

export function USDTQuotes({ quotes: initialQuotes }: USDTQuotesProps) {
  const [sortBy, setSortBy] = useState<'ask' | 'bid' | 'spread'>('ask')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const quotes = [...initialQuotes].sort((a, b) => {
    const modifier = sortDirection === 'asc' ? 1 : -1
    switch (sortBy) {
      case 'ask':
        return (a.totalAsk - b.totalAsk) * modifier
      case 'bid':
        return (a.totalBid - b.totalBid) * modifier
      case 'spread':
        return (a.spread - b.spread) * modifier
      default:
        return 0
    }
  })

  const bestBuy = quotes.reduce((min, quote) => 
    quote.totalAsk < min.totalAsk ? quote : min
  , quotes[0])

  const bestSell = quotes.reduce((max, quote) => 
    quote.totalBid > max.totalBid ? quote : max
  , quotes[0])

  const handleSort = (column: 'ask' | 'bid' | 'spread') => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortDirection('asc')
    }
  }

  return (
    <Card className="glass-card gradient-border">
      <CardHeader className="pb-3">
        <div className="flex flex-col space-y-1.5">
          <CardTitle className="text-2xl font-bold text-gray-100">Cotizaciones USDT</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="bg-purple-900/30 rounded-lg p-3 border border-purple-500/30">
              <p className="text-xs text-purple-300 mb-1">Mejor para comprar:</p>
              <p className="font-semibold text-purple-400 text-base md:text-lg">
                {bestBuy.exchange}
              </p>
              <p className="text-xl md:text-2xl font-bold text-purple-300">
                ${bestBuy.totalAsk.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="bg-red-900/30 rounded-lg p-3 border border-red-500/30">
              <p className="text-xs text-red-300 mb-1">Mejor para vender:</p>
              <p className="font-semibold text-red-400 text-base md:text-lg">
                {bestSell.exchange}
              </p>
              <p className="text-xl md:text-2xl font-bold text-red-300">
                ${bestSell.totalBid.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="rounded-md border border-gray-700 bg-[#2A2A2A]">
          <div className="grid grid-cols-[1fr,auto,auto,auto] items-center gap-4 p-4 text-sm font-medium text-gray-200">
            <div>Exchange</div>
            <button
              onClick={() => handleSort('ask')}
              className="flex items-center gap-1 hover:text-primary transition-colors"
            >
              Compra
              <ArrowUpDown className="h-4 w-4" />
            </button>
            <button
              onClick={() => handleSort('bid')}
              className="flex items-center gap-1 hover:text-primary transition-colors"
            >
              Venta
              <ArrowUpDown className="h-4 w-4" />
            </button>
            <button
              onClick={() => handleSort('spread')}
              className="flex items-center gap-1 hover:text-primary transition-colors"
            >
              Spread
              <ArrowUpDown className="h-4 w-4" />
            </button>
          </div>
          <div className="divide-y divide-gray-700">
            {quotes.map((quote) => (
              <div
                key={quote.exchange}
                className="grid grid-cols-[1fr,auto,auto,auto] items-center gap-2 md:gap-4 p-2 md:p-4 hover:bg-gray-700/30 transition-colors text-sm md:text-base"
              >
                <div className="flex items-center gap-2">
                  <Bitcoin className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                  <span className="text-gray-200">{quote.exchange}</span>
                </div>
                <div className={quote.totalAsk === bestBuy.totalAsk ? "font-semibold text-purple-400" : "text-gray-300"}>
                  ${quote.totalAsk.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                </div>
                <div className={quote.totalBid === bestSell.totalBid ? "font-semibold text-red-400" : "text-gray-300"}>
                  ${quote.totalBid.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                </div>
                <div className="text-gray-400">
                  ${quote.spread.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

