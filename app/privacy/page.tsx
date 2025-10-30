"use client";

import React from "react";
import Link from "next/link";

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-[#0b0b0b] text-gray-200 px-6 md:px-16 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Privacy Policy
        </h1>

        <p className="text-gray-400 mb-6 text-sm">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <p className="text-gray-300 leading-relaxed mb-6">
          Welcome to <span className="font-semibold text-white">Blognest</span>.
          Your privacy is very important to us. This Privacy Policy explains
          how we collect, use, and protect your personal information when
          you visit or use our website.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-3">
          1. Information We Collect
        </h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          We may collect personal information such as your name, email
          address, and usage data when you:
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1">
          <li>Subscribe to our newsletter</li>
          <li>Create or manage your account</li>
          <li>Leave comments or feedback</li>
          <li>Use our contact forms</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8 mb-3">
          2. How We Use Your Information
        </h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          We use the collected information to:
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1">
          <li>Improve user experience and website performance</li>
          <li>Send newsletters and important updates</li>
          <li>Respond to your inquiries and support requests</li>
          <li>Ensure website security and prevent misuse</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8 mb-3">
          3. Cookies
        </h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          We use cookies to enhance your browsing experience and collect
          analytics data. You can choose to disable cookies through your
          browser settings.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-3">
          4. Third-Party Services
        </h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          We may use third-party tools (like Google Analytics) that
          collect, monitor, and analyze usage to improve our service.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-3">
          5. Data Protection
        </h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          We adopt industry-standard security practices to protect your
          data from unauthorized access or disclosure.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-3">
          6. Your Rights
        </h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          You have the right to access, correct, or delete your personal
          information. For any privacy-related requests, please contact us.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-3">
          7. Changes to This Policy
        </h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          We may update this Privacy Policy from time to time. Updates will
          be reflected on this page with a revised date.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-3">
          8. Contact Us
        </h2>
        <p className="text-gray-300 leading-relaxed mb-8">
          If you have any questions or concerns about this Privacy Policy,
          please contact us at{" "}
          <Link href="/contact" className="text-blue-400 hover:underline">
            our contact page
          </Link>.
        </p>

        <div className="border-t border-gray-700 pt-6 mt-10 text-center text-sm text-gray-500">
          <Link href="/" className="text-blue-400 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
