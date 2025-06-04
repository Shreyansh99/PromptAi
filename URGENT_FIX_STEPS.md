# URGENT: Fix Subscription Creation Errors

## Current Error
```
ERROR: 23502: null value in column "tokens" of relation "subscriptions" violates not-null constraint
```

## Immediate Fix Steps

### Step 1: Fix Null Tokens Issue (URGENT)
1. Open Supabase SQL Editor
2. Copy and paste the entire contents of `FIX_NULL_TOKENS.sql`
3. Click "Run" to execute
4. You should see: "SUCCESS: All subscriptions now have valid token values"

### Step 2: Fix RLS Policies
1. In Supabase SQL Editor
2. Copy and paste the entire contents of `IMMEDIATE-FIX.sql`
3. Click "Run" to execute

### Step 3: Add Service Role Key
1. Go to Supabase Dashboard → Settings → API
2. Copy the `service_role` key (NOT the anon key)
3. Add to your environment:

**Local Development:**
Create `.env.local`:
```env
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

**Production (Vercel):**
1. Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add: `SUPABASE_SERVICE_ROLE_KEY` = `your-service-role-key`
3. Redeploy

### Step 4: Test the Fix
1. Clear browser cache/cookies
2. Try logging in
3. Navigate to `/dashboard`
4. Check browser console for errors
5. Verify usage tracker loads properly

## What These Fixes Do

### FIX_NULL_TOKENS.sql:
- Removes the broken trigger causing null tokens
- Fixes existing subscriptions with null tokens
- Creates a reliable trigger that prevents future null tokens

### IMMEDIATE-FIX.sql:
- Sets up proper RLS policies
- Allows service role to create subscriptions
- Creates subscriptions for existing users

### API Changes:
- Uses service role key for subscription creation
- Bypasses RLS for administrative operations
- Maintains security for regular user operations

## Expected Result
After these fixes:
- No more null token constraint violations
- No more RLS policy violations
- Users can successfully log in and access dashboard
- Usage tracker displays properly
- New users get 7 bonus tokens automatically

## If You Still Have Issues
1. Check Supabase logs for any remaining errors
2. Verify the service role key is correctly set
3. Ensure both SQL scripts ran without errors
4. Check browser network tab for API response details
