
'use client';

import { useState, useEffect, useCallback } from 'react';

const AUTH_TOKEN_KEY = 'admin_auth_token';

interface AuthToken {
  token: string;
  expiresAt: number;
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = useCallback(() => {
    setIsLoading(true);
    try {
      const tokenString = localStorage.getItem(AUTH_TOKEN_KEY);
      if (tokenString) {
        const token: AuthToken = JSON.parse(tokenString);
        if (new Date().getTime() < token.expiresAt) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem(AUTH_TOKEN_KEY);
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Failed to parse auth token:", error);
      setIsAuthenticated(false);
      localStorage.removeItem(AUTH_TOKEN_KEY);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, [checkAuth]);

  // Login verifies credentials against the Admin collection in MongoDB using email + password
  const login = async (email?: string, password?: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        const expirationTime = new Date().getTime() + 5 * 24 * 60 * 60 * 1000; // 5 days
        const token: AuthToken = {
          token: 'admin-auth-token',
          expiresAt: expirationTime,
        };
        localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(token));
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setIsAuthenticated(false);
  };

  return { isAuthenticated, isLoading, login, logout };
}
