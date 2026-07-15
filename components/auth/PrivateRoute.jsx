'use client';

/**
 * PrivateRoute.jsx
 * ----------------
 * A client-side route guard component.
 *
 * Behavior:
 *  - While loading: shows a centered loading spinner
 *  - If NOT authenticated: redirects to /login (with callbackUrl)
 *  - If authenticated: renders children normally
 *
 * Usage:
 *   <PrivateRoute>
 *     <YourProtectedComponent />
 *   </PrivateRoute>
 */

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Sun } from "lucide-react";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Only redirect after auth state has resolved (not while loading)
    if (!loading && !user) {
      // Include the current path as callbackUrl so user is sent back after login
      const callbackUrl = encodeURIComponent(pathname);
      router.replace(`/login?callbackUrl=${callbackUrl}`);
    }
  }, [user, loading, router, pathname]);

  // ── Loading State ─────────────────────────────────
  if (loading) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center min-h-[60vh] gap-4">
        {/* Animated SunCart logo spinner */}
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-slate-100 border-t-primary-sky animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Sun className="h-6 w-6 text-amber-400 fill-amber-200" />
          </div>
        </div>
        <p className="text-sm text-slate-400 font-medium animate-pulse">
          Verifying your session…
        </p>
      </div>
    );
  }

  // ── Not Authenticated ─────────────────────────────
  // User is null and not loading → redirect is happening (useEffect above)
  // Return null to avoid a flash of the protected content
  if (!user) {
    return null;
  }

  // ── Authenticated ─────────────────────────────────
  return <>{children}</>;
}
