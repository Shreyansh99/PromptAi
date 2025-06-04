import { NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

// Initialize Supabase with service role key
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = req.headers.get('x-razorpay-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing webhook signature' },
        { status: 400 }
      );
    }

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET || process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest('hex');

    if (signature !== expectedSignature) {
      return NextResponse.json(
        { error: 'Invalid webhook signature' },
        { status: 400 }
      );
    }

    const event = JSON.parse(body);
    
    // Handle different webhook events
    switch (event.event) {
      case 'payment.captured':
        await handlePaymentCaptured(event.payload.payment.entity);
        break;
        
      case 'payment.failed':
        await handlePaymentFailed(event.payload.payment.entity);
        break;
        
      case 'order.paid':
        await handleOrderPaid(event.payload.order.entity);
        break;
        
      default:
        console.log('Unhandled webhook event:', event.event);
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

async function handlePaymentCaptured(payment: any) {
  try {
    const orderId = payment.order_id;
    const paymentId = payment.id;
    const amount = payment.amount / 100; // Convert from paisa to rupees

    // Update payment record
    const { error } = await supabase
      .from('payments')
      .update({
        razorpay_payment_id: paymentId,
        status: 'completed',
        payment_method: payment.method,
        updated_at: new Date().toISOString()
      })
      .eq('razorpay_order_id', orderId);

    if (error) {
      console.error('Failed to update payment record:', error);
    }

    console.log(`Payment captured: ${paymentId} for order: ${orderId}`);
  } catch (error) {
    console.error('Error handling payment captured:', error);
  }
}

async function handlePaymentFailed(payment: any) {
  try {
    const orderId = payment.order_id;
    const paymentId = payment.id;

    // Update payment record
    const { error: paymentError } = await supabase
      .from('payments')
      .update({
        razorpay_payment_id: paymentId,
        status: 'failed',
        updated_at: new Date().toISOString()
      })
      .eq('razorpay_order_id', orderId);

    // Update subscription status
    const { error: subError } = await supabase
      .from('subscriptions')
      .update({
        payment_status: 'failed',
        updated_at: new Date().toISOString()
      })
      .eq('razorpay_order_id', orderId);

    if (paymentError || subError) {
      console.error('Failed to update records:', { paymentError, subError });
    }

    console.log(`Payment failed: ${paymentId} for order: ${orderId}`);
  } catch (error) {
    console.error('Error handling payment failed:', error);
  }
}

async function handleOrderPaid(order: any) {
  try {
    const orderId = order.id;
    const amount = order.amount / 100; // Convert from paisa to rupees

    console.log(`Order paid: ${orderId} for amount: ₹${amount}`);
  } catch (error) {
    console.error('Error handling order paid:', error);
  }
}
