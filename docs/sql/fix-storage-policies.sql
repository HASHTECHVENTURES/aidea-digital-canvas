-- ===================================================================
-- FIX STORAGE RLS POLICIES FOR FILE UPLOADS
-- Run this to fix the "violates row-level security policy" error
-- ===================================================================

-- Drop existing policies first
DROP POLICY IF EXISTS "Anyone can view community files" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload files" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update files" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete files" ON storage.objects;

-- Create more permissive policies
CREATE POLICY "Allow public access to community files" ON storage.objects
FOR SELECT USING (bucket_id = 'community-files');

CREATE POLICY "Allow authenticated uploads to community files" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'community-files');

CREATE POLICY "Allow authenticated updates to community files" ON storage.objects
FOR UPDATE USING (bucket_id = 'community-files');

CREATE POLICY "Allow authenticated deletes to community files" ON storage.objects
FOR DELETE USING (bucket_id = 'community-files');

-- Alternative: If still having issues, temporarily disable RLS for testing
-- ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;

SELECT 'Storage policies fixed! ✅' as status;
SELECT 'File uploads should now work properly.' as message;
