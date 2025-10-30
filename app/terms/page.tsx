"use client";

import React from "react";
import Link from "next/link";

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-[#0b0b0b] text-gray-200 px-6 md:px-16 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Terms & Conditions
        </h1>
        <p className="text-gray-400 mb-6 text-sm">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <p className="text-gray-300 leading-relaxed mb-6">
          Welcome to <span className="font-semibold text-white">Blognest</span>.
          By accessing or using our website, you agree to be bound by these
          Terms and Conditions. Please read them carefully before using our services.
        </p>

        {/* Section 1 */}
        <h2 className="text-xl font-semibold text-white mt-8 mb-3">
          1. Acceptance of Terms
        </h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          By accessing this website, you confirm that you have read, understood,
          and agree to comply with these Terms. If you do not agree, please do
          not use our website.
        </p>

        {/* Section 2 */}
        <h2 className="text-xl font-semibold text-white mt-8 mb-3">
          2. Use of Our Services
        </h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          You agree to use our website only for lawful purposes. You must not:
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 mb-4">
          <li>Violate any applicable laws or regulations</li>
          <li>Infringe upon the rights of others</li>
          <li>Upload malicious software or harmful content</li>
          <li>Attempt unauthorized access to our systems</li>
        </ul>

        {/* Section 3 */}
        <h2 className="text-xl font-semibold text-white mt-8 mb-3">
          3. User Content
        </h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          By submitting content (blogs, comments, etc.) to Blognest, you grant
          us a non-exclusive, royalty-free license to use, display, and distribute
          that content. You are solely responsible for what you post.
        </p>

        {/* Section 4 */}
        <h2 className="text-xl font-semibold text-white mt-8 mb-3">
          4. Intellectual Property
        </h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          All content, trademarks, and materials available on Blognest are
          the property of Blognest or its licensors. Unauthorized reproduction,
          copying, or modification is strictly prohibited.
        </p>

        {/* Section 5 */}
        <h2 className="text-xl font-semibold text-white mt-8 mb-3">
          5. Limitation of Liability
        </h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Blognest shall not be held liable for any damages or losses arising
          from your use of the website. Use of our site is at your own risk.
        </p>

        {/* Section 6 */}
        <h2 className="text-xl font-semibold text-white mt-8 mb-3">
          6. Third-Party Links
        </h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Our website may contain links to third-party websites. We do not
          control or endorse their content and are not responsible for any
          damages or losses caused by them.
        </p>

        {/* Section 7 */}
        <h2 className="text-xl font-semibold text-white mt-8 mb-3">
          7. Termination
        </h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          We reserve the right to suspend or terminate access to our website
          at any time without notice if you violate these Terms.
        </p>

        {/* Section 8 */}
        <h2 className="text-xl font-semibold text-white mt-8 mb-3">
          8. Changes to Terms
        </h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          We may modify these Terms from time to time. Updates will be posted
          on this page with the updated date. Continued use of our site
          signifies your acceptance of the new Terms.
        </p>

        {/* Section 9 */}
        <h2 className="text-xl font-semibold text-white mt-8 mb-3">
          9. Contact Us
        </h2>
        <p className="text-gray-300 leading-relaxed mb-8">
          If you have any questions about these Terms, please{" "}
          <Link href="/contact" className="text-blue-400 hover:underline">
            contact us
          </Link>.
        </p>

        {/* Footer */}
        <div className="border-t border-gray-700 pt-6 mt-10 text-center text-sm text-gray-500">
          <Link href="/" className="text-blue-400 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
