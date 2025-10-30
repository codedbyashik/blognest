"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Optimized Mouse movement for parallax
  useEffect(() => {
    if (window.innerWidth <= 768) return; // mobile devices ignore

    let requestId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) * 0.02;
      const y = (e.clientY - window.innerHeight / 2) * 0.02;
      cancelAnimationFrame(requestId);
      requestId = requestAnimationFrame(() => setMousePos({ x, y }));
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestId);
    };
  }, []);

  // Scroll-based animation (parallax)
  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${window.scrollY * 0.15}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      aria-label="Hero Section"
      className="relative w-full h-screen overflow-hidden bg-gradient-to-r from-purple-800 to-cyan-700"
    >
      {/* Background Image with parallax */}
      <motion.div
        ref={bgRef}
        animate={{ x: mousePos.x, y: mousePos.y }}
        className="absolute inset-0 w-full h-full"
      >
        <Image
          src="/hero.jpg"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
      </motion.div>

      {/* Text Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 md:px-12 space-y-4">
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
        >
          Welcome to BlogNest
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-gray-300 text-lg md:text-xl max-w-2xl"
        >
          Discover the latest blogs, stories, and insights from our expert authors. Stay
          updated on AI, Tech, Business, Life, Design & more. Read, explore, and get
          inspired with BlogNest.
        </motion.p>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link
            href="/blog"
            className="mt-6 inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full font-semibold transition"
          >
            Explore Blogs
          </Link>
        </motion.div>

        {/* Scroll Down Indicator */}
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-10"
        >
          <svg
            className="w-6 h-6 text-white animate-bounce"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
