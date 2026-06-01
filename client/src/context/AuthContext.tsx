import { createContext, useContext, useState, ReactNode } from 'react';

export interface Subject {
  name: string;
  credits: string;
}

export interface Preferences {
  hours: string;
  time: string;
  weak: string;
  strong: string;
}

export interface User {
  name: string;
  email: string;
  university?: string;
  branch?: string;
  semester?: string;
  cgpa?: string;
  studentId?: string;
  targetCgpa?: string;
  subjects?: Subject[];
  preferences?: Preferences;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isProfileSetup: boolean;
  user: User | null;
  login: (data: any) => void;
  logout: () => void;
  register: (data: any) => void;
  completeSetup: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isProfileSetup, setIsProfileSetup] = useState(true); // Default true for logins
  const [user, setUser] = useState<User | null>(null);

  const login = (data: any) => {
    setIsAuthenticated(true);
    setIsProfileSetup(true);
    setUser({ 
      name: data.email?.split('@')[0] || 'User', 
      email: data.email, 
      university: '', 
      branch: '', 
      semester: '', 
      cgpa: '', 
      studentId: '', 
      targetCgpa: '' 
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const register = (data: any) => {
    setIsAuthenticated(true);
    setIsProfileSetup(false);
    setUser({ 
      name: data.name, 
      email: data.email, 
      university: '', 
      branch: '', 
      semester: '', 
      cgpa: '', 
      studentId: '', 
      targetCgpa: '' 
    });
  };

  const completeSetup = () => {
    setIsProfileSetup(true);
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...data });
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isProfileSetup, user, login, logout, register, completeSetup, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
