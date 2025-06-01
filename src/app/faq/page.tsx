'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Plus, Minus, Sparkles, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What is included in the free plan?',
    answer: 'Free plan gives you 7 bonus prompts to start with, after which you get 1 prompt per day. You can use it both on the website or directly in ChatGPT using the chrome extension!',
  },
  {
    question: 'What will I get in the Pro Plan?',
    answer: 'Unlimited access to PromptPilot and prompt generations',
  },
  {
    question: 'Can I generate unlimited prompts?',
    answer: 'Absolutely! You can generate unlimited prompts in the Pro plans!',
  },
  {
    question: 'What is your refund policy?',
    answer: 'Our refund policy is designed to be fair and transparent. In general, payments are non-refundable, but if you encounter an issue due to a bug or error in our service, you may be eligible for a refund. You can learn more about our refund policy here.',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.08),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.06),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(168,85,247,0.04),transparent_50%)]"></div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-12 h-12 bg-gradient-to-br from-blue-400/25 to-cyan-400/25 rounded-full blur-lg"></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-gradient-to-br from-violet-400/15 to-purple-400/15 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-3xl mx-auto pt-12 pb-12 px-6 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100/80 to-blue-100/80 text-purple-700 px-4 py-2 rounded-full font-semibold text-xs border border-purple-200/60 backdrop-blur-sm shadow-sm mb-4"
          >
            <HelpCircle className="w-3 h-3" />
            FAQ
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-3xl md:text-4xl font-black text-slate-900 mb-3 leading-tight"
          >
            Got Questions? We&apos;ve Got{' '}
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Answers
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-base text-slate-600 leading-relaxed max-w-xl mx-auto"
          >
            Everything you need to know about PromptPilot.{' '}
            <a href="/contact" className="text-purple-600 hover:text-purple-700 font-semibold transition-colors duration-200">
              Contact us
            </a> for more.
          </motion.p>
        </motion.div>
        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.05, duration: 0.4 }}
              className="group"
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200/60 shadow-md hover:shadow-lg transition-all duration-200 hover:border-purple-200/80 overflow-hidden">
                <button
                  className="flex items-center justify-between w-full px-5 py-4 text-left focus:outline-none group-hover:bg-purple-50/40 transition-all duration-200"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-7 h-7 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-md">
                      {i + 1}
                    </div>
                    <span className="font-semibold text-slate-800 text-base leading-snug group-hover:text-purple-700 transition-colors duration-200">
                      {faq.question}
                    </span>
                  </div>
                  <div className="flex-shrink-0 ml-3">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-all duration-200">
                      {openIndex === i ? (
                        <Minus className="w-3 h-3 text-purple-600" />
                      ) : (
                        <Plus className="w-3 h-3 text-purple-600" />
                      )}
                    </div>
                  </div>
                </button>

                {openIndex === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="border-t border-gray-100"
                  >
                    <div className="px-5 py-4 bg-gradient-to-r from-purple-50/40 to-blue-50/20">
                      <div className="pl-10">
                        <p className="text-slate-600 leading-relaxed text-sm">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Compact CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="w-full mt-12 relative"
      >
        <div className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-blue-600 rounded-t-[40px] py-10 px-6 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.08),transparent_50%)] pointer-events-none"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(255,255,255,0.04),transparent_50%)] pointer-events-none"></div>

          {/* Smaller floating elements */}
          <div className="absolute top-4 left-8 w-8 h-8 bg-white/8 rounded-full blur-md"></div>
          <div className="absolute bottom-4 right-8 w-10 h-10 bg-white/5 rounded-full blur-lg"></div>

          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="inline-flex items-center gap-2 bg-white/15 text-white px-4 py-1.5 rounded-full font-semibold text-xs backdrop-blur-sm border border-white/15 mb-4"
            >
              <Sparkles className="w-3 h-3" />
              Ready to Get Started?
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.4 }}
              className="text-2xl md:text-3xl font-black text-white mb-3 leading-tight"
            >
              Unlock Perfect Prompts
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.4 }}
              className="text-white/90 max-w-lg mx-auto text-sm leading-relaxed mb-6"
            >
              Join thousands who&apos;ve transformed their AI interactions with PromptPilot.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <Button
                size="sm"
                className="bg-white text-purple-700 hover:bg-gray-50 font-bold px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 text-sm"
              >
                🚀 Get Started FREE
              </Button>
              <a
                href="/pricing"
                className="text-white/90 font-semibold hover:text-white transition-colors duration-200 flex items-center gap-1 group text-sm"
              >
                View Pricing
                <span className="group-hover:translate-x-0.5 transition-transform duration-200">→</span>
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}