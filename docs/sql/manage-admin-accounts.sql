-- ===================================================================
-- MANAGE ADMIN ACCOUNTS - REMOVE DEMO AND SET UP PROPER ADMINS
-- Run this in your Supabase SQL editor to manage admin accounts
-- ===================================================================

-- STEP 1: Check current admin accounts
SELECT 'CURRENT ADMIN ACCOUNTS:' as info;
SELECT id, email, name, role, is_active, created_at, last_login 
FROM public.admins 
ORDER BY created_at;

-- STEP 2: Remove demo admin accounts (uncomment the ones you want to remove)
-- Remove the demo admin accounts
DELETE FROM public.admins WHERE email = 'admin@aidea.digital';
DELETE FROM public.admins WHERE email = 'thesujalpatel09@gmail.com';
DELETE FROM public.admins WHERE email = 'htv@hashtechventures.com';

-- STEP 3: Add your own admin account(s)
-- Replace with your actual email and password
INSERT INTO public.admins (email, password_hash, name, role, is_active) VALUES 
('your-email@domain.com', 'your-password', 'Your Name', 'super_admin', true);

-- Example: If you want to add multiple admins
-- INSERT INTO public.admins (email, password_hash, name, role, is_active) VALUES 
-- ('admin1@yourcompany.com', 'secure-password-1', 'Admin One', 'admin', true),
-- ('admin2@yourcompany.com', 'secure-password-2', 'Admin Two', 'admin', true);

-- STEP 4: Verify the changes
SELECT 'UPDATED ADMIN ACCOUNTS:' as info;
SELECT id, email, name, role, is_active, created_at, last_login 
FROM public.admins 
ORDER BY created_at;

-- STEP 5: Instructions for changing passwords
SELECT 'TO CHANGE ADMIN PASSWORD:' as instruction;
SELECT '1. Update the password_hash field in the admins table' as step1;
SELECT '2. Use plain text password (current setup uses simple comparison)' as step2;
SELECT '3. Example: UPDATE admins SET password_hash = "new-password" WHERE email = "your-email@domain.com";' as step3;

-- STEP 6: Instructions for changing usernames/emails
SELECT 'TO CHANGE ADMIN EMAIL/USERNAME:' as instruction;
SELECT '1. Update the email field in the admins table' as step1;
SELECT '2. Update the name field if needed' as step2;
SELECT '3. Example: UPDATE admins SET email = "new-email@domain.com", name = "New Name" WHERE id = "admin-id";' as step3;

SELECT 'ADMIN ACCOUNT MANAGEMENT COMPLETE! ✅' as status;
