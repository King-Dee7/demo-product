"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ShoeCategories() {
  const bottomCategories = [
    {
      name: "Athletic Shoes",
      count: "128 Collections",
      image: "/images/shoe_space_runners.png",
    },
    {
      name: "Sport Shoes",
      count: "95 Collections",
      image: "/images/hero_sneaker.png",
    },
    {
      name: "Streetwears",
      count: "147 Collections",
      image: "/images/cat_streetwear.png",
    },
  ];

  return (
    <section id="categories" className="w-full bg-[#fbfcfd] pb-16 sm:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            Explore shoe categories
          </h2>
          <p className="text-neutral-500 text-xs sm:text-sm mt-1">
            Curated silhouettes built for performance, court, and streetwear.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="space-y-6">
          {/* Top Row: Women's Shoes & Men's Shoes */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Women's Shoes (Large Gradient Card) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 group relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#3b82f6] via-[#2563eb] to-[#1d4ed8] p-8 min-h-[320px] sm:min-h-[360px] flex items-center justify-center shadow-lg"
            >
              {/* Background circular highlights */}
              <div className="absolute -top-12 -left-12 w-64 h-64 bg-white/20 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-blue-300/20 rounded-full blur-2xl pointer-events-none" />

              {/* Sneaker Image */}
              <div className="relative z-10 w-full max-w-[340px] aspect-square flex items-center justify-center">
                <Image
                  src="/images/cat_womens.png"
                  alt="Women's Shoes"
                  width={340}
                  height={340}
                  className="object-contain filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.3)] group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500"
                />
              </div>

              {/* Glassmorphic Center Overlay Label */}
              <div className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md border border-white/30 px-6 py-3 rounded-2xl text-center shadow-xl group-hover:bg-white/30 transition">
                <h3 className="font-extrabold text-lg sm:text-xl text-white tracking-tight">
                  Women&apos;s Shoes
                </h3>
                <p className="text-xs text-blue-100 font-medium mt-0.5">389 Collections</p>
              </div>
            </motion.div>

            {/* Men's Shoes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="lg:col-span-5 group relative rounded-3xl overflow-hidden bg-[#f1f3f8] border border-neutral-200/70 p-8 min-h-[320px] sm:min-h-[360px] flex flex-col items-center justify-between shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Top empty spacer for balance */}
              <div className="w-full flex justify-end">
                <span className="w-8 h-8 rounded-full bg-white border border-neutral-200 text-neutral-600 flex items-center justify-center group-hover:bg-[#1849e8] group-hover:text-white transition">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>

              {/* Sneaker */}
              <div className="relative w-full max-w-[280px] aspect-square flex items-center justify-center my-auto">
                <Image
                  src="/images/cat_mens.png"
                  alt="Men's Shoes"
                  width={280}
                  height={280}
                  className="object-contain filter drop-shadow-[0_15px_20px_rgba(0,0,0,0.15)] group-hover:scale-110 group-hover:rotate-2 transition-transform duration-500"
                />
              </div>

              {/* Bottom Label */}
              <div className="text-center">
                <h3 className="font-bold text-lg sm:text-xl text-neutral-900 tracking-tight">
                  Men&apos;s Shoes
                </h3>
                <p className="text-xs text-neutral-500 font-medium mt-0.5">420 Collections</p>
              </div>
            </motion.div>
          </div>

          {/* Bottom Row: 3 Equal Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bottomCategories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative rounded-3xl bg-[#f1f3f8] border border-neutral-200/70 p-6 flex flex-col items-center justify-between min-h-[260px] shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="w-full flex justify-end">
                  <span className="w-7 h-7 rounded-full bg-white text-neutral-500 flex items-center justify-center group-hover:bg-[#1849e8] group-hover:text-white transition text-xs">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>

                <div className="relative w-full aspect-[4/3] flex items-center justify-center">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    width={220}
                    height={150}
                    className="object-contain filter drop-shadow-[0_12px_15px_rgba(0,0,0,0.12)] group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="text-center pt-2">
                  <h4 className="font-bold text-base text-neutral-900 tracking-tight">
                    {cat.name}
                  </h4>
                  <p className="text-[11px] text-neutral-500 font-medium">{cat.count}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
