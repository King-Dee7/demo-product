"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function TestimonialSection() {
  return (
    <section className="w-full bg-[#fbfcfd] pb-20 sm:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          <div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              Explore our popular <br className="hidden sm:inline" />
              shoes collections
            </h2>
          </div>
          <div>
            <a
              href="#collections"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-neutral-900 hover:text-blue-600 transition"
            >
              <span>See More</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Column 1: Testimonial Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4 bg-white rounded-3xl p-8 sm:p-10 border border-neutral-200/70 shadow-sm flex flex-col justify-between"
          >
            <div>
              {/* Big Blue Quote Icon */}
              <div className="text-5xl font-serif text-[#1849e8] leading-none mb-4 select-none">
                “
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight mb-3">
                Durable and stylish!
              </h3>
              <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
                &ldquo;I love how this sneaker looks in any plane while still looking good. The design
                options are endless and the walk is ultra match definitely worth the
                investment!&rdquo;
              </p>
            </div>

            <div className="pt-8">
              {/* 5 Stars */}
              <div className="flex items-center gap-1 text-amber-500 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-neutral-900">Jamie Fox</h4>
                <p className="text-xs text-neutral-400 font-medium">Happy Customer</p>
              </div>
            </div>
          </motion.div>

          {/* Column 2: Center Model Editorial Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-4 relative rounded-3xl overflow-hidden min-h-[380px] sm:min-h-[440px] shadow-md group"
          >
            <Image
              src="/images/story_guy.jpg"
              alt="Lifestyle Model"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </motion.div>

          {/* Column 3: Overhead Sneakers & Slider Arrows */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="lg:col-span-4 flex flex-col justify-between gap-4"
          >
            <div className="relative rounded-3xl overflow-hidden h-[300px] sm:h-[350px] shadow-md group">
              <Image
                src="/images/story_overhead.jpg"
                alt="Overhead Footwear Photography"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Slider Navigation Buttons */}
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                className="w-10 h-10 rounded-full border border-neutral-300 text-neutral-600 hover:border-neutral-900 flex items-center justify-center transition"
                aria-label="Previous story"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                className="w-10 h-10 rounded-full bg-[#1849e8] text-white hover:bg-blue-700 flex items-center justify-center transition shadow-md shadow-blue-500/25"
                aria-label="Next story"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
