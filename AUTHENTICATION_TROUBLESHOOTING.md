# Authentication Troubleshooting Guide

## Problem: Authentication works in development but redirects to "/" in production

### Root Cause
The most common cause is missing or incorrect `NEXT_PUBLIC_SITE_URL` environment variable in production.

### Solution Steps

#### 1. Set Environment Variables in Production

**For Vercel:**
1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add: `NEXT_PUBLIC_SITE_URL` = `https://promptpilot.shreyansh.xyz` (your actual domain)

**For other platforms:**
Set the environment variable in your deployment platform's settings.

#### 2. Update Supabase Auth Settings

1. Go to your Supabase dashboard
2. Navigate to Authentication → URL Configuration
3. Ensure these URLs are added to "Redirect URLs":
   - `https://promptpilot.shreyansh.xyz/auth/callback`
   - `http://localhost:3000/auth/callback` (for development)

#### 3. Verify Configuration

After deployment, check the browser console for these logs:
- `Using NEXT_PUBLIC_SITE_URL: https://your-domain.com`
- `getFullUrl: /auth/callback -> https://your-domain.com/auth/callback`

#### 4. Common Issues and Fixes

**Issue: Still redirecting to "/"**
- Check that `NEXT_PUBLIC_SITE_URL` is set correctly (no trailing slash)
- Verify the URL matches exactly what's in Supabase settings
- Ensure you're using HTTPS in production

**Issue: "Invalid authentication link"**
- The redirect URL in Supabase doesn't match your environment variable
- Check browser console for error messages

**Issue: OAuth provider errors**
- Verify OAuth provider settings match your production domain
- Check that redirect URLs are whitelisted in OAuth provider

### Debug Steps

1. **Check Environment Variables:**
   ```bash
   # In your deployment platform, verify:
   echo $NEXT_PUBLIC_SITE_URL
   ```

2. **Check Browser Console:**
   - Look for URL generation logs
   - Check for authentication errors
   - Verify redirect URLs being used

3. **Test Authentication Flow:**
   - Try both email/password and OAuth
   - Check network tab for redirect requests
   - Verify callback URL parameters

### Prevention

1. Always set `NEXT_PUBLIC_SITE_URL` in production
2. Keep Supabase redirect URLs in sync with your domains
3. Test authentication after each deployment
4. Monitor browser console for authentication errors

### Contact Support

If issues persist after following these steps:
1. Check browser console logs
2. Verify all environment variables are set
3. Confirm Supabase settings match your domain
4. Test with a fresh incognito/private browser window
