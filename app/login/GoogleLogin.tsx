"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

export default function GoogleLogin({ onClose }: { onClose?: () => void }) {
  const { signInWithGoogle, user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      // signInWithGoogle() does not return user
      await signInWithGoogle();
      toast.success("Login successful 🎉");
      onClose?.();

      // context থেকে user নেওয়া
      if (!user) throw new Error("User not found after login");

      const path =
        ADMIN_EMAIL && user.email === ADMIN_EMAIL ? "/dashboard" : "/blog";
      router.push(path);
    } catch (err: any) {
      toast.error(err.message || "Failed to login with Google");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;

    const path =
      ADMIN_EMAIL && user.email === ADMIN_EMAIL ? "/dashboard" : "/blog";
    router.replace(path);
    onClose?.();
  }, [user, router, onClose]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-2xl max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-6">Login with Google</h2>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition font-medium"
        >
          <FcGoogle size={24} />
          {loading ? "Signing in..." : "Sign in with Google"}
        </button>

        <button
          onClick={onClose}
          disabled={loading}
          className="mt-4 text-sm text-gray-500 hover:underline"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
