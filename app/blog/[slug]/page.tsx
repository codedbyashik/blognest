import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";

interface Props {
  params: Promise<{ slug: string }>; // ✅ params is a Promise
}

export default async function SingleBlogPage({ params }: Props) {
  // ✅ Unwrap the params Promise
  const { slug } = await params;

  if (!slug) return notFound();

  // ✅ Case-insensitive fetch
  const blog = await prisma.blog.findFirst({
    where: { slug: { equals: slug, mode: "insensitive" } },
    include: { author: true },
  });

  if (!blog) return notFound(); // 404 safety

  // ✅ Fetch unique categories (performance optimized)
  const categoryRecords = await prisma.blog.findMany({
    distinct: ["tag"],
    select: { tag: true },
  });
  const categories = categoryRecords
    .map((b) => b.tag)
    .filter(Boolean) as string[];

  return (
    <div className="min-h-screen flex bg-[#0f0f0f] text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#121212]/90 backdrop-blur-lg border-r border-gray-800 p-5 hidden md:block">
        <h2 className="text-xl font-semibold mb-6 text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text">
          Categories
        </h2>
        <ul className="space-y-3">
          {["All", ...categories].map((cat) => (
            <li
              key={cat}
              className="cursor-pointer p-2 rounded-lg hover:bg-purple-500/20 hover:text-purple-400 transition"
            >
              {cat}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-6 py-10 max-w-3xl mx-auto">
        {/* Blog Image */}
        {blog.image && (
          <div className="relative w-full h-80 mb-6">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover rounded-2xl"
              priority
            />
          </div>
        )}

        {/* Blog Title */}
        <h1 className="text-4xl font-bold mb-4 leading-tight">{blog.title}</h1>

        {/* Author & Date */}
        <div className="flex items-center gap-3 text-gray-400 text-sm mb-6">
          {blog.author && (
            <>
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                {blog.author.name?.charAt(0).toUpperCase()}
              </div>
              <p>{blog.author.name}</p>
            </>
          )}
          <span>•</span>
          <p>{new Date(blog.createdAt).toLocaleDateString()}</p>
        </div>

        {/* Excerpt */}
        {blog.excerpt && (
          <p className="text-gray-400 mb-6 text-lg">{blog.excerpt}</p>
        )}

        {/* Content with XSS protection */}
        <div
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(blog.content),
          }}
        />

        {/* Back Button */}
        <div className="mt-10">
          <Link
            href="/blogs"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            ← Back to Blogs
          </Link>
        </div>
      </main>
    </div>
  );
}
