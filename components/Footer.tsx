"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email!");
      return;
    }

    try {
      setLoading(true);
      toast.loading("Subscribing...");
      // Simulate API call
      await new Promise((res) => setTimeout(res, 1500));
      toast.dismiss();
      toast.success("✅ Subscribed successfully!");
      setEmail("");
    } catch (err) {
      toast.dismiss();
      toast.error("❌ Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-300 pt-12 px-6 sm:px-12 md:px-20 lg:px-28 xl:px-36">
      <Toaster position="top-right" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
        {/* Logo + Description */}
        <div className="flex flex-col gap-4">
          <Link href="/" aria-label="BlogNest Home">
            <Image
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/dummyLogo/dummyLogoWhite.svg"
              alt="BlogNest Logo"
              width={120}
              height={36}
              unoptimized
            />
          </Link>
          <p className="text-sm leading-relaxed text-gray-400">
            <span className="text-white font-semibold">BlogNest</span> — your digital space to publish, discover, and explore inspiring blogs.
          </p>

          <div className="flex items-center gap-4 mt-4">
            {[
              { icon: <FaInstagram size={22} />, href: "#" },
              { icon: <FaFacebookF size={22} />, href: "#" },
              { icon: <FaLinkedinIn size={22} />, href: "#" },
              { icon: <FaTwitter size={22} />, href: "#" },
            ].map((social, idx) => (
              <Link
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 hover:scale-110 transition transform"
                aria-label="Social Link"
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>

        {/* Navigation Links */}
        <div>
          <p className="text-lg text-white font-semibold mb-3">Quick Links</p>
          <ul className="flex flex-col gap-2 text-sm">
            {["Blog", "Dashboard", "Contact", "About", "Privacy"].map((item) => (
              <li key={item}>
                <Link
                  href={`/${item.toLowerCase()}`}
                  className="hover:text-blue-400 transition-colors hover:underline inline-block"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-3">
          <p className="text-lg text-white font-semibold">Stay Updated</p>
          <p className="text-sm text-gray-400 leading-relaxed">
            Subscribe to our newsletter to get the latest highlights directly in your inbox.
          </p>

          <div className="flex flex-col sm:flex-row gap-2 mt-2">
            <input
              type="email"
              aria-label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 bg-gray-800 rounded-l-md border border-gray-700 h-10 px-3 text-gray-200 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            />
            <button
              type="button"
              onClick={handleSubscribe}
              disabled={loading}
              className={`flex items-center justify-center h-10 px-4 rounded-r-md font-medium transition-all transform hover:scale-105 ${
                loading ? "bg-gray-600 cursor-wait text-white" : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {loading ? "..." : "Join"}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <hr className="border-gray-700 mt-10" />
      <div className="flex flex-col md:flex-row gap-2 items-center justify-between py-6 text-sm text-gray-400">
        <p>
          © {new Date().getFullYear()}{" "}
          <Link href="/" className="text-blue-400 hover:underline">
            BlogNest
          </Link>{" "}
          — All rights reserved.
        </p>
        <ul className="flex items-center gap-5">
          {["Terms", "Privacy", "Sitemap"].map((item) => (
            <li key={item}>
              <Link href={`/${item.toLowerCase()}`} className="hover:text-blue-400">
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
