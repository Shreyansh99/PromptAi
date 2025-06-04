# RLS Subscription Creation Fix

## Problems
Users are getting 500 errors when the API tries to create subscription records:

### Problem 1: RLS Policy Violation
```
Error creating subscription: {
  code: '42501',
  details: null,
  hint: null,
  message: 'new row violates row-level security policy for table "subscriptions"'
}
```

### Problem 2: Null Tokens Constraint Violation
```
ERROR: 23502: null value in column "tokens" of relation "subscriptions" violates not-null constraint
DETAIL: Failing row contains (..., null, 2025-06-03, t).
```

## Root Causes

### Problem 1: RLS Policy Issue
The API was using the anonymous Supabase key to create subscription records, but the Row Level Security (RLS) policy was blocking the INSERT operation because the anonymous key doesn't have sufficient permissions to bypass RLS policies.

### Problem 2: Null Tokens Issue
A database trigger (`give_bonus_tokens_to_new_user`) was trying to set token values by looking up data from the `plans` table, but the query was returning null values, causing the NOT NULL constraint violation on the `tokens` column.

## Solution

### 1. Run the Database Fixes

**URGENT: Run this first to fix the null tokens issue:**
Execute the `FIX_NULL_TOKENS.sql` script in your Supabase SQL Editor. This script:
- Removes the problematic trigger causing null tokens
- Fixes any existing subscriptions with null tokens
- Creates a reliable trigger that ensures tokens are never null

**Then run the RLS fix:**
Execute the `IMMEDIATE-FIX.sql` script in your Supabase SQL Editor. This script:
- Sets up correct RLS policies that allow both authenticated users and service role to insert subscriptions
- Grants proper permissions
- Creates subscriptions for existing users

### 2. Add Service Role Key
Add the Supabase service role key to your environment variables:

**For Local Development:**
Create a `.env.local` file with:
```env
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

**For Production (Vercel):**
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add: `SUPABASE_SERVICE_ROLE_KEY` = `your-service-role-key`
3. Redeploy your application

**Finding Your Service Role Key:**
1. Go to your Supabase dashboard
2. Navigate to Settings → API
3. Copy the `service_role` key (NOT the anon key)

### 3. API Changes Made
The `/api/usage` route has been updated to:
- Use the service role client for subscription creation
- This bypasses RLS policies for administrative operations
- Maintains security by only using service role for specific operations

## How It Works

### Before (Broken)
```javascript
// Using anonymous key - blocked by RLS
const supabase = createClient(url, anonKey)
await supabase.from('subscriptions').insert(...)  // ❌ Blocked by RLS
```

### After (Fixed)
```javascript
// Using service role key - bypasses RLS for admin operations
const serviceSupabase = createClient(url, serviceRoleKey)
await serviceSupabase.from('subscriptions').insert(...)  // ✅ Works
```

## Security Notes
- The service role key is only used server-side for administrative operations
- Regular user operations still use the anonymous key with proper RLS
- The service role key should never be exposed to the client side

## Testing
After applying the fix:
1. Clear your browser cache/cookies
2. Sign up with a new account or log in with an existing one
3. Navigate to `/dashboard`
4. Check that the usage tracker loads without errors
5. Verify in Supabase that a subscription record was created

## Verification
Check your browser's network tab for the `/api/usage` request:
- Should return 200 status
- Should include token information
- No more 500 errors about RLS policy violations
