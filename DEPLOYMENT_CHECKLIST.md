# Deployment Checklist for PromptPilot

## Pre-Deployment

### 1. Environment Variables
- [ ] `NEXT_PUBLIC_SUPABASE_URL` is set
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` is set
- [ ] `NEXT_PUBLIC_SITE_URL` is set to your production domain (e.g., `https://promptpilot.shreyansh.xyz`)
- [ ] No trailing slashes in URLs
- [ ] All environment variables use HTTPS in production

### 2. Supabase Configuration
- [ ] Production domain added to Supabase Auth → URL Configuration → Redirect URLs
- [ ] Format: `https://your-domain.com/auth/callback`
- [ ] Site URL set to your production domain in Supabase
- [ ] OAuth providers configured with production domain

### 3. OAuth Provider Settings (if using Google/GitHub/etc.)
- [ ] Production domain added to OAuth provider's allowed redirect URLs
- [ ] OAuth client ID/secret configured for production
- [ ] Redirect URLs match exactly: `https://your-domain.com/auth/callback`

## Deployment Steps

### 1. Deploy to Production
```bash
# For Vercel
vercel --prod

# Or push to main branch if auto-deployment is configured
git push origin main
```

### 2. Set Environment Variables in Deployment Platform

**Vercel:**
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add all required environment variables
3. Redeploy if variables were added after initial deployment

**Other Platforms:**
Set environment variables according to your platform's documentation.

## Post-Deployment Testing

### 1. Basic Functionality
- [ ] Website loads correctly
- [ ] All pages are accessible
- [ ] No console errors on homepage

### 2. Authentication Testing
- [ ] Visit `/auth` page
- [ ] Check browser console for URL generation logs
- [ ] Verify redirect URLs in console match your domain
- [ ] Test email/password signup
- [ ] Test email/password login
- [ ] Test OAuth login (Google, etc.)
- [ ] Verify successful login redirects to `/dashboard`
- [ ] Test logout functionality

### 3. Console Logs to Check
Look for these logs in browser console:
```
Using NEXT_PUBLIC_SITE_URL: https://your-domain.com
getFullUrl: /auth/callback -> https://your-domain.com/auth/callback
Initiating Google OAuth with redirect URL: https://your-domain.com/auth/callback
```

### 4. Error Scenarios to Test
- [ ] Invalid login credentials
- [ ] Expired authentication links
- [ ] Network connectivity issues
- [ ] Accessing protected routes without authentication

## Troubleshooting

### If Authentication Still Redirects to "/"

1. **Check Environment Variables:**
   - Verify `NEXT_PUBLIC_SITE_URL` is set correctly
   - Ensure no typos in the URL
   - Confirm HTTPS is used

2. **Check Supabase Settings:**
   - Verify redirect URLs match exactly
   - Check Site URL in Supabase dashboard
   - Ensure OAuth providers are configured correctly

3. **Check Browser Console:**
   - Look for URL generation logs
   - Check for authentication errors
   - Verify network requests

4. **Test in Incognito Mode:**
   - Clear browser cache and cookies
   - Test authentication flow from scratch

### Common Issues

**"Invalid authentication link"**
- Redirect URL mismatch between app and Supabase
- Check URL configuration in both places

**OAuth provider errors**
- Redirect URLs not whitelisted in OAuth provider
- Check OAuth provider settings

**Environment variable not found**
- Variable not set in deployment platform
- Variable name typo (remember NEXT_PUBLIC_ prefix)

## Monitoring

### Set up monitoring for:
- [ ] Authentication success/failure rates
- [ ] Error logs from authentication flows
- [ ] User session persistence
- [ ] Redirect URL generation

### Regular Checks
- [ ] Test authentication monthly
- [ ] Monitor error logs
- [ ] Verify SSL certificate validity
- [ ] Check OAuth provider settings for changes
