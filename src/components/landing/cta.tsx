'use client'
import { Button } from '@/components/ui/button'

export default function CTA() {
  return (
    <section className="py-20 bg-yellow-400 text-center">
      <h2 className="text-3xl font-bold mb-4 text-gray-900">Ready to generate perfect prompts?</h2>
      <p className="text-lg mb-8 text-gray-800">Start for free and join 20,000+ super prompters today.</p>
      <Button size="lg" className="bg-black text-yellow-400 font-bold px-8 py-4 rounded-full shadow-lg hover:bg-gray-900">
        Get Started for FREE
      </Button>
    </section>
  )
} 