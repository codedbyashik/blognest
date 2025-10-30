"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";
import Hero from "@/components/Hero";

interface Blog {
  id: string;
  title: string;
  excerpt?: string;
  image?: string;
  slug?: string;
  createdAt: string;
}

export default function HomePage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const prevBlogIds = useRef<Set<string>>(new Set());

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/blogs");
      const data = await res.json();

      const blogsArray: Blog[] = Array.isArray(data)
        ? data
        : Array.isArray(data.blogs)
        ? data.blogs
        : [];

      const latest = blogsArray
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .slice(0, 4);

      // Check for new blogs
      const newBlog = latest.find((b) => !prevBlogIds.current.has(b.id));
      if (newBlog) {
        toast.success(`New blog published: "${newBlog.title}"`);
      }

      // Update prevBlogIds
      prevBlogIds.current = new Set(latest.map((b) => b.id));
      setBlogs(latest);
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();

    const interval = setInterval(fetchBlogs, 300000); // 5 min
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#121212] text-gray-100">
      <Toaster position="top-right" />
      <Hero />

      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Latest Blogs
        </h2>

        {loading ? (
          <p className="text-center text-gray-400 animate-pulse">
            Loading blogs...
          </p>
        ) : blogs.length === 0 ? (
          <p className="text-center text-gray-400">No blogs published yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-[#1c1c1c] rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer"
              >
                {blog.image ? (
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-700 flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-white mb-1 line-clamp-2">
                    {blog.title}
                  </h3>
                  {blog.excerpt && (
                    <p className="text-gray-300 text-sm line-clamp-3">
                      {blog.excerpt}
                    </p>
                  )}
                  <div className="mt-2 text-xs text-gray-500">
                    {blog.createdAt
                      ? new Date(blog.createdAt).toLocaleDateString()
                      : ""}
                  </div>
                  <a
                    href={`/blog/${blog.slug}`}
                    className="text-sm text-purple-400 mt-2 inline-block hover:underline"
                  >
                    Read more
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
