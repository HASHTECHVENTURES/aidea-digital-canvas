-- ===================================================================
-- SUPABASE DATABASE STATUS CHECK
-- Copy and paste this ENTIRE script into your Supabase SQL editor
-- This will show you exactly what's in your database right now
-- ===================================================================

-- Check if custom types exist
SELECT 'CHECKING CUSTOM TYPES:' as status;
SELECT typname as type_name, typtype as type_type 
FROM pg_type 
WHERE typname IN ('user_gender', 'event_type', 'resource_type')
ORDER BY typname;

-- Check if tables exist and their structure
SELECT 'CHECKING TABLES:' as status;
SELECT table_name, table_type 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('user_profiles', 'community_events', 'community_resources', 'admins')
ORDER BY table_name;

-- Check table columns
SELECT 'USER_PROFILES COLUMNS:' as status;
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'user_profiles' AND table_schema = 'public'
ORDER BY ordinal_position;

SELECT 'COMMUNITY_EVENTS COLUMNS:' as status;
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'community_events' AND table_schema = 'public'
ORDER BY ordinal_position;

SELECT 'COMMUNITY_RESOURCES COLUMNS:' as status;
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'community_resources' AND table_schema = 'public'
ORDER BY ordinal_position;

SELECT 'ADMINS COLUMNS:' as status;
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'admins' AND table_schema = 'public'
ORDER BY ordinal_position;

-- Check RLS policies
SELECT 'CHECKING RLS POLICIES:' as status;
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename IN ('user_profiles', 'community_events', 'community_resources', 'admins')
ORDER BY tablename, policyname;

-- Check functions and triggers
SELECT 'CHECKING FUNCTIONS:' as status;
SELECT routine_name, routine_type, data_type
FROM information_schema.routines 
WHERE routine_schema = 'public' 
AND routine_name LIKE '%user%'
ORDER BY routine_name;

SELECT 'CHECKING TRIGGERS:' as status;
SELECT trigger_name, event_manipulation, event_object_table, action_timing, action_statement
FROM information_schema.triggers 
WHERE trigger_schema = 'public'
ORDER BY event_object_table, trigger_name;

-- Check actual data counts
SELECT 'DATA COUNTS:' as status;
SELECT 
    'admins' as table_name,
    COUNT(*) as row_count,
    COUNT(CASE WHEN is_active = true THEN 1 END) as active_count
FROM public.admins
UNION ALL
SELECT 
    'user_profiles' as table_name,
    COUNT(*) as row_count,
    COUNT(CASE WHEN is_active = true THEN 1 END) as active_count
FROM public.user_profiles
UNION ALL
SELECT 
    'community_events' as table_name,
    COUNT(*) as row_count,
    COUNT(CASE WHEN is_active = true THEN 1 END) as active_count
FROM public.community_events
UNION ALL
SELECT 
    'community_resources' as table_name,
    COUNT(*) as row_count,
    COUNT(CASE WHEN is_active = true THEN 1 END) as active_count
FROM public.community_resources;

-- Check admin data specifically
SELECT 'ADMIN ACCOUNTS:' as status;
SELECT id, email, name, is_active, created_at
FROM public.admins
ORDER BY created_at;

-- Check events data
SELECT 'EVENTS DATA:' as status;
SELECT 
    id, 
    title, 
    event_type, 
    event_date::date as event_date,
    event_time,
    location,
    is_featured,
    is_active,
    max_attendees,
    current_attendees
FROM public.community_events
ORDER BY event_date;

-- Check resources data
SELECT 'RESOURCES DATA:' as status;
SELECT 
    id,
    title,
    resource_type,
    download_count,
    is_premium,
    is_active,
    CASE 
        WHEN file_url IS NOT NULL AND file_url != '' THEN 'HAS_URL'
        ELSE 'NO_URL'
    END as url_status
FROM public.community_resources
ORDER BY created_at DESC;

-- Check user profiles (if any exist)
SELECT 'USER PROFILES:' as status;
SELECT 
    id,
    email,
    full_name,
    phone_number,
    gender,
    is_active,
    created_at::date as joined_date
FROM public.user_profiles
ORDER BY created_at DESC
LIMIT 10;

-- Check permissions
SELECT 'CHECKING PERMISSIONS:' as status;
SELECT 
    grantee,
    table_schema,
    table_name,
    privilege_type
FROM information_schema.role_table_grants 
WHERE table_schema = 'public' 
AND table_name IN ('user_profiles', 'community_events', 'community_resources', 'admins')
AND grantee IN ('anon', 'authenticated', 'service_role')
ORDER BY table_name, grantee, privilege_type;

-- Final summary
SELECT 'DATABASE STATUS SUMMARY:' as status;
SELECT 
    'Tables exist: ' || 
    CASE 
        WHEN (SELECT COUNT(*) FROM information_schema.tables 
              WHERE table_schema = 'public' 
              AND table_name IN ('user_profiles', 'community_events', 'community_resources', 'admins')) = 4 
        THEN 'YES ✓' 
        ELSE 'MISSING ✗' 
    END as tables_status,
    'Admin accounts: ' || (SELECT COUNT(*) FROM public.admins WHERE is_active = true) as admin_status,
    'Sample events: ' || (SELECT COUNT(*) FROM public.community_events WHERE is_active = true) as events_status,
    'Sample resources: ' || (SELECT COUNT(*) FROM public.community_resources WHERE is_active = true) as resources_status,
    'User profiles: ' || (SELECT COUNT(*) FROM public.user_profiles) as users_status;

-- ===================================================================
-- END OF STATUS CHECK
-- ===================================================================
