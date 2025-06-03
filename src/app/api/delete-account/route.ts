import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function DELETE() {
  try {
    const supabase = createRouteHandlerClient({ cookies })

    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Delete user's subscription data first
    const { error: subscriptionError } = await supabase
      .from('subscriptions')
      .delete()
      .eq('user_id', user.id)

    if (subscriptionError) {
      console.error('Error deleting subscription:', subscriptionError)
      // Continue with account deletion even if subscription deletion fails
    }

    // Delete any other user-related data here
    // For example: prompts, saved templates, etc.

    // Sign out the user
    await supabase.auth.signOut()

    return NextResponse.json(
      { message: 'Account deleted successfully' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error deleting account:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
