-- AIdea Digital Community Database Schema
-- Copy and paste this SQL code into your Supabase SQL editor

-- Create custom types
CREATE TYPE user_gender AS ENUM ('male', 'female', 'other', 'prefer-not-to-say');
CREATE TYPE event_type AS ENUM ('showcase', 'workshop', 'q&a', 'networking', 'training');
CREATE TYPE resource_type AS ENUM ('template', 'tool', 'guide', 'library', 'training', 'documentation');

-- Users table (extends Supabase auth.users)
CREATE TABLE public.user_profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    gender user_gender NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT TRUE,
    subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'premium', 'enterprise'))
);

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
    registration_url TEXT,
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
    tags TEXT[],
    is_active BOOLEAN DEFAULT TRUE,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Event Registrations table
CREATE TABLE public.event_registrations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    event_id UUID REFERENCES public.community_events(id) ON DELETE CASCADE,
    registered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status TEXT DEFAULT 'registered' CHECK (status IN ('registered', 'attended', 'cancelled')),
    UNIQUE(user_id, event_id)
);

-- Resource Downloads table
CREATE TABLE public.resource_downloads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    resource_id UUID REFERENCES public.community_resources(id) ON DELETE CASCADE,
    downloaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, resource_id)
);

-- Create indexes for better performance
CREATE INDEX idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX idx_user_profiles_created_at ON public.user_profiles(created_at);
CREATE INDEX idx_community_events_date ON public.community_events(event_date);
CREATE INDEX idx_community_events_active ON public.community_events(is_active);
CREATE INDEX idx_community_resources_type ON public.community_resources(resource_type);
CREATE INDEX idx_community_resources_premium ON public.community_resources(is_premium);
CREATE INDEX idx_event_registrations_user ON public.event_registrations(user_id);
CREATE INDEX idx_resource_downloads_user ON public.resource_downloads(user_id);

-- Enable Row Level Security
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resource_downloads ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_profiles
CREATE POLICY "Users can view their own profile" ON public.user_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.user_profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.user_profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for community_events
CREATE POLICY "Anyone can view active events" ON public.community_events
    FOR SELECT USING (is_active = true);

CREATE POLICY "Authenticated users can view all events" ON public.community_events
    FOR SELECT USING (auth.role() = 'authenticated');

-- RLS Policies for community_resources
CREATE POLICY "Anyone can view free resources" ON public.community_resources
    FOR SELECT USING (is_active = true AND is_premium = false);

CREATE POLICY "Authenticated users can view premium resources" ON public.community_resources
    FOR SELECT USING (auth.role() = 'authenticated' AND is_active = true);

-- RLS Policies for event_registrations
CREATE POLICY "Users can view their own registrations" ON public.event_registrations
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can register for events" ON public.event_registrations
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own registrations" ON public.event_registrations
    FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for resource_downloads
CREATE POLICY "Users can view their own downloads" ON public.resource_downloads
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can record their downloads" ON public.resource_downloads
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Functions for automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (id, email, full_name, phone_number, gender)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
        COALESCE(NEW.raw_user_meta_data->>'phone_number', ''),
        COALESCE(NEW.raw_user_meta_data->>'gender', 'prefer-not-to-say')::user_gender
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

-- Function to update download count
CREATE OR REPLACE FUNCTION public.increment_download_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.community_resources
    SET download_count = download_count + 1
    WHERE id = NEW.resource_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to increment download count
CREATE TRIGGER on_resource_download
    AFTER INSERT ON public.resource_downloads
    FOR EACH ROW EXECUTE FUNCTION public.increment_download_count();

-- Function to update event attendee count
CREATE OR REPLACE FUNCTION public.update_event_attendee_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE public.community_events
        SET current_attendees = current_attendees + 1
        WHERE id = NEW.event_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.community_events
        SET current_attendees = current_attendees - 1
        WHERE id = OLD.event_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update attendee count
CREATE TRIGGER on_event_registration_change
    AFTER INSERT OR DELETE ON public.event_registrations
    FOR EACH ROW EXECUTE FUNCTION public.update_event_attendee_count();

-- Sample data (optional - remove if you don't want sample data)
INSERT INTO public.community_events (title, description, event_type, event_date, event_time, location, is_featured) VALUES
('AI Strategy Workshop', 'Learn how to develop and implement AI strategies for your business', 'workshop', '2024-02-15 10:00:00+00', '10:00 AM - 12:00 PM EST', 'Virtual Event', true),
('Community Q&A Session', 'Get your AI questions answered by our expert team', 'q&a', '2024-02-20 15:00:00+00', '3:00 PM - 4:00 PM EST', 'Virtual Event', false);

INSERT INTO public.community_resources (title, description, resource_type, is_premium) VALUES
('AI Strategy Framework Template', 'Complete framework for developing your AI strategy', 'template', false),
('AI ROI Calculator', 'Excel-based calculator to measure AI project returns', 'tool', false),
('Advanced AI Prompts Library', '500+ tested prompts for business applications', 'library', true);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;
