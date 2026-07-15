'use client';

/**
 * AuthContext.jsx
 * ---------------
 * Central authentication context for SunCart.
 * Wraps BetterAuth's authClient to provide a clean React Context API
 * with: user, loading, login(), register(), logout(), googleLogin()
 *
 * Used by: Navbar, LoginForm, RegisterForm, PrivateRoute, useAuth hook
 */

import { createContext, useContext, useCallback } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

// ──────────────────────────────────────────────
// 1. Create the Context
// ──────────────────────────────────────────────
export const AuthContext = createContext(null);

// ──────────────────────────────────────────────
// 2. AuthProvider Component
// ──────────────────────────────────────────────
export function AuthProvider({ children }) {
  const router = useRouter();

  // BetterAuth's built-in reactive session hook
  // `data` contains { user, session } when logged in, null when logged out
  // `isPending` is true while the session is being fetched
  const { data: session, isPending } = authClient.useSession();

  // Expose the user object directly (null if not logged in)
  const user = session?.user ?? null;

  // ── Login with Email & Password ──────────────────
  const login = useCallback(async ({ email, password, callbackUrl = "/" }) => {
    const response = await authClient.signIn.email({ email, password });

    if (response?.error) {
      const message = response.error.message || "Invalid email or password";
      toast.error(message);
      return { success: false, error: message };
    }

    toast.success("Login Successful! Welcome back 🌞");
    router.push(callbackUrl);
    router.refresh();
    return { success: true };
  }, [router]);

  // ── Register with Email & Password ───────────────
  const register = useCallback(async ({ name, email, password, image }) => {
    const response = await authClient.signUp.email({
      name,
      email,
      password,
      // Only pass image if it's a non-empty string
      ...(image?.trim() ? { image: image.trim() } : {}),
    });

    if (response?.error) {
      const message = response.error.message || "Registration Failed";
      toast.error(message);
      return { success: false, error: message };
    }

    toast.success("Registration Successful! Please login to continue 🎉");
    router.push("/login");
    router.refresh();
    return { success: true };
  }, [router]);

  // ── Logout ────────────────────────────────────────
  const logout = useCallback(async () => {
    try {
      await authClient.signOut();
      toast.success("Logged Out. See you again! 👋");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("Logout failed. Please try again.");
    }
  }, [router]);

  // ── Google OAuth Login / Register ─────────────────
  // Note: This triggers a server-side OAuth redirect (not a popup).
  // Requires real Google OAuth credentials in .env.local to work.
  const googleLogin = useCallback(async (callbackUrl = "/") => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackUrl,
      });
    } catch (error) {
      const message = error?.message || "Google Login Failed";
      toast.error(message);
      return { success: false, error: message };
    }
  }, []);

  // ── Context Value ────────────────────────────────
  const contextValue = {
    user,           // The logged-in user object (or null)
    loading: isPending, // True while auth state is being resolved
    login,          // (email, password, callbackUrl?) => Promise
    register,       // (name, email, password, image?) => Promise
    logout,         // () => Promise
    googleLogin,    // (callbackUrl?) => Promise
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}
