
-- Create a table to store contact form submissions
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  startup_stage TEXT NOT NULL,
  challenge TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to insert contact submissions
-- (since this is a public contact form)
CREATE POLICY "Anyone can submit contact forms" 
  ON public.contact_submissions 
  FOR INSERT 
  WITH CHECK (true);

-- Create a policy for viewing submissions (restrict to authenticated users if needed)
CREATE POLICY "Authenticated users can view submissions" 
  ON public.contact_submissions 
  FOR SELECT 
  TO authenticated
  USING (true);
