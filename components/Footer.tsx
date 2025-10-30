"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = async () => {
    if (!email || !email.includes("@")) {
      alert("Please enter a valid email address!");
      return;
    }

    try {
      setStatus("loading");
      await new Promise((res) => setTimeout(res, 1500));
      setStatus("success");
      setEmail("");
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-300 pt-12 px-6 sm:px-12 md:px-20 lg:px-28 xl:px-36" aria-label="Footer">
      <div className="flex flex-wrap justify-between gap-12 md:gap-8">
        {/* Logo + Description */}
        <div className="max-w-80">
          <Link href="/" aria-label="BlogNest Home">
            <Image
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/dummyLogo/dummyLogoWhite.svg"
              alt="BlogNest Logo"
              width={120}
              height={36}
              className="mb-4"
            />
          </Link>

          <p className="text-sm leading-relaxed text-gray-400">
            <span className="text-white font-semibold">BlogNest</span> — your digital space to
            publish, discover, and explore inspiring blogs.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4 mt-5">
            <Link href="#" aria-label="Instagram" className="hover:text-pink-500 transition-transform transform hover:scale-110">
              <FaInstagram size={22} />
            </Link>
            <Link href="#" aria-label="Facebook" className="hover:text-blue-600 transition-transform transform hover:scale-110">
              <FaFacebookF size={22} />
            </Link>
            <Link href="#" aria-label="LinkedIn" className="hover:text-blue-400 transition-transform transform hover:scale-110">
              <FaLinkedinIn size={22} />
            </Link>
            <Link href="#" aria-label="Twitter" className="hover:text-cyan-400 transition-transform transform hover:scale-110">
              <FaTwitter size={22} />
            </Link>
          </div>
        </div>

        {/* Navigation */}
        <nav>
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
        </nav>

        {/* Newsletter */}
        <div className="max-w-80">
          <p className="text-lg text-white font-semibold">Stay Updated</p>
          <p className="mt-3 text-sm text-gray-400 leading-relaxed">
            Subscribe to our newsletter to get the latest highlights directly in your inbox.
          </p>

          <div className="flex flex-col sm:flex-row items-center mt-4 gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 bg-gray-800 rounded-l-md border border-gray-700 h-10 px-3 text-gray-200 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            />
            <button
              onClick={handleSubscribe}
              disabled={status === "loading"}
              className={`flex items-center justify-center h-10 px-4 rounded-r-md font-medium transition-all transform hover:scale-105 ${
                status === "loading" ? "bg-gray-600 cursor-wait text-white" : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {status === "loading" ? "..." : "Join"}
            </button>
          </div>

          {status === "success" && <p className="text-green-400 mt-2 text-sm">✅ Subscribed successfully!</p>}
          {status === "error" && <p className="text-red-400 mt-2 text-sm">❌ Something went wrong!</p>}
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
