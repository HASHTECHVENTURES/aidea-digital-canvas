-- ===================================================================
-- SETUP FILE STORAGE FOR PDF UPLOADS
-- Run this in your Supabase SQL editor to enable file uploads
-- ===================================================================

-- Create storage bucket for community files
INSERT INTO storage.buckets (id, name, public)
VALUES ('community-files', 'community-files', true)
ON CONFLICT (id) DO NOTHING;

-- Set up RLS policies for the storage bucket
CREATE POLICY "Anyone can view community files" ON storage.objects
FOR SELECT USING (bucket_id = 'community-files');

CREATE POLICY "Authenticated users can upload files" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'community-files' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated users can update files" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'community-files' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated users can delete files" ON storage.objects
FOR DELETE USING (
  bucket_id = 'community-files' 
  AND auth.role() = 'authenticated'
);

-- Grant permissions
GRANT ALL ON storage.objects TO authenticated;
GRANT ALL ON storage.buckets TO authenticated;

SELECT 'File storage setup complete! ✅' as status;
SELECT 'You can now upload PDF files through the admin panel.' as message;
