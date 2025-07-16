
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
    // Add event listener to sync auth state across tabs
    window.addEventListener('storage', checkAuth);
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, [checkAuth]);

  const login = (username?: string, password?: string): boolean => {
    if (username === 'admin' && password === 'Pass@123') {
      const expirationTime = new Date().getTime() + 5 * 24 * 60 * 60 * 1000; // 5 days
      const token: AuthToken = {
        token: 'fake-jwt-token', // In a real app, this would be a real JWT
        expiresAt: expirationTime,
      };
      localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(token));
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setIsAuthenticated(false);
  };

  return { isAuthenticated, isLoading, login, logout };
}
