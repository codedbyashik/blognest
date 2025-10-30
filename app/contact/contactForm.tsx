"use client";

import React, { useState, useEffect } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [isRateLimited, setIsRateLimited] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isRateLimited) return;

    setStatus("sending");
    setIsRateLimited(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send message");

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
    } finally {
      setTimeout(() => setIsRateLimited(false), 10000); // 10 sec rate limit
    }
  };

  useEffect(() => {
    if (status === "success" || status === "error") {
      const timer = setTimeout(() => setStatus("idle"), 4000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-gray-200 px-6 md:px-16 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Contact Us</h1>
        <p className="text-gray-400 mb-10 text-sm md:text-base">
          Have questions, feedback, or partnership ideas? We'd love to hear from you.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-[#111] border border-gray-800 rounded-2xl p-6 md:p-8 shadow-lg">
            <div className="mb-5">
              <label className="block text-gray-300 mb-2 text-sm">Your Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-gray-200"
              />
            </div>

            <div className="mb-5">
              <label className="block text-gray-300 mb-2 text-sm">Email Address</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-gray-200"
              />
            </div>

            <div className="mb-5">
              <label className="block text-gray-300 mb-2 text-sm">Message</label>
              <textarea
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message..."
                className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-gray-200 resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={status === "sending" || isRateLimited}
              className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white py-2.5 rounded-lg font-medium flex items-center justify-center gap-2"
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>

            {status === "success" && <p className="mt-4 text-green-400 text-sm">✅ Message sent successfully!</p>}
            {status === "error" && <p className="mt-4 text-red-400 text-sm">❌ Failed to send message.</p>}
          </form>

          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Get in Touch</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Have a project in mind or need assistance? Reach out anytime — usually respond within 24 hours.
            </p>

            <div className="space-y-3 text-sm">
              <p>📧 <span className="text-gray-300">support@blognest.com</span></p>
              <p>📞 <span className="text-gray-300">+880 1234 567 890</span></p>
              <p>📍 <span className="text-gray-300">Dhaka, Bangladesh</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
