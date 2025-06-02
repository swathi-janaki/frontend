
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  type: 'student' | 'hod';
  name: string;
  department: string;
  rollNumber?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, userType: 'student' | 'hod', department: string, rollNumber?: string) => { success?: boolean; error?: string };
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('odapp-logged-in');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email: string, password: string, userType: 'student' | 'hod', department: string, rollNumber?: string) => {
    // Check if email is @gmail.com format and password is "password"
    if (!email.endsWith('@gmail.com')) {
      return { error: 'Only @gmail.com email addresses are allowed' };
    }

    if (password !== 'password') {
      return { error: 'Invalid password. Use "password" to login' };
    }

    if (!department) {
      return { error: 'Please select a department' };
    }

    if (userType === 'student' && !rollNumber) {
      return { error: 'Roll number is required for students' };
    }

    // Extract name from email (part before @)
    const name = email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    
    // Generate unique ID based on email
    const id = btoa(email).replace(/[=+/]/g, '').substring(0, 8);

    const userData: User = { 
      id,
      email,
      type: userType,
      name,
      department,
      rollNumber: userType === 'student' ? rollNumber : undefined
    };

    setUser(userData);
    localStorage.setItem('odapp-logged-in', JSON.stringify(userData));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('odapp-logged-in');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};
