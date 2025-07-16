
'use client';

import { createContext, useContext, useState, useEffect, useCallback, PropsWithChildren } from 'react';

const SETTINGS_STORAGE_KEY = 'site_visibility_settings';

interface SiteSettings {
  showLeadership: boolean;
  showTeam: boolean;
}

const defaultSettings: SiteSettings = {
  showLeadership: true,
  showTeam: true,
};

interface SiteSettingsContextType {
  settings: SiteSettings;
  setSetting: <K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) => void;
  isLoading: boolean;
}

const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(undefined);

export function SiteSettingsProvider({ children }: PropsWithChildren) {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (storedSettings) {
        setSettings(JSON.parse(storedSettings));
      }
    } catch (error) {
      console.error("Failed to parse site settings from localStorage", error);
    }
    setIsLoading(false);
  }, []);

  const setSetting = useCallback(<K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) => {
    setSettings(prevSettings => {
      const newSettings = { ...prevSettings, [key]: value };
      try {
        localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(newSettings));
      } catch (error) {
         console.error("Failed to save site settings to localStorage", error);
      }
      return newSettings;
    });
  }, []);
  

  const value = { settings, setSetting, isLoading };

  return (
    <SiteSettingsContext.Provider value={value}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  const context = useContext(SiteSettingsContext);
  if (context === undefined) {
    throw new Error('useSiteSettings must be used within a SiteSettingsProvider');
  }
  return context;
}
