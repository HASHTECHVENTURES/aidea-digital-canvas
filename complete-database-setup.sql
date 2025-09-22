-- ===================================================================
-- COMPLETE DATABASE SETUP FOR AIDEA DIGITAL COMMUNITY SYSTEM
-- This script creates the entire database structure from our blueprint
-- Run this ENTIRE script in your Supabase SQL editor
-- ===================================================================

-- STEP 1: Clean up any existing tables (if they exist)
SELECT 'STEP 1: CLEANING UP EXISTING TABLES...' as status;

DROP TABLE IF EXISTS public.community_events CASCADE;
DROP TABLE IF EXISTS public.community_resources CASCADE;
DROP TABLE IF EXISTS public.user_profiles CASCADE;
DROP TABLE IF EXISTS public.admins CASCADE;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

-- STEP 2: Create custom types
SELECT 'STEP 2: CREATING CUSTOM TYPES...' as status;

-- Event types for community events
CREATE TYPE event_type AS ENUM (
    'workshop', 
    'showcase', 
    'q&a', 
    'networking', 
    'training',
    'webinar',
    'conference'
);

-- Resource types for community resources
CREATE TYPE resource_type AS ENUM (
    'template', 
    'tool', 
    'guide', 
    'library', 
    'training',
    'documentation',
    'checklist',
    'framework'
);

-- STEP 3: Create user_profiles table (extends Supabase auth.users)
SELECT 'STEP 3: CREATING USER_PROFILES TABLE...' as status;

CREATE TABLE public.user_profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    company_name TEXT, -- Optional field as per blueprint
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP WITH TIME ZONE
);

-- STEP 4: Create community_events table
SELECT 'STEP 4: CREATING COMMUNITY_EVENTS TABLE...' as status;

CREATE TABLE public.community_events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    event_type event_type NOT NULL,
    event_date TIMESTAMP WITH TIME ZONE NOT NULL,
    event_time TEXT NOT NULL,
    location TEXT NOT NULL,
    max_attendees INTEGER,
    current_attendees INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    registration_url TEXT, -- Optional registration link
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- STEP 5: Create community_resources table
SELECT 'STEP 5: CREATING COMMUNITY_RESOURCES TABLE...' as status;

CREATE TABLE public.community_resources (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    resource_type resource_type NOT NULL,
    file_url TEXT, -- Link to file or resource
    file_size INTEGER, -- File size in bytes (optional)
    download_count INTEGER DEFAULT 0,
    is_premium BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    tags TEXT[], -- Array of tags for categorization
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- STEP 6: Create admins table
SELECT 'STEP 6: CREATING ADMINS TABLE...' as status;

CREATE TABLE public.admins (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT DEFAULT 'admin', -- admin, super_admin, etc.
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- STEP 7: Enable Row Level Security (RLS)
SELECT 'STEP 7: ENABLING ROW LEVEL SECURITY...' as status;

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- STEP 8: Create RLS Policies
SELECT 'STEP 8: CREATING RLS POLICIES...' as status;

-- User profiles policies
CREATE POLICY "Users can view their own profile" ON public.user_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.user_profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.user_profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Community events policies
CREATE POLICY "Anyone can view active events" ON public.community_events
    FOR SELECT USING (is_active = true);

CREATE POLICY "Authenticated users can view all events" ON public.community_events
    FOR SELECT USING (auth.role() = 'authenticated');

-- Community resources policies
CREATE POLICY "Anyone can view free resources" ON public.community_resources
    FOR SELECT USING (is_active = true AND is_premium = false);

CREATE POLICY "Authenticated users can view premium resources" ON public.community_resources
    FOR SELECT USING (auth.role() = 'authenticated' AND is_active = true);

-- Admin policies
CREATE POLICY "Allow admin login access" ON public.admins
    FOR SELECT USING (true);

-- STEP 9: Create functions and triggers
SELECT 'STEP 9: CREATING FUNCTIONS AND TRIGGERS...' as status;

-- Function for automatic user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (id, email, full_name, phone_number, company_name)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'Unknown'),
        COALESCE(NEW.raw_user_meta_data->>'phone_number', ''),
        COALESCE(NEW.raw_user_meta_data->>'company_name', NULL)
    );
    RETURN NEW;
EXCEPTION
    WHEN OTHERS THEN
        -- Log the error but don't fail the user creation
        RAISE LOG 'Error creating user profile: %', SQLERRM;
        RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create user profile
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_community_events_updated_at
    BEFORE UPDATE ON public.community_events
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_community_resources_updated_at
    BEFORE UPDATE ON public.community_resources
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_admins_updated_at
    BEFORE UPDATE ON public.admins
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- STEP 10: Grant permissions
SELECT 'STEP 10: GRANTING PERMISSIONS...' as status;

GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;

-- STEP 11: Insert admin accounts
SELECT 'STEP 11: CREATING ADMIN ACCOUNTS...' as status;

INSERT INTO public.admins (email, password_hash, name, role) VALUES 
('admin@aidea.digital', 'admin123', 'Main Admin', 'super_admin'),
('thesujalpatel09@gmail.com', 'HelloSujal09@', 'Sujal Admin', 'admin'),
('htv@hashtechventures.com', 'admin123', 'HTV Admin', 'admin');

-- STEP 12: Insert sample events
SELECT 'STEP 12: ADDING SAMPLE EVENTS...' as status;

INSERT INTO public.community_events (
    title, description, event_type, event_date, event_time, location, 
    is_featured, max_attendees, current_attendees, registration_url
) VALUES 
(
    'AI Strategy Workshop for Business Leaders',
    'Join us for an intensive workshop on developing AI strategies that drive business growth. Learn from industry experts and network with fellow business leaders who are successfully implementing AI solutions.',
    'workshop',
    '2024-02-15 14:00:00+00',
    '2:00 PM - 5:00 PM EST',
    'Virtual Event via Zoom',
    true,
    50,
    12,
    'https://zoom.us/j/123456789'
),
(
    'Monthly AI Showcase: Latest Innovations',
    'Discover the latest AI innovations and tools that are transforming businesses. This monthly showcase features live demos, case studies, and Q&A sessions with AI pioneers.',
    'showcase',
    '2024-02-28 18:00:00+00',
    '6:00 PM - 7:30 PM EST',
    'Virtual Event via Zoom',
    false,
    100,
    23,
    'https://zoom.us/j/987654321'
),
(
    'AI Implementation Q&A Session',
    'Got questions about implementing AI in your business? Join our expert panel for an interactive Q&A session covering common challenges, best practices, and success stories.',
    'q&a',
    '2024-03-05 13:00:00+00',
    '1:00 PM - 2:00 PM EST',
    'Virtual Event via Zoom',
    false,
    75,
    8,
    'https://zoom.us/j/456789123'
),
(
    'Networking Event: AI Professionals Meetup',
    'Connect with like-minded AI professionals, entrepreneurs, and business leaders. Share experiences, discuss challenges, and build valuable connections in the AI community.',
    'networking',
    '2024-03-12 17:00:00+00',
    '5:00 PM - 8:00 PM EST',
    'Downtown Business Center, NYC',
    false,
    30,
    15,
    'https://eventbrite.com/ai-meetup'
),
(
    'Advanced AI Training: Machine Learning Fundamentals',
    'Deep dive into machine learning fundamentals with hands-on training. Perfect for business leaders who want to understand the technical aspects of AI implementation.',
    'training',
    '2024-03-20 10:00:00+00',
    '10:00 AM - 4:00 PM EST',
    'Virtual Event via Zoom',
    true,
    25,
    7,
    'https://zoom.us/j/789123456'
);

-- STEP 13: Insert sample resources
SELECT 'STEP 13: ADDING SAMPLE RESOURCES...' as status;

INSERT INTO public.community_resources (
    title, description, resource_type, file_url, download_count, is_premium, tags
) VALUES 
(
    'AI Strategy Framework Template',
    'A comprehensive template to help you develop and document your AI strategy. Includes sections for goal setting, resource planning, implementation roadmap, and success metrics.',
    'template',
    'https://docs.google.com/document/d/sample-ai-strategy-template',
    156,
    false,
    ARRAY['strategy', 'planning', 'framework', 'template']
),
(
    'AI ROI Calculator Tool',
    'Calculate the potential return on investment for your AI initiatives. This Excel-based tool helps you estimate costs, benefits, and payback periods for various AI projects.',
    'tool',
    'https://drive.google.com/file/d/sample-ai-roi-calculator',
    89,
    true,
    ARRAY['roi', 'calculator', 'finance', 'tool']
),
(
    'Complete Guide to AI Vendor Selection',
    'Step-by-step guide to selecting the right AI vendors and partners for your business. Includes evaluation criteria, comparison frameworks, and contract negotiation tips.',
    'guide',
    'https://aidea.digital/resources/ai-vendor-selection-guide.pdf',
    234,
    false,
    ARRAY['vendor', 'selection', 'guide', 'partnership']
),
(
    'AI Implementation Checklist Library',
    'A collection of checklists covering all phases of AI implementation - from initial assessment to deployment and monitoring. Perfect for project managers and team leads.',
    'library',
    'https://aidea.digital/resources/ai-implementation-checklists.zip',
    67,
    true,
    ARRAY['checklist', 'implementation', 'project-management', 'library']
),
(
    'AI Ethics and Compliance Training Materials',
    'Comprehensive training materials covering AI ethics, bias prevention, and regulatory compliance. Includes presentation slides, case studies, and assessment tools.',
    'training',
    'https://aidea.digital/training/ai-ethics-compliance-package.zip',
    43,
    true,
    ARRAY['ethics', 'compliance', 'training', 'governance']
),
(
    'API Integration Documentation for AI Tools',
    'Technical documentation and code examples for integrating popular AI tools and services. Covers REST APIs, authentication, error handling, and best practices.',
    'documentation',
    'https://docs.aidea.digital/api-integration-guide',
    198,
    false,
    ARRAY['api', 'integration', 'documentation', 'technical']
);

-- STEP 14: Verification queries
SELECT 'STEP 14: VERIFICATION...' as status;

-- Check all tables exist and have data
SELECT 'ADMIN ACCOUNTS:' as info;
SELECT email, name, role, is_active FROM public.admins;

SELECT 'SAMPLE EVENTS:' as info;
SELECT title, event_type, event_date::date, is_featured, is_active FROM public.community_events ORDER BY event_date;

SELECT 'SAMPLE RESOURCES:' as info;
SELECT title, resource_type, download_count, is_premium, is_active FROM public.community_resources ORDER BY created_at DESC;

-- Check table counts
SELECT 'TABLE COUNTS:' as info;
SELECT 
    (SELECT COUNT(*) FROM public.admins) as admin_count,
    (SELECT COUNT(*) FROM public.community_events) as events_count,
    (SELECT COUNT(*) FROM public.community_resources) as resources_count,
    (SELECT COUNT(*) FROM public.user_profiles) as users_count;

-- Test RLS policies
SELECT 'TESTING RLS POLICIES:' as info;
SELECT 'Events visible to public:' as test, COUNT(*) as count FROM public.community_events WHERE is_active = true;
SELECT 'Free resources visible to public:' as test, COUNT(*) as count FROM public.community_resources WHERE is_active = true AND is_premium = false;

SELECT 'DATABASE SETUP COMPLETE! ✅' as status;
SELECT 'Your Aidea Digital Community system is ready!' as message;
SELECT 'Next: Build Community and Admin pages' as next_step;

-- ===================================================================
-- SETUP COMPLETE - READY FOR COMMUNITY & ADMIN PAGES!
-- ===================================================================
