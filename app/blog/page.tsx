"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  Cpu,
  Code2,
  Sparkles,
  Globe,
  BookOpen,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function BlogPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const categories = [
    { name: "All", icon: <Sparkles className="w-5 h-5" /> },
    { name: "Tech", icon: <Cpu className="w-5 h-5" /> },
    { name: "Programming", icon: <Code2 className="w-5 h-5" /> },
    { name: "Inspiration", icon: <Sparkles className="w-5 h-5" /> },
    { name: "Lifestyle", icon: <Globe className="w-5 h-5" /> },
    { name: "Tutorial", icon: <BookOpen className="w-5 h-5" /> },
  ];

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch("/api/blogs");
      const data = await res.json();
      setBlogs(data);
    };
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory =
      selectedCategory === "All" ||
      blog.tag?.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.excerpt?.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex bg-[#0f0f0f] text-gray-100 transition-all">
      {/* Sidebar */}
      <aside
        className={`relative bg-[#121212]/90 backdrop-blur-lg border-r border-gray-800 transition-all duration-300 ease-in-out ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        {/* Expand / Collapse Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-6 bg-[#1f1f1f] border border-gray-700 p-2 rounded-full hover:scale-110 transition"
        >
          {sidebarOpen ? (
            <ChevronLeft className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-400" />
          )}
        </button>

        <div className="p-5">
          <h2
            className={`font-semibold mb-6 text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text transition-all ${
              sidebarOpen ? "text-xl" : "text-base text-center"
            }`}
          >
            {sidebarOpen ? "Categories" : "📂"}
          </h2>

          <ul className="space-y-3">
            {categories.map((cat) => (
              <li
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg transition-all duration-300 ${
                  selectedCategory === cat.name
                    ? "bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-purple-400"
                    : "hover:text-purple-400"
                }`}
              >
                {cat.icon}
                {sidebarOpen && <span className="text-sm font-medium">{cat.name}</span>}
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-6 py-10 transition-all duration-300">
        {/* Search Bar */}
        <div className="flex items-center bg-[#181818] border border-gray-800 rounded-full px-4 py-2 mb-8 focus-within:border-purple-500 transition-all">
          <Search className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search blogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none flex-1 text-sm text-gray-300"
          />
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-[#1c1c1c] rounded-2xl overflow-hidden border border-transparent hover:border-purple-500/40 hover:shadow-lg transition transform group"
              >
                {blog.image && (
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-44 object-cover rounded-t-2xl"
                  />
                )}
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-white line-clamp-2 mb-2">{blog.title}</h2>
                  {blog.excerpt && (
                    <p className="text-gray-400 text-sm line-clamp-3 mb-2">{blog.excerpt}</p>
                  )}
                  <Link
                    href={`/blog/${encodeURIComponent(blog.slug)}`}
                    className="inline-flex items-center text-cyan-400 font-medium group-hover:text-cyan-300 transition-all"
                  >
                    Read More <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic col-span-full">No blogs found.</p>
          )}
        </div>
      </main>
    </div>
  );
}
