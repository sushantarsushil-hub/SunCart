'use client';

/**
 * Navbar.jsx
 * ----------
 * Sticky glassmorphic navigation for SunCart.
 * Uses useAuth() hook for all authentication state and actions.
 *
 * Behavior:
 *  - Not logged in: shows Login + Register buttons
 *  - Logged in: shows user photo, display name, and Logout button
 *  - Logout: shows success toast → navigates to home (handled by AuthContext)
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Sun, Menu, X, LogOut, User } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Get auth state and logout action from context
  const { user, loading, logout } = useAuth();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300 glassmorphism border-b border-white/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ─────────────────────────────────────── */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2 font-bold text-2xl tracking-tight text-slate-800">
              <Sun className="h-8 w-8 text-amber-500 fill-amber-300 animate-pulse-slow" />
              <span>
                Sun<span className="text-primary-sky">Cart</span>
              </span>
            </Link>
          </div>

          {/* ── Desktop Navigation Links ─────────────────── */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-sm font-medium transition-all-custom py-2 ${
                    isActive
                      ? "text-primary-sky font-semibold"
                      : "text-slate-600 hover:text-primary-sky"
                  }`}
                >
                  {link.name}
                  {/* Active route underline indicator */}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-sky rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ── Desktop Auth Section ──────────────────────── */}
          <div className="hidden md:flex items-center gap-4">
            {/* Loading skeleton — shown while session resolves */}
            {loading ? (
              <div className="h-8 w-24 bg-slate-100 animate-pulse rounded-full" />
            ) : user ? (
              /* ── Logged In State ── */
              <div className="flex items-center gap-4">
                {/* User profile link with avatar + display name */}
                <Link
                  href="/profile"
                  className="flex items-center gap-2 p-1 px-3 rounded-full hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200"
                >
                  <div className="avatar">
                    <div className="w-8 h-8 rounded-full ring-2 ring-primary-sky ring-offset-2 overflow-hidden bg-slate-200 flex items-center justify-center">
                      {user.image ? (
                        <img
                          src={user.image}
                          alt={user.name}
                          className="object-cover w-full h-full"
                          onError={(e) => {
                            // Fallback to a default avatar on broken image URL
                            e.target.onerror = null;
                            e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150";
                          }}
                        />
                      ) : (
                        <User className="h-4 w-4 text-slate-500" />
                      )}
                    </div>
                  </div>
                  <span className="text-sm font-medium text-slate-700 max-w-[120px] truncate">
                    {user.name}
                  </span>
                </Link>

                {/* Logout button */}
                <button
                  onClick={logout}
                  id="navbar-logout-btn"
                  className="flex items-center gap-1.5 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-500 p-2 px-4 rounded-full text-xs font-semibold transition-all border border-slate-200 hover:border-red-200"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              /* ── Logged Out State ── */
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="text-sm font-medium text-slate-600 hover:text-primary-sky py-2 px-4 rounded-full transition-all"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="text-sm font-semibold bg-gradient-to-r from-primary-sky to-primary-ocean text-white py-2.5 px-5 rounded-full hover:shadow-lg transition-all active:scale-95"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* ── Mobile Menu Toggle ────────────────────────── */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-primary-sky focus:outline-none"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Dropdown Menu ──────────────────────────── */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen opacity-100 border-t border-slate-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur-md">
          {/* Nav links */}
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2.5 rounded-md text-base font-medium transition-all ${
                  isActive
                    ? "bg-sky-50 text-primary-sky font-semibold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-primary-sky"
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          {/* Mobile auth section */}
          <div className="pt-4 pb-2 border-t border-slate-100">
            {loading ? null : user ? (
              /* ── Mobile: Logged In ── */
              <div className="space-y-2">
                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center">
                    {user.image ? (
                      <img
                        src={user.image}
                        alt={user.name}
                        className="object-cover w-full h-full"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150";
                        }}
                      />
                    ) : (
                      <User className="h-4 w-4 text-slate-500" />
                    )}
                  </div>
                  <span>{user.name}</span>
                </Link>

                {/* Mobile Logout button */}
                <button
                  onClick={() => {
                    setIsOpen(false);
                    logout();
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2.5 rounded-md text-base font-medium text-red-500 hover:bg-red-50"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              /* ── Mobile: Logged Out ── */
              <div className="grid grid-cols-2 gap-2 px-3">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex justify-center items-center px-4 py-2.5 border border-slate-200 text-sm font-semibold rounded-full text-slate-700 bg-white hover:bg-slate-50"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="flex justify-center items-center px-4 py-2.5 text-sm font-semibold rounded-full text-white bg-gradient-to-r from-primary-sky to-primary-ocean hover:shadow-md"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
