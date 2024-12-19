// Mock data for fallback
const mockCryptoData = [
  { id: "bitcoin", symbol: "btc", name: "Bitcoin", current_price: 35000, price_change_percentage_24h: 2.5 },
  { id: "ethereum", symbol: "eth", name: "Ethereum", current_price: 2000, price_change_percentage_24h: 1.8 },
  { id: "tether", symbol: "usdt", name: "Tether", current_price: 1, price_change_percentage_24h: 0.1 },
  { id: "binancecoin", symbol: "bnb", name: "Binance Coin", current_price: 300, price_change_percentage_24h: -0.5 },
  { id: "cardano", symbol: "ada", name: "Cardano", current_price: 0.5, price_change_percentage_24h: 3.2 },
];

export async function fetchUSDTQuotes() {
  try {
    const response = await fetch('https://criptoya.com/api/USDT/ARS/0.1')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()

    return Object.entries(data)
      .map(([exchange, quote]: [string, any]) => ({
        ...quote,
        exchange,
        spread: Number((quote.totalAsk - quote.totalBid).toFixed(2)),
        logo: `/images/${exchange.toLowerCase()}.svg`, // Ruta dinámica al logo
      }))
      .filter((quote) =>
        ['belo', 'lemoncash', 'letsbit', 'ripio', 'bybit', 'buenbit', 'fiwind', 'tiendacrypto'].includes(
          quote.exchange.toLowerCase()
        )
      )
  } catch (error) {
    console.error('Error fetching USDT quotes:', error)
    throw error
  }
}

export async function fetchDollarQuotes() {
  try {
    const response = await fetch('https://criptoya.com/api/dolar')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()

    return {
      oficial: { name: 'Dólar Oficial', price: data.oficial.price, variation: data.oficial.variation, logo: `/images/oficial.svg` },
      tarjeta: { name: 'Dólar Tarjeta', price: data.tarjeta.price, variation: data.tarjeta.variation, logo: `/images/tarjeta.svg` },
      blue: { name: 'Dólar Blue', price: data.blue.ask, variation: data.blue.variation, logo: `/images/blue.svg` },
      mep: { name: 'Dólar MEP', price: data.mep.al30['24hs'].price, variation: data.mep.al30['24hs'].variation, logo: `/images/mep.svg` },
      ccl: { name: 'Dólar CCL', price: data.ccl.al30['24hs'].price, variation: data.ccl.al30['24hs'].variation, logo: `/images/ccl.svg` }
    }
    
  } catch (error) {
    console.error('Error fetching dollar quotes:', error)
    throw error
  }
}

export async function fetchCryptoQuotes() {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
    )
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return response.json()
  } catch (error) {
    console.error('Error fetching crypto quotes:', error)
    throw error
  }
}

