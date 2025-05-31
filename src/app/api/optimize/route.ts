import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

const optimizePrompt = (rawPrompt: string, tone: string) => {
  // Add tone-specific enhancements
  const toneEnhancers = {
    casual: "Use a friendly, conversational tone. Keep it light and engaging.",
    formal: "Maintain a professional and authoritative tone. Be precise and structured.",
    detailed: "Provide comprehensive and thorough information. Include specific examples and explanations."
  }

  // Add structure and clarity
  const structure = [
    "Be clear and specific about your request.",
    "Include relevant context and background information.",
    "Specify the desired format or structure of the response.",
    "Mention any specific requirements or constraints."
  ]

  // Combine everything into an optimized prompt
  const optimizedPrompt = `
${toneEnhancers[tone as keyof typeof toneEnhancers]}

${structure.join('\n')}

Original request: ${rawPrompt}

Please provide a well-structured response that addresses all aspects of the request while maintaining the specified tone.
`.trim()

  return optimizedPrompt
}

export async function POST(req: Request) {
  try {
    const { raw_prompt, tone = 'casual' } = await req.json()

    // Optimize the prompt
    const optimized_prompt = optimizePrompt(raw_prompt, tone)

    // Store in Supabase
    const { data, error } = await supabase
      .from('prompts')
      .insert([
        {
          raw_prompt,
          optimized_prompt,
          tone,
        },
      ])
      .select()

    if (error) throw error

    return NextResponse.json({ 
      success: true, 
      optimized_prompt,
      data 
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to optimize prompt' },
      { status: 500 }
    )
  }
} 