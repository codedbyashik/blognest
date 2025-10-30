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
  tag?: string;
  createdAt: string;
}

const PAGE_LIMIT = 6;

export default function HomePage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const prevBlogIds = useRef<Set<string>>(new Set());

  // Fetch blogs
  const fetchBlogs = async (reset = false) => {
    try {
      if (reset) {
        setLoading(true);
        setBlogs([]);
        setPage(1);
      }

      const res = await fetch(
        `/api/blogs?category=${encodeURIComponent(
          category
        )}&page=${reset ? 1 : page}&limit=${PAGE_LIMIT}`
      );
      const data: Blog[] = await res.json();

      if (Array.isArray(data)) {
        const newBlogs = reset ? data : [...blogs, ...data];

        // Check for new blog
        const latest = data.slice(0, 1)[0];
        if (latest && !prevBlogIds.current.has(latest.id)) {
          toast.success(`New blog published: "${latest.title}"`);
        }

        prevBlogIds.current = new Set(newBlogs.map((b) => b.id));
        setBlogs(newBlogs);
        setHasMore(data.length === PAGE_LIMIT);
        setPage((prev) => prev + 1);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch & category/search change
  useEffect(() => {
    fetchBlogs(true);
  }, [category, search]);

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 200 &&
        !loading &&
        hasMore
      ) {
        fetchBlogs();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore, page]);

  // Filter by search
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(search.toLowerCase())
  );

  const categories = ["All", "Tech", "Programming", "Inspiration", "Lifestyle", "Tutorial"];

  return (
    <div className="min-h-screen bg-[#121212] text-gray-100">
      <Toaster position="top-right" />
      <Hero />

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center gap-4">
        <input
          type="text"
          placeholder="Search blogs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-[#1c1c1c] px-4 py-2 rounded-lg text-gray-100 outline-none flex-1"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-[#1c1c1c] px-4 py-2 rounded-lg text-gray-100 outline-none"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Blogs */}
      <section className="max-w-7xl mx-auto px-4 py-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredBlogs.length === 0 && !loading && (
          <p className="text-center text-gray-400 col-span-full">
            No blogs found.
          </p>
        )}
        {filteredBlogs.map((blog, index) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
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
                {new Date(blog.createdAt).toLocaleDateString()}
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
        {loading && (
          <p className="text-center text-gray-400 col-span-full animate-pulse">
            Loading blogs...
          </p>
        )}
      </section>
    </div>
  );
}
