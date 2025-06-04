-- Create prompts table
CREATE TABLE IF NOT EXISTS public.prompts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  raw_prompt TEXT NOT NULL,
  optimized_prompt TEXT NOT NULL,
  tone TEXT NOT NULL DEFAULT 'casual',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Add indexes for performance
  INDEX idx_prompts_user_id (user_id),
  INDEX idx_prompts_created_at (created_at)
);

-- Create plans table
CREATE TABLE IF NOT EXISTS public.plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  price_monthly DECIMAL(10,2) NOT NULL DEFAULT 0,
  daily_limit INTEGER NOT NULL DEFAULT 5,
  monthly_limit INTEGER,
  features JSONB NOT NULL DEFAULT '[]',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create usage table
CREATE TABLE IF NOT EXISTS public.usage (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  requests_count INTEGER NOT NULL DEFAULT 0,
  tokens_used INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ensure one record per user per day
  UNIQUE(user_id, date),
  
  -- Add indexes for performance
  INDEX idx_usage_user_date (user_id, date),
  INDEX idx_usage_date (date)
);

-- Insert default plans
INSERT INTO public.plans (name, display_name, price_monthly, daily_limit, monthly_limit, features) VALUES
  ('free', 'Free', 0, 5, 150, '["Basic optimization", "Standard support", "Community access"]'),
  ('pro', 'Pro', 19.99, 1000, 30000, '["Advanced optimization", "Priority support", "API access", "Custom templates", "Team collaboration"]')
ON CONFLICT (name) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  price_monthly = EXCLUDED.price_monthly,
  daily_limit = EXCLUDED.daily_limit,
  monthly_limit = EXCLUDED.monthly_limit,
  features = EXCLUDED.features,
  updated_at = NOW();

-- Enable Row Level Security
ALTER TABLE public.prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for prompts
CREATE POLICY "Users can view own prompts" ON public.prompts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own prompts" ON public.prompts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own prompts" ON public.prompts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own prompts" ON public.prompts
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for plans (read-only for all authenticated users)
CREATE POLICY "Authenticated users can view plans" ON public.plans
  FOR SELECT USING (auth.role() = 'authenticated');

-- Create RLS policies for usage
CREATE POLICY "Users can view own usage" ON public.usage
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own usage" ON public.usage
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own usage" ON public.usage
  FOR UPDATE USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_plans_updated_at
  BEFORE UPDATE ON public.plans
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_usage_updated_at
  BEFORE UPDATE ON public.usage
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to get user's current plan limits
CREATE OR REPLACE FUNCTION public.get_user_plan_limits(user_uuid UUID)
RETURNS TABLE(daily_limit INTEGER, monthly_limit INTEGER) AS $$
BEGIN
  RETURN QUERY
  SELECT p.daily_limit, p.monthly_limit
  FROM public.plans p
  JOIN public.subscriptions s ON s.plan = p.name
  WHERE s.user_id = user_uuid AND s.status = 'active'
  LIMIT 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to get user's current usage
CREATE OR REPLACE FUNCTION public.get_user_usage(user_uuid UUID, check_date DATE DEFAULT CURRENT_DATE)
RETURNS TABLE(daily_requests INTEGER, monthly_requests INTEGER) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COALESCE(daily.requests_count, 0) as daily_requests,
    COALESCE(monthly.total_requests, 0) as monthly_requests
  FROM (
    SELECT requests_count
    FROM public.usage
    WHERE user_id = user_uuid AND date = check_date
  ) daily
  FULL OUTER JOIN (
    SELECT SUM(requests_count) as total_requests
    FROM public.usage
    WHERE user_id = user_uuid 
      AND date >= DATE_TRUNC('month', check_date)
      AND date < DATE_TRUNC('month', check_date) + INTERVAL '1 month'
  ) monthly ON true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
