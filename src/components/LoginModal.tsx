"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { useApp } from "@/context/AppContext";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function LoginModal({ open, onClose }: Props) {
  const { login, register } = useApp();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("demo@servora.app");
  const [password, setPassword] = useState("demo123");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const err =
      mode === "login"
        ? await login(email, password)
        : await register(email, password, name);
    setLoading(false);
    if (err) {
      setError(err);
      return;
    }
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title={mode === "login" ? "Sign in" : "Create account"} size="sm">
      <h2 className="text-xl font-bold">{mode === "login" ? "Sign in to SERVORA" : "Create your account"}</h2>
      <p className="mt-2 text-sm text-muted">
        {mode === "login"
          ? "Bookings sync to your account on the server. Demo: demo@servora.app / demo123"
          : "Register to save bookings across devices."}
      </p>

      <form onSubmit={submit} className="mt-6 space-y-4">
        {mode === "register" && (
          <label className="block text-sm">
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-xl border border-border px-3 py-2"
              autoComplete="name"
            />
          </label>
        )}
        <label className="block text-sm">
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-xl border border-border px-3 py-2"
            autoComplete="email"
          />
        </label>
        <label className="block text-sm">
          Password
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-xl border border-border px-3 py-2"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
          />
        </label>
        {error && <p className="text-sm text-warning">{error}</p>}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Please wait…" : mode === "login" ? "Sign in" : "Create account"}
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-muted">
        {mode === "login" ? (
          <>
            New here?{" "}
            <button
              type="button"
              className="font-medium text-primary underline"
              onClick={() => {
                setMode("register");
                setError(null);
              }}
            >
              Register
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button
              type="button"
              className="font-medium text-primary underline"
              onClick={() => {
                setMode("login");
                setError(null);
              }}
            >
              Sign in
            </button>
          </>
        )}
      </p>
      <Button type="button" variant="ghost" className="mt-2 w-full" onClick={onClose}>
        Continue as guest
      </Button>
    </Modal>
  );
}
