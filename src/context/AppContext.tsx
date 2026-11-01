"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { loadPrefs, savePrefs, loadBookings, saveBookings } from "@/lib/booking";
import {
  fetchCurrentUser,
  loginRequest,
  logoutRequest,
  registerRequest,
  syncBookingsApi,
  type AuthUser,
} from "@/lib/api-client";

interface AppContextValue {
  location: string;
  setLocation: (loc: string) => void;
  mounted: boolean;
  user: AuthUser | null;
  authReady: boolean;
  loginModalOpen: boolean;
  openLogin: () => void;
  closeLogin: () => void;
  login: (email: string, password: string) => Promise<string | null>;
  register: (email: string, password: string, name: string) => Promise<string | null>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AppContext = createContext<AppContextValue | null>(null);

async function mergeLocalBookingsToServer(): Promise<void> {
  const local = loadBookings();
  if (local.length === 0) return;
  const ok = await syncBookingsApi(local);
  if (ok) saveBookings([]);
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [location, setLocationState] = useState("Mumbai");
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const refreshUser = useCallback(async () => {
    const current = await fetchCurrentUser();
    setUser(current);
    setAuthReady(true);
  }, []);

  useEffect(() => {
    const prefs = loadPrefs();
    setLocationState(prefs.location);
    setMounted(true);
    setAuthReady(true);

    const runAuth = () => void refreshUser();
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const id = window.requestIdleCallback(runAuth, { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(runAuth, 100);
    return () => clearTimeout(t);
  }, [refreshUser]);

  const setLocation = (loc: string) => {
    setLocationState(loc);
    savePrefs({ location: loc });
  };

  const login = async (email: string, password: string) => {
    const result = await loginRequest(email, password);
    if ("error" in result) return result.error;
    setUser(result.user);
    await mergeLocalBookingsToServer();
    return null;
  };

  const register = async (email: string, password: string, name: string) => {
    const result = await registerRequest(email, password, name);
    if ("error" in result) return result.error;
    setUser(result.user);
    await mergeLocalBookingsToServer();
    return null;
  };

  const logout = async () => {
    await logoutRequest();
    setUser(null);
  };

  return (
    <AppContext.Provider
      value={{
        location,
        setLocation,
        mounted,
        user,
        authReady,
        loginModalOpen,
        openLogin: () => setLoginModalOpen(true),
        closeLogin: () => setLoginModalOpen(false),
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
