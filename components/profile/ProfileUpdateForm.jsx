'use client';

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { User, Image as ImageIcon, Save, X, ShieldAlert } from "lucide-react";
import toast from "react-hot-toast";
import { z } from "zod";
import Link from "next/link";

const updateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  image: z.string().transform(v => v.trim()).optional().refine(val => !val || /^https?:\/\//.test(val), {
    message: "Must be a valid HTTP or HTTPS URL"
  }),
});

export default function ProfileUpdateForm() {
  const router = useRouter();
  const { data: session, isPending: sessionPending } = authClient.useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      image: ""
    }
  });

  useEffect(() => {
    if (session?.user) {
      reset({
        name: session.user.name || "",
        image: session.user.image || ""
      });
    }
  }, [session, reset]);

  const onSubmit = async (data) => {
    setFormErrors({});

    // Zod Validation
    const validationResult = updateSchema.safeParse(data);
    if (!validationResult.success) {
      const errors = {};
      validationResult.error.issues.forEach(issue => {
        errors[issue.path[0]] = issue.message;
      });
      setFormErrors(errors);
      return;
    }

    setIsLoading(true);
    try {
      const response = await authClient.updateUser({
        name: data.name,
        image: data.image.trim() || undefined,
      });

      if (response.error) {
        toast.error(response.error.message || "Failed to update profile");
      } else {
        toast.success("Profile updated successfully!");
        router.push("/profile");
        router.refresh();
      }
    } catch (error) {
      toast.error(error.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (sessionPending) {
    return (
      <div className="w-full max-w-md bg-white/70 backdrop-blur-md rounded-3xl border border-white/20 p-8 shadow-xl space-y-6 animate-pulse">
        <div className="h-6 bg-slate-200 rounded w-1/3 mx-auto" />
        <div className="space-y-4">
          <div className="h-10 bg-slate-200 rounded-xl" />
          <div className="h-10 bg-slate-200 rounded-xl" />
          <div className="h-12 bg-slate-200 rounded-xl" />
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="w-full max-w-md bg-white/70 backdrop-blur-md rounded-3xl border border-white/20 p-8 shadow-xl text-center space-y-4">
        <div className="w-16 h-16 bg-red-50 border border-red-100 rounded-full flex items-center justify-center mx-auto text-red-500">
          <ShieldAlert className="h-8 w-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-800">Not Logged In</h2>
        <p className="text-sm text-slate-500">Please sign in to update your profile.</p>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-sky to-primary-ocean text-white font-bold text-sm py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all"
        >
          Sign In Now
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md bg-white/70 backdrop-blur-md rounded-3xl border border-slate-100 p-8 shadow-xl space-y-6 animate-fade-in relative overflow-hidden">
      {/* Top Background Accent */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary-sky via-primary-ocean to-accent-orange" />

      <div className="text-center space-y-2">
        <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
          Update Profile
        </h1>
        <p className="text-sm text-slate-500">
          Modify your username or provide a custom avatar profile image URL
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name */}
        <div className="space-y-1">
          <label htmlFor="name" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Full Name
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
              <User className="h-4.5 w-4.5 text-slate-400" />
            </span>
            <input
              type="text"
              id="name"
              placeholder="Your Name"
              {...register("name")}
              className={`block w-full pl-10 pr-4 py-2.5 border rounded-xl bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-sky focus:border-transparent transition-all ${
                formErrors.name ? "border-red-500 focus:ring-red-500" : "border-slate-200"
              }`}
            />
          </div>
          {formErrors.name && (
            <p className="text-xs font-semibold text-red-500 mt-1">{formErrors.name}</p>
          )}
        </div>

        {/* Avatar Photo URL */}
        <div className="space-y-1">
          <label htmlFor="image" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Avatar Photo URL <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
              <ImageIcon className="h-4.5 w-4.5 text-slate-400" />
            </span>
            <input
              type="text"
              id="image"
              placeholder="https://images.unsplash.com/..."
              {...register("image")}
              className={`block w-full pl-10 pr-4 py-2.5 border rounded-xl bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-sky focus:border-transparent transition-all ${
                formErrors.image ? "border-red-500 focus:ring-red-500" : "border-slate-200"
              }`}
            />
          </div>
          {formErrors.image && (
            <p className="text-xs font-semibold text-red-500 mt-1">{formErrors.image}</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Link
            href="/profile"
            className="flex-1 flex items-center justify-center gap-1.5 py-3 border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold rounded-full text-xs active:scale-95 transition-all text-center"
          >
            <X className="h-4 w-4" />
            <span>Cancel</span>
          </Link>
          
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 flex items-center justify-center gap-1.5 py-3 bg-slate-900 hover:bg-slate-850 text-white font-bold rounded-full text-xs active:scale-95 transition-all"
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-xs" />
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
