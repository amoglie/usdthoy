"use client";

import { useEffect, useState } from "react";
import { Line, LineChart, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface HistoricalPrice {
  fecha: string;
  venta: number;
}

const mockData = [
  { date: "01/12", price: 1000 },
  { date: "02/12", price: 1020 },
  { date: "03/12", price: 1015 },
  { date: "04/12", price: 1030 },
  { date: "05/12", price: 1025 },
  { date: "06/12", price: 1040 },
  { date: "07/12", price: 1050 },
];

async function fetchHistoricalPrices() {
  try {
    const response = await fetch(
      "https://api.argentinadatos.com/v1/cotizaciones/dolares/cripto"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data: HistoricalPrice[] = await response.json();

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    return data
      .filter((price) => new Date(price.fecha) >= sevenDaysAgo)
      .map((price) => ({
        date: new Date(price.fecha).toISOString().split("T")[0],
        price: price.venta,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  } catch (error) {
    console.error("Error fetching historical prices:", error);
    return mockData; // Return mock data if fetch fails
  }
}

export function HistoricalPriceChart() {
  const [data, setData] = useState<Array<{ date: string; price: number }>>([]);
  const [variation, setVariation] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHistoricalPrices().then((prices) => {
      if (prices.length > 0) {
        setData(prices);
        const lastPrice = prices[prices.length - 1].price;
        const firstPrice = prices[0].price;
        const variationCalc = ((lastPrice - firstPrice) / firstPrice) * 100;
        setVariation(variationCalc);
      } else {
        setData(mockData);
      }
    });
  }, []);

  return (
    <Card className="bg-[#2A2A2A] border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-xs mb-3 text-gray-400">
          Variación del USDT
        </CardTitle>
        <div className="flex items-center gap-2 mt-1">
          {error ? (
            <span className="text-xs text-yellow-400">{error}</span>
          ) : (
            <>
              <span
                className={`text-xs ${
                  variation >= 0 ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {variation >= 0 ? "▲" : "▼"} {Math.abs(variation).toFixed(1)}%
              </span>
              <span className="text-xs text-gray-500">últ. 7 días</span>
            </>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[60px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Line
                type="monotone"
                dataKey="price"
                stroke="#10b981"
                strokeWidth={1.5}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
