# Database Setup for PromptPilot

This guide will help you set up the complete database schema for PromptPilot, including prompts, plans, and usage tracking.

## Prerequisites

- Supabase project created
- Access to Supabase SQL Editor or Supabase CLI

## Step 1: Create Subscriptions Table (if not already done)

If you haven't already set up the subscriptions table, run the migration:

```sql
-- Copy and paste the contents of supabase/migrations/001_create_subscriptions_table.sql
```

## Step 2: Create Prompts, Plans, and Usage Tables

Run the following migration to create the remaining tables:

```sql
-- Copy and paste the contents of supabase/migrations/002_create_prompts_and_usage_tables.sql
```

## Step 3: Environment Variables

Add the following environment variables to your `.env.local` file:

```env
# DeepSeek API (optional - will use basic optimization if not provided)
DEEPSEEK_API_KEY=your_deepseek_api_key_here

# Supabase (already configured)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Step 4: Verify Database Setup

After running the migrations, verify the setup:

### Tables Created:
1. **subscriptions** - User subscription plans
2. **prompts** - Stored prompt optimizations
3. **plans** - Available subscription plans
4. **usage** - Daily/monthly usage tracking

### Functions Created:
1. **get_user_plan_limits(user_uuid)** - Get user's plan limits
2. **get_user_usage(user_uuid, date)** - Get user's current usage

### Default Plans:
- **Free**: 5 prompts/day, 150/month, $0
- **Pro**: 1000 prompts/day, 30000/month, $19.99

## Step 5: Test the API

### Test Usage API:
```bash
# Get current usage
curl -X GET http://localhost:3000/api/usage \
  -H "Cookie: your-session-cookie"

# Increment usage
curl -X POST http://localhost:3000/api/usage \
  -H "Content-Type: application/json" \
  -H "Cookie: your-session-cookie" \
  -d '{"tokens_used": 100}'
```

### Test Optimize API:
```bash
curl -X POST http://localhost:3000/api/optimize \
  -H "Content-Type: application/json" \
  -H "Cookie: your-session-cookie" \
  -d '{
    "raw_prompt": "Write a blog post about AI",
    "tone": "casual"
  }'
```

## Features Implemented

### 1. Usage Tracking
- Daily and monthly request limits
- Token usage tracking
- Automatic limit enforcement

### 2. Plan Management
- Free and Pro plans with different limits
- Easy plan upgrades
- Usage-based restrictions

### 3. Prompt Optimization
- DeepSeek API integration (with fallback)
- Multiple tone options
- Prompt history storage

### 4. Security
- Row Level Security (RLS) on all tables
- User-specific data access
- Authenticated API endpoints

## Troubleshooting

### Common Issues:

1. **Migration Errors**: Ensure you have proper permissions in Supabase
2. **API Errors**: Check that all environment variables are set
3. **Usage Limits**: Verify plan limits are correctly configured

### Checking Data:

```sql
-- Check user's current plan
SELECT s.plan, p.daily_limit, p.monthly_limit 
FROM subscriptions s 
JOIN plans p ON s.plan = p.name 
WHERE s.user_id = 'your-user-id';

-- Check user's usage
SELECT * FROM usage WHERE user_id = 'your-user-id' ORDER BY date DESC;

-- Check stored prompts
SELECT * FROM prompts WHERE user_id = 'your-user-id' ORDER BY created_at DESC;
```

## Next Steps

1. **Frontend Integration**: Update your dashboard to show usage stats
2. **Plan Upgrades**: Implement Stripe integration for Pro plan
3. **Analytics**: Add usage analytics and reporting
4. **Rate Limiting**: Consider adding additional rate limiting for API abuse prevention
