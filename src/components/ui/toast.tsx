'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, AlertCircle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function Toaster() {
  const { toasts, dismiss } = useToast()

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            className={`
              min-w-[300px] max-w-[400px] p-4 rounded-lg shadow-lg border
              ${toast.variant === 'destructive' 
                ? 'bg-red-50 border-red-200 text-red-900' 
                : 'bg-white border-gray-200 text-gray-900'
              }
            `}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                {toast.variant === 'destructive' ? (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm">{toast.title}</h4>
                {toast.description && (
                  <p className="text-sm opacity-80 mt-1">{toast.description}</p>
                )}
              </div>
              
              <button
                onClick={() => dismiss(toast.id)}
                className="flex-shrink-0 p-1 hover:bg-black/5 rounded"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

// Auto-dismiss toast after timeout
export function Toast({ 
  id, 
  title, 
  description, 
  variant = 'default',
  onDismiss 
}: {
  id: string
  title: string
  description?: string
  variant?: 'default' | 'destructive'
  onDismiss: (id: string) => void
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(id)
    }, 5000)

    return () => clearTimeout(timer)
  }, [id, onDismiss])

  return null
}
