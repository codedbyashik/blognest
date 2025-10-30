// app/blogs/page.tsx
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, Cpu, Code2, Globe, BookOpen, ArrowRight } from "lucide-react";

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  image?: string;
  tag?: string;
}

interface Props {
  searchParams?: { category?: string; page?: string; };
}

// Server Component
export default async function BlogPage({ searchParams }: Props) {
  const selectedCategory = searchParams?.category || "All";
  const page = parseInt(searchParams?.page || "1");
  const limit = 9;
  const skip = (page - 1) * limit;

  // ✅ Fetch blogs with pagination & optional category
  const blogs = await prisma.blog.findMany({
    where: selectedCategory !== "All" ? { tag: selectedCategory } : {},
    take: limit,
    skip,
    orderBy: { createdAt: "desc" },
  });

  const totalBlogs = await prisma.blog.count({
    where: selectedCategory !== "All" ? { tag: selectedCategory } : {},
  });

  // ✅ Fetch unique categories
  const categoryRecords = await prisma.blog.findMany({
    distinct: ["tag"],
    select: { tag: true },
  });
  const categories = categoryRecords.map((b) => b.tag).filter(Boolean) as string[];

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
              className={`cursor-pointer p-2 rounded-lg hover:bg-purple-500/20 hover:text-purple-400 transition ${
                selectedCategory === cat ? "bg-purple-500/20 text-purple-400" : ""
              }`}
            >
              <Link href={`/blogs?category=${encodeURIComponent(cat)}`}>{cat}</Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-6 py-10 max-w-6xl mx-auto">
        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-[#1c1c1c] rounded-2xl overflow-hidden border border-transparent hover:border-purple-500/40 hover:shadow-lg transition transform group"
              >
                {blog.image && (
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    width={400}
                    height={180}
                    className="w-full h-44 object-cover rounded-t-2xl"
                  />
                )}
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-white line-clamp-2 mb-2">
                    {blog.title}
                  </h2>
                  {blog.excerpt && (
                    <p className="text-gray-400 text-sm line-clamp-3 mb-2">
                      {blog.excerpt}
                    </p>
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

        {/* Pagination */}
        {totalBlogs > limit && (
          <div className="flex justify-center mt-10 gap-4">
            {page > 1 && (
              <Link
                href={`/blogs?category=${encodeURIComponent(selectedCategory)}&page=${page - 1}`}
                className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
              >
                Previous
              </Link>
            )}
            {page * limit < totalBlogs && (
              <Link
                href={`/blogs?category=${encodeURIComponent(selectedCategory)}&page=${page + 1}`}
                className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
              >
                Next
              </Link>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
