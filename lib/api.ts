export async function fetchUSDTQuotes() {
  const response = await fetch('https://criptoya.com/api/USDT/ARS/0.1')
  const data = await response.json()
  
  // Transform the data to include exchange names and spreads
  return Object.entries(data).map(([exchange, quote]: [string, any]) => ({
    ...quote,
    exchange,
    spread: Number((quote.totalAsk - quote.totalBid).toFixed(2))
  })).filter(quote => 
    ['belo', 'lemoncash', 'letsbit', 'ripio', 'bybit', 'buenbit', 'fiwind', 'tiendacrypto']
    .includes(quote.exchange.toLowerCase())
  )
}

export async function fetchDollarQuotes() {
  const response = await fetch('https://criptoya.com/api/dolar')
  const data = await response.json()
  
  return {
    oficial: { name: 'Dólar Oficial', price: data.oficial.price, variation: data.oficial.variation },
    tarjeta: { name: 'Dólar Tarjeta', price: data.tarjeta.price, variation: data.tarjeta.variation },
    blue: { name: 'Dólar Blue', price: data.blue.ask, variation: data.blue.variation },
    mep: { name: 'Dólar MEP', price: data.mep.al30['24hs'].price, variation: data.mep.al30['24hs'].variation },
    ccl: { name: 'Dólar CCL', price: data.ccl.al30['24hs'].price, variation: data.ccl.al30['24hs'].variation }
  }
}

export async function fetchCryptoQuotes() {
  const response = await fetch(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
  )
  return response.json()
}

