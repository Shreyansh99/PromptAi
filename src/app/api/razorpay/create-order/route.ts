import Razorpay from "razorpay";
import { NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js';

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

// Initialize Supabase with service role key for server-side operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { amount, userId, plan = 'Pro' } = await req.json();

    // Validate required fields
    if (!amount || !userId) {
      return NextResponse.json(
        { error: 'Amount and userId are required' },
        { status: 400 }
      );
    }

    // Validate amount (should be 499 for Pro plan)
    if (plan === 'Pro' && amount !== 499) {
      return NextResponse.json(
        { error: 'Invalid amount for Pro plan' },
        { status: 400 }
      );
    }

    // Verify user exists
    const { data: user, error: userError } = await supabase.auth.admin.getUserById(userId);
    if (userError || !user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Create Razorpay order
    const orderOptions = {
      amount: amount * 100, // Convert to paisa (INR smallest unit)
      currency: "INR",
      receipt: `rcpt_${Date.now().toString().slice(-8)}`, // Keep under 40 chars
      payment_capture: 1, // Auto capture payment
      notes: {
        userId: userId,
        plan: plan,
        email: user.user.email || '',
      }
    };

    const order = await razorpay.orders.create(orderOptions);

    // Store order details in database for verification later
    const { error: dbError } = await supabase
      .from('subscriptions')
      .update({
        razorpay_order_id: order.id,
        payment_status: 'pending',
        amount_paid: amount,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId);

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Failed to update subscription record' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt
      },
      user: {
        name: user.user.user_metadata?.full_name || user.user.email?.split('@')[0] || 'User',
        email: user.user.email
      }
    });

  } catch (error) {
    console.error('Razorpay order creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create payment order' },
      { status: 500 }
    );
  }
}
