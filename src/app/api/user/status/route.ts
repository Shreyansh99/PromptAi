import { NextResponse } from "next/server";
import { createServerClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

// Initialize Supabase with service role key
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: Request) {
  try {
    // Get user from session
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              );
            } catch {
              // Ignore cookie setting errors in server components
            }
          },
        },
      }
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({
        authenticated: false,
        error: authError?.message || 'No user found'
      });
    }

    // Check if user has a subscription record
    const { data: subscription, error: subError } = await supabaseAdmin
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .single();

    // If no subscription exists, create one
    if (subError && subError.code === 'PGRST116') {
      console.log('Creating subscription for user:', user.id);
      const { data: newSub, error: createError } = await supabaseAdmin
        .from('subscriptions')
        .insert({
          user_id: user.id,
          plan: 'Free',
          status: 'active'
        })
        .select()
        .single();

      if (createError) {
        console.error('Error creating subscription:', createError);
        return NextResponse.json({
          authenticated: true,
          user: {
            id: user.id,
            email: user.email
          },
          subscription: null,
          error: 'Failed to create subscription'
        });
      }

      return NextResponse.json({
        authenticated: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'
        },
        subscription: newSub,
        created_subscription: true
      });
    }

    if (subError) {
      console.error('Subscription error:', subError);
      return NextResponse.json({
        authenticated: true,
        user: {
          id: user.id,
          email: user.email
        },
        subscription: null,
        error: subError.message
      });
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'
      },
      subscription: subscription
    });

  } catch (error) {
    console.error('User status error:', error);
    return NextResponse.json(
      { error: 'Failed to get user status' },
      { status: 500 }
    );
  }
}
