"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { User, ShoppingBag, Menu, X, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import gsap from "gsap";

export default function Navbar() {
  const { openCart, totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!headerRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      gsap.set(headerRef.current, { opacity: 1, y: 0 });
      return;
    }

    gsap.fromTo(
      headerRef.current,
      { y: -24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.45,
        ease: "power2.out",
        delay: 0.05,
      }
    );
  }, []);

  const navLinks = [
    { name: "Our Collections", href: "#collections" },
    { name: "Shop", href: "#collections" },
    { name: "Shipment", href: "#trends" },
    { name: "Contact", href: "#footer" },
  ];

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 pt-4 pb-2 transition-all duration-300 opacity-0"
    >
      <div
        className={`max-w-7xl mx-auto flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? "px-6 py-2.5 rounded-full bg-neutral-900/90 backdrop-blur-xl border border-white/15 shadow-2xl shadow-black/30 text-white"
            : "px-0 sm:px-2 py-0 bg-transparent border-transparent shadow-none"
        }`}
      >
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center select-none"
        >
          <Image 
            src="/images/logo.png" 
            alt="Sneakerhouse Logo" 
            width={300} 
            height={100} 
            priority
            className="object-contain h-10 sm:h-12 w-auto scale-[1.7] origin-left" 
          />
        </Link>

        {/* Center Pill Nav Links (Desktop) */}
        <nav
          className={`hidden md:flex items-center gap-1 transition-all duration-300 ${
            scrolled
              ? "bg-transparent border-transparent px-2 py-1 shadow-none"
              : "bg-white/15 border border-white/20 px-5 py-2 rounded-full backdrop-blur-md shadow-lg shadow-black/5"
          }`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="px-4 py-1 text-sm font-medium text-white/90 hover:text-white hover:bg-white/15 rounded-full transition-all duration-200"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Cart Trigger */}
          <button
            onClick={openCart}
            className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 text-white transition-all shadow-sm backdrop-blur-md"
            aria-label="View cart"
          >
            <ShoppingBag className="w-4 h-4" />
            {totalItems > 0 && (
              <span
                className="absolute -top-1 -right-1 w-5 h-5 text-white text-xs font-black rounded-full flex items-center justify-center shadow-md animate-scale transition-colors duration-500"
                style={{ backgroundColor: "var(--hero-accent, #ea580c)" }}
              >
                {totalItems}
              </span>
            )}
          </button>

          {/* Login/Sign Up Pill */}
          <button className="hidden sm:flex items-center gap-2.5 bg-white/15 hover:bg-white/25 border border-white/20 text-white text-xs sm:text-sm font-medium px-4 py-2 rounded-full transition-all backdrop-blur-md group">
            <span>Login/Sign Up</span>
            <div
              className="w-5 h-5 rounded-full bg-white flex items-center justify-center group-hover:translate-x-0.5 transition-transform"
              style={{ color: "var(--hero-arrow-color, #c2410c)" }}
            >
              <ArrowRight className="w-3 h-3" />
            </div>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2 hover:bg-white/15 bg-white/15 border border-white/20 rounded-full transition backdrop-blur-md"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden max-w-7xl mx-auto mt-2 p-4 rounded-3xl bg-neutral-900/95 border border-white/20 shadow-2xl backdrop-blur-xl text-white space-y-3 animate-fadeIn">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 rounded-xl text-sm font-medium hover:bg-white/15 transition"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2 border-t border-white/15">
            <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full bg-white text-neutral-950 font-semibold text-sm hover:bg-neutral-100 transition">
              <User className="w-4 h-4" />
              <span>Login / Sign Up</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
