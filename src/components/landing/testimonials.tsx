'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Sparkles, Quote } from 'lucide-react'

const testimonials = [
  {
    quote: "PromptPilot has transformed how we interact with AI. The optimized prompts have saved us countless hours and improved our results significantly.",
    author: "Sarah Chen",
    role: "Product Manager, TechCorp",
    image: "/testimonials/sarah.jpg"
  },
  {
    quote: "As a content creator, I was struggling with AI tools until I found PromptPilot. Now I can generate high-quality content in minutes.",
    author: "Michael Rodriguez",
    role: "Content Creator",
    image: "/testimonials/michael.jpg"
  },
  {
    quote: "The prompt library is a game-changer. We've been able to scale our AI operations without hiring additional prompt engineers.",
    author: "David Kim",
    role: "CTO, AI Solutions",
    image: "/testimonials/david.jpg"
  }
]

export default function Testimonials() {
  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-purple-50/30 py-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(139,92,246,0.05),transparent_50%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.03),transparent_50%)] pointer-events-none"></div>

      <div className="container mx-auto">
        <div className="flex flex-col items-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 px-4 py-2 rounded-full font-semibold text-sm border border-purple-200 mb-4"
          >
            <Sparkles className="w-4 h-4" />
            TRUSTED BY THOUSANDS
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-center mb-4 text-gray-900"
          >
            What Our{' '}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Users Say
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-lg text-center max-w-2xl mx-auto text-gray-600 leading-relaxed"
          >
            Join thousands of satisfied users who have transformed their AI interactions with Prompt Genie.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
              className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200 hover:-translate-y-2 relative"
            >
              <div className="absolute top-4 right-4 text-purple-200 group-hover:text-purple-300 transition-colors duration-300">
                <Quote className="w-6 h-6" />
              </div>
              <div className="mb-4">
                <p className="text-gray-700 leading-relaxed text-sm mb-4">"{testimonial.quote}"</p>
              </div>
              <div className="flex items-center">
                <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3 border-2 border-purple-200">
                  <div className="w-full h-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.author.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-purple-700 transition-colors duration-300 text-sm">{testimonial.author}</h3>
                  <p className="text-xs text-purple-600 font-medium">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}