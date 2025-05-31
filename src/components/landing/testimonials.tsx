'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

const testimonials = [
  {
    name: 'Jane Doe',
    role: 'Product Manager',
    avatar: '/avatars/jane.png',
    quote: 'Prompt Genie helped our team get better AI results, faster. The optimization is magical!',
  },
  {
    name: 'John Smith',
    role: 'AI Researcher',
    avatar: '/avatars/john.png',
    quote: 'I love how easy it is to turn rough ideas into perfect prompts. Highly recommended!',
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-b from-yellow-50 to-white dark:from-yellow-900 dark:to-gray-950">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">What Users Say</h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 max-w-md flex flex-col items-center text-center"
            >
              <Image src={t.avatar} alt={t.name} width={64} height={64} className="rounded-full mb-4" />
              <blockquote className="italic text-lg mb-4">“{t.quote}”</blockquote>
              <div className="font-bold">{t.name}</div>
              <div className="text-gray-500 text-sm">{t.role}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 