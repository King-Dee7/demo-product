"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [isRemoved, setIsRemoved] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect reduced motion preferences
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsRemoved(true);
      return;
    }

    // Lock scrolling during the brief preloader intro
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        setIsRemoved(true);
      },
    });

    // 1. Initial State
    gsap.set(progressRef.current, { width: "0%" });
    gsap.set(contentRef.current, { opacity: 0, y: 15, scale: 0.96 });

    // 2. Entrance & Progress Fill (0.8s)
    tl.to(
      contentRef.current,
      { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "power3.out" },
      0.05
    );
    tl.to(
      progressRef.current,
      { width: "100%", duration: 0.8, ease: "power2.inOut" },
      0.1
    );

    // 3. Content Fade-Out before curtain lift
    tl.to(
      contentRef.current,
      { opacity: 0, y: -25, scale: 1.04, duration: 0.35, ease: "power2.in" },
      0.82
    );

    // 4. Smooth Curtain Lift (reveals the fully initialized hero underneath)
    tl.to(
      containerRef.current,
      {
        yPercent: -100,
        duration: 0.75,
        ease: "power4.inOut",
      },
      0.95
    );

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  if (isRemoved) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#090a0f] pointer-events-auto select-none will-change-transform"
      style={{
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.7)",
      }}
    >
      {/* Center Branding Content */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center text-center px-6 space-y-6"
      >
        {/* Brand Tag */}
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping" />
          <span className="text-xs sm:text-sm font-bold tracking-[0.35em] uppercase text-orange-400/90">
            Winter Collection 2026
          </span>
        </div>

        {/* Master Logo Typography - Big & Impactful */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black italic tracking-tighter text-white uppercase select-none drop-shadow-2xl">
          SNEAKER<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500">HOUSE</span>
        </h1>

        {/* Sleek Progress Bar */}
        <div className="w-64 sm:w-80 h-[3px] bg-white/10 rounded-full overflow-hidden shadow-inner mt-2">
          <div
            ref={progressRef}
            className="h-full bg-gradient-to-r from-orange-500 via-rose-500 to-amber-400 rounded-full"
          />
        </div>
      </div>

      {/* Bottom curved mask trim during slide up */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-b from-transparent to-black/30 pointer-events-none" />
    </div>
  );
}
