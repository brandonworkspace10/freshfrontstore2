"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { mockUser } from "@/lib/mock-data";

type User = typeof mockUser;

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("freshfront_auth");
    if (stored === "true") {
      setUser(mockUser);
    }
    setIsLoading(false);
  }, []);

  const login = async (_email: string, _password: string) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    localStorage.setItem("freshfront_auth", "true");
    setUser(mockUser);
    setIsLoading(false);
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    localStorage.setItem("freshfront_auth", "true");
    setUser(mockUser);
    setIsLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("freshfront_auth");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
