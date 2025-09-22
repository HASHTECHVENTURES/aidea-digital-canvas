-- ===================================================================
-- DIAGNOSE USER DATA ISSUES
-- Run this to check what's happening with user data
-- ===================================================================

-- Check if user_profiles table exists and has data
SELECT 'USER_PROFILES TABLE CHECK:' as info;
SELECT COUNT(*) as total_users FROM public.user_profiles;

-- Check auth.users table (this is Supabase's built-in table)
SELECT 'AUTH.USERS TABLE CHECK:' as info;
SELECT COUNT(*) as total_auth_users FROM auth.users;

-- Check if there are users in auth.users but not in user_profiles
SELECT 'MISSING USER PROFILES:' as info;
SELECT 
    au.id,
    au.email,
    au.created_at as auth_created,
    up.id as profile_id
FROM auth.users au
LEFT JOIN public.user_profiles up ON au.id = up.id
WHERE up.id IS NULL;

-- Check RLS policies on user_profiles
SELECT 'USER_PROFILES RLS POLICIES:' as info;
SELECT 
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies 
WHERE tablename = 'user_profiles';

-- Check if the trigger is enabled
SELECT 'TRIGGER STATUS:' as info;
SELECT 
    tgname as trigger_name,
    tgenabled as enabled
FROM pg_trigger 
WHERE tgname = 'on_auth_user_created';

-- Show sample user data if any exists
SELECT 'SAMPLE USER DATA:' as info;
SELECT id, email, full_name, created_at 
FROM public.user_profiles 
LIMIT 5;

SELECT 'DIAGNOSIS COMPLETE!' as status;
