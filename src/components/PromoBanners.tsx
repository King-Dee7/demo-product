"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function PromoBanners() {
  return (
    <section className="w-full bg-[#fbfcfd] pb-16 sm:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Card 1: Holiday Deals (Dark Theme) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative rounded-3xl overflow-hidden bg-[#16171b] text-white p-7 sm:p-9 min-h-[300px] sm:min-h-[340px] flex flex-col justify-between shadow-xl"
          >
            {/* Background Image / Overlay */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/promo_holiday.jpg"
                alt="Holiday Deals Sneakers"
                fill
                className="object-cover object-right opacity-45 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#16171b] via-[#16171b]/80 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-[280px] sm:max-w-xs space-y-2">
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight text-white">
                Holiday Deals - <br />Save Big!
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed pt-1">
                Celebrate the season with festive gear designed for maximum grip and comfort.
              </p>
            </div>

            <div className="relative z-10 pt-6">
              <a
                href="#collections"
                className="inline-flex items-center gap-2 bg-white/20 hover:bg-white text-white hover:text-neutral-900 border border-white/30 text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full transition-all duration-300 backdrop-blur-sm group/btn"
              >
                <span>View Offers</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>

          {/* Card 2: Flash Sale (Royal Blue Theme) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative rounded-3xl overflow-hidden bg-[#1849e8] text-white p-7 sm:p-9 min-h-[300px] sm:min-h-[340px] flex flex-col justify-between shadow-xl shadow-blue-900/20"
          >
            {/* Background Image / Overlay */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/promo_flash.jpg"
                alt="Flash Sale Sneakers"
                fill
                className="object-cover object-right opacity-60 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1849e8] via-[#1849e8]/75 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-[280px] sm:max-w-xs space-y-2">
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight text-white">
                Flash Sale: <br />40% Off
              </h3>
              <p className="text-xs sm:text-sm text-blue-100 leading-relaxed pt-1">
                Limited-time deals on top styles. Grab yours while stock lasts.
              </p>
            </div>

            <div className="relative z-10 pt-6">
              <a
                href="#categories"
                className="inline-flex items-center gap-2 bg-white text-blue-800 hover:bg-blue-50 text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full transition-all duration-300 shadow-md group/btn"
              >
                <span>See Details</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
