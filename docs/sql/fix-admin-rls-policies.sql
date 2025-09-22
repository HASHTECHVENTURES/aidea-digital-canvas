-- ===================================================================
-- FIX ADMIN RLS POLICIES FOR DELETE OPERATIONS
-- Run this in your Supabase SQL editor to allow admin deletions
-- ===================================================================

-- Check current policies
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
WHERE tablename IN ('community_events', 'community_resources')
ORDER BY tablename, policyname;

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Anyone can view active events" ON community_events;
DROP POLICY IF EXISTS "Authenticated users can view all events" ON community_events;
DROP POLICY IF EXISTS "Anyone can view free resources" ON community_resources;
DROP POLICY IF EXISTS "Authenticated users can view premium resources" ON community_resources;

-- Create new permissive policies for admin operations
CREATE POLICY "Allow all operations for authenticated users" ON community_events
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow all operations for authenticated users" ON community_resources
    FOR ALL USING (auth.role() = 'authenticated');

-- Also allow anonymous users to view active content (for public access)
CREATE POLICY "Allow anonymous to view active events" ON community_events
    FOR SELECT USING (is_active = true);

CREATE POLICY "Allow anonymous to view free resources" ON community_resources
    FOR SELECT USING (is_active = true AND is_premium = false);

-- Verify the new policies
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
WHERE tablename IN ('community_events', 'community_resources')
ORDER BY tablename, policyname;

SELECT 'RLS POLICIES UPDATED SUCCESSFULLY! ✅' as status;
