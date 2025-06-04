# Fix for "Database error saving new user"

## Problem
When users try to sign up, they get the error: **"Database error saving new user"**

This happens because the database trigger that automatically creates a subscription for new users is failing.

## Root Cause
The issue is likely caused by one of these problems:
1. **Missing database migrations** - The subscriptions table or trigger isn't properly set up
2. **RLS (Row Level Security) policy conflicts** - The trigger doesn't have the right permissions
3. **Database function permissions** - The `handle_new_user()` function lacks proper permissions

## Solution Options

### Option 1: Fix the Database Trigger (Recommended)

1. **Go to your Supabase project dashboard**
2. **Navigate to SQL Editor**
3. **Copy and paste the contents of `fix-database-trigger.sql`**
4. **Click Run to execute**

This will:
- Ensure the subscriptions table exists with the correct structure
- Fix the RLS policies to allow the trigger to work
- Improve the trigger function with better error handling
- Grant necessary permissions

### Option 2: Disable Trigger + Use App-Level Initialization

If Option 1 doesn't work:

1. **Run `alternative-fix-disable-trigger.sql` in Supabase SQL Editor**
2. **The app will now handle user initialization** via the `/api/init-user` endpoint

This approach:
- Disables the problematic database trigger
- Handles user subscription creation in the application code
- Is more reliable and easier to debug

## What I've Already Fixed

✅ **Updated auth callback** - Now calls `/api/init-user` after successful authentication  
✅ **Created `/api/init-user` API route** - Handles user subscription creation  
✅ **Added error handling** - Won't break authentication if subscription creation fails  

## Testing the Fix

1. **Run one of the SQL fixes** in Supabase SQL Editor
2. **Try signing up with a new account**
3. **Check the browser console** for any error messages
4. **Verify the user gets redirected to dashboard** after successful signup

## Verification

After applying the fix, verify:

1. **New users can sign up** without database errors
2. **Users get 7 bonus tokens** when they first sign up
3. **The `/api/usage` endpoint works** and returns token information
4. **Users can access the dashboard** after authentication

## Troubleshooting

If you still get errors:

1. **Check Supabase logs** in your project dashboard
2. **Verify all migrations ran** by checking the tables exist
3. **Test with a fresh email** (not one that failed before)
4. **Check browser console** for detailed error messages

## Database Tables Required

Make sure these tables exist in your Supabase project:

```sql
-- subscriptions table
public.subscriptions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  plan TEXT DEFAULT 'Free',
  status TEXT DEFAULT 'active',
  tokens INTEGER DEFAULT 7,
  last_token_refresh DATE,
  bonus_tokens_given BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)

-- plans table (if using the token system)
public.plans (
  id UUID PRIMARY KEY,
  name TEXT UNIQUE,
  display_name TEXT,
  price_monthly DECIMAL,
  daily_limit INTEGER,
  monthly_limit INTEGER,
  features JSONB
)
```

## Next Steps

1. **Apply the database fix**
2. **Test user registration**
3. **Verify token system works**
4. **Users should be able to access dashboard and use the app**

The authentication and API issues should be resolved once users can properly sign up and get their subscription records created.
