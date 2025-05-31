'use client'
import { motion } from 'framer-motion'
import { Sparkles, Wand2, Brain, PenLine } from 'lucide-react'

const features = [
  {
    icon: <Sparkles className="h-8 w-8 text-yellow-500" />,
    title: 'Prompt Generation',
    desc: 'Instantly create AI-ready prompts for any use case.',
  },
  {
    icon: <Wand2 className="h-8 w-8 text-orange-500" />,
    title: 'Prompt Optimization',
    desc: 'Refine and enhance prompts for better AI results.',
  },
  {
    icon: <Brain className="h-8 w-8 text-purple-500" />,
    title: 'Brainstorming',
    desc: 'Unlock fresh ideas with AI-powered suggestions.',
  },
  {
    icon: <PenLine className="h-8 w-8 text-blue-500" />,
    title: 'Writing Improvement',
    desc: 'Enhance clarity, tone, and style effortlessly.',
  },
]

export default function Features() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-yellow-50 dark:from-gray-950 dark:to-yellow-900">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Why Prompt Genie?</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center"
            >
              {f.icon}
              <h3 className="font-bold text-lg mt-4 mb-2">{f.title}</h3>
              <p className="text-gray-500 dark:text-gray-300">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 