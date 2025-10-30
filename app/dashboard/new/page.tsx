"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import dynamic from "next/dynamic";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });
const Markdown = dynamic(() => import("@uiw/react-markdown-preview"), { ssr: false });

// 🔹 Slug cleaner function (safe slug)
const cleanSlug = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\x00-\x7F]/g, "") // remove non-ASCII
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, ""); // remove special chars

export default function NewBlogPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    slug: "",
    tag: "",
    excerpt: "",
    image: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);

  // 🔹 Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => {
      let newSlug = prev.slug;
      if (name === "title") {
        newSlug = cleanSlug(value);
      }
      return { ...prev, [name]: value, slug: newSlug };
    });
  };

  // 🔹 Handle form submit
  const handleSubmit = async () => {
    const slug = form.slug || cleanSlug(form.title);

    if (!form.title || !slug || !form.content) {
      toast.error("⚠️ Title, slug, and content are required!");
      return;
    }

    setLoading(true);

    try {
      // 🔹 TEMP: Hardcoded authorId (replace with logged-in user later)
      const authorId = "existing-user-id";

      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, slug, authorId }),
      });

      if (!res.ok) {
        let errMsg = "Failed to create blog";
        try {
          const errData = await res.json();
          errMsg = errData?.error || errMsg;
        } catch {
          // keep default message
        }
        throw new Error(errMsg);
      }

      toast.success("✅ Blog published successfully!");
      setTimeout(() => router.push("/blog"), 1000);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "❌ Failed to create blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-gray-100 px-8 py-10">
      <Toaster position="top-right" />
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* 📝 Form Section */}
        <div>
          <h1 className="text-3xl font-semibold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            ✨ Create a New Blog
          </h1>

          {["title", "slug", "tag", "excerpt", "image"].map((key) => (
            <input
              key={key}
              name={key}
              value={(form as any)[key]}
              onChange={handleChange}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              className="w-full bg-[#1e1e1e] text-gray-200 rounded-lg p-3 mb-3 outline-none border border-transparent focus:border-purple-500 transition"
            />
          ))}

          {/* Markdown Editor */}
          <MDEditor
            value={form.content}
            onChange={(val) => setForm((prev) => ({ ...prev, content: val || "" }))}
            height={280}
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full mt-5 bg-gradient-to-r from-purple-500 to-cyan-500 py-3 rounded-lg font-medium hover:scale-[1.02] transition flex justify-center items-center gap-2 shadow-lg"
          >
            {loading && <span className="loader border-white" />}
            {loading ? "Publishing..." : "🚀 Publish Blog"}
          </button>
        </div>

        {/* 👀 Live Preview */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Live Preview 👀</h2>
          <div className="bg-[#1a1a1a] p-4 rounded-lg min-h-[320px] overflow-auto border border-[#2a2a2a]">
            {form.content ? (
              <Markdown source={form.content} />
            ) : (
              <p className="text-gray-500 italic">Start typing to see preview...</p>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .loader {
          border: 2px solid #f3f3f3;
          border-top: 2px solid #fff;
          border-radius: 50%;
          width: 16px;
          height: 16px;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
