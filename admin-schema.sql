-- Admin Authentication Schema
-- Add this to your existing Supabase schema

-- Create admin table
CREATE TABLE public.admins (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for admin table
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- Admin can only access their own record
CREATE POLICY "Admins can view their own record" ON public.admins
    FOR SELECT USING (email = current_setting('request.jwt.claims', true)::json->>'email');

-- Insert your admin credentials (replace with your actual email and password)
-- Password: admin123 (you should change this)
INSERT INTO public.admins (email, password_hash, name) VALUES 
('admin@aidea-digital.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin User'),
('htv@hashtechventures.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'HTV Admin');

-- Grant permissions
GRANT ALL ON public.admins TO authenticated;
