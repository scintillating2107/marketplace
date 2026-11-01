"use client";

import { LoginModal } from "@/components/LoginModal";
import { useApp } from "@/context/AppContext";

export function LoginModalHost() {
  const { loginModalOpen, closeLogin } = useApp();
  return <LoginModal open={loginModalOpen} onClose={closeLogin} />;
}
