-- IMMEDIATE FIX: Run this in Supabase SQL Editor to fix the authentication issue
-- This will disable the problematic trigger and allow users to sign up
--
-- IMPORTANT: After running this, you MUST also add SUPABASE_SERVICE_ROLE_KEY
-- to your environment variables. See RLS_SUBSCRIPTION_FIX.md for details.

-- 1. Disable the problematic trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- 2. Ensure subscriptions table exists with proper structure
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan TEXT NOT NULL DEFAULT 'Free',
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  tokens INTEGER NOT NULL DEFAULT 7,
  last_token_refresh DATE DEFAULT CURRENT_DATE,
  bonus_tokens_given BOOLEAN DEFAULT TRUE,
  
  UNIQUE(user_id)
);

-- 3. Enable RLS and create policies
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own subscription" ON public.subscriptions;
DROP POLICY IF EXISTS "Users can update own subscription" ON public.subscriptions;
DROP POLICY IF EXISTS "Authenticated users can insert subscriptions" ON public.subscriptions;
DROP POLICY IF EXISTS "Service role can insert subscriptions" ON public.subscriptions;

-- Create new policies
CREATE POLICY "Users can view own subscription" ON public.subscriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own subscription" ON public.subscriptions
  FOR UPDATE USING (auth.uid() = user_id);

-- Allow authenticated users to insert subscriptions for themselves
CREATE POLICY "Authenticated users can insert subscriptions" ON public.subscriptions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Also allow service role to insert (for API operations)
CREATE POLICY "Service role can insert subscriptions" ON public.subscriptions
  FOR INSERT WITH CHECK (true);

-- 4. Grant permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON public.subscriptions TO authenticated;

-- 5. Drop any problematic triggers that might be causing null token issues
DROP TRIGGER IF EXISTS give_bonus_tokens_on_subscription_create ON public.subscriptions;
DROP FUNCTION IF EXISTS public.give_bonus_tokens_to_new_user();

-- 6. Fix any existing subscriptions with null tokens
UPDATE public.subscriptions
SET
  tokens = 7,
  bonus_tokens_given = true,
  last_token_refresh = CURRENT_DATE
WHERE tokens IS NULL OR tokens = 0;

-- 7. Create subscriptions for any existing users who don't have them
INSERT INTO public.subscriptions (user_id, plan, status, tokens, bonus_tokens_given)
SELECT id, 'Free', 'active', 7, true
FROM auth.users
WHERE id NOT IN (SELECT user_id FROM public.subscriptions)
ON CONFLICT (user_id) DO NOTHING;
