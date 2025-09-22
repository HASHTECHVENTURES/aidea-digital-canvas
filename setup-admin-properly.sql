-- Proper Admin Setup for Supabase
-- Run this SQL in your Supabase SQL editor

-- First, let's check if the admins table exists and its structure
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'admins' AND table_schema = 'public';

-- If the table doesn't exist or has issues, recreate it
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

-- Insert your admin credentials
INSERT INTO public.admins (email, password_hash, name) VALUES 
('admin@aidea.digital', 'admin123', 'Admin User'),
('thesujalpatel09@gmail.com', 'Hellosujal09@', 'Sujal Admin'),
('htv@hashtechventures.com', 'admin123', 'HTV Admin');

-- Verify the data was inserted
SELECT * FROM public.admins;
