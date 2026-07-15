import LoginForm from "@/components/forms/LoginForm";
import { Suspense } from "react";

export const metadata = {
  title: "Login | SunCart Essentials",
  description: "Sign in to your SunCart account to browse protected summer essentials, simulate orders, and customize your profile.",
};

export default function LoginPage() {
  return (
    <div className="flex-grow flex items-center justify-center py-16 px-4 relative overflow-hidden bg-gradient-to-br from-amber-50 via-sky-50 to-orange-50">
      {/* Background Decorative Blur Circles */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-amber-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-sky-200/20 rounded-full blur-3xl" />
      
      <div className="relative z-10 w-full flex justify-center">
        <Suspense fallback={<div className="w-full max-w-md h-[400px] bg-white/70 backdrop-blur-md rounded-3xl animate-pulse" />}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
