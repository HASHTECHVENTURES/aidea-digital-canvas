-- ===================================================================
-- COMPLETE ADMIN FIX - SOLVE ALL RLS ISSUES
-- Run this to fix both user display and file upload issues
-- ===================================================================

-- STEP 1: Fix user_profiles RLS policies
DROP POLICY IF EXISTS "Users can view their own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Allow authenticated users to view all profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "Allow authenticated users to update profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "Allow authenticated users to insert profiles" ON public.user_profiles;

-- Create permissive policies for admin access
CREATE POLICY "Allow all authenticated access to user_profiles" ON public.user_profiles
FOR ALL USING (auth.role() = 'authenticated');

-- STEP 2: Fix storage policies
DROP POLICY IF EXISTS "Anyone can view community files" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload files" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update files" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete files" ON storage.objects;
DROP POLICY IF EXISTS "Allow public access to community files" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated uploads to community files" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated updates to community files" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated deletes to community files" ON storage.objects;

-- Create permissive storage policies
CREATE POLICY "Allow all access to community files" ON storage.objects
FOR ALL USING (bucket_id = 'community-files');

-- STEP 3: Fix events and resources policies
DROP POLICY IF EXISTS "Anyone can view active events" ON public.community_events;
DROP POLICY IF EXISTS "Authenticated users can view all events" ON public.community_events;
DROP POLICY IF EXISTS "Anyone can view free resources" ON public.community_resources;
DROP POLICY IF EXISTS "Authenticated users can view premium resources" ON public.community_resources;

-- Create permissive policies for events and resources
CREATE POLICY "Allow all authenticated access to events" ON public.community_events
FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow all authenticated access to resources" ON public.community_resources
FOR ALL USING (auth.role() = 'authenticated');

-- STEP 4: Grant all necessary permissions
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO authenticated;
GRANT ALL ON storage.objects TO authenticated;
GRANT ALL ON storage.buckets TO authenticated;

-- STEP 5: Verify data exists
SELECT 'VERIFICATION RESULTS:' as info;
SELECT 'Users in auth.users:' as check1, COUNT(*) as count FROM auth.users;
SELECT 'Users in user_profiles:' as check2, COUNT(*) as count FROM public.user_profiles;
SELECT 'Events:' as check3, COUNT(*) as count FROM public.community_events;
SELECT 'Resources:' as check4, COUNT(*) as count FROM public.community_resources;

SELECT 'COMPLETE ADMIN FIX APPLIED! ✅' as status;
SELECT 'Admin panel should now work properly.' as message;
