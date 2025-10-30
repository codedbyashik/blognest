"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";

const ProfilePage = () => {
  const { user } = useAuth();

  if (!user) return <p className="p-4">Please login to view your profile.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 mt-16">
      <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
      <div className="flex items-center gap-4 mb-6">
        <img
          src={user.photoURL || "/images/default-avatar.png"}
          alt="avatar"
          className="w-24 h-24 rounded-full border-2 border-purple-600 object-cover"
        />
        <div>
          <p className="text-xl font-semibold">{user.displayName || "No Name"}</p>
          <p className="text-gray-400">{user.email}</p>
        </div>
      </div>

      <div className="bg-[#0D1117] p-4 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-2">Recent Blogs</h2>
        <p className="text-gray-400">You haven't written any blogs yet.</p>
      </div>
    </div>
  );
};

export default ProfilePage;
