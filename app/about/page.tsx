"use client";

import { motion, useMotionValue, useTransform, useAnimationFrame } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const stats = [
  { label: "Blogs Published", value: "1000+" },
  { label: "Active Readers", value: "500+" },
  { label: "Categories", value: "10+" },
];

export default function AboutPage() {
  const ref = useRef<HTMLDivElement>(null);

  // Parallax effect
  const y = useMotionValue(0);
  const transformY = useTransform(y, [0, 1], [0, -20]);

  useAnimationFrame(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const scrollTop = window.scrollY || window.pageYOffset;
    const offset = rect.top - scrollTop;
    y.set(offset / window.innerHeight);
  });

  return (
    <main className="min-h-screen bg-[#0D1117] text-white px-4 sm:px-6 md:px-16 py-12 flex justify-center" aria-label="About BlogNest">
      <div className="max-w-[1200px] w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left Side Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            About <span className="text-white">BlogNest</span>
          </h1>

          <p className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed">
            Welcome to <span className="font-semibold text-purple-400">BlogNest</span>, your go-to platform for curated and premium-quality blog posts. We deliver content that is engaging, informative, and easy to digest.
          </p>

          <p className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed">
            Whether you are a tech enthusiast, developer, or someone who loves reading insightful articles, BlogNest has something for everyone.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="bg-[#161B22] border border-gray-700 rounded-xl p-4 sm:p-6 text-center shadow hover:scale-105 transition-transform duration-300"
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">{stat.value}</h2>
                <p className="text-gray-400 mt-1 sm:mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <p className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed mt-6">
            Our mission is to create a modern blogging experience with a clean interface, dark mode aesthetics, and a focus on reading comfort. Join us and explore the world of knowledge.
          </p>

          {/* CTA Button */}
          <motion.a
            href="/blog"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block mt-6 bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-5 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold shadow-lg hover:opacity-90 transition text-sm sm:text-base"
          >
            Explore Blogs
          </motion.a>
        </motion.div>

        {/* Right Side Image with Parallax */}
        <motion.div
          ref={ref}
          style={{ y: transformY }}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-64 sm:h-96 md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-xl"
        >
          <Image
            src="/about.jpg" // replace with your image
            alt="Illustration about BlogNest"
            fill
            style={{ objectFit: "cover" }}
            className="rounded-2xl"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>

      </div>
    </main>
  );
}
