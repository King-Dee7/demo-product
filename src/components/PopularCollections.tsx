"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowUpRight, Plus, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

export default function PopularCollections() {
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  const collections = [
    {
      id: "pop-1",
      name: "Space Runners",
      tagline: "elevate your space universe.",
      price: 189.0,
      image: "/images/shoe_space_runners.png",
      badge: "Trending",
    },
    {
      id: "pop-2",
      name: "Star Glide",
      tagline: "elevate your game from stars",
      price: 150.0,
      image: "/images/shoe_star_glide.png",
      badge: "Best Seller",
    },
    {
      id: "pop-3",
      name: "Cosmic Flights",
      tagline: "reach new heights somewhere",
      price: 210.0,
      image: "/images/shoe_cosmic_flights.png",
      badge: "Limited Edition",
    },
  ];

  const handleAdd = (item: typeof collections[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      size: "US 10",
    });
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <section id="collections" className="w-full bg-[#fbfcfd] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          <div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              Our popular collections
            </h2>
            <p className="text-neutral-500 text-xs sm:text-sm mt-1">
              Engineered for velocity and unmatched street presence.
            </p>
          </div>

          {/* Slider Controls matching inspo */}
          <div className="flex items-center gap-2">
            <button
              className="w-10 h-10 rounded-full border border-neutral-300 text-neutral-700 hover:border-neutral-900 flex items-center justify-center transition"
              aria-label="Previous collection"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              className="w-10 h-10 rounded-full bg-[#1849e8] text-white hover:bg-blue-700 flex items-center justify-center transition shadow-md shadow-blue-500/25"
              aria-label="Next collection"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {collections.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group relative bg-[#f1f3f8] rounded-3xl p-6 sm:p-7 flex flex-col justify-between border border-neutral-200/60 shadow-sm hover:shadow-xl hover:shadow-neutral-200/50 transition-all duration-300"
            >
              {/* Card Title & Subtitle */}
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-neutral-900 tracking-tight">
                    {item.name}
                  </h3>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white text-neutral-600 border border-neutral-200">
                    {item.badge}
                  </span>
                </div>
                <p className="text-xs text-neutral-500 mt-1 capitalize">{item.tagline}</p>
              </div>

              {/* Sneaker Image */}
              <div className="relative w-full aspect-[4/3] my-4 flex items-center justify-center">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={340}
                  height={220}
                  className="object-contain filter drop-shadow-[0_15px_15px_rgba(0,0,0,0.12)]"
                />
              </div>

              {/* Bottom Price Pill & Action Button */}
              <div className="pt-2">
                <div className="bg-white/80 backdrop-blur-sm rounded-full p-1.5 pl-5 pr-1.5 border border-neutral-200/80 flex items-center justify-between shadow-sm">
                  <span className="font-extrabold text-sm sm:text-base text-neutral-900">
                    ${item.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => handleAdd(item)}
                    className="w-8 h-8 rounded-full bg-[#1849e8] hover:bg-blue-700 text-white flex items-center justify-center transition shadow"
                    aria-label={`Add ${item.name} to cart`}
                  >
                    {addedId === item.id ? (
                      <Check className="w-4 h-4 text-emerald-300" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
