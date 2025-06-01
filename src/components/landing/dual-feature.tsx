'use client'
import { motion } from 'framer-motion'
import { Sparkles, Zap } from 'lucide-react'

const features = [
  {
    icon: <Sparkles className="h-10 w-10 text-[#a78bfa]" />,
    title: 'Optimized Prompts',
    desc: 'Get better results from your AI tools with our optimized prompt library.',
  },
  {
    icon: <Zap className="h-10 w-10 text-[#a78bfa]" />,
    title: 'Fast & Easy',
    desc: 'Get started in minutes with our simple and intuitive interface.',
  },
]

export default function DualFeature() {
  return (
    <section className="relative bg-gradient-to-br from-[#5b3fa7]/80 to-[#2d1e5f]/90 py-24 overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col items-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-[#2d1e5f]/80 text-[#a78bfa] px-6 py-2 rounded-full font-semibold text-xs mb-4 backdrop-blur-md border border-[#a78bfa]/20"
          >
            FEATURES
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-center mb-4 text-white drop-shadow-lg"
          >
            Why Choose PromptPilot?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-lg text-center max-w-2xl mx-auto text-gray-300"
          >
            Get better results from your AI tools with our optimized prompt library.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center bg-[#2d1e5f]/80 rounded-2xl p-8 shadow-lg backdrop-blur-md border border-[#a78bfa]/20"
            >
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-[#a78bfa]/20 rounded-full blur-xl"></div>
                <div className="relative bg-[#2d1e5f]/80 backdrop-blur-sm rounded-full p-6 border border-[#a78bfa]/20">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-300">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 