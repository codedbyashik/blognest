"use client";
import Link from "next/link";
import { motion } from "framer-motion";

interface RelatedBlogsProps {
  blogs: any[];
}

export default function RelatedBlogs({ blogs }: RelatedBlogsProps) {
  if (blogs.length === 0) return <p className="text-gray-400">No related blogs.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {blogs.map((b) => (
        <motion.div key={b.id} whileHover={{ scale: 1.03 }} className="bg-[#1c1c1c] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition transform cursor-pointer">
          <Link href={`/blog/${b.slug}`}>
            <div className="relative w-full h-44">
              {b.image ? (
                <img src={b.image} alt={b.title} className="w-full h-full object-cover rounded-t-xl" />
              ) : (
                <div className="w-full h-44 bg-gray-700 flex items-center justify-center text-gray-400">No Image</div>
              )}
            </div>
            <div className="p-4">
              <p className="text-xs text-purple-400 mb-1">#{b.category || "Blog"}</p>
              <h4 className="text-lg font-semibold mb-1 line-clamp-2">{b.title}</h4>
              <p className="text-sm text-gray-400 line-clamp-2">{b.excerpt || "Explore more..."}</p>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
