import ProfileUpdateForm from "@/components/profile/ProfileUpdateForm";
import PrivateRoute from "@/components/auth/PrivateRoute";

export const metadata = {
  title: "Update Profile | SunCart Essentials",
  description: "Modify your account settings, full name, and avatar image details.",
};

export default function ProfileUpdatePage() {
  return (
    <PrivateRoute>
      <div className="flex-grow flex items-center justify-center py-16 px-4 relative overflow-hidden bg-gradient-to-br from-amber-50 via-sky-50 to-orange-50">
        {/* Background Decorative Blur Circles */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-amber-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-sky-200/20 rounded-full blur-3xl" />

        <div className="relative z-10 w-full flex justify-center">
          <ProfileUpdateForm />
        </div>
      </div>
    </PrivateRoute>
  );
}
