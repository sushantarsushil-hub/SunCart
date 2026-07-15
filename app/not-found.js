'use client';

import Link from "next/link";
import dynamic from "next/dynamic";
import { Home, Compass } from "lucide-react";
import sunAnimationData from "@/public/images/summer-animation.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function NotFound() {
  return (
    <div className="flex-grow flex flex-col items-center justify-center py-16 px-4 bg-gradient-to-br from-amber-50 via-sky-50 to-orange-50 text-center relative overflow-hidden">
      {/* Decorative Float elements */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-yellow-300/20 rounded-full blur-xl animate-float-slow" />
      <div className="absolute bottom-10 right-20 w-32 h-32 bg-sky-300/20 rounded-full blur-xl animate-float-medium" />

      <div className="relative z-10 max-w-md w-full space-y-6 flex flex-col items-center">
        {/* Lottie Animation */}
        <div className="w-64 h-64 relative flex items-center justify-center mb-2">
          <Lottie
            animationData={sunAnimationData}
            loop={true}
            className="w-full h-full object-contain relative z-20"
          />
          {/* Decorative blur plate */}
          <div className="absolute inset-0 bg-white/35 backdrop-blur-sm rounded-full border border-white/40 shadow-inner z-10 scale-95" />
        </div>

        <div className="space-y-3">
          <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-accent-orange bg-orange-100 px-3.5 py-1.5 rounded-full w-fit mx-auto">
            <Compass className="h-4 w-4 animate-spin-slow" />
            <span>Lost at Sea</span>
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-800 tracking-tight">
            404
          </h1>
          <p className="text-lg font-bold text-slate-700">
            Looks like you drifted too far out...
          </p>
          <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
            The page you are looking for has been washed away by the tides. Let&apos;s get you back to safe shores.
          </p>
        </div>

        <Link
          href="/"
          className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm py-3.5 px-8 rounded-full shadow-md hover:shadow-lg transition-all active:scale-95 mt-4"
        >
          <Home className="h-4 w-4" />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
}
