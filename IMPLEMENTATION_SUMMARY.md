# PromptPilot Implementation Summary

## Overview
This document summarizes the complete database schema and API implementation for PromptPilot, a prompt optimization platform with usage tracking and plan-based limitations.

## Database Schema

### 1. Users (Supabase Auth)
- Managed by Supabase Auth
- Contains user authentication data

### 2. Subscriptions Table
```sql
subscriptions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  plan TEXT DEFAULT 'Free',
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

### 3. Prompts Table
```sql
prompts (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  raw_prompt TEXT NOT NULL,
  optimized_prompt TEXT NOT NULL,
  tone TEXT DEFAULT 'casual',
  created_at TIMESTAMP
)
```

### 4. Plans Table
```sql
plans (
  id UUID PRIMARY KEY,
  name TEXT UNIQUE,
  display_name TEXT,
  price_monthly DECIMAL(10,2),
  daily_limit INTEGER,
  monthly_limit INTEGER,
  features JSONB,
  is_active BOOLEAN,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

### 5. Usage Table
```sql
usage (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  date DATE,
  requests_count INTEGER DEFAULT 0,
  tokens_used INTEGER DEFAULT 0,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  UNIQUE(user_id, date)
)
```

## API Routes

### 1. `/api/optimize` (POST)
**Purpose**: Optimize prompts using DeepSeek API with usage tracking

**Features**:
- Authentication required
- Usage limit checking
- DeepSeek API integration with fallback
- Automatic usage tracking
- Prompt storage

**Request**:
```json
{
  "raw_prompt": "Write a blog post about AI",
  "tone": "casual" // casual, formal, detailed
}
```

**Response**:
```json
{
  "success": true,
  "optimized_prompt": "Enhanced prompt...",
  "provider": "deepseek", // or "basic"
  "tokens_used": 150,
  "data": { /* stored prompt data */ }
}
```

### 2. `/api/usage` (GET/POST)
**Purpose**: Track and manage user usage limits

**GET - Check Usage**:
```json
{
  "limits": {
    "daily_limit": 5,
    "monthly_limit": 150
  },
  "usage": {
    "daily_requests": 2,
    "monthly_requests": 45
  },
  "canMakeRequest": true
}
```

**POST - Increment Usage**:
```json
{
  "tokens_used": 100
}
```

### 3. `/api/delete-account` (DELETE)
**Purpose**: Delete user account and associated data

## Database Functions

### 1. `get_user_plan_limits(user_uuid)`
Returns user's current plan limits (daily/monthly)

### 2. `get_user_usage(user_uuid, date)`
Returns user's usage for specified date and month

### 3. `handle_new_user()`
Automatically creates subscription for new users

## Plan Configuration

### Free Plan
- **Price**: $0/month
- **Daily Limit**: 5 prompts
- **Monthly Limit**: 150 prompts
- **Features**: Basic optimization, Standard support, Community access

### Pro Plan
- **Price**: $19.99/month
- **Daily Limit**: 1000 prompts
- **Monthly Limit**: 30,000 prompts
- **Features**: Advanced optimization, Priority support, API access, Custom templates, Team collaboration

## Security Features

### Row Level Security (RLS)
- All tables have RLS enabled
- Users can only access their own data
- Plans table is read-only for authenticated users

### Authentication
- All API routes require authentication
- Session-based authentication using Supabase
- Automatic user identification

## Frontend Components

### 1. UsageTracker Component
- Real-time usage display
- Progress bars for daily/monthly limits
- Upgrade prompts when approaching limits
- Error handling and loading states

### 2. useCanMakeRequest Hook
- Check if user can make requests
- Used to disable UI elements when limits reached

## Environment Variables

```env
# Required
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional (falls back to basic optimization)
DEEPSEEK_API_KEY=your_deepseek_api_key
```

## Setup Instructions

1. **Database Setup**:
   ```bash
   # Run migrations in Supabase SQL Editor
   # 1. supabase/migrations/001_create_subscriptions_table.sql
   # 2. supabase/migrations/002_create_prompts_and_usage_tables.sql
   ```

2. **Environment Configuration**:
   ```bash
   # Add environment variables to .env.local
   ```

3. **Testing**:
   ```bash
   # Test usage API
   curl -X GET http://localhost:3000/api/usage
   
   # Test optimize API
   curl -X POST http://localhost:3000/api/optimize \
     -H "Content-Type: application/json" \
     -d '{"raw_prompt": "test", "tone": "casual"}'
   ```

## Key Features Implemented

✅ **Usage Tracking**: Daily and monthly limits with automatic enforcement
✅ **Plan Management**: Free and Pro plans with different limits
✅ **Prompt Optimization**: DeepSeek API integration with fallback
✅ **Security**: RLS, authentication, user data isolation
✅ **Frontend Integration**: Usage tracking components
✅ **Error Handling**: Comprehensive error handling and fallbacks
✅ **Database Functions**: Efficient usage and limit checking
✅ **Automatic Setup**: Triggers for new user subscription creation

## Next Steps

1. **Payment Integration**: Add Stripe for Pro plan subscriptions
2. **Analytics Dashboard**: Usage analytics and reporting
3. **API Rate Limiting**: Additional protection against abuse
4. **Prompt Templates**: Pre-built prompt templates
5. **Team Features**: Multi-user collaboration for Pro plans
6. **Export Features**: Export prompt history
7. **Advanced Analytics**: Token usage analytics and optimization suggestions
