-- Implement token-based system for PromptPilot

-- Add token system to subscriptions table
ALTER TABLE public.subscriptions 
ADD COLUMN IF NOT EXISTS tokens INTEGER NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_token_refresh DATE DEFAULT CURRENT_DATE,
ADD COLUMN IF NOT EXISTS bonus_tokens_given BOOLEAN DEFAULT FALSE;

-- Update plans table with correct pricing and features
UPDATE public.plans SET 
  display_name = 'Free',
  price_monthly = 0,
  daily_limit = 1, -- 1 token per day after bonus
  monthly_limit = NULL, -- No monthly limit for free
  features = '["Access to 7 bonus prompts", "1 prompt generation per day after that", "Limited algorithms"]'
WHERE name = 'free';

UPDATE public.plans SET 
  display_name = 'Pro',
  price_monthly = 8.33, -- $8.33/month as shown in image
  daily_limit = 999999, -- Unlimited
  monthly_limit = NULL, -- Unlimited
  features = '["Unlimited prompt generations", "Test and compare prompts on different models", "Save prompts", "Access to advance algorithms"]'
WHERE name = 'pro';

-- Add token-related columns to plans
ALTER TABLE public.plans 
ADD COLUMN IF NOT EXISTS bonus_tokens INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS tokens_per_day INTEGER DEFAULT 1,
ADD COLUMN IF NOT EXISTS is_unlimited BOOLEAN DEFAULT FALSE;

-- Update plans with token information
UPDATE public.plans SET 
  bonus_tokens = 7,
  tokens_per_day = 1,
  is_unlimited = FALSE
WHERE name = 'free';

UPDATE public.plans SET 
  bonus_tokens = 0,
  tokens_per_day = 999999,
  is_unlimited = TRUE
WHERE name = 'pro';

-- Function to give bonus tokens to new users
CREATE OR REPLACE FUNCTION public.give_bonus_tokens_to_new_user()
RETURNS TRIGGER AS $$
DECLARE
  plan_bonus_tokens INTEGER;
BEGIN
  -- Get bonus tokens for the plan
  SELECT COALESCE(p.bonus_tokens, 7) INTO plan_bonus_tokens
  FROM public.plans p 
  WHERE p.name = NEW.plan;
  
  -- Give bonus tokens based on plan
  UPDATE public.subscriptions 
  SET 
    tokens = plan_bonus_tokens,
    bonus_tokens_given = TRUE,
    last_token_refresh = CURRENT_DATE
  WHERE user_id = NEW.user_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for bonus tokens on new subscription
DROP TRIGGER IF EXISTS give_bonus_tokens_on_subscription_create ON public.subscriptions;
CREATE TRIGGER give_bonus_tokens_on_subscription_create
  AFTER INSERT ON public.subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.give_bonus_tokens_to_new_user();

-- Function to refresh daily tokens
CREATE OR REPLACE FUNCTION public.refresh_daily_tokens(user_uuid UUID)
RETURNS INTEGER AS $$
DECLARE
  user_plan TEXT;
  tokens_per_day INTEGER;
  current_tokens INTEGER;
  last_refresh DATE;
  days_since_refresh INTEGER;
  new_token_count INTEGER;
  is_unlimited BOOLEAN;
BEGIN
  -- Get user's current subscription info
  SELECT s.plan, s.tokens, s.last_token_refresh, p.tokens_per_day, p.is_unlimited
  INTO user_plan, current_tokens, last_refresh, tokens_per_day, is_unlimited
  FROM public.subscriptions s
  JOIN public.plans p ON s.plan = p.name
  WHERE s.user_id = user_uuid AND s.status = 'active';

  -- If no subscription found, return 0
  IF user_plan IS NULL THEN
    RETURN 0;
  END IF;

  -- Pro users have unlimited tokens
  IF is_unlimited THEN
    RETURN 999999;
  END IF;

  -- Calculate days since last refresh
  days_since_refresh := CURRENT_DATE - last_refresh;

  -- If it's been at least 1 day, add tokens for free users
  IF days_since_refresh > 0 AND user_plan = 'free' THEN
    -- For free users, add 1 token per day (max 7 tokens total)
    new_token_count := LEAST(current_tokens + days_since_refresh, 7);

    -- Update the subscription
    UPDATE public.subscriptions 
    SET 
      tokens = new_token_count,
      last_token_refresh = CURRENT_DATE
    WHERE user_id = user_uuid;

    RETURN new_token_count;
  END IF;

  RETURN current_tokens;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to use a token
CREATE OR REPLACE FUNCTION public.use_token(user_uuid UUID)
RETURNS BOOLEAN AS $$
DECLARE
  current_tokens INTEGER;
  is_unlimited BOOLEAN;
BEGIN
  -- Check if user has unlimited plan
  SELECT p.is_unlimited INTO is_unlimited
  FROM public.subscriptions s
  JOIN public.plans p ON s.plan = p.name
  WHERE s.user_id = user_uuid AND s.status = 'active';

  -- Pro users can always use tokens
  IF is_unlimited THEN
    RETURN TRUE;
  END IF;

  -- For free users, refresh tokens first
  current_tokens := public.refresh_daily_tokens(user_uuid);

  -- Check if user has tokens
  IF current_tokens > 0 THEN
    -- Deduct one token
    UPDATE public.subscriptions 
    SET tokens = tokens - 1
    WHERE user_id = user_uuid;
    
    RETURN TRUE;
  END IF;

  RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user token info
CREATE OR REPLACE FUNCTION public.get_user_tokens(user_uuid UUID)
RETURNS TABLE(
  current_tokens INTEGER,
  tokens_per_day INTEGER,
  plan_name TEXT,
  last_refresh DATE,
  can_use_token BOOLEAN,
  is_unlimited BOOLEAN,
  max_tokens INTEGER
) AS $$
DECLARE
  updated_tokens INTEGER;
  plan_unlimited BOOLEAN;
BEGIN
  -- Get plan info first
  SELECT p.is_unlimited INTO plan_unlimited
  FROM public.subscriptions s
  JOIN public.plans p ON s.plan = p.name
  WHERE s.user_id = user_uuid AND s.status = 'active';

  -- Refresh tokens for free users
  IF NOT COALESCE(plan_unlimited, FALSE) THEN
    updated_tokens := public.refresh_daily_tokens(user_uuid);
  END IF;

  -- Return token information
  RETURN QUERY
  SELECT 
    CASE 
      WHEN p.is_unlimited THEN 999999 
      ELSE s.tokens 
    END as current_tokens,
    p.tokens_per_day,
    s.plan as plan_name,
    s.last_token_refresh as last_refresh,
    CASE 
      WHEN p.is_unlimited THEN TRUE 
      ELSE (s.tokens > 0) 
    END as can_use_token,
    p.is_unlimited,
    CASE 
      WHEN p.is_unlimited THEN 999999 
      ELSE 7 
    END as max_tokens
  FROM public.subscriptions s
  JOIN public.plans p ON s.plan = p.name
  WHERE s.user_id = user_uuid AND s.status = 'active'
  LIMIT 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Give bonus tokens to existing users who haven't received them
UPDATE public.subscriptions 
SET 
  tokens = 7,
  bonus_tokens_given = TRUE,
  last_token_refresh = CURRENT_DATE
WHERE (bonus_tokens_given = FALSE OR bonus_tokens_given IS NULL) 
  AND plan = 'free';

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_subscriptions_last_token_refresh ON public.subscriptions(last_token_refresh);
CREATE INDEX IF NOT EXISTS idx_subscriptions_tokens ON public.subscriptions(tokens);

-- Grant execute permissions on functions
GRANT EXECUTE ON FUNCTION public.refresh_daily_tokens(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.use_token(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_user_tokens(UUID) TO authenticated;
