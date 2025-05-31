'use client'
import { motion } from 'framer-motion'
import { Wrench, AlertTriangle, CircleDollarSign, Zap, BarChart2, PlayCircle } from 'lucide-react'

const leftFeatures = [
  {
    icon: <Wrench className="h-6 w-6 text-yellow-400" />,
    text: 'Fine-tunes your input for clear, accurate, and high-quality AI responses',
  },
  {
    icon: <AlertTriangle className="h-6 w-6 text-yellow-400" />,
    text: 'Avoid generic, vague, or misinterpreted AI replies',
  },
  {
    icon: <CircleDollarSign className="h-6 w-6 text-yellow-400" />,
    text: 'Works across multiple AI models to find the best phrasing for your needs',
  },
]

const rightFeatures = [
  {
    icon: <Zap className="h-6 w-6 text-yellow-400" />,
    text: 'Eliminates manual tweaking by guiding you toward the most effective prompt',
  },
  {
    icon: <BarChart2 className="h-6 w-6 text-yellow-400" />,
    text: 'Allows you to compare AI responses side by side for better insights',
  },
  {
    icon: <PlayCircle className="h-6 w-6 text-yellow-400" />,
    text: 'Helps you generate high-quality results faster, without frustration',
  },
]

export default function FeatureDualCards() {
  return (
    <section className="relative z-10">
      {/* Top wave background */}
      <div className="absolute inset-x-0 -top-24 h-64 pointer-events-none z-0">
        <svg viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path fill="#FFF7E6" d="M0,160L80,170.7C160,181,320,203,480,197.3C640,192,800,160,960,154.7C1120,149,1280,171,1360,181.3L1440,192L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z" />
        </svg>
      </div>
      <div className="container mx-auto flex flex-col md:flex-row gap-8 justify-center items-stretch py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-xl p-10 flex-1 max-w-xl flex flex-col justify-between"
        >
          <div>
            <div className="text-yellow-500 font-semibold mb-2 uppercase text-xs tracking-widest">Smarter Prompts, Better Results</div>
            <h3 className="text-2xl font-bold mb-2 text-gray-900">Optimize AI Output with Precision</h3>
            <p className="text-gray-500 mb-6">AI is only as good as the prompts you provide. Poorly structured prompts lead to weak responses.</p>
            <ul className="space-y-4">
              {leftFeatures.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700">
                  {f.icon}
                  <span>{f.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-xl p-10 flex-1 max-w-xl flex flex-col justify-between"
        >
          <div>
            <div className="text-yellow-500 font-semibold mb-2 uppercase text-xs tracking-widest">Refine Faster, Think Bigger</div>
            <h3 className="text-2xl font-bold mb-2 text-gray-900">Skip the Guesswork & Boost Efficiency</h3>
            <p className="text-gray-500 mb-6">Trial-and-error prompting wastes time and leads to inconsistent results.</p>
            <ul className="space-y-4">
              {rightFeatures.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700">
                  {f.icon}
                  <span>{f.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 