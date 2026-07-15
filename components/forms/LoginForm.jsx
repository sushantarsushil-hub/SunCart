'use client';

/**
 * LoginForm.jsx
 * -------------
 * Modern glassmorphism login form for SunCart.
 *
 * Features:
 *  - Email & Password login via AuthContext
 *  - Google OAuth via AuthContext
 *  - Zod validation with inline error messages
 *  - Loading spinner while request is processing
 *  - Buttons disabled during requests
 *  - Success/error toasts (handled in AuthContext)
 *  - Redirects to "/" on success (or callbackUrl from query params)
 */

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Mail, Lock, LogIn } from "lucide-react";
import { z } from "zod";
import Link from "next/link";

// ── Validation Schema ──────────────────────────────────────────
// Login requires: valid email + non-empty password
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // Support ?callbackUrl redirect after login
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  // Auth context methods
  const { login, googleLogin } = useAuth();

  // Local UI state
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  const { register, handleSubmit } = useForm({
    defaultValues: { email: "", password: "" }
  });

  // ── Email Login Handler ────────────────────────────────────────
  const onSubmit = async (data) => {
    // Reset previous errors
    setFormErrors({});
    setSubmitError("");

    // Client-side Zod validation
    const validationResult = loginSchema.safeParse(data);
    if (!validationResult.success) {
      const errors = {};
      validationResult.error.issues.forEach((issue) => {
        errors[issue.path[0]] = issue.message;
      });
      setFormErrors(errors);
      return;
    }

    setIsLoading(true);
    try {
      const result = await login({
        email: data.email,
        password: data.password,
        callbackUrl,
      });

      // If login failed (error toast already shown by AuthContext)
      if (!result.success) {
        setSubmitError(result.error || "Invalid email or password");
      }
    } catch (error) {
      const message = error?.message || "An unexpected error occurred";
      setSubmitError(message);
    } finally {
      setIsLoading(false);
    }
  };

  // ── Google Login Handler ───────────────────────────────────────
  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setSubmitError("");
    try {
      await googleLogin(callbackUrl);
    } catch (error) {
      // Error toast already shown by AuthContext
    } finally {
      // Note: if redirect occurs, this may not run
      setGoogleLoading(false);
    }
  };

  return (
    // ── Glassmorphism Card ────────────────────────────────────────
    <div className="w-full max-w-md bg-white/70 backdrop-blur-md rounded-3xl border border-white/20 p-8 shadow-xl space-y-6">

      {/* ── Header ── */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
          Welcome Back
        </h1>
        <p className="text-sm text-slate-500">
          Login to access your profile and check out summer essentials
        </p>
      </div>

      {/* ── Server Error Banner ── */}
      {submitError && (
        <div className="rounded-2xl bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
          {submitError}
        </div>
      )}

      {/* ── Login Form ── */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Email Field */}
        <div className="space-y-1">
          <label htmlFor="login-email" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Email Address
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
              <Mail className="h-4 w-4 text-slate-400" />
            </span>
            <input
              type="email"
              id="login-email"
              placeholder="you@example.com"
              {...register("email")}
              className={`block w-full pl-10 pr-4 py-3 border rounded-xl bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-sky focus:border-transparent transition-all ${
                formErrors.email ? "border-red-500 focus:ring-red-500" : "border-slate-200"
              }`}
            />
          </div>
          {/* Inline validation error */}
          {formErrors.email && (
            <p className="text-xs font-semibold text-red-500 mt-1">{formErrors.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-1">
          <label htmlFor="login-password" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Password
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
              <Lock className="h-4 w-4 text-slate-400" />
            </span>
            <input
              type="password"
              id="login-password"
              placeholder="••••••••"
              {...register("password")}
              className={`block w-full pl-10 pr-4 py-3 border rounded-xl bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-sky focus:border-transparent transition-all ${
                formErrors.password ? "border-red-500 focus:ring-red-500" : "border-slate-200"
              }`}
            />
          </div>
          {/* Inline validation error */}
          {formErrors.password && (
            <p className="text-xs font-semibold text-red-500 mt-1">{formErrors.password}</p>
          )}
        </div>

        {/* Login Button — disabled while loading */}
        <button
          type="submit"
          id="login-submit-btn"
          disabled={isLoading || googleLoading}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary-sky to-primary-ocean text-white font-bold text-sm py-3 px-6 rounded-xl hover:shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
        >
          {isLoading ? (
            /* Loading spinner (DaisyUI) */
            <span className="loading loading-spinner loading-sm" />
          ) : (
            <>
              <LogIn className="h-4 w-4" />
              <span>Login</span>
            </>
          )}
        </button>
      </form>

      {/* ── Register Link ── */}
      <div className="text-center pt-2">
        <p className="text-xs text-slate-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-bold text-primary-sky hover:text-primary-ocean transition-colors"
          >
            Register
          </Link>
        </p>
      </div>

      {/* ── OR Divider ── */}
      <div className="relative flex py-2 items-center">
        <div className="flex-grow border-t border-slate-100" />
        <span className="flex-shrink mx-4 text-slate-400 text-xs font-bold uppercase tracking-wider">
          OR
        </span>
        <div className="flex-grow border-t border-slate-100" />
      </div>

      {/* ── Google Sign In Button ── */}
      <button
        id="login-google-btn"
        onClick={handleGoogleLogin}
        disabled={isLoading || googleLoading}
        className="w-full flex items-center justify-center gap-2 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold text-sm py-3 px-6 rounded-xl shadow-sm hover:bg-slate-50 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {googleLoading ? (
          <span className="loading loading-spinner loading-sm" />
        ) : (
          <>
            {/* Google Brand Logo (SVG) */}
            <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <span>Sign In with Google</span>
          </>
        )}
      </button>
    </div>
  );
}

