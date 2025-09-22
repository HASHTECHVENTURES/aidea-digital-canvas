-- ===================================================================
-- FIX ADMIN ACCESS TO USER PROFILES
-- Run this to allow admin to view all users
-- ===================================================================

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Users can view their own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.user_profiles;

-- Create more permissive policies for admin access
CREATE POLICY "Allow authenticated users to view all profiles" ON public.user_profiles
FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update profiles" ON public.user_profiles
FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert profiles" ON public.user_profiles
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Also allow users to view their own profile
CREATE POLICY "Users can view their own profile" ON public.user_profiles
FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.user_profiles
FOR UPDATE USING (auth.uid() = id);

SELECT 'Admin user access policies updated! ✅' as status;
SELECT 'Admin panel should now show all users.' as message;
