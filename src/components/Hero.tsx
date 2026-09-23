"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";

const FLAVORS = [
  {
    id: 'plasma-shock',
    name: 'PLASMA SHOCK',
    image: '/blue.png',
    title: 'HARNESS THE ENERGY OF PURE PLASMA',
    desc: 'A BURST OF ELECTRIC CITRUS AND BLUE RASPBERRY WILL IGNITE YOUR SENSES AND FUEL YOUR CORE FOR PEAK PERFORMANCE.',
    color: '#00d2ff',
    scale: 1
  },
  {
    id: 'titan-burn',
    name: 'TITAN BURN',
    image: '/orrange.png',
    title: 'MOLTEN ENERGY FOR LIMITLESS POWER',
    desc: 'FEEL THE HEAT WITH TITAN BURN, A FIERY EXPLOSION OF BLOOD ORANGE, CHILI, AND DRAGONFRUIT.',
    color: '#ff4d00',
    scale: 1
  },
  {
    id: 'nebula-berry',
    name: 'NEBULA BERRY',
    image: '/cherry.png',
    title: 'ENERGY BEYOND THE STARS',
    desc: 'UNLOCK THE INFINITE WITH NEBULA BERRY, A COSMIC BLEND OF BLUEBERRY, ACAI, AND THE MYSTERIOUS SPACEFRUIT.',
    color: '#a300ff',
    scale: 1.25
  },
  {
    id: 'quantum-fuel',
    name: 'QUANTUM FUEL',
    image: '/lime.png',
    title: 'CHARGED FOR THE NEXT LEVEL',
    desc: 'FUEL YOUR FUTURE WITH QUANTUM FUEL. A CLEAN AND REFRESHING COMBINATION OF LIME, MINT, AND OUR SIGNATURE QUANTUM ENERGY HERB.',
    color: '#00ff4d',
    scale: 1.25
  }
];

export default function Hero() {
  const [activeFlavor, setActiveFlavor] = useState(FLAVORS[0]);
  const [hasEntered, setHasEntered] = useState(false);

  const currentIndex = FLAVORS.findIndex(f => f.id === activeFlavor.id);

  const handlePrevFlavor = () => {
    const nextIdx = (currentIndex - 1 + FLAVORS.length) % FLAVORS.length;
    setActiveFlavor(FLAVORS[nextIdx]);
  };

  const handleNextFlavor = () => {
    const nextIdx = (currentIndex + 1) % FLAVORS.length;
    setActiveFlavor(FLAVORS[nextIdx]);
  };

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const bgX = useTransform(smoothX, [-0.5, 0.5], [8, -8]);
  const bgY = useTransform(smoothY, [-0.5, 0.5], [8, -8]);

  const prodX = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const prodY = useTransform(smoothY, [-0.5, 0.5], [-12, 12]);
  const prodRotateX = useTransform(smoothY, [-0.5, 0.5], [6, -6]);
  const prodRotateY = useTransform(smoothX, [-0.5, 0.5], [-6, 6]);

  const handleProductMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleProductMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasEntered(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className="relative w-full h-full flex items-center justify-center overflow-hidden font-sans select-none"
    >
      {/* Background Image & Vignette */}
      <motion.div
        initial={{ opacity: 0, scale: 1.15 }}
        animate={{ opacity: 1, scale: 1.05 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ x: bgX, y: bgY }}
      >
        <Image 
          src="/Background.png" 
          alt="Cosmic space environment" 
          fill 
          className="object-cover object-center" 
          priority 
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] opacity-80" />
      </motion.div>

      {/* Large faint background flavor name */}
      <motion.div 
        className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none overflow-hidden"
        style={{ x: bgX, y: bgY }}
      >
        <AnimatePresence mode="wait">
          <motion.h1 
            key={activeFlavor.id}
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
            className="text-[22vw] md:text-[15vw] font-black uppercase whitespace-nowrap tracking-tighter text-white"
          >
            {activeFlavor.name.split(' ')[0]}
          </motion.h1>
        </AnimatePresence>
      </motion.div>

      {/* Navigation Bar */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute top-0 left-0 right-0 px-5 py-4 md:p-8 flex justify-between items-center z-30 text-[10px] tracking-widest font-bold uppercase"
      >
        <div className="flex items-center gap-4 md:gap-8">
          <div className="text-lg md:text-xl tracking-tighter text-white">ZERO <span className="opacity-50">POINT</span></div>
          <div className="text-gray-400 hidden sm:block">ZERO SUGAR • ZERO LIMITS</div>
        </div>
        <div className="flex gap-4 md:gap-8 text-[9px] md:text-[10px]">
          <a href="#" className="text-gray-400 hover:text-white transition-colors">ABOUT</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">FLAVORS</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">CONTACT</a>
        </div>
      </motion.nav>

      {/* ========================================================
          DESKTOP VIEW (Visible on md screens and larger: >= 768px)
         ======================================================== */}
      {/* Desktop Centered Can */}
      <div className="hidden md:flex absolute z-10 items-center justify-center">
        <motion.div 
          style={{ 
            x: prodX, 
            y: prodY, 
            rotateX: prodRotateX, 
            rotateY: prodRotateY, 
            transformPerspective: 1000 
          }}
          onMouseMove={handleProductMouseMove}
          onMouseLeave={handleProductMouseLeave}
          className="pointer-events-auto cursor-pointer"
        >
          <motion.div
            animate={hasEntered ? { y: [0, -3.5, 0] } : {}}
            transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut" }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFlavor.id}
                initial={{ opacity: 0, scale: (activeFlavor.scale ?? 1) * 0.85, y: 50 }}
                animate={{ opacity: 1, scale: activeFlavor.scale ?? 1, y: 0 }}
                exit={{ opacity: 0, scale: (activeFlavor.scale ?? 1) * 0.9, y: -30 }}
                transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
                className="relative w-[340px] h-[480px] lg:w-[480px] lg:h-[680px]"
              >
                <Image 
                  src={activeFlavor.image}
                  alt={activeFlavor.name}
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>

      {/* Desktop Left Column (Headline, CTA, Flavor selector) */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        className="hidden md:flex absolute left-8 lg:left-16 top-1/2 -translate-y-1/2 z-20 flex-col justify-between h-[60vh]"
      >
        <div className="max-w-[200px]">
          <AnimatePresence mode="wait">
            <motion.p 
              key={activeFlavor.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-[10px] font-bold tracking-widest leading-relaxed mb-6 uppercase text-gray-300 h-12"
            >
              {activeFlavor.title}
            </motion.p>
          </AnimatePresence>
          <div className="text-gray-500 tracking-[0.3em] text-[10px] mb-6">{">>>>>>>>"}</div>
          <button 
            className="px-6 py-3 text-[10px] font-bold text-black uppercase transition-all hover:scale-105 cursor-pointer"
            style={{ backgroundColor: activeFlavor.color }}
          >
            ORDER TODAY
          </button>
        </div>

        <div className="flex flex-col gap-6">
          {FLAVORS.map(flavor => (
            <button 
              key={flavor.id}
              onClick={() => setActiveFlavor(flavor)}
              className={`text-[10px] font-bold tracking-widest text-left uppercase transition-all duration-300 flex items-center gap-4 cursor-pointer ${
                activeFlavor.id === flavor.id ? "text-white" : "text-gray-600 hover:text-gray-400"
              }`}
            >
              <div 
                className={`h-[1px] transition-all duration-300 ${activeFlavor.id === flavor.id ? "w-4" : "w-0"}`} 
                style={{ backgroundColor: flavor.color }}
              />
              {flavor.name}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Desktop Right Column (Description) */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        className="hidden md:block absolute right-8 lg:right-16 top-1/2 -translate-y-1/2 z-20"
      >
        <div className="max-w-[220px]">
          <AnimatePresence mode="wait">
            <motion.p 
              key={activeFlavor.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-[10px] font-bold tracking-widest leading-[1.8] uppercase text-gray-400 text-right"
            >
              {activeFlavor.desc}
            </motion.p>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Desktop Footer Socials */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="hidden md:flex absolute bottom-8 right-8 lg:right-16 z-20 gap-6 text-[10px] font-bold tracking-widest"
      >
        <a href="#" className="text-gray-500 hover:text-white transition-colors">FB</a>
        <a href="#" className="text-gray-500 hover:text-white transition-colors">IG</a>
        <a href="#" className="text-gray-500 hover:text-white transition-colors">YT</a>
      </motion.div>

      {/* ========================================================
          MOBILE VIEW (Visible on < md screens: < 768px)
         ======================================================== */}
      <div className="flex md:hidden flex-col justify-between items-center w-full h-full pt-16 pb-4 px-4 z-20">
        {/* Top Info: Flavor Name Badge, Title, and Description */}
        <div className="w-full max-w-[340px] text-center flex flex-col items-center gap-1.5 pt-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFlavor.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center gap-1"
            >
              <div 
                className="text-[10px] font-bold tracking-[0.25em] uppercase flex items-center gap-1.5"
                style={{ color: activeFlavor.color }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activeFlavor.color }} />
                {activeFlavor.name}
              </div>
              <h2 className="text-xs sm:text-sm font-black tracking-widest uppercase text-white leading-tight">
                {activeFlavor.title}
              </h2>
              <p className="text-[9px] text-gray-400 font-medium tracking-wide uppercase line-clamp-2 max-w-[290px] leading-relaxed">
                {activeFlavor.desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Center: Can with subtle floating oscillation & navigation chevrons */}
        <div className="relative flex-1 w-full max-h-[55vh] min-h-[300px] flex items-center justify-center my-auto">
          {/* Previous Flavor Button */}
          <button 
            onClick={handlePrevFlavor}
            aria-label="Previous flavor"
            className="absolute left-1 z-30 p-2 text-gray-400 hover:text-white active:scale-90 transition-all bg-black/40 backdrop-blur-sm rounded-full border border-white/10 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Can presentation */}
          <div className="relative w-full h-full flex items-center justify-center pointer-events-auto scale-110 sm:scale-125">
            <motion.div
              animate={hasEntered ? { y: [0, -3.5, 0] } : {}}
              transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut" }}
              className="relative w-[420px] h-[420px] sm:w-[500px] sm:h-[500px] flex items-center justify-center"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFlavor.id}
                  initial={{ opacity: 0, scale: (activeFlavor.scale ?? 1) * 0.85, y: 30 }}
                  animate={{ opacity: 1, scale: activeFlavor.scale ?? 1, y: 0 }}
                  exit={{ opacity: 0, scale: (activeFlavor.scale ?? 1) * 0.9, y: -20 }}
                  transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                  className="relative w-full h-full"
                >
                  <Image 
                    src={activeFlavor.image}
                    alt={activeFlavor.name}
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Next Flavor Button */}
          <button 
            onClick={handleNextFlavor}
            aria-label="Next flavor"
            className="absolute right-1 z-30 p-2 text-gray-400 hover:text-white active:scale-90 transition-all bg-black/40 backdrop-blur-xs rounded-full border border-white/10 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Beneath the Can: CTA Button, Flavor Selector Pills, and Footer */}
        <div className="w-full max-w-[340px] flex flex-col items-center gap-3">
          {/* CTA Button placed beneath the can */}
          <motion.button 
            whileTap={{ scale: 0.96 }}
            className="w-full py-3 px-6 text-xs font-black text-black uppercase tracking-widest transition-all shadow-lg active:scale-95 cursor-pointer"
            style={{ backgroundColor: activeFlavor.color }}
          >
            ORDER TODAY
          </motion.button>

          {/* Horizontal Flavor Selector Pills */}
          <div className="flex items-center justify-center gap-1.5 w-full flex-wrap">
            {FLAVORS.map(flavor => {
              const isActive = activeFlavor.id === flavor.id;
              return (
                <button 
                  key={flavor.id}
                  onClick={() => setActiveFlavor(flavor)}
                  className={`text-[9px] font-bold tracking-wider uppercase transition-all duration-300 px-2.5 py-1 rounded-full flex items-center gap-1.5 border cursor-pointer ${
                    isActive 
                      ? "text-white border-white/30 bg-white/10 shadow-sm" 
                      : "text-gray-500 border-transparent hover:text-gray-300"
                  }`}
                >
                  <span 
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      isActive ? "scale-125" : "opacity-40"
                    }`}
                    style={{ backgroundColor: flavor.color }}
                  />
                  {flavor.name.split(' ')[0]}
                </button>
              );
            })}
          </div>

          {/* Mobile Footer Links */}
          <div className="flex items-center justify-between w-full pt-1 text-[9px] font-bold tracking-widest text-gray-500">
            <div>ZERO SUGAR</div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">FB</a>
              <a href="#" className="hover:text-white transition-colors">IG</a>
              <a href="#" className="hover:text-white transition-colors">YT</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
