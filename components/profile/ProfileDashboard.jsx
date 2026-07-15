'use client';

import { authClient } from "@/lib/auth-client";
import { User, Mail, Calendar, Edit2, ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function ProfileDashboard() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="w-full max-w-2xl bg-white/70 backdrop-blur-md rounded-3xl border border-white/20 p-8 shadow-xl space-y-6 animate-pulse">
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100">
          <div className="w-24 h-24 rounded-full bg-slate-200" />
          <div className="space-y-3 flex-grow">
            <div className="h-6 bg-slate-200 rounded w-1/3" />
            <div className="h-4 bg-slate-200 rounded w-1/2" />
          </div>
        </div>
        <div className="space-y-4">
          <div className="h-4 bg-slate-200 rounded w-1/4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="h-12 bg-slate-200 rounded-xl" />
            <div className="h-12 bg-slate-200 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="w-full max-w-2xl bg-white/70 backdrop-blur-md rounded-3xl border border-white/20 p-8 shadow-xl text-center space-y-4">
        <div className="w-16 h-16 bg-red-50 border border-red-100 rounded-full flex items-center justify-center mx-auto text-red-500">
          <ShieldAlert className="h-8 w-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-800">Not Logged In</h2>
        <p className="text-sm text-slate-500">Please sign in to view your profile dashboard.</p>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-sky to-primary-ocean text-white font-bold text-sm py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all active:scale-95"
        >
          Sign In Now
        </Link>
      </div>
    );
  }

  const { user } = session;
  const joinDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : "Recent Join";

  return (
    <div className="w-full max-w-2xl bg-white/70 backdrop-blur-md rounded-3xl border border-slate-100 p-8 shadow-xl space-y-8 animate-fade-in relative overflow-hidden">
      {/* Top Background Accent */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary-sky via-primary-ocean to-accent-orange" />

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100 relative">
        <div className="avatar">
          <div className="w-24 h-24 rounded-full ring-4 ring-primary-sky/20 ring-offset-2 overflow-hidden bg-slate-100 flex items-center justify-center">
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
              <User className="h-10 w-10 text-slate-400" />
            )}
          </div>
        </div>
        
        <div className="text-center sm:text-left space-y-1 flex-grow">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
            {user.name}
          </h1>
          <p className="text-sm text-slate-400 font-semibold uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Active Session</span>
          </p>
        </div>

        <Link
          href="/profile/update"
          className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-800 p-2.5 px-4 rounded-full text-xs font-bold transition-all border border-slate-200"
        >
          <Edit2 className="h-3.5 w-3.5" />
          <span>Edit Profile</span>
        </Link>
      </div>

      {/* Info Fields Grid */}
      <div className="space-y-4">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Account Details
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-100 rounded-2xl">
            <div className="p-2.5 bg-white rounded-xl shadow-sm border border-slate-100 text-primary-sky">
              <User className="h-5 w-5" />
            </div>
            <div>
              <span className="block text-[10px] uppercase font-bold text-slate-400">Full Name</span>
              <span className="text-sm font-semibold text-slate-700">{user.name}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-100 rounded-2xl">
            <div className="p-2.5 bg-white rounded-xl shadow-sm border border-slate-100 text-primary-sky">
              <Mail className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <span className="block text-[10px] uppercase font-bold text-slate-400">Email Address</span>
              <span className="text-sm font-semibold text-slate-700 block truncate">{user.email}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-100 rounded-2xl">
            <div className="p-2.5 bg-white rounded-xl shadow-sm border border-slate-100 text-primary-sky">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <span className="block text-[10px] uppercase font-bold text-slate-400">Date Joined</span>
              <span className="text-sm font-semibold text-slate-700">{joinDate}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-100 rounded-2xl">
            <div className="p-2.5 bg-white rounded-xl shadow-sm border border-slate-100 text-primary-sky">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <span className="block text-[10px] uppercase font-bold text-slate-400">Role Status</span>
              <span className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                {user.role || "Standard Customer"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
