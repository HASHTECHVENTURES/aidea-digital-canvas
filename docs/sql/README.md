# SQL Scripts Documentation

This directory contains SQL scripts for setting up and managing the AIdea Digital Community database.

## 📁 Files Overview

### Core Setup Scripts

#### `supabase-schema-simple.sql`
**Purpose**: Complete database setup with all tables, types, and sample data
**Usage**: Run this first to set up your entire database
**Includes**:
- Custom types (event_type, resource_type)
- All tables (user_profiles, community_events, community_resources, admins)
- RLS policies
- Triggers and functions
- Sample data

#### `manage-admin-accounts.sql`
**Purpose**: Remove demo admin accounts and add your own
**Usage**: Run after initial setup to configure admin accounts
**Features**:
- Remove demo accounts
- Add your own admin credentials
- Instructions for changing passwords

#### `secure-admin-setup.sql`
**Purpose**: Set up secure password hashing for admin accounts
**Usage**: For enhanced security (optional)
**Features**:
- Password hashing functions
- Secure password verification
- Better security practices

#### `fix-admin-rls-policies.sql`
**Purpose**: Fix Row Level Security policies for admin operations
**Usage**: Run if you encounter permission issues with admin operations
**Features**:
- Permissive policies for authenticated users
- Anonymous access for public content
- Proper CRUD permissions

## 🚀 Quick Setup Guide

1. **Initial Setup**:
   ```sql
   -- Run this first
   \i supabase-schema-simple.sql
   ```

2. **Configure Admin Accounts**:
   ```sql
   -- Update with your credentials
   \i manage-admin-accounts.sql
   ```

3. **Fix Permissions (if needed)**:
   ```sql
   -- Run if admin operations fail
   \i fix-admin-rls-policies.sql
   ```

## 🔧 Customization

### Adding Your Admin Account
Edit `manage-admin-accounts.sql` and replace:
- `'your-email@domain.com'` with your email
- `'your-password'` with your password
- `'Your Name'` with your display name

### Changing Passwords
```sql
UPDATE public.admins 
SET password_hash = 'new-password' 
WHERE email = 'your-email@domain.com';
```

### Adding Sample Data
The `supabase-schema-simple.sql` includes sample events and resources. You can modify or add more by editing the INSERT statements.

## ⚠️ Important Notes

- Always backup your database before running scripts
- Test scripts in a development environment first
- The `supabase-schema-simple.sql` includes sample data - remove if not needed
- Admin passwords are stored in plain text for simplicity (use secure-admin-setup.sql for hashing)

## 🆘 Troubleshooting

### Common Issues

1. **"Type already exists" error**:
   - The script handles this with conditional creation
   - If issues persist, drop existing types first

2. **Permission denied errors**:
   - Run `fix-admin-rls-policies.sql`
   - Check your Supabase project permissions

3. **Admin login fails**:
   - Verify admin account exists in database
   - Check email and password in admins table
   - Ensure account is active (is_active = true)

### Getting Help

If you encounter issues:
1. Check the Supabase logs
2. Verify your database connection
3. Ensure all required tables exist
4. Check RLS policies are properly configured
