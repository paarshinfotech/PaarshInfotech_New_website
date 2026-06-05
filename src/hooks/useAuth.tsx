
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

  // Credentials are stored in localStorage under 'admin_profile' (managed by Settings page).
  // Default fallback: username = 'paarshinfotech.com', password = 'PaarshInfotech#5891'
  const ADMIN_PROFILE_KEY = 'admin_profile';
  const DEFAULT_USERNAME = 'paarshinfotech.com';
  const DEFAULT_PASSWORD = 'PaarshInfotech#5891';

  const login = (username?: string, password?: string): boolean => {
    // Always read the latest credentials from localStorage so password changes take effect
    let storedUsername = DEFAULT_USERNAME;
    let storedPassword = DEFAULT_PASSWORD;
    try {
      const stored = localStorage.getItem(ADMIN_PROFILE_KEY);
      if (stored) {
        const profile = JSON.parse(stored);
        if (profile.username) storedUsername = profile.username;
        if (profile.password) storedPassword = profile.password;
      }
    } catch { }

    if (username === storedUsername && password === storedPassword) {
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
