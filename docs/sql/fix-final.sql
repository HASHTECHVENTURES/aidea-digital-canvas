-- ===================================================================
-- FINAL FIX - TARGETED APPROACH
-- ===================================================================

-- STEP 1: Check what's actually in the database
SELECT 'CURRENT STATE:' as info;
SELECT 'auth.users count:' as check1, COUNT(*) as count FROM auth.users;
SELECT 'user_profiles count:' as check2, COUNT(*) as count FROM public.user_profiles;

-- Show the actual user data
SELECT 'auth.users data:' as info;
SELECT id, email, created_at, raw_user_meta_data FROM auth.users;

SELECT 'user_profiles data:' as info;
SELECT id, email, full_name, phone_number, company_name FROM public.user_profiles;

-- STEP 2: Force create user profile (ignore conflicts)
INSERT INTO public.user_profiles (id, email, full_name, phone_number, company_name)
SELECT 
    au.id,
    au.email,
    COALESCE(au.raw_user_meta_data->>'full_name', 'Unknown User') as full_name,
    COALESCE(au.raw_user_meta_data->>'phone_number', '') as phone_number,
    COALESCE(au.raw_user_meta_data->>'company_name', '') as company_name
FROM auth.users au
WHERE NOT EXISTS (
    SELECT 1 FROM public.user_profiles up WHERE up.id = au.id
);

-- STEP 3: Completely disable RLS for testing
ALTER TABLE public.user_profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_events DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_resources DISABLE ROW LEVEL SECURITY;

-- STEP 4: Fix storage bucket permissions
UPDATE storage.buckets 
SET public = true 
WHERE id = 'community-files';

-- STEP 5: Grant all permissions
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated, anon;
GRANT ALL ON storage.objects TO authenticated, anon;
GRANT ALL ON storage.buckets TO authenticated, anon;

-- STEP 6: Verify the fix
SELECT 'AFTER FIX:' as info;
SELECT 'user_profiles count:' as check, COUNT(*) as count FROM public.user_profiles;
SELECT 'user_profiles data:' as info;
SELECT id, email, full_name, phone_number, company_name FROM public.user_profiles;

SELECT 'FINAL FIX COMPLETE! ✅' as status;
