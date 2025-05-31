'use client'
import Image from 'next/image'

export default function TrustedBy() {
  return (
    <section className="py-12 bg-white dark:bg-gray-950">
      <div className="container mx-auto text-center">
        <h3 className="text-gray-500 uppercase tracking-widest text-xs mb-6">Diverse AI Model Support</h3>
        <h2 className="text-2xl font-bold mb-4">Generate, compare and refine prompts across multiple AI models.</h2>
        <div className="flex flex-wrap justify-center items-center gap-8 mt-8">
          <Image src="/logos/openai.svg" alt="OpenAI" width={60} height={32} />
          <Image src="/logos/meta.svg" alt="Meta" width={60} height={32} />
          <Image src="/logos/aws.svg" alt="AWS" width={60} height={32} />
          <Image src="/logos/anthropic.svg" alt="Anthropic" width={60} height={32} />
          <span className="text-gray-400 text-lg">+ more</span>
        </div>
      </div>
    </section>
  )
} 