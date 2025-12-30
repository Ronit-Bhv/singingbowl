"use client";

import type { ReactNode } from "react";
import { createContext, useState, useEffect } from "react";

type User = {
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string) => void;
  signup: (name: string, email: string) => void;
  logout: () => void;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from a previous session
    const storedUser = localStorage.getItem("resonant-harmony-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email: string) => {
    const newUser = { name: "Guest User", email };
    setUser(newUser);
    localStorage.setItem("resonant-harmony-user", JSON.stringify(newUser));
  };

  const signup = (name: string, email: string) => {
    const newUser = { name, email };
    setUser(newUser);
    localStorage.setItem("resonant-harmony-user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("resonant-harmony-user");
  };

  const value = { user, login, signup, logout, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
