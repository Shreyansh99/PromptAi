# Run Payment Migration

## Step 1: Apply the Payment Migration

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `supabase/migrations/004_add_payment_fields.sql`
4. Click **Run** to execute the migration

## Step 2: Verify Migration

After running the migration, verify that the following tables and functions were created:

### Tables Updated:
- **subscriptions** - Added payment-related fields:
  - `razorpay_order_id`
  - `razorpay_payment_id`
  - `razorpay_signature`
  - `payment_status`
  - `subscription_start_date`
  - `subscription_end_date`
  - `amount_paid`
  - `currency`

### New Tables:
- **payments** - Transaction history table

### New Functions:
- `handle_successful_payment()` - Process successful payments
- `is_subscription_active()` - Check subscription status

## Step 3: Test the Migration

You can test the migration by running these queries in the SQL Editor:

```sql
-- Check if new columns were added to subscriptions
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'subscriptions' 
AND table_schema = 'public';

-- Check if payments table was created
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'payments' 
AND table_schema = 'public';

-- Check if functions were created
SELECT routine_name, routine_type 
FROM information_schema.routines 
WHERE routine_schema = 'public' 
AND routine_name IN ('handle_successful_payment', 'is_subscription_active');
```

## Step 4: Set Up Razorpay Credentials

1. Sign up at [razorpay.com](https://razorpay.com)
2. Create a test mode API key
3. Update your `.env.local` file with the actual Razorpay credentials:

```env
RAZORPAY_KEY_ID=your_actual_razorpay_key_id
RAZORPAY_KEY_SECRET=your_actual_razorpay_key_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_actual_razorpay_key_id
```

## Step 5: Configure Razorpay Dashboard

1. Enable UPI, NetBanking, Wallets in the Razorpay dashboard
2. Add your domain to allowed origins
3. Set up webhook URL (optional): `https://your-domain.com/api/razorpay/webhook`

## Troubleshooting

If you encounter any issues:

1. **Migration fails**: Check if you have the necessary permissions in Supabase
2. **Functions not created**: Make sure you're running the SQL as the database owner
3. **RLS policies**: Ensure Row Level Security is properly configured

## Next Steps

After completing the migration:
1. Test the payment flow in development
2. Configure Razorpay webhooks for production
3. Test with actual Razorpay test credentials
