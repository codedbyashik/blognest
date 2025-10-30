"use client";

import { useEffect, useState, useMemo } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// ✅ Admin Email (env fallback)
const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@example.com";

// ✅ Type for Blogs
interface Blog {
  id: string;
  slug: string;
  title?: string;
  excerpt?: string;
  content?: string;
  image?: string;
  createdAt?: string;
}

// ✅ Safe Image Component
const SafeImage = ({
  src,
  alt,
  className,
}: {
  src?: string;
  alt: string;
  className?: string;
}) => {
  if (!src)
    return (
      <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500">
        No Image
      </div>
    );

  const allowedDomains = [
    "cdn.pixabay.com",
    "i.pinimg.com",
    "images.unsplash.com",
    "source.unsplash.com",
    "images.pexels.com",
    "picsum.photos",
    "media.istockphoto.com",
    "images.freeimages.com",
    "tse2.mm.bing.net",
  ];

  try {
    const url = new URL(src);
    if (allowedDomains.includes(url.hostname)) {
      return (
        <Image
          src={src}
          alt={alt}
          fill
          priority
          style={{ objectFit: "cover" }}
          className={className}
        />
      );
    }
  } catch {}

  return (
    <img
      src={src}
      alt={alt}
      className={`w-full h-full object-cover ${className}`}
    />
  );
};

export default function DashboardPage() {
  const { user, signInWithGoogle } = useAuth();
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch blogs
  const fetchBlogs = async () => {
    try {
      if (!user) throw new Error("Not logged in");
      const res = await fetch("/api/blogs", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch blogs");
      const data: Blog[] = await res.json();
      setBlogs(data);
    } catch (err: any) {
      console.error("Fetch error:", err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete Blog
  const handleDelete = async (slug?: string) => {
    if (!slug) return toast.error("Blog slug missing");
    if (!confirm("🗑️ Are you sure you want to delete this blog?")) return;

    try {
      const res = await fetch(`/api/blogs/${slug}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");
      setBlogs((prev) => prev.filter((b) => b.slug !== slug));
      toast.success("✅ Blog deleted successfully!");
    } catch (err: any) {
      toast.error(err.message || "Delete failed");
    }
  };

  // ✅ Load blogs after login
  useEffect(() => {
    if (user?.email === ADMIN_EMAIL) fetchBlogs();
    else setLoading(false);
  }, [user]);

  // ✅ Sorted by date
  const sortedBlogs = useMemo(
    () =>
      [...blogs].sort(
        (a, b) =>
          (b.createdAt ? new Date(b.createdAt).getTime() : 0) -
          (a.createdAt ? new Date(a.createdAt).getTime() : 0)
      ),
    [blogs]
  );

  // ✅ Chart Data
  const chartData = useMemo(() => {
    const counts: Record<string, number> = {};
    sortedBlogs.forEach((b) => {
      if (!b.createdAt) return;
      const date = new Date(b.createdAt).toLocaleDateString("en-GB");
      counts[date] = (counts[date] || 0) + 1;
    });
    return Object.entries(counts).map(([date, count]) => ({ date, count }));
  }, [sortedBlogs]);

  // ✅ Not Logged In
  if (!user)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#121212] text-gray-100">
        <h1 className="text-3xl font-bold mb-6">🔒 Admin Login Required</h1>
        <button
          onClick={signInWithGoogle}
          className="bg-gradient-to-r from-purple-500 to-cyan-500 px-6 py-3 rounded-lg font-medium hover:opacity-90 transition"
        >
          Login with Google
        </button>
      </div>
    );

  // ✅ Not Admin
  if (user.email !== ADMIN_EMAIL)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#121212] text-center text-gray-100">
        <div>
          <h1 className="text-3xl font-bold">🚫 Access Denied</h1>
          <p className="text-gray-400 mt-2">
            Only the admin can view this dashboard.
          </p>
        </div>
      </div>
    );

  // ✅ Dashboard Layout
  return (
    <div className="min-h-screen bg-[#121212] text-gray-100 px-4 md:px-8 py-10">
      <Toaster position="top-right" />
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <button
            onClick={() => router.push("/dashboard/new")}
            className="bg-gradient-to-r from-purple-500 to-cyan-500 px-5 py-2 rounded-xl font-medium hover:scale-105 transition"
          >
            + Create Blog
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#1c1c1c] p-5 rounded-2xl text-center border border-gray-800">
            <h3 className="text-sm text-gray-400">Total Blogs</h3>
            <p className="text-3xl font-bold text-purple-400">{blogs.length}</p>
          </div>
          <div className="bg-[#1c1c1c] p-5 rounded-2xl text-center border border-gray-800">
            <h3 className="text-sm text-gray-400">Last Updated</h3>
            <p className="text-lg text-cyan-400 font-semibold">
              {blogs[0]?.createdAt
                ? new Date(blogs[0].createdAt).toLocaleDateString("en-GB")
                : "—"}
            </p>
          </div>
          <div className="bg-[#1c1c1c] p-5 rounded-2xl text-center border border-gray-800">
            <h3 className="text-sm text-gray-400">Recent Blog</h3>
            <p className="text-gray-300 text-base font-medium line-clamp-1">
              {blogs[0]?.title || "—"}
            </p>
          </div>
        </div>

        {/* Chart */}
        {chartData.length > 0 && (
          <div className="bg-[#1c1c1c] p-5 rounded-2xl border border-gray-800 mb-10">
            <h2 className="text-lg font-semibold mb-3 text-gray-200">
              📈 Blog Upload Timeline
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <XAxis dataKey="date" stroke="#aaa" tick={{ fontSize: 10 }} />
                <YAxis stroke="#aaa" />
                <Tooltip />
                <Bar dataKey="count" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Blogs Grid */}
        {loading ? (
          <p className="text-gray-400 text-center mt-10 animate-pulse">
            Loading blogs...
          </p>
        ) : blogs.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">No blogs yet. Create one!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedBlogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-[#1c1c1c] rounded-2xl overflow-hidden border border-gray-800 hover:scale-[1.03] hover:shadow-lg transition duration-200"
              >
                <div className="relative w-full h-48">
                  <SafeImage src={blog.image} alt={blog.title || "Blog Image"} />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-1 text-white line-clamp-2">
                    {blog.title || "Untitled"}
                  </h2>
                  <p className="text-sm text-gray-400 line-clamp-3 mb-2">
                    {blog.excerpt || "No excerpt available"}
                  </p>
                  <div className="flex justify-between items-center mt-3">
                    <button
                      onClick={() =>
                        router.push(`/dashboard/edit/${blog.slug}`)
                      }
                      className="text-sm text-blue-400 hover:underline"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog.slug)}
                      className="text-sm text-red-500 hover:underline"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
