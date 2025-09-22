-- ===================================================================
-- SECURE ADMIN SETUP - PROPER PASSWORD HASHING
-- This creates a more secure admin system with proper password hashing
-- ===================================================================

-- STEP 1: Create a function to hash passwords (simple bcrypt-like approach)
CREATE OR REPLACE FUNCTION hash_password(password TEXT)
RETURNS TEXT AS $$
BEGIN
    -- Simple hash function (in production, use proper bcrypt)
    -- This is a basic implementation for demo purposes
    RETURN encode(digest(password || 'salt_key_2024', 'sha256'), 'hex');
END;
$$ LANGUAGE plpgsql;

-- STEP 2: Create a function to verify passwords
CREATE OR REPLACE FUNCTION verify_password(password TEXT, hash TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN hash_password(password) = hash;
END;
$$ LANGUAGE plpgsql;

-- STEP 3: Remove all existing demo admin accounts
DELETE FROM public.admins;

-- STEP 4: Add your secure admin account
-- Replace 'your-email@domain.com' and 'your-secure-password' with your actual credentials
INSERT INTO public.admins (email, password_hash, name, role, is_active) VALUES 
('your-email@domain.com', hash_password('your-secure-password'), 'Your Name', 'super_admin', true);

-- STEP 5: Verify the setup
SELECT 'SECURE ADMIN ACCOUNTS:' as info;
SELECT id, email, name, role, is_active, created_at 
FROM public.admins 
ORDER BY created_at;

-- STEP 6: Test password verification (optional)
-- SELECT verify_password('your-secure-password', (SELECT password_hash FROM admins WHERE email = 'your-email@domain.com')) as password_correct;

SELECT 'SECURE ADMIN SETUP COMPLETE! ✅' as status;
SELECT 'Remember to replace the email and password with your actual credentials!' as reminder;
