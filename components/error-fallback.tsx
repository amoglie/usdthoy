import { AlertCircle } from 'lucide-react'

interface ErrorFallbackProps {
  message: string
}

export function ErrorFallback({ message }: ErrorFallbackProps) {
  return (
    <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      <AlertCircle className="flex-shrink-0 inline w-4 h-4 mr-3" />
      <span className="sr-only">Error</span>
      <div>
        <span className="font-medium">Error al cargar datos:</span> {message}
      </div>
    </div>
  )
}

