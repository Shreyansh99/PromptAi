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
    <section className="relative bg-[#3B3450] text-white py-24 overflow-hidden">
      {/* Top wave */}
      <div className="absolute inset-x-0 -top-24 h-32 pointer-events-none z-0">
        <svg viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path fill="#FFF7E6" d="M0,160L80,170.7C160,181,320,203,480,197.3C640,192,800,160,960,154.7C1120,149,1280,171,1360,181.3L1440,192L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z" />
        </svg>
      </div>
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col items-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-yellow-100 text-[#3B3450] px-6 py-2 rounded-full font-semibold text-xs mb-4"
          >
            IS PROMPT GENIE A GOOD FIT FOR YOU?
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-center mb-4"
          >
            For Founders, Creators & Growth-Driven Pros
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-lg text-center max-w-2xl mx-auto text-white/80"
          >
            AI is only as good as the prompts you give it. Whether you're creating content, analyzing data, or experimenting with AI tools, Prompt Genie helps you get the best results—faster.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
          {audience.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              {a.icon}
              <h3 className="font-bold text-lg mt-4 mb-1">{a.title}</h3>
              <div className="text-yellow-400 font-semibold mb-2">{a.subtitle}</div>
              <p className="text-white/80">{a.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Bottom wave */}
      <div className="absolute inset-x-0 bottom-0 h-24 pointer-events-none z-0">
        <svg viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path fill="#fff" d="M0,160L80,170.7C160,181,320,203,480,197.3C640,192,800,160,960,154.7C1120,149,1280,171,1360,181.3L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z" />
        </svg>
      </div>
    </section>
  )
} 