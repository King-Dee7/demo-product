"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

export default function JustForYou() {
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState("All Shoes");
  const [addedId, setAddedId] = useState<string | null>(null);

  const tabs = ["All Shoes", "Trail Runners", "Streetwear", "Retro", "Runners"];

  const products = [
    {
      id: "jfy-1",
      name: "VaporSprint",
      desc: "Experience peak performance with universal cushioning.",
      price: 185.0,
      image: "/images/shoe_space_runners.png",
      category: "Runners",
    },
    {
      id: "jfy-2",
      name: "ZoomRacer",
      desc: "Smooth, responsive ride with responsive design.",
      price: 135.0,
      image: "/images/jfy_zoomracer.png",
      category: "Retro",
    },
    {
      id: "jfy-3",
      name: "StarRunner",
      desc: "Firm balance and shape with superior stability.",
      price: 160.0,
      image: "/images/cat_streetwear.png",
      category: "Streetwear",
    },
    {
      id: "jfy-4",
      name: "Air Pegasus",
      desc: "By ultra legendary shoe. Perfect for everyday runs.",
      price: 125.0,
      image: "/images/jfy_airpegasus.png",
      category: "Retro",
    },
    {
      id: "jfy-5",
      name: "AlphaRunner",
      desc: "Advanced propulsion for race-level technology.",
      price: 210.0,
      image: "/images/jfy_alpharunner.png",
      category: "Trail Runners",
    },
    {
      id: "jfy-6",
      name: "StrikeMax",
      desc: "Ergonomic cushioning for every explosive run.",
      price: 155.0,
      image: "/images/shoe_cosmic_flights.png",
      category: "Runners",
    },
  ];

  const filteredProducts =
    activeTab === "All Shoes"
      ? products
      : products.filter((p) => p.category === activeTab);

  const handleAdd = (product: typeof products[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: "US 10",
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <section id="just-for-you" className="w-full bg-[#fbfcfd] pb-16 sm:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              Just for you
            </h2>
            <p className="text-neutral-500 text-xs sm:text-sm mt-1">
              Personalized recommendations based on performance and aesthetic trends.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-neutral-900 text-white shadow-sm"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* 6-Item Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className="group relative rounded-3xl bg-[#f1f3f8] border border-neutral-200/70 p-6 flex flex-col justify-between shadow-sm hover:shadow-xl hover:shadow-neutral-200/60 transition-all duration-300"
              >
                {/* Title & Desc */}
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 tracking-tight">
                    {product.name}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1 line-clamp-2 leading-relaxed">
                    {product.desc}
                  </p>
                </div>

                {/* Sneaker Image */}
                <div className="relative w-full aspect-[4/3] my-6 flex items-center justify-center">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={280}
                    height={180}
                    className="object-contain filter drop-shadow-[0_15px_15px_rgba(0,0,0,0.12)]"
                  />
                </div>

                {/* Bottom Price Pill & Action Button */}
                <div>
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-1.5 pl-4 pr-1.5 border border-neutral-200/80 flex items-center justify-between shadow-sm">
                    <span className="font-extrabold text-sm text-neutral-900">
                      ${product.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => handleAdd(product)}
                      className="w-8 h-8 rounded-full bg-[#1849e8] hover:bg-blue-700 text-white flex items-center justify-center transition shadow"
                      aria-label={`Add ${product.name} to cart`}
                    >
                      {addedId === product.id ? (
                        <Check className="w-4 h-4 text-emerald-300" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
