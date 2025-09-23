-- ===================================================================
-- SETUP CONTACT MESSAGES TABLE
-- This will store all contact form submissions
-- ===================================================================

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'closed')),
    admin_notes TEXT
);

-- Enable Row Level Security
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Allow authenticated users to view all messages" ON public.contact_messages
FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow anyone to insert messages" ON public.contact_messages
FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update messages" ON public.contact_messages
FOR UPDATE USING (auth.role() = 'authenticated');

-- Grant permissions
GRANT ALL ON public.contact_messages TO authenticated, anon;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON public.contact_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON public.contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_email ON public.contact_messages(email);

-- Test the setup
SELECT 'Contact messages table created successfully!' as status;
SELECT 'You can now store and view contact form submissions' as message;
