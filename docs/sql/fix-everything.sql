-- ===================================================================
-- ONE SCRIPT TO FIX EVERYTHING
-- Copy and paste this entire script into Supabase SQL editor
-- ===================================================================

-- STEP 1: Check current data
SELECT 'BEFORE FIX:' as status;
SELECT 'Users in auth.users:' as check1, COUNT(*) as count FROM auth.users;
SELECT 'Users in user_profiles:' as check2, COUNT(*) as count FROM public.user_profiles;

-- STEP 2: Create missing user profiles
INSERT INTO public.user_profiles (id, email, full_name, phone_number, company_name)
SELECT 
    au.id,
    au.email,
    COALESCE(au.raw_user_meta_data->>'full_name', 'Unknown User') as full_name,
    COALESCE(au.raw_user_meta_data->>'phone_number', '') as phone_number,
    COALESCE(au.raw_user_meta_data->>'company_name', '') as company_name
FROM auth.users au
LEFT JOIN public.user_profiles up ON au.id = up.id
WHERE up.id IS NULL;

-- STEP 3: Fix all RLS policies
DROP POLICY IF EXISTS "Users can view their own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Allow authenticated users to view all profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "Allow authenticated users to update profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "Allow authenticated users to insert profiles" ON public.user_profiles;

CREATE POLICY "Allow all authenticated access to user_profiles" ON public.user_profiles
FOR ALL USING (auth.role() = 'authenticated');

-- STEP 4: Fix storage policies
DROP POLICY IF EXISTS "Anyone can view community files" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload files" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update files" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete files" ON storage.objects;
DROP POLICY IF EXISTS "Allow public access to community files" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated uploads to community files" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated updates to community files" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated deletes to community files" ON storage.objects;

CREATE POLICY "Allow all access to community files" ON storage.objects
FOR ALL USING (bucket_id = 'community-files');

-- STEP 5: Grant all permissions
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO authenticated;
GRANT ALL ON storage.objects TO authenticated;
GRANT ALL ON storage.buckets TO authenticated;

-- STEP 6: Verify everything is fixed
SELECT 'AFTER FIX:' as status;
SELECT 'Users in auth.users:' as check1, COUNT(*) as count FROM auth.users;
SELECT 'Users in user_profiles:' as check2, COUNT(*) as count FROM public.user_profiles;
SELECT 'Events:' as check3, COUNT(*) as count FROM public.community_events;
SELECT 'Resources:' as check4, COUNT(*) as count FROM public.community_resources;

SELECT 'EVERYTHING FIXED! ✅' as final_status;
