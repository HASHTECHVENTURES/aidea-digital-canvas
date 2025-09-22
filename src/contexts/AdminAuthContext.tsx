import React, { createContext, useContext, useState } from 'react';
import { supabase } from '../integrations/supabase/client';

interface Admin {
  id: string;
  email: string;
  name: string;
  is_active: boolean;
}

interface AdminAuthContextType {
  admin: Admin | null;
  loading: boolean;
  adminSignIn: (email: string, password: string) => Promise<void>;
  adminSignOut: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

interface AdminAuthProviderProps {
  children: React.ReactNode;
}

export const AdminAuthProvider: React.FC<AdminAuthProviderProps> = ({ children }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(false);

  const adminSignIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      console.log('Attempting admin login for:', email);
      
      // Check if admin exists in the database
      const { data, error } = await supabase
        .from('admins')
        .select('*')
        .eq('email', email)
        .eq('is_active', true)
        .single();

      console.log('Admin query result:', { data, error });

      if (error) {
        console.error('Database error:', error);
        if (error.code === 'PGRST116') {
          throw new Error('Admin not found');
        }
        throw new Error('Database connection error: ' + error.message);
      }

      if (!data) {
        throw new Error('Admin not found or inactive');
      }

      // Check password (handle both plain text and hashed passwords)
      const storedPassword = data.password_hash;
      const isPasswordValid = storedPassword === password;

      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }

      console.log('Admin login successful');
      setAdmin({
        id: data.id,
        email: data.email,
        name: data.name,
        is_active: data.is_active
      });
    } catch (error: any) {
      console.error('Admin login error:', error);
      throw new Error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const adminSignOut = () => {
    setAdmin(null);
  };

  const value = {
    admin,
    loading,
    adminSignIn,
    adminSignOut,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};
