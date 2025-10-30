"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-gray-100 px-4 relative overflow-hidden">

      {/* Subtle background circles animation */}
      <motion.div
        className="absolute top-0 left-1/2 w-[500px] h-[500px] bg-purple-600 rounded-full opacity-20 -translate-x-1/2 blur-3xl animate-pulse"
        initial={{ scale: 0 }}
        animate={{ scale: 1.2 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
      />

      {/* Animated 404 */}
      <motion.h1
        className="text-7xl md:text-9xl font-extrabold text-purple-500 mb-6 z-10"
        initial={{ scale: 0.8, rotate: -10, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        404
      </motion.h1>

      {/* Description */}
      <motion.p
        className="text-lg md:text-2xl mb-6 text-gray-300 text-center z-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Oops! Page not found.
      </motion.p>

      {/* Go Home Link */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          href="/"
          className="bg-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-600 transition z-10"
        >
          Go Home
        </Link>
      </motion.div>
    </div>
  );
}
