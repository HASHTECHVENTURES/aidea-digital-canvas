-- ===================================================================
-- CLEAN DATABASE SETUP - FIXES ALL SYNC ISSUES
-- Run this if your database is messed up or not syncing properly
-- This will clean everything and set up fresh
-- ===================================================================

-- STEP 1: Clean up any existing broken data
SELECT 'STEP 1: CLEANING UP EXISTING DATA...' as status;

-- Drop existing tables if they exist (this removes broken data)
DROP TABLE IF EXISTS public.community_events CASCADE;
DROP TABLE IF EXISTS public.community_resources CASCADE; 
DROP TABLE IF EXISTS public.admins CASCADE;
-- Note: We keep user_profiles as it's linked to auth.users

-- Drop existing functions and triggers
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

-- Drop existing types if they exist
DROP TYPE IF EXISTS event_type CASCADE;
DROP TYPE IF EXISTS resource_type CASCADE;
-- Note: We keep user_gender as it might be used by user_profiles

-- STEP 2: Create fresh types
SELECT 'STEP 2: CREATING FRESH TYPES...' as status;

CREATE TYPE event_type AS ENUM ('showcase', 'workshop', 'q&a', 'networking', 'training');
CREATE TYPE resource_type AS ENUM ('template', 'tool', 'guide', 'library', 'training', 'documentation');

-- STEP 3: Create fresh tables with correct structure
SELECT 'STEP 3: CREATING FRESH TABLES...' as status;

-- Community Events table
CREATE TABLE public.community_events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    event_type event_type NOT NULL,
    event_date TIMESTAMP WITH TIME ZONE NOT NULL,
    event_time TEXT NOT NULL,
    location TEXT NOT NULL,
    is_featured BOOLEAN DEFAULT FALSE,
    max_attendees INTEGER,
    current_attendees INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Community Resources table
CREATE TABLE public.community_resources (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    resource_type resource_type NOT NULL,
    file_url TEXT,
    download_count INTEGER DEFAULT 0,
    is_premium BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admins table
CREATE TABLE public.admins (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- STEP 4: Enable Row Level Security
SELECT 'STEP 4: ENABLING ROW LEVEL SECURITY...' as status;

ALTER TABLE public.community_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- STEP 5: Create RLS Policies
SELECT 'STEP 5: CREATING RLS POLICIES...' as status;

-- Events policies
CREATE POLICY "Anyone can view active events" ON public.community_events
    FOR SELECT USING (is_active = true);

CREATE POLICY "Authenticated users can view all events" ON public.community_events
    FOR SELECT USING (auth.role() = 'authenticated');

-- Resources policies  
CREATE POLICY "Anyone can view free resources" ON public.community_resources
    FOR SELECT USING (is_active = true AND is_premium = false);

CREATE POLICY "Authenticated users can view premium resources" ON public.community_resources
    FOR SELECT USING (auth.role() = 'authenticated' AND is_active = true);

-- Admin policies
CREATE POLICY "Allow admin login access" ON public.admins
    FOR SELECT USING (true);

-- STEP 6: Grant permissions
SELECT 'STEP 6: GRANTING PERMISSIONS...' as status;

GRANT ALL ON public.community_events TO authenticated;
GRANT ALL ON public.community_events TO anon;
GRANT SELECT ON public.community_events TO anon;

GRANT ALL ON public.community_resources TO authenticated;
GRANT ALL ON public.community_resources TO anon;
GRANT SELECT ON public.community_resources TO anon;

GRANT ALL ON public.admins TO authenticated;
GRANT ALL ON public.admins TO anon;
GRANT SELECT ON public.admins TO anon;

-- STEP 7: Create admin accounts
SELECT 'STEP 7: CREATING ADMIN ACCOUNTS...' as status;

INSERT INTO public.admins (email, password_hash, name) VALUES 
('admin@aidea.digital', 'admin123', 'Admin User'),
('thesujalpatel09@gmail.com', 'Hellosujal09@', 'Sujal Admin'),
('htv@hashtechventures.com', 'admin123', 'HTV Admin');

-- STEP 8: Add sample events
SELECT 'STEP 8: ADDING SAMPLE EVENTS...' as status;

INSERT INTO public.community_events (
    title, description, event_type, event_date, event_time, location, 
    is_featured, max_attendees, current_attendees
) VALUES 
(
    'AI Strategy Workshop for Business Leaders',
    'Join us for an intensive workshop on developing AI strategies that drive business growth. Learn from industry experts and network with fellow business leaders.',
    'workshop',
    '2024-02-15 14:00:00+00',
    '2:00 PM - 5:00 PM EST',
    'Virtual Event via Zoom',
    true,
    50,
    12
),
(
    'Monthly AI Showcase: Latest Innovations', 
    'Discover the latest AI innovations and tools that are transforming businesses. This monthly showcase features live demos and case studies.',
    'showcase',
    '2024-02-28 18:00:00+00',
    '6:00 PM - 7:30 PM EST',
    'Virtual Event via Zoom',
    false,
    100,
    23
),
(
    'AI Implementation Q&A Session',
    'Got questions about implementing AI in your business? Join our expert panel for an interactive Q&A session covering best practices.',
    'q&a',
    '2024-03-05 13:00:00+00',
    '1:00 PM - 2:00 PM EST', 
    'Virtual Event via Zoom',
    false,
    75,
    8
);

-- STEP 9: Add sample resources
SELECT 'STEP 9: ADDING SAMPLE RESOURCES...' as status;

INSERT INTO public.community_resources (
    title, description, resource_type, file_url, download_count, is_premium
) VALUES 
(
    'AI Strategy Planning Template',
    'A comprehensive template to help you develop and document your AI strategy. Includes sections for goal setting and implementation roadmap.',
    'template',
    'https://docs.google.com/document/d/sample-ai-strategy-template',
    156,
    false
),
(
    'AI ROI Calculator Tool',
    'Calculate the potential return on investment for your AI initiatives. This Excel-based tool helps you estimate costs and benefits.',
    'tool', 
    'https://drive.google.com/file/d/sample-ai-roi-calculator',
    89,
    true
),
(
    'Complete Guide to AI Vendor Selection',
    'Step-by-step guide to selecting the right AI vendors and partners for your business. Includes evaluation criteria and comparison frameworks.',
    'guide',
    'https://aidea.digital/resources/ai-vendor-selection-guide.pdf',
    234,
    false
);

-- STEP 10: Verify everything is working
SELECT 'STEP 10: VERIFICATION...' as status;

SELECT 'Admin accounts created:' as info, COUNT(*) as count FROM public.admins;
SELECT 'Events created:' as info, COUNT(*) as count FROM public.community_events;
SELECT 'Resources created:' as info, COUNT(*) as count FROM public.community_resources;

-- STEP 11: Test queries that your app will use
SELECT 'STEP 11: TESTING APP QUERIES...' as status;

-- Test admin login query
SELECT 'Testing admin login query:' as test;
SELECT email, name, is_active FROM public.admins WHERE email = 'thesujalpatel09@gmail.com' AND is_active = true;

-- Test events query (what community page uses)
SELECT 'Testing events query:' as test;
SELECT id, title, event_type, event_date, event_time, location, is_featured, max_attendees, current_attendees 
FROM public.community_events 
WHERE is_active = true 
ORDER BY event_date ASC
LIMIT 3;

-- Test resources query (what community page uses)
SELECT 'Testing resources query:' as test;
SELECT id, title, resource_type, download_count, is_premium, file_url
FROM public.community_resources 
WHERE is_active = true 
ORDER BY created_at DESC
LIMIT 3;

SELECT 'DATABASE SETUP COMPLETE! ✅' as status;
SELECT 'Your community page and admin panel should now be fully synced!' as message;

-- ===================================================================
-- SETUP COMPLETE - EVERYTHING SHOULD NOW BE SYNCED!
-- ===================================================================
