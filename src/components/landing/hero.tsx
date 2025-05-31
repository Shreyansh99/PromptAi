'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-[600px] flex items-center bg-gradient-to-br from-yellow-50 via-orange-100 to-orange-200 dark:from-yellow-900 dark:via-orange-900 dark:to-orange-800">
      {/* Left Side */}
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-20 relative z-10">
        <div className="max-w-xl space-y-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-yellow-500 font-semibold tracking-wide uppercase"
          >
            Smarter AI Prompts
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white"
          >
            Generate Perfect AI<br />Super Prompts in seconds
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-gray-500 dark:text-gray-200"
          >
            Join 200,000+ professionals who eliminated AI frustration and now get consistent, high-quality AI outputs on their first attempt. No more endless prompt tweaking.
          </motion.p>
          <div className="flex items-center gap-4 mt-6">
            <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-3 rounded-full shadow-lg">
              Get Started for FREE
            </Button>
            <a href="/pricing" className="text-gray-700 dark:text-gray-200 font-medium hover:underline">
              View Pricing &rarr;
            </a>
          </div>
          <div className="flex items-center gap-2 mt-6">
            {/* Example avatars */}
            <Image src="/avatars.png" alt="Users" width={100} height={32} className="rounded-full" />
            <span className="text-gray-600 dark:text-gray-300 text-sm">Join 20K+ SUPER prompters</span>
          </div>
        </div>

        {/* Right Side Floating Cards */}
        <div className="hidden md:block relative w-[500px] h-[400px]">
          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl shadow-2xl p-10 w-[350px] flex flex-col items-center"
          >
            <div className="bg-yellow-400 rounded-full p-4 mb-4">
              {/* Replace with your logo or icon */}
              <svg width="40" height="40" fill="none"><circle cx="20" cy="20" r="20" fill="#fff" /></svg>
            </div>
            <div className="text-xl font-semibold text-gray-700 mb-4">I want a prompt for ...</div>
            <div className="flex gap-2">
              <Button variant="outline" className="border-yellow-400 text-yellow-600">AI Amplifier</Button>
              <Button variant="ghost">Primer</Button>
              <Button variant="ghost">Mastermind</Button>
            </div>
          </motion.div>
          {/* Floating Feature Cards */}
          <motion.div
            initial={{ opacity: 0, x: 40, y: -40 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute top-0 right-0 bg-white rounded-xl shadow-lg p-4 w-48"
          >
            <div className="font-bold text-sm mb-1">Prompt Generation</div>
            <div className="text-xs text-gray-500">Instantly create AI-ready prompts.</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -40, y: -40 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.6 }}
            className="absolute top-0 left-0 bg-white rounded-xl shadow-lg p-4 w-48"
          >
            <div className="font-bold text-sm mb-1">Brainstorming</div>
            <div className="text-xs text-gray-500">Unlock fresh ideas with AI-powered prompts.</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40, y: 40 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.7 }}
            className="absolute bottom-0 right-0 bg-white rounded-xl shadow-lg p-4 w-48"
          >
            <div className="font-bold text-sm mb-1">Writing Improvement</div>
            <div className="text-xs text-gray-500">Enhance clarity, tone, and style effortlessly.</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -40, y: 40 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-0 left-0 bg-white rounded-xl shadow-lg p-4 w-48"
          >
            <div className="font-bold text-sm mb-1">AI Algorithm</div>
            <div className="text-xs text-gray-500">Choose the right algorithm to shape your prompt.</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="absolute left-1/2 bottom-0 -translate-x-1/2 bg-white rounded-xl shadow-lg p-4 w-48"
          >
            <div className="font-bold text-sm mb-1">Prompt Optimization</div>
            <div className="text-xs text-gray-500">Refine prompts for better AI results.</div>
          </motion.div>
        </div>
      </div>
      {/* Gradient BG Shape */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute right-0 top-0 w-2/3 h-full bg-gradient-to-br from-yellow-200 via-orange-200 to-orange-400 rounded-bl-[300px] opacity-80"></div>
      </div>
    </section>
  )
} 