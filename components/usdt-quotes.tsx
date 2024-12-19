"use client";

import { useState, useMemo } from "react";
import { Bitcoin, ArrowUpDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HistoricalPriceChart } from "./historical-price-chart";

interface USDTQuote {
  exchange: string;
  totalAsk: number;
  totalBid: number;
  spread: number;
  logo: string;
}

interface USDTQuotesProps {
  quotes: USDTQuote[];
}

export function USDTQuotes({ quotes: initialQuotes }: USDTQuotesProps) {
  const [sortBy, setSortBy] = useState<"ask" | "bid" | "spread">("ask");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (type: "ask" | "bid" | "spread") => {
    if (sortBy === type) {
      // Toggle the sort direction if the same column is clicked
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      // Set the new column and default to ascending order
      setSortBy(type);
      setSortDirection("asc");
    }
  };

  // Sort quotes in the client to avoid SSR issues
  const quotes = useMemo(() => {
    const sorted = [...initialQuotes].sort((a, b) => {
      const modifier = sortDirection === "asc" ? 1 : -1;
      switch (sortBy) {
        case "ask":
          return (a.totalAsk - b.totalAsk) * modifier;
        case "bid":
          return (a.totalBid - b.totalBid) * modifier;
        case "spread":
          return (a.spread - b.spread) * modifier;
        default:
          return 0;
      }
    });
    return sorted;
  }, [initialQuotes, sortBy, sortDirection]);

  const bestBuy = useMemo(
    () => quotes.reduce((min, quote) => (quote.totalAsk < min.totalAsk ? quote : min), quotes[0]),
    [quotes]
  );

  const bestSell = useMemo(
    () => quotes.reduce((max, quote) => (quote.totalBid > max.totalBid ? quote : max), quotes[0]),
    [quotes]
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-purple-900/30 rounded-lg p-3 border border-purple-500/30">
          <p className="text-xs text-purple-300 mb-1">Comprá USDT en:</p>
          <p className="font-semibold text-purple-400 text-base md:text-lg">
            {bestBuy.exchange}
          </p>
          <p className="text-xl md:text-2xl font-bold text-purple-300">
            ${bestBuy.totalAsk.toLocaleString("es-AR", { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="bg-red-900/30 rounded-lg p-3 border border-red-500/30">
          <p className="text-xs text-red-300 mb-1">Vendé USDT en:</p>
          <p className="font-semibold text-red-400 text-base md:text-lg">
            {bestSell.exchange}
          </p>
          <p className="text-xl md:text-2xl font-bold text-red-300">
            ${bestSell.totalBid.toLocaleString("es-AR", { minimumFractionDigits: 2 })}
          </p>
        </div>
        <HistoricalPriceChart />
      </div>

      <Card className="glass-card gradient-border">
        <CardHeader className="pb-3">
          <div className="flex flex-col space-y-1.5">
            <CardTitle className="text-2xl font-bold text-gray-100">Cotizaciones USDT</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <div className="rounded-md border border-gray-700 bg-[#2A2A2A] overflow-hidden">
            <div className="hidden md:block">
              <div className="grid grid-cols-[1fr,auto,auto,auto] items-center gap-4 p-4 text-sm font-medium text-gray-200 border-b border-gray-700">
                <div>Exchange</div>
                <button
                  onClick={() => handleSort("ask")}
                  className="flex items-center gap-1 hover:text-primary transition-colors"
                >
                  Comprá
                  <ArrowUpDown className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleSort("bid")}
                  className="flex items-center gap-1 hover:text-primary transition-colors"
                >
                  Vendé
                  <ArrowUpDown className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleSort("spread")}
                  className="flex items-center gap-1 hover:text-primary transition-colors"
                >
                  Spread
                  <ArrowUpDown className="h-4 w-4" />
                </button>
              </div>
              {quotes.map((quote) => (
                <div
                  key={quote.exchange}
                  className="grid grid-cols-[1fr,auto,auto,auto] items-center gap-4 p-4 hover:bg-gray-700/30 transition-colors border-b border-gray-700 last:border-b-0"
                >
                  <div className="flex items-center gap-2">
                    <img src={quote.logo} alt={quote.exchange} className="h-5 w-5" />
                    <span className="text-gray-200 font-medium">{quote.exchange}</span>
                  </div>
                  <span className={quote.totalAsk === bestBuy.totalAsk ? "font-semibold text-purple-400" : "text-gray-300"}>
                    ${quote.totalAsk.toLocaleString("es-AR", { minimumFractionDigits: 2 })}
                  </span>
                  <span className={quote.totalBid === bestSell.totalBid ? "font-semibold text-red-400" : "text-gray-300"}>
                    ${quote.totalBid.toLocaleString("es-AR", { minimumFractionDigits: 2 })}
                  </span>
                  <span className="text-gray-300">
                    ${quote.spread.toLocaleString("es-AR", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
