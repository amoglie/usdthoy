import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

interface QuoteCardProps {
  title?: string;
  buyPrice?: number;
  sellPrice?: number;
  singlePrice?: number;
  variation?: number;
  logo?: string;
  icon?: React.ReactNode;
  type?: "oficial" | "blue" | "mep" | "ccl" | "tarjeta";
}

const TYPE_STYLES = {
  oficial: 'from-red-200/20 to-red-500/20 border-red-500/50',
  blue: 'from-indigo-500/20 to-indigo-600/20 border-indigo-500/50',
  mep: 'from-green-200/20 to-green-200/20 border-green-500/50',
  ccl: 'from-violet-500/20 to-violet-600/20 border-violet-500/50',
  tarjeta: 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/50',
}

export function QuoteCard({
  title = "Título no disponible",
  buyPrice = 0,
  sellPrice = 0,
  singlePrice,
  variation,
  logo,
  icon,
  type = "oficial",
}: QuoteCardProps) {
  const formatter = new Intl.NumberFormat("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const gradientClass = TYPE_STYLES[type];
  return (
    <Card className={`overflow-hidden border bg-[#1E1E1E] ${gradientClass} transition-all duration-300 hover:scale-[1.02]`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2 text-gray-100">
          {logo ? (
            <img
              src={logo} // Ruta del logo dinámico
              alt={title} // Título para accesibilidad
              className="h-6 w-6 object-contain" // Ajusta tamaño y estilo
            />
          ) : (
            icon // Fallback si no hay logo
          )}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {singlePrice !== undefined ? (
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gray-100">
              $ {formatter.format(singlePrice)}
            </div>
            {variation !== undefined && (
              <div className={`flex items-center ${variation > 0 ? "text-green-400" : "text-red-400"}`}>
                {variation > 0 ? (
                  <ArrowUpIcon className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDownIcon className="h-4 w-4 mr-1" />
                )}
                <span className="text-sm font-medium">{Math.abs(variation).toFixed(2)}%</span>
              </div>
            )}
          </div>
        ) : (
          <div className="flex justify-between text-sm">
            <div>
              <p className="text-gray-400">Compra</p>
              <p className="text-xl font-bold text-gray-100">
                $ {formatter.format(buyPrice)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-400">Vende</p>
              <p className="text-xl font-bold text-gray-100">
                $ {formatter.format(sellPrice)}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

