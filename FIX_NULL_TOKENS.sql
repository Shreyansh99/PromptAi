-- URGENT FIX: Null tokens constraint violation
-- Run this immediately in Supabase SQL Editor to fix the null tokens issue

-- 1. Drop the problematic trigger that's causing null tokens
DROP TRIGGER IF EXISTS give_bonus_tokens_on_subscription_create ON public.subscriptions;
DROP FUNCTION IF EXISTS public.give_bonus_tokens_to_new_user();

-- 2. Fix any existing subscriptions with null tokens
UPDATE public.subscriptions 
SET 
  tokens = CASE 
    WHEN plan = 'Pro' THEN 999999 
    ELSE 7 
  END,
  bonus_tokens_given = true,
  last_token_refresh = CURRENT_DATE
WHERE tokens IS NULL;

-- 3. Ensure the tokens column has a proper default and NOT NULL constraint
ALTER TABLE public.subscriptions 
ALTER COLUMN tokens SET DEFAULT 7,
ALTER COLUMN tokens SET NOT NULL;

-- 4. Create a simple, reliable function for new subscriptions (no dependency on plans table)
CREATE OR REPLACE FUNCTION public.handle_new_subscription()
RETURNS TRIGGER AS $$
BEGIN
  -- Ensure tokens are set based on plan
  IF NEW.tokens IS NULL THEN
    NEW.tokens := CASE 
      WHEN NEW.plan = 'Pro' THEN 999999 
      ELSE 7 
    END;
  END IF;
  
  -- Ensure other fields are set
  IF NEW.bonus_tokens_given IS NULL THEN
    NEW.bonus_tokens_given := true;
  END IF;
  
  IF NEW.last_token_refresh IS NULL THEN
    NEW.last_token_refresh := CURRENT_DATE;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 5. Create a BEFORE INSERT trigger to ensure tokens are never null
DROP TRIGGER IF EXISTS ensure_tokens_not_null ON public.subscriptions;
CREATE TRIGGER ensure_tokens_not_null
  BEFORE INSERT ON public.subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_subscription();

-- 6. Verify the fix by checking for any remaining null tokens
DO $$
DECLARE
  null_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO null_count FROM public.subscriptions WHERE tokens IS NULL;
  IF null_count > 0 THEN
    RAISE EXCEPTION 'Still have % subscriptions with null tokens!', null_count;
  ELSE
    RAISE NOTICE 'SUCCESS: All subscriptions now have valid token values';
  END IF;
END $$;

-- 7. Grant necessary permissions
GRANT EXECUTE ON FUNCTION public.handle_new_subscription() TO authenticated;
GRANT EXECUTE ON FUNCTION public.handle_new_subscription() TO service_role;
