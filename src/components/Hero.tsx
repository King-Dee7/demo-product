"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroShoe {
  name: string;
  tagline: string;
  desc: string;
  price: number;
  image: string;
  scale: number;
  y: number;
  theme: {
    bgGradient: string;
    bgFrom: string;
    bgVia: string;
    bgTo: string;
    glow1Color: string;
    glow2Color: string;
    accent: string;
    accentLight: string;
    arrowColor: string;
    arrowHex: string;
    pillGradient: string;
    subtext: string;
    buttonBg: string;
    buttonHex: string;
  };
}

const HERO_SHOES: HeroShoe[] = [
  {
    name: "Nike Air Max Flyknit",
    tagline: "Winter collections 2026",
    desc: "Explore our new winter shoe collection, designed for warmth, comfort, and style on chilly days.",
    price: 195.0,
    image: "/images/chat1.png",
    scale: 1.62,
    y: 10,
    theme: {
      bgGradient: "from-[#570e0e] via-[#991b1b] to-[#c2410c]",
      bgFrom: "#570e0e",
      bgVia: "#991b1b",
      bgTo: "#c2410c",
      glow1Color: "rgba(249, 115, 22, 0.28)",
      glow2Color: "rgba(244, 63, 94, 0.22)",
      accent: "#ea580c",
      accentLight: "text-orange-400",
      arrowColor: "text-orange-700",
      arrowHex: "#c2410c",
      pillGradient: "linear-gradient(135deg, #fbbf24 0%, #dc2626 100%)",
      subtext: "text-orange-100/90",
      buttonBg: "bg-orange-600 hover:bg-orange-700",
      buttonHex: "#ea580c",
    },
  },
  {
    name: "Nike Dunk Low Retro",
    tagline: "Vintage Court 2026",
    desc: "Iconic pine green leather overlays meet classic court comfort in this timeless staple.",
    price: 135.0,
    image: "/images/chat2.png",
    scale: 1.6,
    y: 10,
    theme: {
      bgGradient: "from-[#063f27] via-[#0d6e43] to-[#15803d]",
      bgFrom: "#063f27",
      bgVia: "#0d6e43",
      bgTo: "#15803d",
      glow1Color: "rgba(52, 211, 153, 0.28)",
      glow2Color: "rgba(163, 230, 53, 0.18)",
      accent: "#10b981",
      accentLight: "text-emerald-400",
      arrowColor: "text-emerald-800",
      arrowHex: "#166534",
      pillGradient: "linear-gradient(135deg, #6ee7b7 0%, #16a34a 100%)",
      subtext: "text-emerald-100/90",
      buttonBg: "bg-emerald-600 hover:bg-emerald-700",
      buttonHex: "#10b981",
    },
  },
  {
    name: "Nike Air Max Plus",
    tagline: "Tuned Air Aqua",
    desc: "Gradient aqua sunset veins paired with revolutionary dual-pressure Tuned Air cushioning.",
    price: 185.0,
    image: "/images/chat3.png",
    scale: 1.25,
    y: 5,
    theme: {
      bgGradient: "from-[#042836] via-[#085a6f] to-[#0284c7]",
      bgFrom: "#042836",
      bgVia: "#085a6f",
      bgTo: "#0284c7",
      glow1Color: "rgba(34, 211, 238, 0.32)",
      glow2Color: "rgba(45, 212, 191, 0.22)",
      accent: "#06b6d4",
      accentLight: "text-cyan-400",
      arrowColor: "text-cyan-800",
      arrowHex: "#155e75",
      pillGradient: "linear-gradient(135deg, #22d3ee 0%, #14b8a6 100%)",
      subtext: "text-cyan-100/90",
      buttonBg: "bg-cyan-600 hover:bg-cyan-700",
      buttonHex: "#06b6d4",
    },
  },
  {
    name: "Adidas Adizero Boston",
    tagline: "Pro Series 2026",
    desc: "Lightstrike Pro foam engineered with fiberglass Energyrods for snappy, race-day momentum.",
    price: 160.0,
    image: "/images/chat4.png",
    scale: 1.45,
    y: 5,
    theme: {
      bgGradient: "from-[#450716] via-[#751128] to-[#9f1239]",
      bgFrom: "#450716",
      bgVia: "#751128",
      bgTo: "#9f1239",
      glow1Color: "rgba(244, 63, 94, 0.28)",
      glow2Color: "rgba(244, 114, 182, 0.18)",
      accent: "#e11d48",
      accentLight: "text-rose-400",
      arrowColor: "text-rose-800",
      arrowHex: "#9f1239",
      pillGradient: "linear-gradient(135deg, #fb7185 0%, #b91c1c 100%)",
      subtext: "text-rose-100/90",
      buttonBg: "bg-rose-600 hover:bg-rose-700",
      buttonHex: "#e11d48",
    },
  },
  {
    name: "Adidas Ultraboost Light",
    tagline: "Energy Return 2026",
    desc: "Epic energy with 30% lighter Boost material, finished with vivid royal blue racing stripes.",
    price: 190.0,
    image: "/images/chat5.png",
    scale: 1.45,
    y: 5,
    theme: {
      bgGradient: "from-[#0e33b5] via-[#1849e8] to-[#2563eb]",
      bgFrom: "#0e33b5",
      bgVia: "#1849e8",
      bgTo: "#2563eb",
      glow1Color: "rgba(96, 165, 250, 0.28)",
      glow2Color: "rgba(34, 211, 238, 0.18)",
      accent: "#2563eb",
      accentLight: "text-blue-400",
      arrowColor: "text-blue-700",
      arrowHex: "#1d4ed8",
      pillGradient: "linear-gradient(135deg, #93c5fd 0%, #3b82f6 100%)",
      subtext: "text-blue-100/80",
      buttonBg: "bg-blue-600 hover:bg-blue-700",
      buttonHex: "#2563eb",
    },
  },
];

export default function Hero() {
  const { addToCart, isOpen: isCartOpen } = useCart();

  const [displayIndex, setDisplayIndex] = useState(0);
  const [copyIndex, setCopyIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isTabHidden, setIsTabHidden] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const isFirstMountRef = useRef(true);

  // References
  const sectionRef = useRef<HTMLElement>(null);
  const bgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const shoeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const glow1Ref = useRef<HTMLDivElement>(null);
  const glow2Ref = useRef<HTMLDivElement>(null);
  const bgScrollOverlayRef = useRef<HTMLDivElement>(null);

  // Scroll wrappers for ScrollTrigger scrub
  const scrollCopyWrapperRef = useRef<HTMLDivElement>(null);
  const scrollSneakerWrapperRef = useRef<HTMLDivElement>(null);
  const scrollRightWrapperRef = useRef<HTMLDivElement>(null);
  const scrollRunningFastWrapperRef = useRef<HTMLHeadingElement>(null);

  const copyRef = useRef<HTMLDivElement>(null);
  const previewCardRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const runningFastRef = useRef<HTMLHeadingElement>(null);

  const activeTimeline = useRef<gsap.core.Timeline | null>(null);

  const currentShoe = HERO_SHOES[displayIndex];
  const copyShoe = HERO_SHOES[copyIndex];
  const nextShoeIndex = (displayIndex + 1) % HERO_SHOES.length;
  const nextShoe = HERO_SHOES[nextShoeIndex];

  // Set theme properties on initial mount and complete entrance after 3.5s
  useEffect(() => {
    const initialTheme = HERO_SHOES[0].theme;
    document.documentElement.style.setProperty("--hero-accent", initialTheme.accent);
    document.documentElement.style.setProperty("--hero-accent-light", initialTheme.accentLight);
    document.documentElement.style.setProperty("--hero-arrow-color", initialTheme.arrowHex);

    const entranceTimer = setTimeout(() => {
      setHasEntered(true);
    }, 3500);

    return () => {
      clearTimeout(entranceTimer);
      activeTimeline.current?.kill();
    };
  }, []);

  // Smooth directional shoe transition
  const goToShoe = useCallback(
    (targetIndex: number, dir: "next" | "prev") => {
      if (isTransitioning || targetIndex === displayIndex) return;

      const currentEl = shoeRefs.current[displayIndex];
      const targetEl = shoeRefs.current[targetIndex];
      if (!currentEl || !targetEl) return;

      setHasEntered(true);
      setIsTransitioning(true);

      const isNext = dir === "next";
      const targetShoe = HERO_SHOES[targetIndex];
      const prevShoe = HERO_SHOES[displayIndex];

      const outX = isNext ? -140 : 140;
      const inStartX = isNext ? 140 : -140;
      const outRot = isNext ? 5 : -5;
      const inStartRot = isNext ? -5 : 5;

      gsap.killTweensOf(currentEl);
      gsap.killTweensOf(targetEl);

      // Prepare target shoe
      gsap.set(targetEl, {
        x: inStartX,
        y: targetShoe.y - 10,
        scale: targetShoe.scale * 0.88,
        rotation: inStartRot,
        opacity: 0,
        zIndex: 20,
        pointerEvents: "none",
      });
      gsap.set(currentEl, {
        zIndex: 10,
        pointerEvents: "none",
      });

      const tl = gsap.timeline({
        onComplete: () => {
          setDisplayIndex(targetIndex);
          setIsTransitioning(false);

          gsap.set(targetEl, {
            x: 0,
            y: targetShoe.y,
            scale: targetShoe.scale,
            rotation: 0,
            opacity: 1,
            zIndex: 10,
            pointerEvents: "auto",
          });
          gsap.set(currentEl, {
            opacity: 0,
            zIndex: 0,
            pointerEvents: "none",
          });
        },
      });
      activeTimeline.current = tl;

      // 1. Background gradients crossfade
      const currentBg = bgRefs.current[displayIndex];
      const targetBg = bgRefs.current[targetIndex];
      if (targetBg) {
        tl.to(targetBg, { opacity: 1, duration: 0.65, ease: "power2.inOut" }, 0);
      }
      if (currentBg) {
        tl.to(currentBg, { opacity: 0, duration: 0.65, ease: "power2.inOut" }, 0);
      }

      // 2. Glow colors
      if (glow1Ref.current && glow2Ref.current) {
        tl.to(glow1Ref.current, { backgroundColor: targetShoe.theme.glow1Color, duration: 0.65, ease: "power2.out" }, 0);
        tl.to(glow2Ref.current, { backgroundColor: targetShoe.theme.glow2Color, duration: 0.65, ease: "power2.out" }, 0);
      }

      // 3. Outgoing Sneaker glides out
      tl.to(
        currentEl,
        {
          x: outX,
          y: prevShoe.y + 15,
          scale: prevShoe.scale * 0.88,
          rotation: outRot,
          opacity: 0,
          duration: 0.6,
          ease: "power2.inOut",
        },
        0
      );

      // 4. Incoming Sneaker sweeps in
      tl.to(
        targetEl,
        {
          x: 0,
          y: targetShoe.y,
          scale: targetShoe.scale,
          rotation: 0,
          opacity: 1,
          duration: 0.65,
          ease: "power2.out",
        },
        0.03
      );

      // 5. Left Copy Soft Crossfade: fades out, updates text, fades in
      if (copyRef.current) {
        tl.to(
          copyRef.current,
          { opacity: 0.15, y: isNext ? -6 : 6, duration: 0.22, ease: "power2.in" },
          0
        );
        tl.call(
          () => {
            setCopyIndex(targetIndex);
          },
          [],
          0.23
        );
        tl.to(
          copyRef.current,
          { opacity: 1, y: 0, duration: 0.38, ease: "power2.out" },
          0.24
        );
      }

      // 6. Preview Card Soft Update
      if (previewCardRef.current) {
        tl.fromTo(
          previewCardRef.current,
          { scale: 0.96, opacity: 0.7 },
          { scale: 1, opacity: 1, duration: 0.45, ease: "power2.out" },
          0.1
        );
      }

      // 7. Update Accent CSS variables
      document.documentElement.style.setProperty("--hero-accent", targetShoe.theme.accent);
      document.documentElement.style.setProperty("--hero-accent-light", targetShoe.theme.accentLight);
      document.documentElement.style.setProperty("--hero-arrow-color", targetShoe.theme.arrowHex);
    },
    [displayIndex, isTransitioning]
  );

  const handlePrev = useCallback(() => {
    if (isTransitioning) return;
    const prevIdx = displayIndex === 0 ? HERO_SHOES.length - 1 : displayIndex - 1;
    goToShoe(prevIdx, "prev");
  }, [displayIndex, isTransitioning, goToShoe]);

  const handleNext = useCallback(() => {
    if (isTransitioning) return;
    const nextIdx = (displayIndex + 1) % HERO_SHOES.length;
    goToShoe(nextIdx, "next");
  }, [displayIndex, isTransitioning, goToShoe]);

  // Autoplay: continuously rotates shoe every 5 seconds (buffered on first load for cinematic sequence)
  useEffect(() => {
    if (isTransitioning || isCartOpen || isTabHidden) return;

    const delay = isFirstMountRef.current ? 8000 : 5000;
    if (isFirstMountRef.current) {
      isFirstMountRef.current = false;
    }

    const timer = setTimeout(() => {
      handleNext();
    }, delay);

    return () => clearTimeout(timer);
  }, [displayIndex, isTransitioning, isCartOpen, isTabHidden, handleNext]);

  // Tab visibility listener
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabHidden(document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  // Early scroll/touch/wheel listener: if user interacts before 3.5s entrance finishes,
  // complete entrance immediately so ScrollTrigger and pinning activate without delay.
  useEffect(() => {
    if (hasEntered) return;
    const triggerEntranceComplete = () => {
      setHasEntered(true);
    };
    window.addEventListener("scroll", triggerEntranceComplete, { passive: true, once: true });
    window.addEventListener("wheel", triggerEntranceComplete, { passive: true, once: true });
    window.addEventListener("touchmove", triggerEntranceComplete, { passive: true, once: true });
    return () => {
      window.removeEventListener("scroll", triggerEntranceComplete);
      window.removeEventListener("wheel", triggerEntranceComplete);
      window.removeEventListener("touchmove", triggerEntranceComplete);
    };
  }, [hasEntered]);

  // ScrollTrigger scrub animation - deferred until entrance completes to prevent pin-spacer DOM reparenting from resetting CSS animations
  useEffect(() => {
    if (!hasEntered || !sectionRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const isMobile = window.innerWidth < 768;
    const shoeTargetX = isMobile ? -50 : -140;
    const shoeTargetY = isMobile ? -140 : -260;
    const shoeScale = isMobile ? 1.07 : 1.14;
    const shoeRot = isMobile ? -1.5 : -2.5;

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=135%",
        pin: true,
        pinSpacing: true,
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
    });

    scrollTl.to(
      scrollSneakerWrapperRef.current,
      {
        x: shoeTargetX * 1.15,
        y: shoeTargetY * 1.15,
        scale: shoeScale,
        rotation: shoeRot,
        ease: "power1.out",
        duration: 100,
        force3D: true,
      },
      0
    );

    scrollTl.to(
      scrollSneakerWrapperRef.current,
      {
        opacity: 0,
        ease: "power2.in",
        duration: 30,
      },
      65
    );

    scrollTl.to(
      scrollCopyWrapperRef.current,
      {
        x: isMobile ? -25 : -50,
        y: 18,
        opacity: 0,
        ease: "power1.out",
        duration: 40,
      },
      5
    );

    if (scrollRightWrapperRef.current) {
      scrollTl.fromTo(
        scrollRightWrapperRef.current,
        { x: 0, y: 0, opacity: 1 },
        {
          x: 40,
          y: -15,
          opacity: 0,
          ease: "power1.out",
          duration: 35,
        },
        5
      );
    }

    if (scrollRunningFastWrapperRef.current) {
      scrollTl.fromTo(
        scrollRunningFastWrapperRef.current,
        { y: 0, opacity: 1 },
        {
          y: 40,
          opacity: 0,
          duration: 35,
          ease: "power1.out",
        },
        5
      );
    }

    if (bgScrollOverlayRef.current) {
      scrollTl.to(
        bgScrollOverlayRef.current,
        {
          opacity: 1,
          duration: 60,
          ease: "power1.inOut",
        },
        20
      );
    }

    if (glow1Ref.current && glow2Ref.current) {
      scrollTl.to(
        [glow1Ref.current, glow2Ref.current],
        {
          opacity: 0,
          scale: 0.85,
          duration: 35,
          ease: "power1.out",
        },
        15
      );
    }

    ScrollTrigger.refresh();

    return () => {
      scrollTl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [hasEntered]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full text-white pt-24 sm:pt-28 lg:pt-30 pb-0 overflow-x-clip min-h-screen"
    >
      {/* Dynamic Background Layers: 5 persistent layers for zero-flash crossfade */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {HERO_SHOES.map((shoe, idx) => (
          <div
            key={`bg-${shoe.name}`}
            ref={(el) => {
              bgRefs.current[idx] = el;
            }}
            style={{ opacity: idx === 0 ? 1 : 0 }}
            className={`absolute inset-0 bg-gradient-to-br ${shoe.theme.bgGradient} pointer-events-none`}
          />
        ))}

        <div
          ref={bgScrollOverlayRef}
          className="absolute inset-0 bg-gradient-to-b from-[#fbfcfd] to-white opacity-0 pointer-events-none z-[1]"
        />

        <div
          ref={glow1Ref}
          style={{ backgroundColor: currentShoe.theme.glow1Color }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[600px] sm:h-[900px] rounded-full blur-3xl transition-colors duration-700 pointer-events-none z-[2]"
        />
        <div
          ref={glow2Ref}
          style={{ backgroundColor: currentShoe.theme.glow2Color }}
          className="absolute top-10 right-10 w-96 h-96 rounded-full blur-2xl transition-colors duration-700 pointer-events-none z-[2]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pb-28 sm:pb-32 lg:pb-36">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start pt-8 sm:pt-10 lg:pt-16">
          {/* Left Column: Headlines & CTA */}
          <div
            ref={scrollCopyWrapperRef}
            className="md:col-span-4 space-y-5 text-left -mt-6 sm:-mt-8 lg:-mt-12"
          >
            <div ref={copyRef} className={`space-y-5 ${!hasEntered ? "animate-entrance-copy" : ""}`}>
              <div className="space-y-1">
                <h1 className="text-3xl sm:text-[2.75rem] lg:text-[3.25rem] font-bold tracking-tight leading-[1.05] text-white">
                  <span className="whitespace-nowrap">{copyShoe.tagline.split(" ")[0]} collections</span> <br />
                  <span className="text-white/95 font-bold">2026</span>
                </h1>
                <p
                  className={`${copyShoe.theme.subtext} text-sm sm:text-[15px] leading-relaxed max-w-sm font-medium pt-0.5 transition-colors duration-500`}
                >
                  {copyShoe.desc}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 -mt-2">
                <a
                  href="#collections"
                  className="inline-flex items-center gap-3 bg-transparent border border-white/40 hover:bg-white/10 text-white font-medium text-sm px-5 py-2.5 rounded-full transition-all duration-300 group"
                >
                  <span>Explore more</span>
                  <span
                    className="w-6 h-6 rounded-full bg-white flex items-center justify-center group-hover:translate-x-1 transition-all duration-300 shadow-sm"
                    style={{ color: copyShoe.theme.arrowHex }}
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </a>
              </div>

              {/* Floating Mini Feature Pill */}
              <div className={`pt-0 ${!hasEntered ? "animate-entrance-pill" : ""}`}>
                <div className="inline-flex items-start gap-4 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-3 rounded-2xl max-w-xs shadow-lg">
                  <div
                    className="w-16 h-14 rounded-xl p-1 flex items-center justify-center flex-shrink-0 shadow-md transition-all duration-500"
                    style={{ background: copyShoe.theme.pillGradient }}
                  >
                    <Image
                      src={copyShoe.image}
                      alt={copyShoe.name}
                      width={48}
                      height={36}
                      quality={90}
                      priority
                      className="object-contain"
                    />
                  </div>
                  <div className="text-left space-y-1">
                    <h4 className="text-sm font-bold text-white tracking-wide leading-none">
                      {copyShoe.name}
                    </h4>
                    <p
                      className={`text-[10px] ${copyShoe.theme.subtext} leading-snug transition-colors duration-500`}
                    >
                      Play with world-class gear infused with Minion mischief...
                    </p>
                    <button
                      onClick={() =>
                        addToCart({
                          id: `hero-${copyIndex}`,
                          name: copyShoe.name,
                          price: copyShoe.price,
                          image: copyShoe.image,
                          size: "US 10.5",
                        })
                      }
                      className="text-[10px] font-semibold text-white/90 hover:text-white flex items-center gap-1 group/quick pt-1 transition-colors"
                    >
                      <span className="border-b border-white/30 group-hover/quick:border-white transition-colors">
                        Quick View
                      </span>
                      <ArrowRight className="w-3 h-3 group-hover/quick:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Center Column: Flying Sneaker */}
          <div className="md:col-span-5 relative flex items-center justify-center py-2 lg:py-6 z-30 lg:-mt-8">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-white/10 filter blur-xl" />
            </div>

            <div
              ref={scrollSneakerWrapperRef}
              onClick={handleNext}
              className="relative w-full max-w-[560px] sm:max-w-[680px] lg:max-w-[820px] aspect-[4/3] flex items-center justify-center select-none transform-gpu will-change-transform cursor-pointer"
              title="Click sneaker to view next drop"
            >
              {/* Continuous floating animation wrapper (never unmounts or resets on transition) */}
              <div className="relative w-full h-full flex items-center justify-center animate-hero-float">
                {HERO_SHOES.map((shoe, idx) => (
                  <div
                    key={shoe.name}
                    ref={(el) => {
                      shoeRefs.current[idx] = el;
                    }}
                    style={{
                      transform: `translate3d(0, ${shoe.y}px, 0) scale(${shoe.scale})`,
                      opacity: idx === 0 ? 1 : 0,
                      pointerEvents: idx === 0 ? "auto" : "none",
                      zIndex: idx === 0 ? 10 : 0,
                    }}
                    className={`absolute inset-0 w-full h-full flex items-center justify-center transform-gpu will-change-transform ${
                      !hasEntered && idx === 0 ? "animate-entrance-sneaker" : ""
                    }`}
                  >
                    <Image
                      src={shoe.image}
                      alt={shoe.name}
                      width={800}
                      height={585}
                      quality={90}
                      priority={idx === 0}
                      className="w-full h-auto object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.35)]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Preview Thumbnail & Slider Controls */}
          <div
            ref={scrollRightWrapperRef}
            className="md:col-span-3 flex md:flex-col items-center md:items-end justify-between md:justify-center gap-3 sm:gap-4 z-40 relative md:left-6 lg:left-8"
          >
            <div
              ref={rightColumnRef}
              className={`w-full flex flex-col items-center md:items-end gap-3 sm:gap-4 ${
                !hasEntered ? "animate-entrance-right" : ""
              }`}
            >
              {/* Slider Navigation Buttons (Top) */}
            <div className="flex items-center gap-3 pt-2 w-full lg:justify-end mb-1">
              <span className="text-sm font-semibold text-white mr-2 hidden sm:inline">
                Our New Arrival
              </span>
              <button
                onClick={handlePrev}
                disabled={isTransitioning}
                className="w-8 h-8 rounded-full bg-transparent hover:bg-white/10 border border-white/40 text-white flex items-center justify-center transition disabled:opacity-50"
                aria-label="Previous drop"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                disabled={isTransitioning}
                className="w-8 h-8 rounded-full bg-transparent hover:bg-white/10 border border-white/40 text-white flex items-center justify-center transition shadow-lg disabled:opacity-50"
                aria-label="Next drop"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Top Right Preview Card (Dark variant - clickable to switch shoe) */}
            <div
              ref={previewCardRef}
              onClick={handleNext}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleNext();
                }
              }}
              className="bg-[#111111] text-white rounded-3xl p-3 sm:p-4 shadow-2xl border border-white/10 hover:border-white/30 max-w-[210px] w-full transition-all duration-300 cursor-pointer hover:scale-[1.02] group/card select-none"
              title="Click to switch to next sneaker"
            >
              <div className="relative w-full h-24 bg-neutral-100 rounded-2xl flex items-center justify-center overflow-hidden mb-2">
                <Image
                  src={nextShoe.image}
                  alt={nextShoe.name}
                  width={140}
                  height={90}
                  quality={90}
                  className="object-contain group-hover/card:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-white">{nextShoe.name}</h4>
                  <span
                    className={`text-[11px] font-semibold ${currentShoe.theme.accentLight} transition-colors duration-500`}
                  >
                    ${nextShoe.price.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  disabled={isTransitioning}
                  style={{ backgroundColor: currentShoe.theme.buttonHex }}
                  className="px-2.5 py-1 text-white rounded-full text-[10px] font-semibold transition-all duration-300 shadow-sm hover:brightness-110 active:scale-95 disabled:opacity-50"
                >
                  View
                </button>
              </div>
            </div>

            {/* Slider Navigation Buttons (Bottom) */}
            <div className="flex items-center gap-2 pt-1">
              <span
                className={`text-xs font-semibold ${currentShoe.theme.subtext} mr-2 hidden sm:inline transition-colors duration-500`}
              >
                Top Rated Drop
              </span>
              <button
                onClick={handlePrev}
                disabled={isTransitioning}
                className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/35 border border-white/30 text-white flex items-center justify-center transition disabled:opacity-50"
                aria-label="Previous drop"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                disabled={isTransitioning}
                style={{ color: currentShoe.theme.arrowHex }}
                className="w-9 h-9 rounded-full bg-white hover:bg-white/95 flex items-center justify-center transition shadow-lg disabled:opacity-50 active:scale-95"
                aria-label="Next drop"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

      {/* Signature Element: Massive Cutout Typography */}
      <div
        ref={scrollRunningFastWrapperRef}
        className={`absolute bottom-6 left-0 right-0 w-full select-none pointer-events-none z-0 flex justify-center items-end ${
          !hasEntered ? "animate-entrance-title" : ""
        }`}
      >
        <h2
          ref={runningFastRef}
          className="text-[15.5vw] sm:text-[15.8vw] lg:text-[16.2vw] font-black tracking-tighter uppercase leading-[0.72] text-center text-white whitespace-nowrap"
        >
          RUNNING FAST
        </h2>
      </div>
    </section>
  );
}
