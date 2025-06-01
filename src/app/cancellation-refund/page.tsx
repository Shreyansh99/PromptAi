'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, FileText } from 'lucide-react';

export default function CancellationRefundPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.03),transparent_70%)] pointer-events-none"></div>

      {/* Header Section */}
      <section className="relative pt-12 pb-8 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
          >
            Cancellation &{' '}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Refund Policy
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            We believe in transparency and fairness. Here's everything you need to know about our policies.
          </motion.p>
        </div>
      </section>
      {/* Policy Content */}
      <section className="relative px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 shadow-lg p-6 md:p-8 relative overflow-hidden"
          >
            {/* Decorative corner elements */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-100/40 to-blue-100/40 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-full blur-xl"></div>

            <div className="relative z-10 space-y-8">
              {/* Cancellation Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="border-l-4 border-purple-400 pl-6 py-2"
              >
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Subscription Cancellation</h3>
                <p className="text-slate-700 leading-relaxed mb-4">
                  We understand the importance of transparency regarding cancellations and refunds. Subscriptions are recurring, and you will be automatically billed until you choose to cancel. You can cancel at any time by logging into your account via your{' '}
                  <a href="https://billing.stripe.com/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700 font-semibold underline decoration-purple-300 hover:decoration-purple-500 transition-colors duration-200">
                    Stripe Portal
                  </a>
                </p>
                <p className="text-slate-700 leading-relaxed">
                  or your account dashboard under{' '}
                  <span className="font-semibold text-slate-800 bg-slate-100 px-2 py-1 rounded-md text-sm">
                    My Account → Cancel Subscription
                  </span>. Once canceled, no further charges will be applied.
                </p>
              </motion.div>

              {/* Refund Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="border-l-4 border-blue-400 pl-6 py-2"
              >
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Refund Policy</h3>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Please note that due to the significant operating costs associated with our product, payments for subscriptions are generally non-refundable. However, if you believe your situation warrants a refund due to a bug or error in our product or service, we encourage you to schedule a call with our support team.
                </p>
                <p className="text-slate-700 leading-relaxed mb-4">
                  During this call, you will have the opportunity to demonstrate the issue, and we will work to address and resolve any potential problems to maintain our high-quality standards.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  To initiate the refund request process, please contact our support team at{' '}
                  <a href="mailto:team@promptpilot.com" className="text-purple-600 hover:text-purple-700 font-semibold underline decoration-purple-300 hover:decoration-purple-500 transition-colors duration-200">
                    team@promptpilot.com
                  </a>{' '}
                  to schedule your call.
                </p>
              </motion.div>

              {/* Closing Note */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="text-center pt-6 border-t border-gray-200"
              >
                <p className="text-slate-600 leading-relaxed italic">
                  We appreciate your understanding and cooperation.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}