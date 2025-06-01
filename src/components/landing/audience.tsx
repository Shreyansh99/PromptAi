'use client'
import { motion } from 'framer-motion'
import { Briefcase, Repeat, Feather } from 'lucide-react'

const audience = [
  {
    icon: <Briefcase className="h-10 w-10 text-yellow-400 mx-auto" />,
    title: 'Entrepreneurs & Business Owners',
    subtitle: 'AI-Powered Growth',
    desc: 'Leverage AI for smarter decision-making, marketing, and customer engagement.',
  },
  {
    icon: <Repeat className="h-10 w-10 text-yellow-400 mx-auto" />,
    title: 'SaaS Creators & Tech Innovators',
    subtitle: 'Smarter AI Workflows',
    desc: 'Enhance your AI-powered products and workflows with better prompts.',
  },
  {
    icon: <Feather className="h-10 w-10 text-yellow-400 mx-auto" />,
    title: 'Content Creators & Marketers',
    subtitle: 'Effortless Content',
    desc: 'Generate high-converting copy, social posts, and marketing strategies.',
  },
]

export default function Audience() {
  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-purple-50/30 py-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(139,92,246,0.05),transparent_50%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.03),transparent_50%)] pointer-events-none"></div>

      <div className="container mx-auto relative z-10 px-4">
        <div className="flex flex-col items-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 px-4 py-2 rounded-full font-semibold text-sm border border-purple-200 mb-6"
          >
            IS PROMPT GENIE A GOOD FIT FOR YOU?
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-center mb-6 text-gray-900"
          >
            For Founders, Creators &{' '}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Growth-Driven Pros
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-lg text-center max-w-3xl mx-auto text-gray-600 leading-relaxed"
          >
            AI is only as good as the prompts you give it. Whether you&apos;re creating content, analyzing data, or experimenting with AI tools, PromptPilot helps you get the best results—faster.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {audience.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
              className="group flex flex-col items-center text-center bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200 hover:-translate-y-2"
            >
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-r from-purple-100 to-blue-100 rounded-full p-4 border border-purple-200 group-hover:border-purple-300 transition-colors duration-300">
                  <Briefcase className={`h-6 w-6 text-purple-600 ${i === 0 ? '' : 'hidden'}`} />
                  <Repeat className={`h-6 w-6 text-purple-600 ${i === 1 ? '' : 'hidden'}`} />
                  <Feather className={`h-6 w-6 text-purple-600 ${i === 2 ? '' : 'hidden'}`} />
                </div>
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-purple-700 transition-colors duration-300">{a.title}</h3>
              <div className="text-purple-600 font-semibold mb-3 text-sm">{a.subtitle}</div>
              <p className="text-gray-600 text-sm leading-relaxed">{a.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}