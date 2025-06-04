import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

// GET /api/usage - Get current user's token and usage stats
export async function GET(request: Request) {
  try {
    const cookieStore = await cookies()

    // Create Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    // Check for Authorization header first (more reliable)
    const authHeader = request.headers.get('authorization')
    console.log('Authorization header present:', !!authHeader)

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7) // Remove 'Bearer ' prefix
      console.log('Using Authorization header token')

      // Set the session using the token
      const { data: { user }, error: authError } = await supabase.auth.getUser(token)

      if (authError || !user) {
        console.error('Auth header validation failed:', authError)
        return NextResponse.json(
          { error: 'Invalid authorization token' },
          { status: 401 }
        )
      }

      console.log('User authenticated via header:', user.email)

      // Create a service role client for subscription operations (bypasses RLS)
      const serviceSupabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      )

      // Get user's subscription data using service role
      const { data: subscription, error: subscriptionError } = await serviceSupabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .single()

      let finalSubscription = subscription

      if (subscriptionError || !subscription) {
        console.log('No subscription found, creating one for user:', user.email)

        // Create a subscription for the user using service role
        const { data: newSubscription, error: createError } = await serviceSupabase
          .from('subscriptions')
          .insert([
            {
              user_id: user.id,
              plan: 'Free',
              status: 'active',
              tokens: 7,
              last_token_refresh: new Date().toISOString().split('T')[0],
              bonus_tokens_given: true
            }
          ])
          .select()
          .single()

        if (createError) {
          console.error('Error creating subscription:', createError)

          // If it's a duplicate key error, try to fetch the existing subscription
          if (createError.code === '23505') {
            console.log('Subscription already exists, fetching existing one...')
            const { data: existingSubscription, error: fetchError } = await serviceSupabase
              .from('subscriptions')
              .select('*')
              .eq('user_id', user.id)
              .single()

            if (fetchError || !existingSubscription) {
              console.error('Failed to fetch existing subscription:', fetchError)
              return NextResponse.json(
                { error: 'Failed to get subscription data' },
                { status: 500 }
              )
            }

            finalSubscription = existingSubscription
            console.log('Found existing subscription for user:', user.email)
          } else {
            return NextResponse.json(
              { error: 'Failed to create subscription' },
              { status: 500 }
            )
          }
        } else {
          finalSubscription = newSubscription
          console.log('Created subscription for user:', user.email)
        }
      }

      // Return token data
      return NextResponse.json({
        tokens: {
          current: finalSubscription.tokens,
          max: finalSubscription.plan === 'Pro' ? -1 : 30, // -1 for unlimited
          unlimited: finalSubscription.plan === 'Pro'
        },
        plan: finalSubscription.plan,
        status: finalSubscription.status
      })
    }

    // Debug: Log all cookies first
    const allCookies = Array.from(cookieStore.getAll())
    console.log('Available cookies:', allCookies.map(c => ({ name: c.name, value: c.value?.substring(0, 20) + '...' })))

    // Try different possible cookie names for Supabase auth
    const possibleAccessTokenNames = [
      'sb-hiwjdxephgktzuuvmwjl-auth-token',
      'sb-access-token',
      'supabase-auth-token',
      'supabase.auth.token'
    ]

    const possibleRefreshTokenNames = [
      'sb-hiwjdxephgktzuuvmwjl-auth-token.0',
      'sb-refresh-token',
      'supabase-refresh-token',
      'supabase.auth.refresh-token'
    ]

    let accessToken = null
    let refreshToken = null

    // Find access token
    for (const name of possibleAccessTokenNames) {
      const token = cookieStore.get(name)?.value
      if (token) {
        accessToken = token
        console.log('Found access token with name:', name)
        break
      }
    }

    // Find refresh token
    for (const name of possibleRefreshTokenNames) {
      const token = cookieStore.get(name)?.value
      if (token) {
        refreshToken = token
        console.log('Found refresh token with name:', name)
        break
      }
    }

    console.log('Access token present:', !!accessToken)
    console.log('Refresh token present:', !!refreshToken)

    // If no cookies found, try to get session directly from Supabase
    if (!accessToken || !refreshToken) {
      console.log('No auth tokens found in cookies, trying to get session directly...')

      // Try to get existing session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()

      if (sessionError) {
        console.error('Session error:', sessionError)
      }

      if (session) {
        console.log('Found existing session:', !!session.user)
      } else {
        console.error('No session found')
        return NextResponse.json(
          { error: 'Unauthorized - Please log in' },
          { status: 401 }
        )
      }
    } else {
      // Set the session from cookies
      const { error: sessionError } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken
      })

      if (sessionError) {
        console.error('Session error:', sessionError)
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        )
      }
    }

    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
      console.error('Auth error in usage API:', { userError, user: !!user })
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user's token information
    const { data: tokenData, error: tokenError } = await supabase
      .rpc('get_user_tokens', { user_uuid: user.id })

    if (tokenError) {
      console.error('Error fetching token data:', tokenError)
      return NextResponse.json(
        { error: 'Failed to fetch token data' },
        { status: 500 }
      )
    }

    const tokenInfo = tokenData?.[0] || {
      current_tokens: 0,
      tokens_per_day: 1,
      plan_name: 'free',
      can_use_token: false,
      is_unlimited: false,
      max_tokens: 7
    }

    return NextResponse.json({
      tokens: {
        current: tokenInfo.current_tokens,
        max: tokenInfo.max_tokens,
        per_day: tokenInfo.tokens_per_day,
        unlimited: tokenInfo.is_unlimited
      },
      plan: {
        name: tokenInfo.plan_name,
        display_name: tokenInfo.plan_name === 'free' ? 'Free' : 'Pro',
        is_unlimited: tokenInfo.is_unlimited
      },
      canMakeRequest: tokenInfo.can_use_token,
      lastRefresh: tokenInfo.last_refresh
    })

  } catch (error) {
    console.error('Error in usage API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/usage - Use a token (for prompt generation)
export async function POST(req: Request) {
  try {
    const cookieStore = await cookies()

    // Create Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    // Get tokens from cookies
    const accessToken = cookieStore.get('sb-hiwjdxephgktzuuvmwjl-auth-token')?.value
    const refreshToken = cookieStore.get('sb-hiwjdxephgktzuuvmwjl-auth-token.0')?.value

    if (!accessToken || !refreshToken) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Set the session
    const { error: sessionError } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken
    })

    if (sessionError) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Try to use a token
    const { data: canUseToken, error: useTokenError } = await supabase
      .rpc('use_token', { user_uuid: user.id })

    if (useTokenError) {
      console.error('Error using token:', useTokenError)
      return NextResponse.json(
        { error: 'Failed to use token' },
        { status: 500 }
      )
    }

    if (!canUseToken) {
      return NextResponse.json(
        { error: 'No tokens available. Upgrade to Pro for unlimited prompts or wait for daily token refresh.' },
        { status: 429 }
      )
    }

    // Get updated token info
    const { data: tokenData } = await supabase
      .rpc('get_user_tokens', { user_uuid: user.id })

    const tokenInfo = tokenData?.[0] || {
      current_tokens: 0,
      is_unlimited: false
    }

    return NextResponse.json({
      success: true,
      tokens: {
        current: tokenInfo.current_tokens,
        unlimited: tokenInfo.is_unlimited
      },
      message: 'Token used successfully'
    })

  } catch (error) {
    console.error('Error in token usage API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
