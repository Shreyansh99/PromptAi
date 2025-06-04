import { NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// Initialize Supabase with service role key
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(_req: Request) {
  try {
    const { plan = 'Pro' } = await _req.json();

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
      console.log('Auth error in subscription upgrade:', authError);
      return NextResponse.json(
        { error: 'Unauthorized', details: authError?.message },
        { status: 401 }
      );
    }

    // Get current subscription
    const { data: subscription, error: subError } = await supabaseAdmin
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (subError || !subscription) {
      return NextResponse.json(
        { error: 'Subscription not found' },
        { status: 404 }
      );
    }

    // Check if user is already on the requested plan
    if (subscription.plan === plan) {
      return NextResponse.json(
        { error: `Already subscribed to ${plan} plan` },
        { status: 400 }
      );
    }

    // For now, only support upgrading to Pro plan
    if (plan !== 'Pro') {
      return NextResponse.json(
        { error: 'Only Pro plan upgrades are supported' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Ready for upgrade',
      currentPlan: subscription.plan,
      targetPlan: plan,
      amount: 499, // Pro plan price in INR
      user: {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'
      }
    });

  } catch (error) {
    console.error('Subscription upgrade error:', error);
    return NextResponse.json(
      { error: 'Failed to process upgrade request' },
      { status: 500 }
    );
  }
}

export async function GET() {
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
      console.log('Auth error in subscription GET:', authError);
      return NextResponse.json(
        { error: 'Unauthorized', details: authError?.message },
        { status: 401 }
      );
    }

    // Get current subscription with payment history
    const { data: subscription, error: subError } = await supabaseAdmin
      .from('subscriptions')
      .select(`
        *,
        payments (
          id,
          amount,
          status,
          payment_method,
          created_at
        )
      `)
      .eq('user_id', user.id)
      .single();

    if (subError || !subscription) {
      return NextResponse.json(
        { error: 'Subscription not found' },
        { status: 404 }
      );
    }

    // Check if subscription is active
    const isActive = await checkSubscriptionStatus(user.id);

    return NextResponse.json({
      success: true,
      subscription: {
        plan: subscription.plan,
        status: subscription.status,
        payment_status: subscription.payment_status,
        start_date: subscription.subscription_start_date,
        end_date: subscription.subscription_end_date,
        is_active: isActive,
        amount_paid: subscription.amount_paid
      },
      payments: subscription.payments || []
    });

  } catch (error) {
    console.error('Get subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to get subscription details' },
      { status: 500 }
    );
  }
}

async function checkSubscriptionStatus(userId: string): Promise<boolean> {
  try {
    const { data, error } = await supabaseAdmin
      .rpc('is_subscription_active', { p_user_id: userId });

    if (error) {
      console.error('Error checking subscription status:', error);
      return false;
    }

    return data || false;
  } catch (error) {
    console.error('Error checking subscription status:', error);
    return false;
  }
}
