'use client';

/**
 * useAuth.js
 * ----------
 * Custom hook for consuming the AuthContext.
 *
 * Usage:
 *   const { user, loading, login, logout, register, googleLogin } = useAuth();
 *
 * Throws a descriptive error if used outside of <AuthProvider>.
 */

import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export function useAuth() {
  const context = useContext(AuthContext);

  // Safety guard: ensure hook is used inside <AuthProvider>
  if (context === null) {
    throw new Error(
      "useAuth() must be used within an <AuthProvider>. " +
      "Make sure your component is wrapped with <AuthProvider> in your providers."
    );
  }

  return context;
}
