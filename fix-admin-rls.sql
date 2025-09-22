-- Fix Admin Table RLS Policies
-- Run this SQL in your Supabase SQL editor

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow admin access" ON public.admins;
DROP POLICY IF EXISTS "Admins can view their own record" ON public.admins;

-- Create a simple policy that allows all authenticated users to read admin records
CREATE POLICY "Allow authenticated users to read admins" ON public.admins
    FOR SELECT USING (true);

-- Grant necessary permissions
GRANT ALL ON public.admins TO authenticated;
GRANT ALL ON public.admins TO anon;
