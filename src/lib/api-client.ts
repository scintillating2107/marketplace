import type { StoredBooking } from "@/types";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

async function parseJson<T>(res: Response): Promise<T | null> {
  if (!res.ok) return null;
  return res.json() as Promise<T>;
}

export async function fetchCurrentUser(): Promise<AuthUser | null> {
  const res = await fetch("/api/auth/me", { credentials: "include" });
  const data = await parseJson<{ user: AuthUser | null }>(res);
  return data?.user ?? null;
}

export async function loginRequest(
  email: string,
  password: string
): Promise<{ user: AuthUser } | { error: string }> {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });
  const data = (await res.json()) as { user?: AuthUser; error?: string };
  if (!res.ok) return { error: data.error ?? "Login failed" };
  if (!data.user) return { error: "Login failed" };
  return { user: data.user };
}

export async function registerRequest(
  email: string,
  password: string,
  name: string
): Promise<{ user: AuthUser } | { error: string }> {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password, name }),
  });
  const data = (await res.json()) as { user?: AuthUser; error?: string };
  if (!res.ok) return { error: data.error ?? "Registration failed" };
  if (!data.user) return { error: "Registration failed" };
  return { user: data.user };
}

export async function logoutRequest(): Promise<void> {
  await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
}

export async function fetchBookingsApi(): Promise<StoredBooking[]> {
  const res = await fetch("/api/bookings", { credentials: "include" });
  if (res.status === 401) return [];
  const data = await parseJson<{ bookings: StoredBooking[] }>(res);
  return data?.bookings ?? [];
}

export async function createBookingApi(booking: StoredBooking): Promise<StoredBooking | null> {
  const res = await fetch("/api/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(booking),
  });
  if (!res.ok) return null;
  const data = await parseJson<{ booking: StoredBooking }>(res);
  return data?.booking ?? null;
}

export async function syncBookingsApi(bookings: StoredBooking[]): Promise<boolean> {
  const res = await fetch("/api/bookings/sync", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ bookings }),
  });
  return res.ok;
}

export async function patchBookingApi(
  id: string,
  patch: Partial<StoredBooking>
): Promise<StoredBooking | null> {
  const res = await fetch(`/api/bookings/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(patch),
  });
  if (!res.ok) return null;
  const data = await parseJson<{ booking: StoredBooking }>(res);
  return data?.booking ?? null;
}
