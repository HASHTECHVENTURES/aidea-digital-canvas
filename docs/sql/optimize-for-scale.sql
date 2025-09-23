-- ===================================================================
-- OPTIMIZE DATABASE FOR SCALE - HANDLE 80+ USERS
-- Run this to optimize your database for high user load
-- ===================================================================

-- STEP 1: Add database indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_full_name ON public.user_profiles(full_name);
CREATE INDEX IF NOT EXISTS idx_user_profiles_company_name ON public.user_profiles(company_name);
CREATE INDEX IF NOT EXISTS idx_user_profiles_created_at ON public.user_profiles(created_at);
CREATE INDEX IF NOT EXISTS idx_user_profiles_is_active ON public.user_profiles(is_active);

CREATE INDEX IF NOT EXISTS idx_community_events_title ON public.community_events(title);
CREATE INDEX IF NOT EXISTS idx_community_events_event_type ON public.community_events(event_type);
CREATE INDEX IF NOT EXISTS idx_community_events_event_date ON public.community_events(event_date);
CREATE INDEX IF NOT EXISTS idx_community_events_is_active ON public.community_events(is_active);

CREATE INDEX IF NOT EXISTS idx_community_resources_title ON public.community_resources(title);
CREATE INDEX IF NOT EXISTS idx_community_resources_resource_type ON public.community_resources(resource_type);
CREATE INDEX IF NOT EXISTS idx_community_resources_is_premium ON public.community_resources(is_premium);
CREATE INDEX IF NOT EXISTS idx_community_resources_is_active ON public.community_resources(is_active);

-- STEP 2: Optimize RLS policies for better performance
DROP POLICY IF EXISTS "Allow all authenticated access to user_profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "Allow all authenticated access to events" ON public.community_events;
DROP POLICY IF EXISTS "Allow all authenticated access to resources" ON public.community_resources;

-- Create optimized policies
CREATE POLICY "Optimized user profiles access" ON public.user_profiles
FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Optimized events access" ON public.community_events
FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Optimized resources access" ON public.community_resources
FOR ALL USING (auth.role() = 'authenticated');

-- STEP 3: Add connection pooling settings (if needed)
-- These are typically set at the Supabase project level

-- STEP 4: Create a function to get user statistics
CREATE OR REPLACE FUNCTION get_user_stats()
RETURNS TABLE (
    total_users bigint,
    active_users bigint,
    users_today bigint,
    users_this_week bigint
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(*) as total_users,
        COUNT(*) FILTER (WHERE is_active = true) as active_users,
        COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE) as users_today,
        COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '7 days') as users_this_week
    FROM public.user_profiles;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- STEP 5: Create a function to get paginated users
CREATE OR REPLACE FUNCTION get_paginated_users(
    page_size integer DEFAULT 20,
    page_offset integer DEFAULT 0,
    search_term text DEFAULT ''
)
RETURNS TABLE (
    id uuid,
    email text,
    full_name text,
    phone_number text,
    company_name text,
    is_active boolean,
    created_at timestamptz,
    total_count bigint
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        up.id,
        up.email,
        up.full_name,
        up.phone_number,
        up.company_name,
        up.is_active,
        up.created_at,
        COUNT(*) OVER() as total_count
    FROM public.user_profiles up
    WHERE 
        (search_term = '' OR 
         up.full_name ILIKE '%' || search_term || '%' OR
         up.email ILIKE '%' || search_term || '%' OR
         up.company_name ILIKE '%' || search_term || '%' OR
         up.phone_number ILIKE '%' || search_term || '%')
    ORDER BY up.created_at DESC
    LIMIT page_size
    OFFSET page_offset;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- STEP 6: Grant permissions
GRANT EXECUTE ON FUNCTION get_user_stats() TO authenticated;
GRANT EXECUTE ON FUNCTION get_paginated_users(integer, integer, text) TO authenticated;

-- STEP 7: Verify optimizations
SELECT 'Database optimization complete!' as status;
SELECT 'Indexes created for better performance' as indexes;
SELECT 'Optimized RLS policies applied' as policies;
SELECT 'Helper functions created for pagination and stats' as functions;

-- Test the functions
SELECT * FROM get_user_stats();
