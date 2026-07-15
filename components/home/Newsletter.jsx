'use client';

import { useState } from "react";
import toast from "react-hot-toast";
import { Mail, ArrowRight } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    
    // Simple email pattern check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please provide a valid email address");
      return;
    }

    setIsLoading(true);

    // Simulate API registration
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Successfully subscribed to the Glow Up newsletter!");
      setEmail("");
    }, 1500);
  };

  return (
    <section className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-r from-accent-orange to-amber-500 text-white shadow-xl py-12 px-6 sm:px-12 text-center">
      {/* Decorative shapes */}
      <div className="absolute -top-10 -left-10 w-28 h-28 bg-white/10 rounded-full blur-lg animate-float-slow" />
      <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-white/15 rounded-full blur-xl animate-float-medium" />

      <div className="relative z-10 max-w-2xl mx-auto space-y-6">
        <span className="inline-block text-xs font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full text-white">
          Don&apos;t Miss the Glow Up
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Join Our Sun-Seeker Community
        </h2>
        <p className="text-sm sm:text-base text-amber-50/90 leading-relaxed">
          Subscribe to receive exclusive early access to product releases, limited-time flash sales, and expert summer skin care tips.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 items-center justify-center pt-2">
          <div className="relative w-full sm:w-80">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
              <Mail className="h-5 w-5 text-slate-400" />
            </span>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="block w-full pl-11 pr-4 py-3.5 border border-transparent rounded-full bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-300 placeholder-slate-400 text-sm shadow-inner disabled:opacity-70 transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm py-3.5 px-6 rounded-full shadow-md active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-xs" />
            ) : (
              <>
                <span>Subscribe</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
