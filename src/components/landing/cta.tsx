'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Sparkles, ArrowRight } from 'lucide-react'

export default function CTA() {
  return (
    <section className="relative bg-white py-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_70%)] pointer-events-none"></div>

      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)] pointer-events-none"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.05),transparent_50%)] pointer-events-none"></div>

            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full font-semibold text-sm mb-6 backdrop-blur-md border border-white/30"
              >
                <Sparkles className="w-4 h-4" />
                GET STARTED TODAY
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-extrabold mb-4 text-white"
              >
                Ready to Optimize Your AI Prompts?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-lg mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed"
              >
                Join thousands of satisfied users who have transformed their AI interactions with Prompt Genie.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-50 font-bold px-6 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <Link href="/signup" className="flex items-center gap-2">
                    Get Started for FREE
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Link href="/pricing" className="text-white/90 hover:text-white font-medium transition-colors duration-200 flex items-center gap-1">
                  View Pricing Plans
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}