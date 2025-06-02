'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Sparkles, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 flex justify-center p-4 pt-40 relative overflow-hidden">
      {/* Simple Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.06),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.04),transparent_60%)]"></div>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(139,92,246,0.08) 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}></div>
      </div>

      <div className="relative z-10 w-full max-w-lg mx-auto text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-2">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              PromptPilot
            </span>
          </Link>
        </motion.div>

        {/* 404 Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-6"
        >
          <h1 className="text-6xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
            404
          </h1>

          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-slate-900">
              Page Not Found
            </h2>
            <p className="text-slate-600">
              The page you're looking for doesn't exist.
            </p>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8"
        >
          <Button asChild className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
