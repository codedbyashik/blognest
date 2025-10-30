"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, Sun, Moon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, signInWithGoogle } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const links = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Dashboard", href: "/dashboard", protected: true },
  ];

  const toggleTheme = () => {
    setDark(!dark);
    if (!dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0D1117]/90 backdrop-blur-md border-b border-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center h-16">
        <Link href="/" className="flex items-center gap-2">
          <motion.h1
            className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent
                       bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 cursor-pointer"
            whileHover={{
              scale: 1.1,
              rotate: [0, 2, -2, 0],
            }}
            transition={{ type: "tween", duration: 0.5 }}
          >
            BlogNest
          </motion.h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          {links.map((link) => {
            if (link.protected && !user) return null;
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                  active
                    ? "bg-purple-600 text-white"
                    : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          {/* Dark/Light Toggle */}
          <button
            onClick={toggleTheme}
            className="px-3 py-2 rounded-full bg-gray-700 text-gray-200 hover:bg-gray-600 transition"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {!user ? (
            <button
              onClick={signInWithGoogle}
              className="px-4 py-2 rounded-full font-medium transition bg-purple-500/20 text-purple-400 hover:bg-purple-500/40"
            >
              Login
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 w-auto h-10 rounded-full overflow-hidden border-2 border-purple-600 px-2 bg-gray-800 hover:bg-gray-700 transition"
              >
                <img
                  src={user.photoURL || "/images/default-avatar.png"}
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <ChevronDown size={18} className={`${dropdownOpen ? "rotate-180" : ""} transition`} />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-[#1F1F2E] border border-gray-700 rounded-md shadow-lg py-2 z-50"
                  >
                    <p className="px-4 py-2 text-sm text-gray-300 border-b border-gray-700 truncate">
                      {user.email}
                    </p>
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 rounded-md"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 rounded-md"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 rounded-md"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          {user && (
            <img
              src={user.photoURL || "/images/default-avatar.png"}
              alt="avatar"
              className="w-8 h-8 rounded-full border-2 border-purple-600"
            />
          )}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
            aria-expanded={menuOpen}
            className="text-gray-300 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-purple-500 rounded"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
