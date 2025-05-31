'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'

const examples = [
  {
    title: 'Creative Writing',
    description: 'Generate engaging stories and creative content',
    before: 'Write a story about a magical forest',
    after: 'Create an engaging short story set in an enchanted forest. Include vivid descriptions of the magical elements, develop a compelling protagonist, and incorporate a meaningful conflict that leads to personal growth. The story should be approximately 1000 words and maintain a sense of wonder throughout.'
  },
  {
    title: 'Business Email',
    description: 'Craft professional and effective business communications',
    before: 'Write an email to schedule a meeting',
    after: 'Compose a professional email to schedule a meeting with the marketing team. Include a clear subject line, a brief context for the meeting, 2-3 proposed time slots, and a request for agenda items. Maintain a courteous and efficient tone while ensuring all necessary details are provided.'
  },
  {
    title: 'Technical Documentation',
    description: 'Create clear and comprehensive technical guides',
    before: 'Explain how to use the API',
    after: 'Create a comprehensive guide for developers on how to integrate with our REST API. Include authentication methods, endpoint descriptions with request/response examples, error handling, rate limiting information, and best practices. Use clear code examples in multiple programming languages and provide troubleshooting tips.'
  }
]

const ExamplesPage = () => {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
            Prompt Examples
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            See how Prompt Genie transforms basic prompts into powerful, detailed instructions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
          {examples.map((example, index) => (
            <motion.div
              key={example.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{example.title}</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">{example.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Before:</h3>
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg relative">
                      <p className="text-gray-700 dark:text-gray-300">{example.before}</p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={() => handleCopy(example.before)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">After:</h3>
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg relative">
                      <p className="text-gray-700 dark:text-gray-300">{example.after}</p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={() => handleCopy(example.after)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ExamplesPage 