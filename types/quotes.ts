export interface USDTQuote {
  ask: number
  totalAsk: number
  bid: number
  totalBid: number
  time: number
  exchange: string
  spread?: number
}

export interface DollarQuote {
  compra: number
  venta: number
  spread: number
  name: string
}

export interface CryptoQuote {
  id: string
  symbol: string
  name: string
  current_price: number
  price_change_percentage_24h: number
}

