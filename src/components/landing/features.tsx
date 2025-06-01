'use client'
import { motion } from 'framer-motion'
import { Sparkles, Zap, Shield, Users } from 'lucide-react'

const features = [
  {
    icon: <Sparkles className="h-6 w-6 text-purple-600" />,
    title: 'Optimized Prompts',
    desc: 'Get better results from your AI tools with our optimized prompt library.',
  },
  {
    icon: <Zap className="h-6 w-6 text-purple-600" />,
    title: 'Fast & Easy',
    desc: 'Get started in minutes with our simple and intuitive interface.',
  },
  {
    icon: <Shield className="h-6 w-6 text-purple-600" />,
    title: 'Secure & Private',
    desc: 'Your data is always secure and private with our enterprise-grade security.',
  },
  {
    icon: <Users className="h-6 w-6 text-purple-600" />,
    title: 'Collaborative',
    desc: 'Work together with your team to create and share prompts.',
  },
]

export default function Features() {
  return (
    <section className="relative bg-white py-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(139,92,246,0.05),transparent_50%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.03),transparent_50%)] pointer-events-none"></div>

      <div className="container mx-auto">
        <div className="flex flex-col items-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-purple-50 text-purple-700 px-4 py-2 rounded-full font-semibold text-sm border border-purple-200 mb-4"
          >
            <Sparkles className="w-4 h-4" />
            FEATURES
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-center mb-4 text-gray-900"
          >
            Why Choose{' '}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              PromptPilot?
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-lg text-center max-w-2xl mx-auto text-gray-600 leading-relaxed"
          >
            Get better results from your AI tools with our optimized prompt library and advanced features.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
              className="group flex flex-col items-center text-center bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200 hover:-translate-y-2"
            >
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-r from-purple-100 to-blue-100 rounded-full p-4 border border-purple-200 group-hover:border-purple-300 transition-colors duration-300">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 group-hover:text-purple-700 transition-colors duration-300">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}