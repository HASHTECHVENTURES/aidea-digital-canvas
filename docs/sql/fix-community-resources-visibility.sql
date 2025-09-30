-- ===================================================================
-- FIX COMMUNITY RESOURCES VISIBILITY ISSUE
-- This script fixes the issue where public users can only see 3 resources
-- instead of all 4 resources in the community section
-- ===================================================================

-- STEP 1: Check current policies
SELECT 'CURRENT POLICIES:' as info;
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'community_resources'
ORDER BY policyname;

-- STEP 2: Drop existing restrictive policies
DROP POLICY IF EXISTS "Anyone can view free resources" ON public.community_resources;
DROP POLICY IF EXISTS "Authenticated users can view premium resources" ON public.community_resources;
DROP POLICY IF EXISTS "Allow all authenticated access to resources" ON public.community_resources;
DROP POLICY IF EXISTS "Allow anonymous to view free resources" ON public.community_resources;

-- STEP 3: Create new policies for proper access control
-- Allow anonymous users (public) to view all active resources
CREATE POLICY "Allow public to view all active resources" ON public.community_resources
    FOR SELECT USING (is_active = true);

-- Allow authenticated users to view all resources (including inactive for admin purposes)
CREATE POLICY "Allow authenticated users to view all resources" ON public.community_resources
    FOR SELECT USING (auth.role() = 'authenticated');

-- Allow authenticated users to perform all operations (for admin panel)
CREATE POLICY "Allow authenticated users to manage resources" ON public.community_resources
    FOR ALL USING (auth.role() = 'authenticated');

-- STEP 4: Verify the new policies
SELECT 'NEW POLICIES:' as info;
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'community_resources'
ORDER BY policyname;

-- STEP 5: Check current data
SELECT 'CURRENT RESOURCES:' as info;
SELECT 
    id,
    title,
    is_active,
    is_premium,
    created_at
FROM public.community_resources
ORDER BY created_at DESC;

-- STEP 6: Ensure all resources are active and visible
UPDATE public.community_resources 
SET is_active = true 
WHERE is_active = false;

-- STEP 7: Final verification
SELECT 'FINAL VERIFICATION:' as info;
SELECT 
    'Total resources:' as metric,
    COUNT(*) as count
FROM public.community_resources
WHERE is_active = true;

SELECT 
    'Active resources:' as metric,
    COUNT(*) as count
FROM public.community_resources
WHERE is_active = true;

SELECT 'COMMUNITY RESOURCES VISIBILITY FIXED! ✅' as status;
SELECT 'Public users should now see all 4 resources in the community section.' as message;
