'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

const Footer = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-purple-600" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
                PromptPilot
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400">
              Transform your ideas into powerful AI prompts
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link href="/features" className="text-gray-600 dark:text-gray-400 hover:text-purple-600">Features</Link></li>
              <li><Link href="/pricing" className="text-gray-600 dark:text-gray-400 hover:text-purple-600">Pricing</Link></li>
              <li><Link href="/examples" className="text-gray-600 dark:text-gray-400 hover:text-purple-600">Examples</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-purple-600">About</Link></li>
              <li><Link href="/blog" className="text-gray-600 dark:text-gray-400 hover:text-purple-600">Blog</Link></li>
              <li><Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-purple-600">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-purple-600">Privacy</Link></li>
              <li><Link href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-purple-600">Terms</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-600 dark:text-gray-400">
          <p>© 2024 PromptPilot. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer 