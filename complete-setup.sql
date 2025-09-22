-- ===================================================================
-- COMPLETE SETUP FOR AIDEA DIGITAL COMMUNITY & ADMIN SYSTEM
-- Run this ENTIRE script in your Supabase SQL editor
-- ===================================================================

-- First, ensure we have the main schema (if not already created)
-- Create custom types (skip if already exist)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_gender') THEN
        CREATE TYPE user_gender AS ENUM ('male', 'female', 'other', 'prefer-not-to-say');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'event_type') THEN
        CREATE TYPE event_type AS ENUM ('showcase', 'workshop', 'q&a', 'networking', 'training');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'resource_type') THEN
        CREATE TYPE resource_type AS ENUM ('template', 'tool', 'guide', 'library', 'training', 'documentation');
    END IF;
END $$;

-- ===================================================================
-- ADMIN TABLE SETUP
-- ===================================================================

-- Drop and recreate admin table
DROP TABLE IF EXISTS public.admins CASCADE;

-- Create the admin table properly
CREATE TABLE public.admins (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to read admin records (for login)
CREATE POLICY "Allow admin login access" ON public.admins
    FOR SELECT USING (true);

-- Grant permissions
GRANT ALL ON public.admins TO authenticated;
GRANT ALL ON public.admins TO anon;

-- Insert admin credentials
INSERT INTO public.admins (email, password_hash, name) VALUES 
('admin@aidea.digital', 'admin123', 'Admin User'),
('thesujalpatel09@gmail.com', 'Hellosujal09@', 'Sujal Admin'),
('htv@hashtechventures.com', 'admin123', 'HTV Admin');

-- ===================================================================
-- SAMPLE COMMUNITY DATA
-- ===================================================================

-- Sample Events
INSERT INTO public.community_events (
    title, description, event_type, event_date, event_time, location, 
    is_featured, max_attendees, current_attendees, is_active
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
    true
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
    true
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
    true
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
    true
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
    true
);

-- Sample Resources
INSERT INTO public.community_resources (
    title, description, resource_type, file_url, download_count, 
    is_premium, is_active
) VALUES 
(
    'AI Strategy Planning Template',
    'A comprehensive template to help you develop and document your AI strategy. Includes sections for goal setting, resource planning, implementation roadmap, and success metrics.',
    'template',
    'https://docs.google.com/document/d/sample-ai-strategy-template',
    156,
    false,
    true
),
(
    'AI ROI Calculator Tool',
    'Calculate the potential return on investment for your AI initiatives. This Excel-based tool helps you estimate costs, benefits, and payback periods for various AI projects.',
    'tool',
    'https://drive.google.com/file/d/sample-ai-roi-calculator',
    89,
    true,
    true
),
(
    'Complete Guide to AI Vendor Selection',
    'Step-by-step guide to selecting the right AI vendors and partners for your business. Includes evaluation criteria, comparison frameworks, and contract negotiation tips.',
    'guide',
    'https://aidea.digital/resources/ai-vendor-selection-guide.pdf',
    234,
    false,
    true
),
(
    'AI Implementation Checklist Library',
    'A collection of checklists covering all phases of AI implementation - from initial assessment to deployment and monitoring. Perfect for project managers and team leads.',
    'library',
    'https://aidea.digital/resources/ai-implementation-checklists.zip',
    67,
    true,
    true
),
(
    'AI Ethics and Compliance Training Materials',
    'Comprehensive training materials covering AI ethics, bias prevention, and regulatory compliance. Includes presentation slides, case studies, and assessment tools.',
    'training',
    'https://aidea.digital/training/ai-ethics-compliance-package.zip',
    43,
    true,
    true
),
(
    'API Integration Documentation for AI Tools',
    'Technical documentation and code examples for integrating popular AI tools and services. Covers REST APIs, authentication, error handling, and best practices.',
    'documentation',
    'https://docs.aidea.digital/api-integration-guide',
    198,
    false,
    true
);

-- ===================================================================
-- VERIFICATION QUERIES
-- ===================================================================

-- Verify admin data
SELECT 'ADMIN DATA:' as info;
SELECT email, name, is_active FROM public.admins;

-- Verify events data  
SELECT 'EVENTS DATA:' as info;
SELECT title, event_type, event_date, is_featured, is_active FROM public.community_events ORDER BY event_date;

-- Verify resources data
SELECT 'RESOURCES DATA:' as info;
SELECT title, resource_type, download_count, is_premium, is_active FROM public.community_resources ORDER BY created_at DESC;

-- Check table counts
SELECT 'TABLE COUNTS:' as info;
SELECT 
    (SELECT COUNT(*) FROM public.admins) as admin_count,
    (SELECT COUNT(*) FROM public.community_events) as events_count,
    (SELECT COUNT(*) FROM public.community_resources) as resources_count,
    (SELECT COUNT(*) FROM public.user_profiles) as users_count;

-- ===================================================================
-- SETUP COMPLETE!
-- ===================================================================
