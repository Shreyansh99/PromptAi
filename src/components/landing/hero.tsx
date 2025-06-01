'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { Sparkles, Zap, Brain, Target } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-[600px] flex items-center bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      {/* Advanced Background Pattern - Prompt Genie Style */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Main gradient overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.12),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.08),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(168,85,247,0.06),transparent_50%)]"></div>

        {/* Geometric patterns */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(139,92,246,0.03)_50%,transparent_52%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(-45deg,transparent_48%,rgba(59,130,246,0.02)_50%,transparent_52%)]"></div>

        {/* Dot pattern overlay */}
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(139,92,246,0.15) 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}></div>

        {/* Colorful floating geometric shapes */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-purple-400/30 to-blue-400/30 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-br from-pink-400/35 to-purple-400/35 rounded-full blur-lg"></div>
        <div className="absolute bottom-32 left-40 w-20 h-20 bg-gradient-to-br from-cyan-400/30 to-blue-400/30 rounded-full blur-lg"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-gradient-to-br from-indigo-400/25 to-purple-400/25 rounded-full blur-xl"></div>

        {/* Additional colorful geometric elements */}
        <div className="absolute top-32 left-1/2 w-16 h-16 bg-gradient-to-r from-emerald-400/25 to-teal-400/25 rounded-lg blur-md rotate-45"></div>
        <div className="absolute top-60 right-1/4 w-12 h-12 bg-gradient-to-r from-orange-400/30 to-red-400/30 rounded-full blur-sm"></div>
        <div className="absolute bottom-40 left-1/4 w-14 h-14 bg-gradient-to-r from-yellow-400/25 to-orange-400/25 rounded-lg blur-md rotate-12"></div>
        <div className="absolute top-1/3 right-12 w-10 h-10 bg-gradient-to-r from-rose-400/35 to-pink-400/35 rounded-full blur-sm"></div>

        {/* Triangular and diamond shapes */}
        <div className="absolute top-16 left-1/3 w-8 h-8 bg-gradient-to-br from-violet-400/40 to-purple-400/40 rotate-45 blur-sm"></div>
        <div className="absolute bottom-16 right-1/3 w-6 h-6 bg-gradient-to-br from-blue-400/45 to-cyan-400/45 rotate-45 blur-sm"></div>
        <div className="absolute top-2/3 left-16 w-12 h-12 bg-gradient-to-br from-green-400/30 to-emerald-400/30 rotate-12 blur-md"></div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `linear-gradient(rgba(139,92,246,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}></div>

        {/* Animated colorful gradient orbs */}
        <div className="absolute top-1/4 left-1/3 w-40 h-40 bg-gradient-to-r from-purple-400/15 to-blue-400/15 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-36 h-36 bg-gradient-to-r from-pink-400/15 to-purple-400/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-gradient-to-r from-cyan-400/12 to-blue-400/12 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 right-1/3 w-28 h-28 bg-gradient-to-r from-emerald-400/12 to-teal-400/12 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>

        {/* Colorful accent lines and patterns */}
        <div className="absolute top-0 left-1/4 w-px h-32 bg-gradient-to-b from-transparent via-purple-400/20 to-transparent"></div>
        <div className="absolute top-1/3 right-1/4 w-px h-24 bg-gradient-to-b from-transparent via-pink-400/25 to-transparent"></div>
        <div className="absolute bottom-0 left-1/3 w-px h-28 bg-gradient-to-b from-transparent via-blue-400/20 to-transparent"></div>
        <div className="absolute top-1/4 left-0 w-24 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"></div>
        <div className="absolute bottom-1/3 right-0 w-32 h-px bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent"></div>

        {/* Scattered colorful dots */}
        <div className="absolute top-24 left-3/4 w-2 h-2 bg-yellow-400/60 rounded-full blur-sm"></div>
        <div className="absolute top-1/2 left-12 w-1.5 h-1.5 bg-red-400/50 rounded-full blur-sm"></div>
        <div className="absolute bottom-24 right-12 w-2.5 h-2.5 bg-green-400/55 rounded-full blur-sm"></div>
        <div className="absolute top-3/4 right-3/4 w-1 h-1 bg-orange-400/60 rounded-full blur-sm"></div>
        <div className="absolute bottom-1/2 left-3/4 w-2 h-2 bg-violet-400/50 rounded-full blur-sm"></div>
      </div>

      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between py-12 px-6 relative z-10">
        <div className="max-w-2xl space-y-6 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.4 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100/80 to-blue-100/80 text-purple-700 px-5 py-2.5 rounded-full font-semibold text-sm border border-purple-200/60 backdrop-blur-sm shadow-sm"
          >
            <Sparkles className="w-4 h-4" />
            ✨ Smarter AI Prompts
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight"
          >
            Generate Perfect AI<br />
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Super Prompts
            </span>{' '}
            <span className="text-slate-700">in seconds</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="text-lg text-slate-600 leading-relaxed max-w-xl"
          >
            Join <span className="font-semibold text-slate-800">200,000+</span> professionals who eliminated AI frustration and now get consistent, high-quality AI outputs on their first attempt.
            <span className="text-purple-600 font-medium"> No more endless prompt tweaking.</span>
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-4 mt-4"
          >
            <Button size="lg" className="bg-gradient-to-r from-purple-600 via-purple-700 to-blue-600 hover:from-purple-700 hover:via-purple-800 hover:to-blue-700 text-white font-bold px-6 py-3 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:scale-105">
              🚀 Get Started for FREE
            </Button>
            <a href="/pricing" className="text-slate-700 font-semibold hover:text-purple-600 transition-colors duration-150 flex items-center gap-2 group">
              View Pricing
              <span className="text-purple-600 group-hover:translate-x-1 transition-transform duration-150">→</span>
            </a>
          </motion.div>

          {/* Enhanced Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-3 mt-4 p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-purple-100/50 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-400 to-red-400 border-2 border-white"></div>
              </div>
              <div className="text-sm">
                <div className="font-bold text-slate-800">20K+ SUPER prompters</div>
                <div className="text-slate-600">⭐⭐⭐⭐⭐ 4.9/5 rating</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Right Side Visual */}
        <div className="hidden lg:block relative w-[520px] h-[460px] mt-6 lg:mt-0 overflow-visible">
          {/* Main Interactive Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -8, 0],
            }}
            whileHover={{
              scale: 1.02,
              y: -4,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
            transition={{
              delay: 0.3,
              duration: 0.5,
              y: {
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-3xl p-6 w-[320px] flex flex-col items-center border border-purple-200/30 cursor-pointer transition-all duration-500"
            style={{
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              perspective: '1000px'
            }}
          >
            <div className="bg-gradient-to-br from-purple-500 via-purple-600 to-blue-600 rounded-2xl p-4 mb-4 shadow-xl">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div className="text-xl font-bold text-slate-800 mb-4 text-center">I want a prompt for ...</div>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button variant="outline" className="border-purple-300/60 text-purple-700 hover:bg-purple-50 hover:border-purple-400 text-sm px-4 py-2 rounded-xl font-medium transition-all duration-200">✨ AI Amplifier</Button>
              <Button variant="outline" className="border-blue-300/60 text-blue-700 hover:bg-blue-50 hover:border-blue-400 text-sm px-4 py-2 rounded-xl font-medium transition-all duration-200">🎯 Primer</Button>
              <Button variant="outline" className="border-indigo-300/60 text-indigo-700 hover:bg-indigo-50 hover:border-indigo-400 text-sm px-4 py-2 rounded-xl font-medium transition-all duration-200">🧠 Mastermind</Button>
            </div>
          </motion.div>

          {/* Enhanced Floating Feature Cards */}
          <motion.div
            initial={{ opacity: 0, x: 40, y: -40 }}
            animate={{
              opacity: 1,
              x: [0, 5, 0],
              y: [-5, 0, -5]
            }}
            whileHover={{
              scale: 1.03,
              y: -3,
              transition: { duration: 0.25, ease: "easeOut" }
            }}
            transition={{
              delay: 0.4,
              duration: 0.6,
              x: { duration: 8, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 9, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute top-4 right-4 bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-xl p-4 w-40 border border-purple-100/50 cursor-pointer transition-all duration-300"
            style={{
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              perspective: '1000px'
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg">
                <Zap className="w-3 h-3 text-white" />
              </div>
              <div className="font-bold text-xs text-slate-800">Prompt Generation</div>
            </div>
            <div className="text-xs text-slate-600 leading-relaxed">⚡ Instantly create AI-ready prompts.</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -40, y: -40 }}
            animate={{
              opacity: 1,
              x: [0, -5, 0],
              y: [-5, 0, -5]
            }}
            whileHover={{
              scale: 1.03,
              y: -3,
              transition: { duration: 0.25, ease: "easeOut" }
            }}
            transition={{
              delay: 0.5,
              duration: 0.6,
              x: { duration: 9, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 10, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute top-4 left-4 bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-xl p-4 w-40 border border-blue-100/50 cursor-pointer transition-all duration-300"
            style={{
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              perspective: '1000px'
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                <Brain className="w-3 h-3 text-white" />
              </div>
              <div className="font-bold text-xs text-slate-800">Brainstorming</div>
            </div>
            <div className="text-xs text-slate-600 leading-relaxed">🧠 Unlock fresh ideas with AI-powered prompts.</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40, y: 40 }}
            animate={{
              opacity: 1,
              x: [0, 5, 0],
              y: [5, 0, 5]
            }}
            whileHover={{
              scale: 1.03,
              y: -3,
              transition: { duration: 0.25, ease: "easeOut" }
            }}
            transition={{
              delay: 0.6,
              duration: 0.6,
              x: { duration: 10, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 8, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-xl p-4 w-40 border border-green-100/50 cursor-pointer transition-all duration-300"
            style={{
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              perspective: '1000px'
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-gradient-to-r from-green-500 to-green-600 rounded-lg">
                <Target className="w-3 h-3 text-white" />
              </div>
              <div className="font-bold text-xs text-slate-800">Writing Improvement</div>
            </div>
            <div className="text-xs text-slate-600 leading-relaxed">✍️ Enhance clarity, tone, and style effortlessly.</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -40, y: 40 }}
            animate={{
              opacity: 1,
              x: [0, -5, 0],
              y: [5, 0, 5]
            }}
            whileHover={{
              scale: 1.03,
              y: -3,
              transition: { duration: 0.25, ease: "easeOut" }
            }}
            transition={{
              delay: 0.7,
              duration: 0.6,
              x: { duration: 11, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 9, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-xl p-4 w-40 border border-orange-100/50 cursor-pointer transition-all duration-300"
            style={{
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              perspective: '1000px'
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
              <div className="font-bold text-xs text-slate-800">AI Algorithm</div>
            </div>
            <div className="text-xs text-slate-600 leading-relaxed">🤖 Choose the right algorithm to shape your prompt.</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{
              opacity: 1,
              y: [0, 6, 0]
            }}
            whileHover={{
              scale: 1.03,
              y: -3,
              transition: { duration: 0.25, ease: "easeOut" }
            }}
            transition={{
              delay: 0.8,
              duration: 0.6,
              y: { duration: 12, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute left-1/2 bottom-4 -translate-x-1/2 bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-xl p-4 w-40 border border-pink-100/50 cursor-pointer transition-all duration-300"
            style={{
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              perspective: '1000px'
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg">
                <Target className="w-3 h-3 text-white" />
              </div>
              <div className="font-bold text-xs text-slate-800">Prompt Optimization</div>
            </div>
            <div className="text-xs text-slate-600 leading-relaxed">🎯 Refine prompts for better AI results.</div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}