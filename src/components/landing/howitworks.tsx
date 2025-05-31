'use client'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

const steps = [
  {
    title: '1. Enter Your Idea',
    desc: 'Type your vague or unstructured prompt idea.',
  },
  {
    title: '2. Select Tone & Options',
    desc: 'Choose the tone and any advanced settings.',
  },
  {
    title: '3. Get Optimized Prompt',
    desc: 'Receive a clear, ready-to-use prompt for ChatGPT or any AI.',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-12">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center max-w-xs"
            >
              <CheckCircle className="h-10 w-10 text-yellow-500 mb-4" />
              <h3 className="font-bold text-lg mb-2">{step.title}</h3>
              <p className="text-gray-500 dark:text-gray-300">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 