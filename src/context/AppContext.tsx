"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { loadPrefs, savePrefs, type UserPrefs } from "@/lib/booking";

interface AppContextValue {
  location: string;
  setLocation: (loc: string) => void;
  mounted: boolean;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [location, setLocationState] = useState("Mumbai");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const prefs = loadPrefs();
    setLocationState(prefs.location);
    setMounted(true);
  }, []);

  const setLocation = (loc: string) => {
    setLocationState(loc);
    savePrefs({ location: loc });
  };

  return (
    <AppContext.Provider value={{ location, setLocation, mounted }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
