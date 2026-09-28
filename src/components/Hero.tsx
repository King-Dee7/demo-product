"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { flushSync } from "react-dom";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
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
  previewThumb: string;
  previewName: string;
  previewPrice: string;
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
    previewThumb: "/images/chat2.png",
    previewName: "Nike Dunk Low",
    previewPrice: "$135.00",
    scale: 1.62,
    y: 15,
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
    previewThumb: "/images/chat3.png",
    previewName: "Air Max Plus",
    previewPrice: "$185.00",
    scale: 1.6,
    y: 15,
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
    previewThumb: "/images/chat4.png",
    previewName: "Adizero Boston",
    previewPrice: "$160.00",
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
    previewThumb: "/images/chat5.png",
    previewName: "Ultraboost Royal",
    previewPrice: "$190.00",
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
    previewThumb: "/images/chat1.png",
    previewName: "Air Max Flyknit",
    previewPrice: "$195.00",
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

  // Dual-slot persistent stage to completely eliminate ghosting and previous shoe traces
  const [activeSlot, setActiveSlot] = useState<1 | 2>(1);
  const [slot1Index, setSlot1Index] = useState(0);
  const [slot2Index, setSlot2Index] = useState(1);
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Autoplay and interactive rotation state
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const AUTOPLAY_DURATION = 3.0;

  const timerTlRef = useRef<gsap.core.Timeline | null>(null);
  const isFirstMountRef = useRef(true);
  const handleNextRef = useRef<() => void>(() => {});

  // References
  const sectionRef = useRef<HTMLElement>(null);
  const bgBaseRef = useRef<HTMLDivElement>(null);
  const bgMorphRef = useRef<HTMLDivElement>(null);
  const bgScrollOverlayRef = useRef<HTMLDivElement>(null);
  const glow1Ref = useRef<HTMLDivElement>(null);
  const glow2Ref = useRef<HTMLDivElement>(null);

  // Scroll wrappers for clean separation between initial load and ScrollTrigger scrub
  const scrollCopyWrapperRef = useRef<HTMLDivElement>(null);
  const scrollSneakerWrapperRef = useRef<HTMLDivElement>(null);
  const scrollRunningFastWrapperRef = useRef<HTMLDivElement>(null);

  const copyRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const miniCardRef = useRef<HTMLDivElement>(null);
  const previewCardRef = useRef<HTMLDivElement>(null);

  const slot1Ref = useRef<HTMLDivElement>(null);
  const slot2Ref = useRef<HTMLDivElement>(null);

  const rightColumnRef = useRef<HTMLDivElement>(null);
  const runningFastRef = useRef<HTMLHeadingElement>(null);

  const currentShoe = HERO_SHOES[displayedIndex];
  const slot1Shoe = HERO_SHOES[slot1Index];
  const slot2Shoe = HERO_SHOES[slot2Index];

  // Preload all sneaker images on mount for immediate zero-lag transitions
  useEffect(() => {
    HERO_SHOES.forEach((shoe) => {
      const img = new window.Image();
      img.src = shoe.image;
      if (shoe.previewThumb) {
        const thumb = new window.Image();
        thumb.src = shoe.previewThumb;
      }
    });

    // Initialize root theme variables
    const initialTheme = HERO_SHOES[0].theme;
    document.documentElement.style.setProperty("--hero-accent", initialTheme.accent);
    document.documentElement.style.setProperty("--hero-accent-light", initialTheme.accentLight);
    document.documentElement.style.setProperty("--hero-arrow-color", initialTheme.arrowHex);
  }, []);

  // ----------------------------------------------------
  // Initial Page Load Layer Reveal Sequence (GSAP Timeline)
  // Focal Sneaker Entrance: exactly 2.0s
  // ----------------------------------------------------
  useEffect(() => {
    if (!sectionRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      gsap.set(
        [
          headlineRef.current,
          descRef.current,
          ctaRef.current,
          slot1Ref.current,
          miniCardRef.current,
          rightColumnRef.current,
          runningFastRef.current,
        ],
        { opacity: 1, x: 0, y: 0, rotation: 0, scale: 1, filter: "none" }
      );
      return;
    }

    const masterTl = gsap.timeline({
      defaults: { ease: "power3.out" },
      delay: 0.1,
    });

    // 1. Initial State Setup
    gsap.set([headlineRef.current, descRef.current, ctaRef.current], {
      y: 35,
      opacity: 0,
      filter: "blur(8px)",
      willChange: "transform, opacity, filter",
    });

    // Slot 1 (initial shoe) begins diagonally offset, scaled ~0.86, rotated -8deg
    gsap.set(slot1Ref.current, {
      display: "flex",
      zIndex: 20,
      x: 160,
      y: 85,
      scale: 0.86,
      rotation: -8,
      opacity: 0,
      filter: "blur(6px)",
      willChange: "transform, opacity, filter",
    });

    // Slot 2 begins completely hidden
    gsap.set(slot2Ref.current, {
      display: "none",
      zIndex: 10,
      opacity: 0,
    });

    gsap.set(miniCardRef.current, {
      y: 28,
      scale: 0.92,
      opacity: 0,
      willChange: "transform, opacity",
    });

    gsap.set(rightColumnRef.current, {
      x: 40,
      opacity: 0,
      willChange: "transform, opacity",
    });

    // Animate only the inner h2, not the wrapper — so ScrollTrigger never bakes opacity:0 on the wrapper
    gsap.set(runningFastRef.current, {
      y: 40,
      opacity: 0,
    });

    // 2. Left Copy Staggered Reveal with blur-to-sharp (0.8s duration)
    masterTl.to(
      [headlineRef.current, descRef.current, ctaRef.current],
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        onComplete: () => {
          gsap.set([headlineRef.current, descRef.current, ctaRef.current], {
            clearProps: "willChange,filter",
          });
        },
      },
      "+=0.1"
    );

    // 3. Focal Sneaker Entrance (EXTENDED TO EXACTLY 2.0s)
    masterTl.to(
      slot1Ref.current,
      {
        x: -15,
        y: -8,
        rotation: 1.8,
        scale: currentShoe.scale * 1.018,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.4,
        ease: "power2.out",
      },
      "-=0.4"
    );

    masterTl.to(
      slot1Ref.current,
      {
        x: 0,
        y: 0,
        rotation: 0,
        scale: currentShoe.scale,
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(slot1Ref.current, {
            clearProps: "willChange,filter",
          });
        },
      }
    );

    // 4. Secondary Cards & Right Column Reveal (0.7s)
    masterTl.to(
      [miniCardRef.current, rightColumnRef.current],
      {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        stagger: 0.14,
        duration: 0.7,
        ease: "power2.out",
        onComplete: () => {
          gsap.set([miniCardRef.current, rightColumnRef.current], {
            clearProps: "willChange",
          });
        },
      },
      "-=0.5"
    );

    // 5. Signature Giant Cutout Typography "RUNNING FAST"
    masterTl.to(
      runningFastRef.current,
      {
        y: 0,
        opacity: 1,
        duration: 1.0,
        ease: "power3.out",
        onComplete: () => {
          gsap.set(runningFastRef.current, { clearProps: "all" });
        },
      },
      "-=0.6"
    );

    return () => {
      masterTl.kill();
    };
  }, []);

  // ----------------------------------------------------
  // Directional Product-to-Product Transitions (GSAP Timeline)
  // Exactly 1.7s total duration
  // Headline & copy enter WITH the incoming shoe in synchronized unison
  // ----------------------------------------------------
  const transitionToShoe = useCallback(
    (newIndex: number, direction: "next" | "prev") => {
      if (isTransitioning) return;
      if (newIndex === displayedIndex) return;

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const targetShoe = HERO_SHOES[newIndex];
      const prevShoe = HERO_SHOES[displayedIndex];

      if (prefersReducedMotion) {
        setDisplayedIndex(newIndex);
        if (activeSlot === 1) {
          setSlot1Index(newIndex);
        } else {
          setSlot2Index(newIndex);
        }
        document.documentElement.style.setProperty("--hero-accent", targetShoe.theme.accent);
        document.documentElement.style.setProperty("--hero-accent-light", targetShoe.theme.accentLight);
        document.documentElement.style.setProperty("--hero-arrow-color", targetShoe.theme.arrowHex);
        return;
      }

      setIsTransitioning(true);

      const outgoingEl = activeSlot === 1 ? slot1Ref.current : slot2Ref.current;
      const incomingEl = activeSlot === 1 ? slot2Ref.current : slot1Ref.current;
      const targetSlotNumber: 1 | 2 = activeSlot === 1 ? 2 : 1;

      // Force synchronous DOM commit of the target shoe into the incoming slot
      flushSync(() => {
        if (targetSlotNumber === 1) {
          setSlot1Index(newIndex);
        } else {
          setSlot2Index(newIndex);
        }
      });

      if (!outgoingEl || !incomingEl) {
        setIsTransitioning(false);
        return;
      }

      const isNext = direction === "next";
      const outX = isNext ? -170 : 170;
      const outRot = isNext ? 8 : -8;
      const inStartX = isNext ? 175 : -175;
      const inStartRot = isNext ? -8 : 8;
      const overshootX = isNext ? -15 : 15;
      const overshootRot = isNext ? 1.8 : -1.8;

      const switchTl = gsap.timeline({
        onComplete: () => {
          setIsTransitioning(false);
          setActiveSlot(targetSlotNumber);

          gsap.set(outgoingEl, {
            display: "none",
            opacity: 0,
            clearProps: "willChange,filter,zIndex",
          });

          gsap.set(incomingEl, {
            zIndex: 20,
            clearProps: "willChange,filter",
          });

          if (bgBaseRef.current) {
            bgBaseRef.current.className = `absolute inset-0 bg-gradient-to-br ${targetShoe.theme.bgGradient}`;
          }
          if (bgMorphRef.current) {
            gsap.set(bgMorphRef.current, { opacity: 0 });
          }
        },
      });

      // 1. Synchronized Palette Morph: begins at t=0, morphs gracefully over 1.1s
      if (bgMorphRef.current) {
        bgMorphRef.current.className = `absolute inset-0 pointer-events-none bg-gradient-to-br ${targetShoe.theme.bgGradient}`;
        switchTl.fromTo(
          bgMorphRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1.1, ease: "power2.inOut" },
          0
        );
      }

      // Smoothly tween glow colors and ambient accents
      if (glow1Ref.current && glow2Ref.current) {
        switchTl.to(
          glow1Ref.current,
          {
            backgroundColor: targetShoe.theme.glow1Color,
            scale: 1.08,
            duration: 0.8,
            ease: "power2.out",
            yoyo: true,
            repeat: 1,
          },
          0
        );
        switchTl.to(
          glow2Ref.current,
          {
            backgroundColor: targetShoe.theme.glow2Color,
            duration: 1.1,
            ease: "power2.out",
          },
          0
        );
      }

      document.documentElement.style.setProperty("--hero-accent", targetShoe.theme.accent);
      document.documentElement.style.setProperty("--hero-accent-light", targetShoe.theme.accentLight);
      document.documentElement.style.setProperty("--hero-arrow-color", targetShoe.theme.arrowHex);

      // 2. Outgoing Sneaker: scales down, rotates, and exits directionally (0.0s - 0.75s)
      gsap.set(outgoingEl, {
        zIndex: 10,
        willChange: "transform, opacity",
      });
      switchTl.to(
        outgoingEl,
        {
          x: outX,
          y: 50,
          scale: prevShoe.scale * 0.85,
          rotation: outRot,
          opacity: 0,
          duration: 0.75,
          ease: "power2.inOut",
        },
        0
      );

      // 3. Incoming Sneaker: sweeping in from opposite side (0.05s - 1.70s)
      gsap.set(incomingEl, {
        display: "flex",
        zIndex: 20,
        x: inStartX,
        y: -35,
        scale: targetShoe.scale * 0.85,
        rotation: inStartRot,
        opacity: 0,
        filter: "blur(5px)",
        willChange: "transform, opacity, filter",
      });

      // Stage A: Deceleration into overshoot (0.05s - 1.20s = 1.15s)
      switchTl.to(
        incomingEl,
        {
          x: overshootX,
          y: 5,
          rotation: overshootRot,
          scale: targetShoe.scale * 1.018,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.15,
          ease: "power2.out",
        },
        0.05
      );

      // Stage B: Soft weighted settle into exact resting center (1.20s - 1.70s = 0.50s)
      switchTl.to(
        incomingEl,
        {
          x: 0,
          y: 0,
          rotation: 0,
          scale: targetShoe.scale,
          duration: 0.5,
          ease: "power2.inOut",
        },
        1.2
      );

      // 4. Headline & Left Copy: Enters WITH the incoming sneaker
      if (headlineRef.current && descRef.current && miniCardRef.current) {
        switchTl.to(
          [headlineRef.current, descRef.current, miniCardRef.current],
          {
            y: isNext ? -15 : 15,
            opacity: 0,
            filter: "blur(5px)",
            duration: 0.22,
            ease: "power2.in",
          },
          0
        );

        switchTl.call(
          () => {
            flushSync(() => {
              setDisplayedIndex(newIndex);
            });
          },
          [],
          0.23
        );

        switchTl.fromTo(
          [headlineRef.current, descRef.current, miniCardRef.current],
          {
            y: isNext ? 24 : -24,
            opacity: 0,
            filter: "blur(6px)",
          },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            stagger: 0.08,
            duration: 1.2,
            ease: "power2.out",
          },
          0.24
        );
      }

      if (previewCardRef.current) {
        switchTl.fromTo(
          previewCardRef.current,
          { opacity: 0.4, scale: 0.96 },
          { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" },
          0.24
        );
      }

    },
    [displayedIndex, activeSlot, isTransitioning]
  );

  const handlePrev = useCallback(() => {
    if (isTransitioning) return;
    const nextIdx = displayedIndex === 0 ? HERO_SHOES.length - 1 : displayedIndex - 1;
    transitionToShoe(nextIdx, "prev");
  }, [displayedIndex, isTransitioning, transitionToShoe]);

  const handleNext = useCallback(() => {
    if (isTransitioning) return;
    const nextIdx = displayedIndex === HERO_SHOES.length - 1 ? 0 : displayedIndex + 1;
    transitionToShoe(nextIdx, "next");
  }, [displayedIndex, isTransitioning, transitionToShoe]);

  useEffect(() => {
    handleNextRef.current = handleNext;
  }, [handleNext]);

  // Autoplay countdown timer for automatic shoe rotation
  useEffect(() => {
    if (isTransitioning) return;

    if (!isPlaying) return;

    // Extra slight buffer on initial page load so entrance animation has time to settle
    const delayDuration = isFirstMountRef.current ? 3.5 : AUTOPLAY_DURATION;
    if (isFirstMountRef.current) {
      isFirstMountRef.current = false;
    }

    const timer = gsap.timeline({
      onComplete: () => {
        handleNextRef.current();
      },
    });

    timer.to({}, { duration: delayDuration });

    // Pause if user is currently hovering or cart is open
    if (isHovered || isCartOpen) {
      timer.pause();
    }

    timerTlRef.current = timer;

    return () => {
      timer.kill();
    };
  }, [displayedIndex, isTransitioning, isPlaying, isCartOpen]);

  // Pause / resume when hovering or when cart opens/closes or when playing state changes
  useEffect(() => {
    if (!timerTlRef.current) return;
    if (isHovered || isCartOpen || !isPlaying) {
      timerTlRef.current.pause();
    } else {
      timerTlRef.current.resume();
    }
  }, [isHovered, isCartOpen, isPlaying]);

  // Handle browser tab switching (pause when backgrounded, resume when active)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!timerTlRef.current) return;
      if (document.hidden) {
        timerTlRef.current.pause();
      } else if (isPlaying && !isHovered && !isCartOpen) {
        timerTlRef.current.resume();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isPlaying, isHovered, isCartOpen]);

  // Keyboard navigation: Left/Right arrows change shoes, Space toggles Play/Pause
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
      } else if (e.key === " " && !e.repeat) {
        const rect = sectionRef.current?.getBoundingClientRect();
        if (rect && rect.top <= window.innerHeight && rect.bottom >= 0) {
          e.preventDefault();
          setIsPlaying((prev) => !prev);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  // ----------------------------------------------------
  // Cinematic Pinned Scroll-Driven Transition (ScrollTrigger)
  // Scrubbed layered handoff into the next section
  // ----------------------------------------------------
  useEffect(() => {
    if (!sectionRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const isMobile = window.innerWidth < 768;
    const shoeTargetX = isMobile ? -50 : -140;
    const shoeTargetY = isMobile ? -140 : -260;
    const shoeScale = isMobile ? 1.07 : 1.14;
    const shoeRot = isMobile ? -1.5 : -2.5;

    // ScrollTrigger Scrub Timeline
    // Pins hero section temporarily, then smoothly hands off to next section
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

    // ----------------------------------------------------
    // 1. Sneaker Diagonal Flight: Continuous, fluid motion
    // Single smooth trajectory across the scroll with zero velocity hitches
    // ----------------------------------------------------
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

    // Fade the shoe only during the final portion (65% to 95%)
    scrollTl.to(
      scrollSneakerWrapperRef.current,
      {
        opacity: 0,
        ease: "power2.in",
        duration: 30,
      },
      65
    );

    // ----------------------------------------------------
    // 2. Left Column Copy: Drifts down/left and fades out
    // ----------------------------------------------------
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

    // ----------------------------------------------------
    // 3. Right Column: Drifts right and fades out
    // ----------------------------------------------------
    if (rightColumnRef.current) {
      scrollTl.to(
        rightColumnRef.current,
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

    // ----------------------------------------------------
    // 4. "RUNNING FAST" Typography: Slides down & fades out
    // ----------------------------------------------------
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

    // ----------------------------------------------------
    // 5. Seamless Background Morph to page background (#fbfcfd)
    // ----------------------------------------------------
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

    // 6. Ambient Glows Fade Out
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

    return () => {
      scrollTl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full text-white pt-24 sm:pt-28 lg:pt-30 pb-0 overflow-hidden min-h-screen"
    >
      {/* ---------------------------------------------------- */}
      {/* Dynamic Background Layers & Continuous Scroll Morph  */}
      {/* ---------------------------------------------------- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Layer A: Base gradient - visible immediately upon first render */}
        <div
          ref={bgBaseRef}
          className={`absolute inset-0 bg-gradient-to-br ${currentShoe.theme.bgGradient}`}
        />

        {/* Layer B: Interpolating Overlay Gradient during shoe-switch */}
        <div ref={bgMorphRef} className="absolute inset-0 opacity-0 pointer-events-none" />

        {/* Layer C: Continuous Scroll Background Morph into Next Section (#ffffff / #fbfcfd) */}
        <div
          ref={bgScrollOverlayRef}
          className="absolute inset-0 bg-gradient-to-b from-[#fbfcfd] to-white opacity-0 pointer-events-none z-[1]"
        />

        {/* Ambient Radial Accent Glows */}
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-10 sm:pt-12 lg:pt-16">
          {/* ---------------------------------------------------- */}
          {/* Left Column: Headlines & CTA (Wrapped for Scrub)     */}
          {/* ---------------------------------------------------- */}
          <div
            ref={scrollCopyWrapperRef}
            className="lg:col-span-4 space-y-5 text-left -mt-8 sm:-mt-10 lg:-mt-12"
          >
            <div ref={copyRef} className="space-y-5">
              <div className="space-y-1">
                <h1
                  ref={headlineRef}
                  className="text-3xl sm:text-[2.75rem] lg:text-[3.25rem] font-bold tracking-tight leading-[1.05] text-white"
                >
                  <span className="whitespace-nowrap">{currentShoe.tagline.split(" ")[0]} collections</span> <br />
                  <span className="text-white/95 font-bold">2026</span>
                </h1>
                <p
                  ref={descRef}
                  className={`${currentShoe.theme.subtext} text-sm sm:text-[15px] leading-relaxed max-w-sm font-medium pt-0.5 transition-colors duration-500`}
                >
                  {currentShoe.desc}
                </p>
              </div>

              <div ref={ctaRef} className="flex flex-wrap items-center gap-4 -mt-2">
                <a
                  href="#collections"
                  className="inline-flex items-center gap-3 bg-transparent border border-white/40 hover:bg-white/10 text-white font-medium text-sm px-5 py-2.5 rounded-full transition-all duration-300 group"
                >
                  <span>Explore more</span>
                  <span
                    className="w-6 h-6 rounded-full bg-white flex items-center justify-center group-hover:translate-x-1 transition-all duration-300 shadow-sm"
                    style={{ color: currentShoe.theme.arrowHex }}
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </a>
              </div>

              {/* Floating Mini Feature Pill */}
              <div
                ref={miniCardRef}
                className="pt-0"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="inline-flex items-start gap-4 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-3 rounded-2xl max-w-xs shadow-lg">
                  <div
                    className="w-16 h-14 rounded-xl p-1 flex items-center justify-center flex-shrink-0 shadow-md transition-all duration-500"
                    style={{ background: currentShoe.theme.pillGradient }}
                  >
                    <Image
                      src={currentShoe.image}
                      alt={currentShoe.name}
                      width={48}
                      height={36}
                      quality={99}
                      priority
                      className="object-contain"
                    />
                  </div>
                  <div className="text-left space-y-1">
                    <h4 className="text-sm font-bold text-white tracking-wide leading-none">
                      {currentShoe.name}
                    </h4>
                    <p
                      className={`text-[10px] ${currentShoe.theme.subtext} leading-snug transition-colors duration-500`}
                    >
                      Play with world-class gear infused with Minion mischief...
                    </p>
                    <button
                      onClick={() =>
                        addToCart({
                          id: `hero-${displayedIndex}`,
                          name: currentShoe.name,
                          price: currentShoe.price,
                          image: currentShoe.image,
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

          {/* ---------------------------------------------------- */}
          {/* Center Column: Flying Sneaker (Elevated z-40 Layer)  */}
          {/* ---------------------------------------------------- */}
          <div className="lg:col-span-5 relative flex items-center justify-center py-2 lg:py-6 z-40 lg:-mt-8">
            {/* Subtle glow behind shoe */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-white/10 filter blur-xl" />
            </div>

            {/* ScrollTrigger Scrub Motion Wrapper */}
            <div
              ref={scrollSneakerWrapperRef}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative w-full max-w-[560px] sm:max-w-[680px] lg:max-w-[820px] aspect-[4/3] flex items-center justify-center select-none transform-gpu will-change-transform"
            >
              {/* Slot 1 Sneaker Container */}
              <div
                ref={slot1Ref}
                className="absolute inset-0 w-full h-full flex items-center justify-center transform-gpu will-change-transform"
              >
                <Image
                  src={slot1Shoe.image}
                  alt={slot1Shoe.name}
                  width={800}
                  height={585}
                  quality={99}
                  priority
                  className="w-full h-auto object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.35)]"
                />
              </div>

              {/* Slot 2 Sneaker Container */}
              <div
                ref={slot2Ref}
                className="absolute inset-0 w-full h-full hidden items-center justify-center transform-gpu will-change-transform"
              >
                <Image
                  src={slot2Shoe.image}
                  alt={slot2Shoe.name}
                  width={800}
                  height={585}
                  quality={99}
                  priority
                  className="w-full h-auto object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.35)]"
                />
              </div>
            </div>
          </div>

          {/* ---------------------------------------------------- */}
          {/* Right Column: Preview Thumbnail & Slider Controls   */}
          {/* ---------------------------------------------------- */}
          <div
            ref={rightColumnRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="lg:col-span-3 flex lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-3 sm:gap-4 z-20"
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
                  src={currentShoe.previewThumb}
                  alt={currentShoe.previewName}
                  width={140}
                  height={90}
                  quality={99}
                  className="object-contain group-hover/card:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-white">{currentShoe.previewName}</h4>
                  <span
                    className={`text-[11px] font-semibold ${currentShoe.theme.accentLight} transition-colors duration-500`}
                  >
                    {currentShoe.previewPrice}
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

      {/* ---------------------------------------------------- */}
      {/* Signature Element: Massive Cutout Typography         */}
      {/* ---------------------------------------------------- */}
      <div
        ref={scrollRunningFastWrapperRef}
        className="absolute bottom-6 left-0 right-0 w-full select-none pointer-events-none z-0 flex justify-center items-end"
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
