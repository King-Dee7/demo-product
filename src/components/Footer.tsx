"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail("");
      setSubscribed(false);
    }, 3000);
  };

  const navLinks = [
    { name: "Our Collections", href: "#collections" },
    { name: "Shop", href: "#categories" },
    { name: "Shipment", href: "#trends" },
    { name: "Help Center", href: "#" },
    { name: "Contact Us", href: "#" },
  ];

  return (
    <footer id="footer" className="w-full bg-[#111215] text-white pt-16 sm:pt-20 pb-8 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center mb-16">
          {/* Left Column: Newsletter & Socials */}
          <div className="md:col-span-5 space-y-6">
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
              Don&apos;t miss out <br />
              our new updates!
            </h3>

            {/* Email Input Box */}
            <form onSubmit={handleSubscribe} className="relative max-w-sm">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full bg-white/10 border border-white/20 rounded-full py-3.5 pl-5 pr-14 text-sm text-white placeholder:text-neutral-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 w-10 rounded-full bg-white text-neutral-900 hover:bg-neutral-200 flex items-center justify-center transition shadow"
                aria-label="Subscribe"
              >
                {subscribed ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
              </button>
            </form>

            {/* Social Icons (SVG) */}
            <div className="flex items-center gap-3 pt-2">
              {/* Instagram */}
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 border border-white/15 flex items-center justify-center transition text-neutral-300 hover:text-white"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* Dribbble */}
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 border border-white/15 flex items-center justify-center transition text-neutral-300 hover:text-white"
                aria-label="Dribbble"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm10.129 10.826c-.368-.021-2.91-.144-5.698.815-.224-.492-.463-.984-.716-1.472 3.197-1.458 4.417-3.284 4.542-3.479 1.156 1.177 1.872 2.766 1.872 4.136zm-3.238-5.375c-.171.246-1.385 1.956-4.469 3.327-1.428-2.607-3.003-4.843-3.23-5.161 1.62-.647 3.39-.806 5.093-.284.974.567 1.859 1.309 2.606 2.118zm-9.84-2.883c.238.329 1.796 2.534 3.224 5.105-3.834 1.085-7.531 1.054-7.915 1.049.805-2.628 2.583-4.789 4.691-6.154zm-6.953 8.356c.394.004 3.518.016 7.086-.968.271.536.527 1.077.766 1.621-3.69 1.074-7.051 3.593-7.234 3.737-.58-1.332-.888-2.795-.888-4.329 0-.02 0-.041.002-.061h.268zm2.748 7.235c.196-.153 3.125-2.388 6.643-3.472 1.078 2.802 1.554 5.412 1.643 5.945-2.665.918-5.59.398-7.859-1.501-.151-.315-.297-.643-.427-.972zm10.334 1.258c-.11-.599-.588-3.04-1.602-5.719 2.545-.918 4.796-.867 5.104-.858-.291 2.836-1.896 5.253-4.223 6.642-.254-.022-.509-.047-.764-.065h1.485z"/>
                </svg>
              </a>

              {/* Twitter / X */}
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 border border-white/15 flex items-center justify-center transition text-neutral-300 hover:text-white"
                aria-label="X"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 border border-white/15 flex items-center justify-center transition text-neutral-300 hover:text-white"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z"/>
                </svg>
              </a>
            </div>

            {/* Copyright */}
            <div className="pt-6 space-y-1 text-xs text-neutral-400">
              <p>© 2026 Sneakerhouse. All Rights Reserved.</p>
              <div className="flex items-center gap-4 text-neutral-400">
                <a href="#" className="hover:text-white transition">
                  Privacy Policy
                </a>
                <span>•</span>
                <a href="#" className="hover:text-white transition">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>

          {/* Center Column: Layered Angled Cards with 3D Sneaker */}
          <div className="md:col-span-4 flex items-center justify-center relative">
            <div className="relative w-64 h-72 sm:w-72 sm:h-80 flex items-center justify-center">
              {/* Back tilted card 1 */}
              <div className="absolute inset-0 bg-blue-500/30 rounded-3xl transform rotate-6 scale-95 blur-[1px]" />
              {/* Back tilted card 2 */}
              <div className="absolute inset-0 bg-[#2563eb] rounded-3xl transform -rotate-6 shadow-xl" />

              {/* Floating Air Jordan Sneaker */}
              <motion.div
                animate={{
                  y: [-6, 6, -6],
                  rotate: [0, -3, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative z-10 w-full h-full flex items-center justify-center"
              >
                <Image
                  src="/images/cat_mens.png"
                  alt="Sneakerhouse Featured Sneaker"
                  width={300}
                  height={300}
                  className="object-contain filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.5)] transform -rotate-12 hover:scale-110 transition-transform duration-500"
                />
              </motion.div>
            </div>
          </div>

          {/* Right Column: Navigation Links */}
          <div className="md:col-span-3 md:text-right space-y-3">
            {navLinks.map((link) => (
              <div key={link.name}>
                <Link
                  href={link.href}
                  className="text-base sm:text-lg font-bold text-white/90 hover:text-blue-400 transition-colors inline-block"
                >
                  {link.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Giant Bottom Typographic Watermark "SNEAKERHOUSE" */}
      <div className="relative w-full overflow-hidden select-none pointer-events-none mt-8 border-t border-white/5 pt-6 flex justify-center">
        <Image 
          src="/images/logo.png" 
          alt="Sneakerhouse Logo Watermark" 
          width={1200}
          height={400}
          className="w-[90%] sm:w-[80%] max-w-7xl h-auto opacity-10 object-contain"
        />
      </div>
    </footer>
  );
}
