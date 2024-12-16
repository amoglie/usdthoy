import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react'

interface QuoteCardProps {
  title: string
  buyPrice?: number
  sellPrice?: number
  singlePrice?: number
  variation?: number
  icon?: React.ReactNode
  type?: 'oficial' | 'blue' | 'mep' | 'ccl' | 'tarjeta'
}

const TYPE_STYLES = {
  oficial: 'from-blue-500/20 to-blue-600/20 border-blue-500/50',
  blue: 'from-indigo-500/20 to-indigo-600/20 border-indigo-500/50',
  mep: 'from-emerald-500/20 to-emerald-600/20 border-emerald-500/50',
  ccl: 'from-violet-500/20 to-violet-600/20 border-violet-500/50',
  tarjeta: 'from-amber-500/20 to-amber-600/20 border-amber-500/50',
}

export function QuoteCard({ title, buyPrice, sellPrice, singlePrice, variation, icon, type }: QuoteCardProps) {
  const gradientClass = type ? TYPE_STYLES[type] : 'from-primary/20 to-primary/20 border-primary/50'

  return (
    <Card className={`overflow-hidden bg-[#2A2A2A] border-[1px] ${gradientClass} transition-all duration-300 hover:scale-[1.02]`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2 text-gray-100">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {singlePrice !== undefined ? (
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gray-100">
              $ {singlePrice.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            {variation !== undefined && (
              <div className={`flex items-center ${variation > 0 ? 'text-green-400' : 'text-red-400'}`}>
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
                $ {buyPrice?.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) ?? 'N/A'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-400">Vende</p>
              <p className="text-xl font-bold text-gray-100">
                $ {sellPrice?.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) ?? 'N/A'}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

