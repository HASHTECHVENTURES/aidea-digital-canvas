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
      // Simple hardcoded admin credentials for reliability
      const adminCredentials = [
        { 
          email: 'admin@aidea.digital', 
          password: 'admin123', 
          name: 'Admin User',
          id: 'admin-1'
        },
        { 
          email: 'thesujalpatel09@gmail.com', 
          password: 'Hellosujal09@', 
          name: 'Sujal Admin',
          id: 'admin-2'
        },
        { 
          email: 'htv@hashtechventures.com', 
          password: 'admin123', 
          name: 'HTV Admin',
          id: 'admin-3'
        }
      ];

      const validAdmin = adminCredentials.find(
        admin => admin.email === email && admin.password === password
      );

      if (validAdmin) {
        setAdmin({
          id: validAdmin.id,
          email: validAdmin.email,
          name: validAdmin.name,
          is_active: true
        });
      } else {
        throw new Error('Invalid admin credentials');
      }
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
