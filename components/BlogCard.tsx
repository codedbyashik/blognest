"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface BlogCardProps {
  blog: {
    id: string;
    title?: string;
    slug?: string;
    tag?: string;
    excerpt?: string;
    image?: string;
  };
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-purple-500/40 relative group cursor-pointer"
    >
      {/* Image */}
      {blog?.image ? (
        <div className="relative w-full h-56 md:h-64">
          <Image
            src={blog.image}
            alt={blog.title || "Blog Image"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
            className="rounded-t-2xl transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            {blog?.tag && (
              <span className="bg-purple-700/40 text-purple-300 text-xs font-medium px-2 py-1 rounded-full">
                #{blog.tag}
              </span>
            )}
          </div>
          <Link
            href={`/blog/${blog.slug}`}
            className="absolute bottom-4 right-4 text-sm md:text-base bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-full shadow-lg transition"
            aria-label={`Read more about ${blog.title}`}
          >
            Read More
          </Link>
        </div>
      ) : (
        <div className="w-full h-56 md:h-64 bg-gray-700 flex items-center justify-center text-gray-400 text-sm md:text-base">
          No Image
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        <h2 className="text-lg md:text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-purple-400 transition-colors">
          {blog?.title || "Untitled"}
        </h2>
        {blog?.excerpt && (
          <p className="text-gray-300 text-sm md:text-base line-clamp-3 mb-2">
            {blog.excerpt}
          </p>
        )}
        <Link
          href={`/blog/${blog.slug}`}
          className="text-sm text-purple-400 hover:text-purple-300 hover:underline transition"
          aria-label={`Read full blog: ${blog.title}`}
        >
          Read more →
        </Link>
      </div>
    </motion.div>
  );
};

export default BlogCard;
