import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

// DeepSeek API integration
const optimizePromptWithDeepSeek = async (rawPrompt: string, tone: string) => {
  const toneInstructions = {
    casual: "Use a friendly, conversational tone. Keep it light and engaging.",
    formal: "Maintain a professional and authoritative tone. Be precise and structured.",
    detailed: "Provide comprehensive and thorough information. Include specific examples and explanations."
  }

  const systemPrompt = `You are an expert prompt engineer. Your task is to optimize the given prompt to make it more effective for AI interactions.

Guidelines:
- ${toneInstructions[tone as keyof typeof toneInstructions]}
- Be clear and specific about the request
- Include relevant context and background information
- Specify the desired format or structure of the response
- Mention any specific requirements or constraints
- Make the prompt actionable and well-structured

Return only the optimized prompt without any additional commentary.`

  try {
    // Check if DeepSeek API key is configured
    if (!process.env.DEEPSEEK_API_KEY) {
      // Fallback to basic optimization if no API key
      return basicOptimizePrompt(rawPrompt, tone)
    }

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Optimize this prompt: "${rawPrompt}"` }
        ],
        max_tokens: 1000,
        temperature: 0.7
      })
    })

    if (!response.ok) {
      console.error('DeepSeek API error:', response.status, response.statusText)
      // Fallback to basic optimization
      return basicOptimizePrompt(rawPrompt, tone)
    }

    const data = await response.json()
    const optimizedPrompt = data.choices?.[0]?.message?.content?.trim()

    if (!optimizedPrompt) {
      // Fallback to basic optimization
      return basicOptimizePrompt(rawPrompt, tone)
    }

    return {
      optimized_prompt: optimizedPrompt,
      tokens_used: data.usage?.total_tokens || 0,
      provider: 'deepseek'
    }

  } catch (error) {
    console.error('Error calling DeepSeek API:', error)
    // Fallback to basic optimization
    return basicOptimizePrompt(rawPrompt, tone)
  }
}

// Fallback basic optimization
const basicOptimizePrompt = (rawPrompt: string, tone: string) => {
  const toneEnhancers = {
    casual: "Use a friendly, conversational tone. Keep it light and engaging.",
    formal: "Maintain a professional and authoritative tone. Be precise and structured.",
    detailed: "Provide comprehensive and thorough information. Include specific examples and explanations."
  }

  const structure = [
    "Be clear and specific about your request.",
    "Include relevant context and background information.",
    "Specify the desired format or structure of the response.",
    "Mention any specific requirements or constraints."
  ]

  const optimizedPrompt = `
${toneEnhancers[tone as keyof typeof toneEnhancers]}

${structure.join('\n')}

Original request: ${rawPrompt}

Please provide a well-structured response that addresses all aspects of the request while maintaining the specified tone.
`.trim()

  return {
    optimized_prompt: optimizedPrompt,
    tokens_used: 0,
    provider: 'basic'
  }
}

export async function POST(req: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })

    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { raw_prompt, tone = 'casual' } = await req.json()

    if (!raw_prompt || raw_prompt.trim().length === 0) {
      return NextResponse.json(
        { error: 'Raw prompt is required' },
        { status: 400 }
      )
    }

    // Check if user can use a token
    const { data: canUseToken, error: tokenCheckError } = await supabase
      .rpc('use_token', { user_uuid: user.id })

    if (tokenCheckError) {
      console.error('Error checking token availability:', tokenCheckError)
      return NextResponse.json(
        { error: 'Failed to check token availability' },
        { status: 500 }
      )
    }

    if (!canUseToken) {
      return NextResponse.json(
        { error: 'No tokens available. Free users get 7 bonus tokens + 1 per day. Upgrade to Pro for unlimited prompts!' },
        { status: 429 }
      )
    }

    // Optimize the prompt using DeepSeek or fallback
    const optimizationResult = await optimizePromptWithDeepSeek(raw_prompt, tone)

    // Store the prompt and result in database
    const { data, error } = await supabase
      .from('prompts')
      .insert([
        {
          user_id: user.id,
          raw_prompt,
          optimized_prompt: optimizationResult.optimized_prompt,
          tone,
        },
      ])
      .select()

    if (error) {
      console.error('Error storing prompt:', error)
      return NextResponse.json(
        { error: 'Failed to store prompt' },
        { status: 500 }
      )
    }

    // Get updated token info for response
    const { data: tokenData } = await supabase
      .rpc('get_user_tokens', { user_uuid: user.id })

    const tokenInfo = tokenData?.[0] || { current_tokens: 0, is_unlimited: false }

    return NextResponse.json({
      success: true,
      optimized_prompt: optimizationResult.optimized_prompt,
      provider: optimizationResult.provider,
      tokens_used: optimizationResult.tokens_used,
      remaining_tokens: tokenInfo.current_tokens,
      is_unlimited: tokenInfo.is_unlimited,
      data
    })

  } catch (error) {
    console.error('Error in optimize API:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to optimize prompt' },
      { status: 500 }
    )
  }
}