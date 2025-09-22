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
      // Check if admin exists in the database
      const { data, error } = await supabase
        .from('admins')
        .select('*')
        .eq('email', email)
        .eq('is_active', true)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          throw new Error('Invalid admin credentials');
        }
        throw new Error('Database connection error');
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

      setAdmin({
        id: data.id,
        email: data.email,
        name: data.name,
        is_active: data.is_active
      });
    } catch (error: any) {
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
