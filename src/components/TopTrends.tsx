"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

export default function TopTrends() {
  const { addToCart } = useCart();

  const handleAddFeatured = () => {
    addToCart({
      id: "trend-clubhouse",
      name: "Clubhouse Kinetic Pro",
      price: 75.0,
      image: "/images/shoe_space_runners.png",
      size: "US 10",
    });
  };

  return (
    <section id="trends" className="w-full bg-[#fbfcfd] pb-16 sm:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-[32px] overflow-hidden bg-[#e4e7ec] border border-neutral-300/60 p-6 sm:p-12 lg:p-16 min-h-[440px] sm:min-h-[500px] flex flex-col lg:flex-row items-center justify-between shadow-sm"
        >
          {/* Left Text Block */}
          <div className="relative z-10 w-full lg:max-w-md space-y-6 text-left mb-8 lg:mb-0">
            <div className="space-y-2">
              <h2 className="text-3xl sm:text-5xl font-black text-neutral-900 tracking-tight leading-tight">
                This week&apos;s <br />
                top trends
              </h2>
              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed pt-1">
                Discover daily picks from top brands, trackside gear, and high-performance lifestyle apparel.
              </p>
            </div>

            <div>
              <a
                href="#just-for-you"
                className="inline-flex items-center gap-3 bg-[#1849e8] hover:bg-blue-700 text-white font-bold text-sm px-6 py-3.5 rounded-full transition-all duration-300 shadow-lg shadow-blue-600/30 group"
              >
                <span>Explore More</span>
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-3 h-3 text-white" />
                </span>
              </a>
            </div>
          </div>

          {/* Right Image Container with Floating Hotspot Tag */}
          <div className="relative z-10 w-full lg:w-1/2 flex items-center justify-center">
            <div className="relative w-full max-w-[480px] h-[340px] sm:h-[420px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80 group">
              <Image
                src="/images/trend_lifestyle.jpg"
                alt="Weekly Top Trends Lifestyle"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Overlaid Pinned Product Card matching inspo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="absolute bottom-6 left-6 right-6 sm:right-auto sm:min-w-[260px] bg-white/90 backdrop-blur-md border border-white/90 rounded-2xl p-3 shadow-2xl flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-neutral-100 p-1 flex items-center justify-center flex-shrink-0">
                    <Image
                      src="/images/shoe_space_runners.png"
                      alt="Clubhouse Kinetic"
                      width={44}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs text-neutral-900 leading-tight">
                      Clubhouse Kinetic
                    </h4>
                    <p className="text-xs font-black text-blue-600 mt-0.5">$75.00</p>
                  </div>
                </div>

                <button
                  onClick={handleAddFeatured}
                  className="w-8 h-8 rounded-full bg-[#1849e8] hover:bg-blue-700 text-white flex items-center justify-center transition shadow-md hover:scale-105"
                  aria-label="Add Clubhouse Kinetic to cart"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </motion.div>
            </div>
          </div>

          {/* Bottom Right Carousel Nav Arrows */}
          <div className="absolute bottom-6 right-8 hidden sm:flex items-center gap-2 z-20">
            <button
              className="w-9 h-9 rounded-full bg-white/70 hover:bg-white text-neutral-700 flex items-center justify-center transition shadow-sm"
              aria-label="Previous trend"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              className="w-9 h-9 rounded-full bg-[#1849e8] text-white hover:bg-blue-700 flex items-center justify-center transition shadow-md shadow-blue-500/25"
              aria-label="Next trend"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
