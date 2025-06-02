'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full bg-white/95 backdrop-blur-lg z-50 border-b border-purple-100/50 shadow-sm"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-1.5">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
            PromptPilot
          </span>
        </Link>

        <div className="flex items-center gap-8">
          <Link href="/pricing" className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200">
            Pricing
          </Link>
          <Link href="/examples" className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200">
            Examples
          </Link>
          <Link href="/faq" className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200">
            FAQ
          </Link>
          <Link href="/auth">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar 