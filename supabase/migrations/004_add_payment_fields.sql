-- Add payment-related fields to subscriptions table
ALTER TABLE public.subscriptions 
ADD COLUMN IF NOT EXISTS razorpay_order_id TEXT,
ADD COLUMN IF NOT EXISTS razorpay_payment_id TEXT,
ADD COLUMN IF NOT EXISTS razorpay_signature TEXT,
ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS subscription_start_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS subscription_end_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS amount_paid DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'INR';

-- Create payments table for transaction history
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subscription_id UUID NOT NULL REFERENCES public.subscriptions(id) ON DELETE CASCADE,
  razorpay_order_id TEXT NOT NULL,
  razorpay_payment_id TEXT,
  razorpay_signature TEXT,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'INR',
  status TEXT DEFAULT 'pending',
  payment_method TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON public.payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_subscription_id ON public.payments(subscription_id);
CREATE INDEX IF NOT EXISTS idx_payments_razorpay_order_id ON public.payments(razorpay_order_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_payment_status ON public.subscriptions(payment_status);

-- Enable RLS for payments table
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for payments
CREATE POLICY "Users can view own payments" ON public.payments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Service role can insert payments" ON public.payments
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role can update payments" ON public.payments
  FOR UPDATE WITH CHECK (true);

-- Create function to update payment updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_payment_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for payments updated_at
DROP TRIGGER IF EXISTS update_payments_updated_at ON public.payments;
CREATE TRIGGER update_payments_updated_at
  BEFORE UPDATE ON public.payments
  FOR EACH ROW EXECUTE FUNCTION public.update_payment_updated_at();

-- Function to handle successful payment and upgrade subscription
CREATE OR REPLACE FUNCTION public.handle_successful_payment(
  p_user_id UUID,
  p_razorpay_order_id TEXT,
  p_razorpay_payment_id TEXT,
  p_razorpay_signature TEXT,
  p_amount DECIMAL(10,2),
  p_plan TEXT DEFAULT 'Pro'
)
RETURNS JSON AS $$
DECLARE
  v_subscription_id UUID;
  v_payment_id UUID;
  v_start_date TIMESTAMP WITH TIME ZONE;
  v_end_date TIMESTAMP WITH TIME ZONE;
BEGIN
  -- Set subscription dates (Pro plan is monthly)
  v_start_date := NOW();
  v_end_date := NOW() + INTERVAL '1 month';
  
  -- Update subscription
  UPDATE public.subscriptions 
  SET 
    plan = p_plan,
    status = 'active',
    payment_status = 'completed',
    razorpay_order_id = p_razorpay_order_id,
    razorpay_payment_id = p_razorpay_payment_id,
    razorpay_signature = p_razorpay_signature,
    subscription_start_date = v_start_date,
    subscription_end_date = v_end_date,
    amount_paid = p_amount,
    updated_at = NOW()
  WHERE user_id = p_user_id
  RETURNING id INTO v_subscription_id;
  
  -- Insert payment record
  INSERT INTO public.payments (
    user_id,
    subscription_id,
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    amount,
    status,
    payment_method
  ) VALUES (
    p_user_id,
    v_subscription_id,
    p_razorpay_order_id,
    p_razorpay_payment_id,
    p_razorpay_signature,
    p_amount,
    'completed',
    'razorpay'
  ) RETURNING id INTO v_payment_id;
  
  RETURN json_build_object(
    'success', true,
    'subscription_id', v_subscription_id,
    'payment_id', v_payment_id,
    'plan', p_plan,
    'start_date', v_start_date,
    'end_date', v_end_date
  );
  
EXCEPTION WHEN OTHERS THEN
  RETURN json_build_object(
    'success', false,
    'error', SQLERRM
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if subscription is active and not expired
CREATE OR REPLACE FUNCTION public.is_subscription_active(p_user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  v_subscription RECORD;
BEGIN
  SELECT plan, status, subscription_end_date
  INTO v_subscription
  FROM public.subscriptions
  WHERE user_id = p_user_id;
  
  -- If no subscription found, return false
  IF NOT FOUND THEN
    RETURN FALSE;
  END IF;
  
  -- Free plan is always active
  IF v_subscription.plan = 'Free' THEN
    RETURN TRUE;
  END IF;
  
  -- Pro plan needs to be active and not expired
  IF v_subscription.plan = 'Pro' AND 
     v_subscription.status = 'active' AND 
     (v_subscription.subscription_end_date IS NULL OR v_subscription.subscription_end_date > NOW()) THEN
    RETURN TRUE;
  END IF;
  
  RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
