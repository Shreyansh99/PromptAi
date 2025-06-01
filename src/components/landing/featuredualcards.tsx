'use client'
import { motion } from 'framer-motion'
import { Wrench, AlertTriangle, CircleDollarSign, Zap, BarChart2, PlayCircle } from 'lucide-react'

const leftFeatures = [
  {
    icon: <Wrench className="h-6 w-6 text-purple-600" />,
    text: 'Fine-tunes your input for clear, accurate, and high-quality AI responses',
  },
  {
    icon: <AlertTriangle className="h-6 w-6 text-purple-600" />,
    text: 'Avoid generic, vague, or misinterpreted AI replies',
  },
  {
    icon: <CircleDollarSign className="h-6 w-6 text-purple-600" />,
    text: 'Works across multiple AI models to find the best phrasing for your needs',
  },
]

const rightFeatures = [
  {
    icon: <Zap className="h-6 w-6 text-purple-600" />,
    text: 'Eliminates manual tweaking by guiding you toward the most effective prompt',
  },
  {
    icon: <BarChart2 className="h-6 w-6 text-purple-600" />,
    text: 'Allows you to compare AI responses side by side for better insights',
  },
  {
    icon: <PlayCircle className="h-6 w-6 text-purple-600" />,
    text: 'Helps you generate high-quality results faster, without frustration',
  },
]

export default function FeatureDualCards() {
  return (
    <section className="relative z-10 bg-white py-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.03),transparent_70%)] pointer-events-none"></div>

      <div className="container mx-auto flex flex-col md:flex-row gap-6 justify-center items-stretch relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 flex-1 max-w-xl flex flex-col justify-between border border-gray-100 hover:border-purple-200 hover:-translate-y-2"
        >
          <div>
            <div className="text-purple-600 font-semibold mb-2 uppercase text-xs tracking-widest">Smarter Prompts, Better Results</div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-purple-700 transition-colors duration-300">Optimize AI Output with Precision</h3>
            <p className="text-gray-600 mb-6 leading-relaxed text-sm">AI is only as good as the prompts you provide. Poorly structured prompts lead to weak responses.</p>
            <ul className="space-y-4">
              {leftFeatures.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <div className="bg-purple-100 rounded-lg p-1.5 mt-0.5 group-hover:bg-purple-200 transition-colors duration-300">
                    {f.icon}
                  </div>
                  <span className="leading-relaxed text-sm">{f.text}</span>
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
          className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 flex-1 max-w-xl flex flex-col justify-between border border-gray-100 hover:border-purple-200 hover:-translate-y-2"
        >
          <div>
            <div className="text-purple-600 font-semibold mb-2 uppercase text-xs tracking-widest">Refine Faster, Think Bigger</div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-purple-700 transition-colors duration-300">Skip the Guesswork & Boost Efficiency</h3>
            <p className="text-gray-600 mb-6 leading-relaxed text-sm">Trial-and-error prompting wastes time and leads to inconsistent results.</p>
            <ul className="space-y-4">
              {rightFeatures.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <div className="bg-purple-100 rounded-lg p-1.5 mt-0.5 group-hover:bg-purple-200 transition-colors duration-300">
                    {f.icon}
                  </div>
                  <span className="leading-relaxed text-sm">{f.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  )
}