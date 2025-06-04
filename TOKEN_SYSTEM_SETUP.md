# PromptPilot Token System Implementation

## Overview
This document outlines the complete token-based system implementation for PromptPilot, matching your exact pricing plans and requirements.

## 🎯 System Features

### Free Plan ($0/month)
- **7 bonus tokens** on signup
- **1 token per day** after bonus tokens are used
- **Maximum 7 tokens** at any time
- **Limited algorithms** for prompt generation
- Basic features

### Pro Plan ($8.33/month)
- **Unlimited prompt generations**
- **Multiple AI models** to choose from
- **Save prompts** functionality
- **Advanced algorithms** for prompt generation
- All premium features

## 🗄️ Database Schema Changes

### New Columns Added to `subscriptions` table:
```sql
- tokens INTEGER (current available tokens)
- last_token_refresh DATE (last daily refresh)
- bonus_tokens_given BOOLEAN (whether user received signup bonus)
```

### Updated `plans` table:
```sql
- bonus_tokens INTEGER (tokens given on signup)
- tokens_per_day INTEGER (daily token refresh amount)
- is_unlimited BOOLEAN (unlimited plan flag)
```

## 🔧 Database Functions

### 1. `give_bonus_tokens_to_new_user()`
- **Trigger**: Automatically runs when new subscription is created
- **Action**: Gives 7 bonus tokens to free users, 0 to pro users
- **Sets**: `bonus_tokens_given = TRUE`

### 2. `refresh_daily_tokens(user_uuid)`
- **Purpose**: Refreshes daily tokens for free users
- **Logic**: 
  - Free users: +1 token per day (max 7 total)
  - Pro users: Always unlimited (999999)
- **Returns**: Current token count

### 3. `use_token(user_uuid)`
- **Purpose**: Consumes one token for prompt generation
- **Logic**:
  - Pro users: Always returns TRUE (unlimited)
  - Free users: Deducts 1 token if available
- **Returns**: Boolean success

### 4. `get_user_tokens(user_uuid)`
- **Purpose**: Gets complete token information
- **Returns**: Current tokens, limits, plan info, availability

## 🚀 API Endpoints

### GET `/api/usage`
**Returns token information:**
```json
{
  "tokens": {
    "current": 5,
    "max": 7,
    "per_day": 1,
    "unlimited": false
  },
  "plan": {
    "name": "free",
    "display_name": "Free",
    "is_unlimited": false
  },
  "canMakeRequest": true,
  "lastRefresh": "2024-01-15"
}
```

### POST `/api/usage`
**Consumes a token:**
```json
{
  "success": true,
  "tokens": {
    "current": 4,
    "unlimited": false
  },
  "message": "Token used successfully"
}
```

### POST `/api/optimize`
**Enhanced with token system:**
- Automatically checks and consumes tokens
- Returns remaining token count
- Provides clear error messages for token limits

## 🎨 Frontend Components

### UsageTracker Component
- **Displays**: Current tokens, plan info, usage stats
- **Features**: 
  - Progress bar for token usage
  - Plan-specific information
  - Upgrade prompts for free users
  - Real-time token updates

### Features:
- **Token visualization** with progress bars
- **Plan badges** (Free, Pro, Unlimited)
- **Upgrade prompts** when tokens are low
- **Real-time updates** after prompt generation

## 📋 Setup Instructions

### 1. Run Database Migration
```sql
-- Execute in Supabase SQL Editor
-- Copy and paste: supabase/migrations/003_implement_token_system.sql
```

### 2. Verify Migration
Check that these functions exist:
- `give_bonus_tokens_to_new_user()`
- `refresh_daily_tokens(user_uuid)`
- `use_token(user_uuid)`
- `get_user_tokens(user_uuid)`

### 3. Test Token System
```bash
# Test token info
curl -X GET http://localhost:3000/api/usage

# Test prompt generation (consumes token)
curl -X POST http://localhost:3000/api/optimize \
  -H "Content-Type: application/json" \
  -d '{"raw_prompt": "test prompt", "tone": "casual"}'
```

## 🔄 Token Flow

### New User Signup:
1. User signs up → Subscription created with `plan = 'free'`
2. Trigger fires → `give_bonus_tokens_to_new_user()`
3. User receives 7 bonus tokens
4. `bonus_tokens_given = TRUE`, `last_token_refresh = today`

### Daily Token Refresh (Free Users):
1. User makes request → `refresh_daily_tokens()` called
2. Check days since last refresh
3. If ≥1 day: Add 1 token (max 7 total)
4. Update `last_token_refresh = today`

### Prompt Generation:
1. User requests optimization → `use_token()` called
2. Pro users: Always allowed (unlimited)
3. Free users: Check token availability
4. If tokens available: Deduct 1 token, proceed
5. If no tokens: Return error with upgrade message

## 🎯 User Experience

### Free User Journey:
1. **Signup**: Gets 7 bonus tokens immediately
2. **Usage**: Can generate 7 prompts right away
3. **Daily**: Gets 1 new token each day (max 7)
4. **Limit**: Clear messaging when out of tokens
5. **Upgrade**: Easy upgrade path to Pro

### Pro User Experience:
1. **Unlimited**: No token restrictions
2. **Advanced**: Access to better algorithms
3. **Features**: Save prompts, multiple models
4. **Value**: Clear value proposition

## 🔍 Monitoring & Analytics

### Key Metrics to Track:
- **Token usage patterns** by user
- **Conversion rate** from free to pro
- **Daily active users** vs token consumption
- **Upgrade triggers** (when users hit limits)

### Database Queries:
```sql
-- Check user token status
SELECT s.tokens, s.plan, s.last_token_refresh 
FROM subscriptions s 
WHERE s.user_id = 'user-id';

-- Daily token refresh stats
SELECT COUNT(*) as users_refreshed 
FROM subscriptions 
WHERE last_token_refresh = CURRENT_DATE;

-- Conversion opportunities
SELECT COUNT(*) as low_token_users 
FROM subscriptions 
WHERE plan = 'free' AND tokens <= 1;
```

## 🚨 Error Handling

### Common Error Messages:
- **No tokens**: "No tokens available. Free users get 7 bonus tokens + 1 per day. Upgrade to Pro for unlimited prompts!"
- **API errors**: Clear technical error messages for debugging
- **Fallback**: Graceful degradation if token system fails

## 🔄 Migration Notes

### Existing Users:
- All existing free users automatically receive 7 tokens
- `bonus_tokens_given = TRUE` to prevent double bonus
- Pro users remain unlimited

### Data Integrity:
- All functions use `SECURITY DEFINER` for proper permissions
- Row Level Security (RLS) maintained
- Proper indexing for performance

This token system provides a clear, user-friendly experience that encourages upgrades while providing value to free users!
