'use client';

/**
 * Providers.jsx
 * -------------
 * Root client-side provider wrapper for SunCart.
 *
 * Wraps the entire application with:
 *  1. AuthProvider  — React Context for authentication state & actions
 *  2. Toaster       — Global toast notification system (react-hot-toast)
 */

import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/context/AuthContext';

export function Providers({ children }) {
  return (
    // AuthProvider must wrap everything so any component can access auth state
    <AuthProvider>
      {children}

      {/* Global toast notifications — shown on top of all content */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#ffffff',
            color: '#1f2937',
            borderRadius: '12px',
            border: '1px solid rgba(0, 0, 0, 0.05)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            fontSize: '14px',
            fontWeight: '500',
          },
          success: {
            iconTheme: {
              primary: '#0ea5e9',
              secondary: '#ffffff',
            },
            duration: 3000,
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#ffffff',
            },
            duration: 4000,
          },
        }}
      />
    </AuthProvider>
  );
}
