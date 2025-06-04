# Razorpay Payment Integration for PromptPilot

## Overview

This document outlines the complete Razorpay payment integration for PromptPilot, including UPI support, one-time payments, and subscription management.

## Features Implemented

✅ **Razorpay Integration**
- Server-side order creation
- Client-side checkout with UPI/Card/NetBanking support
- Payment verification with signature validation
- Webhook handling for payment events

✅ **Database Schema**
- Extended subscriptions table with payment fields
- New payments table for transaction history
- Database functions for payment processing

✅ **Frontend Components**
- `RazorpayCheckout` - Main payment component
- `PaymentButton` - Smart payment button with user state management
- Toast notifications for payment feedback

✅ **API Endpoints**
- `/api/razorpay/create-order` - Create Razorpay orders
- `/api/razorpay/verify-payment` - Verify payment signatures
- `/api/razorpay/webhook` - Handle Razorpay webhooks
- `/api/subscription/upgrade` - Subscription management

## Payment Flow

1. **User clicks "Upgrade to Pro"**
2. **Frontend calls** `/api/razorpay/create-order`
3. **Backend creates** Razorpay order and stores in database
4. **Frontend opens** Razorpay checkout modal
5. **User completes** payment (UPI/Card/NetBanking)
6. **Razorpay returns** payment details to frontend
7. **Frontend calls** `/api/razorpay/verify-payment`
8. **Backend verifies** signature and updates subscription
9. **User redirected** to dashboard with success message

## File Structure

```
src/
├── app/api/razorpay/
│   ├── create-order/route.ts     # Create payment orders
│   ├── verify-payment/route.ts   # Verify payments
│   └── webhook/route.ts          # Handle webhooks
├── app/api/subscription/
│   └── upgrade/route.ts          # Subscription management
├── components/payment/
│   ├── RazorpayCheckout.tsx      # Payment checkout component
│   └── PaymentButton.tsx        # Smart payment button
├── components/ui/
│   └── toast.tsx                 # Toast notifications
└── hooks/
    └── use-toast.ts              # Toast hook

supabase/migrations/
└── 004_add_payment_fields.sql   # Database migration
```

## Environment Variables

```env
# Razorpay Configuration
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id

# Optional: Webhook secret (recommended for production)
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
```

## Database Schema

### Subscriptions Table (Extended)
```sql
ALTER TABLE subscriptions ADD COLUMNS:
- razorpay_order_id TEXT
- razorpay_payment_id TEXT  
- razorpay_signature TEXT
- payment_status TEXT DEFAULT 'pending'
- subscription_start_date TIMESTAMP
- subscription_end_date TIMESTAMP
- amount_paid DECIMAL(10,2)
- currency TEXT DEFAULT 'INR'
```

### Payments Table (New)
```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  subscription_id UUID REFERENCES subscriptions(id),
  razorpay_order_id TEXT NOT NULL,
  razorpay_payment_id TEXT,
  amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Usage Examples

### Basic Payment Button
```tsx
import { PaymentButton } from '@/components/payment/PaymentButton'

<PaymentButton
  plan="Pro"
  amount={499}
  className="w-full bg-purple-600 hover:bg-purple-700"
>
  Upgrade to Pro - ₹499
</PaymentButton>
```

### Custom Razorpay Checkout
```tsx
import { RazorpayCheckout } from '@/components/payment/RazorpayCheckout'

<RazorpayCheckout
  amount={499}
  userId={user.id}
  plan="Pro"
  userEmail={user.email}
  userName={user.name}
  onSuccess={() => router.push('/dashboard')}
  onError={(error) => console.error(error)}
>
  Pay ₹499
</RazorpayCheckout>
```

## Testing

### Test Credentials
Use Razorpay test mode credentials for development:
- Test cards: 4111 1111 1111 1111
- Test UPI: success@razorpay
- Test failure: failure@razorpay

### Test Flow
1. Start development server: `npm run dev`
2. Navigate to pricing page
3. Click "Upgrade to Pro"
4. Complete payment with test credentials
5. Verify subscription upgrade in dashboard

## Production Setup

### 1. Razorpay Dashboard Configuration
- Enable live mode
- Configure webhook URL: `https://your-domain.com/api/razorpay/webhook`
- Add production domain to allowed origins
- Enable required payment methods (UPI, Cards, NetBanking)

### 2. Environment Variables
```env
# Production Razorpay credentials
RAZORPAY_KEY_ID=rzp_live_xxxxx
RAZORPAY_KEY_SECRET=your_live_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_xxxxx
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
```

### 3. Database Migration
Run the payment migration in production Supabase:
```sql
-- Copy contents of supabase/migrations/004_add_payment_fields.sql
-- and execute in Supabase SQL Editor
```

## Security Features

✅ **Payment Signature Verification**
- All payments verified using HMAC SHA256
- Prevents payment tampering

✅ **Database Security**
- Row Level Security (RLS) enabled
- Users can only access their own data

✅ **API Security**
- Server-side validation
- User authentication required

✅ **Webhook Security**
- Signature verification for webhooks
- Prevents unauthorized webhook calls

## Troubleshooting

### Common Issues

1. **Payment fails with "Invalid signature"**
   - Check RAZORPAY_KEY_SECRET is correct
   - Ensure signature verification logic is correct

2. **Checkout doesn't open**
   - Verify NEXT_PUBLIC_RAZORPAY_KEY_ID is set
   - Check browser console for script loading errors

3. **Database errors**
   - Ensure migration was run successfully
   - Check RLS policies are configured

4. **Webhook not working**
   - Verify webhook URL is accessible
   - Check webhook signature verification

### Debug Mode
Enable debug logging by adding to your API routes:
```typescript
console.log('Payment debug:', { orderId, paymentId, signature })
```

## Support

For issues related to:
- **Razorpay API**: Check [Razorpay Documentation](https://razorpay.com/docs/)
- **Integration bugs**: Check the implementation in this codebase
- **Database issues**: Verify Supabase configuration and migrations
