'use client'
import { motion } from 'framer-motion'
import { Wand2, Rocket, Sparkles } from 'lucide-react'
import { useState } from 'react'

const steps = [
  {
    title: 'Select Your Algorithm',
    desc: 'Choose between AI Prompt Fixer, Smart AI, or Mastermind—each designed to generate super prompts tailored to the complexity of your task.',
  },
  {
    title: 'AI Optimized Through Prompt Engineering',
    desc: 'PromptPilot uses advanced AI to enhance your algorithms, use advanced prompt engineering to optimize AI responses, delivering clear and actionable instructions for precise results.',
  },
  {
    title: 'Generate Super Prompts for Any Task',
    desc: 'Whether you need simple or complex, PromptPilot refines your inputs into super prompts that ensure consistent, high-quality outcomes every time.',
  },
]

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(2) // Default to third step (index 2)
  return (
    <section className="relative bg-white py-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(139,92,246,0.05),transparent_50%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(59,130,246,0.03),transparent_50%)] pointer-events-none"></div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 px-4 py-2 rounded-full font-semibold text-sm border border-purple-200 mb-6"
          >
            <Sparkles className="w-4 h-4" />
            BETTER PROMPTS. BETTER RESULTS.
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-center mb-4 text-gray-900 max-w-3xl"
          >
            Follow a few simple steps to craft the{' '}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              perfect AI prompt.
            </span>
          </motion.h2>
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto">
          {/* Left Side - Steps */}
          <div className="flex-1 space-y-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                onClick={() => setActiveStep(i)}
                className={`relative pl-6 pb-6 cursor-pointer transition-all duration-300 hover:bg-purple-50/50 rounded-lg p-4 -ml-4 ${
                  activeStep === i ? 'border-l-4 border-purple-400' : 'border-l-2 border-gray-200'
                } ${i === steps.length - 1 ? 'border-l-0' : ''}`}
              >
                {/* Step indicator */}
                <div className={`absolute -left-2 top-4 w-4 h-4 rounded-full transition-all duration-300 ${
                  activeStep === i ? 'bg-purple-400' : 'bg-gray-300'
                }`}></div>

                <h3 className={`text-lg font-bold mb-2 transition-colors duration-300 ${
                  activeStep === i ? 'text-purple-600' : 'text-gray-900'
                }`}>
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Right Side - Visual Mockup */}
          <div className="flex-1 max-w-lg">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Main Card */}
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl p-8 shadow-2xl">
                {/* Feature Cards */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-xs font-medium text-gray-700">Brainstorming</span>
                    </div>
                    <p className="text-xs text-gray-600">Unlock fresh ideas with AI-powered prompts.</p>
                  </div>

                  <div className="bg-white rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <Wand2 className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-xs font-medium text-gray-700">Prompt Generation</span>
                    </div>
                    <p className="text-xs text-gray-600">Instantly create AI-ready prompts.</p>
                  </div>
                </div>

                {/* Central Input */}
                <div className="bg-white rounded-2xl p-6 mb-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-gray-800 font-semibold text-lg mb-4">
                    I want a prompt for ...
                  </p>
                  <div className="flex gap-2 justify-center flex-wrap">
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">AI Amplifier</span>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">Primer</span>
                    <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">Mastermind</span>
                  </div>
                </div>

                {/* Bottom Feature Cards */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white/20 rounded-lg p-3 text-center">
                    <div className="w-6 h-6 bg-white/30 rounded-full mx-auto mb-1"></div>
                    <p className="text-white text-xs font-medium">AI Algorithm</p>
                    <p className="text-white/80 text-xs">Choose the right algorithm to shape your prompt.</p>
                  </div>

                  <div className="bg-white/20 rounded-lg p-3 text-center">
                    <div className="w-6 h-6 bg-white/30 rounded-full mx-auto mb-1"></div>
                    <p className="text-white text-xs font-medium">Prompt Optimization</p>
                    <p className="text-white/80 text-xs">Refine prompts for better AI results.</p>
                  </div>

                  <div className="bg-white/20 rounded-lg p-3 text-center">
                    <div className="w-6 h-6 bg-white/30 rounded-full mx-auto mb-1"></div>
                    <p className="text-white text-xs font-medium">Writing Improvement</p>
                    <p className="text-white/80 text-xs">Enhance clarity, tone, and style effortlessly.</p>
                  </div>
                </div>
              </div>

              {/* Simple Floating Elements */}
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-purple-500 rounded-full opacity-80 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>

              <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-blue-500 rounded-full opacity-70 flex items-center justify-center">
                <Wand2 className="w-5 h-5 text-white" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}