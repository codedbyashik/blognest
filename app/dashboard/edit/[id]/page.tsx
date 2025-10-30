"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import dynamic from "next/dynamic";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });
const Markdown = dynamic(() => import("@uiw/react-markdown-preview"), { ssr: false });

export default function EditBlogPage() {
  const router = useRouter();
  const { id } = useParams();

  const [form, setForm] = useState({
    title: "",
    slug: "",
    tag: "",
    excerpt: "",
    image: "",
    content: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blogs/${id}`);
        if (!res.ok) throw new Error("Failed to fetch blog");
        const data = await res.json();
        setForm({
          title: data.title || "",
          slug: data.slug || "",
          tag: data.tag || "",
          excerpt: data.excerpt || "",
          image: data.image || "",
          content: data.content || "",
        });
      } catch (err: any) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => {
      let newSlug = prev.slug;
      if (name === "title") newSlug = value.toLowerCase().trim().replace(/\s+/g, "-");
      return { ...prev, [name]: value, slug: newSlug };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.content) return toast.error("Title and Content are required");

    try {
      setSubmitLoading(true);
      const res = await fetch(`/api/blogs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Update failed");
      }

      toast.success("Blog updated successfully");
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading)
    return <p className="min-h-screen flex items-center justify-center text-gray-100">Loading...</p>;

  return (
    <div className="min-h-screen p-6 md:p-10 max-w-4xl mx-auto bg-[#121212] text-gray-100">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
        Edit Blog
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {["title", "slug", "tag", "excerpt", "image"].map((key) => (
          <input
            key={key}
            name={key}
            value={(form as any)[key]}
            onChange={handleChange}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            className="p-3 rounded-lg bg-[#1c1c1c] outline-none border border-transparent focus:border-purple-500"
          />
        ))}

        <div className="mt-2">
          <label className="mb-1 block text-gray-400">Content</label>
          <MDEditor
            value={form.content}
            onChange={(val) => setForm((prev) => ({ ...prev, content: val || "" }))}
            height={300}
          />
        </div>

        <button
          type="submit"
          className="bg-gradient-to-r from-purple-500 to-cyan-500 py-3 rounded-lg mt-4 font-medium hover:opacity-90 transition"
          disabled={submitLoading}
        >
          {submitLoading ? "Updating..." : "Update Blog"}
        </button>
      </form>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Live Preview</h2>
        <div className="bg-[#1a1a1a] p-4 rounded-lg min-h-[200px] overflow-auto">
          <Markdown source={form.content} />
        </div>
      </div>
    </div>
  );
}
