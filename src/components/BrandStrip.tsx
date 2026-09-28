"use client";

import React from "react";

export default function BrandStrip() {
  const brands = [
    {
      name: "ASICS",
      svg: (
        <span className="font-black text-xl tracking-tighter uppercase font-sans text-neutral-900 flex items-center">
          <span className="italic text-2xl font-black text-neutral-900 tracking-[-0.15em] mr-1">a</span>
          sics
        </span>
      ),
    },
    {
      name: "SAUCONY",
      svg: (
        <span className="font-extrabold text-lg tracking-[0.15em] uppercase font-sans text-neutral-900">
          saucony
        </span>
      ),
    },
    {
      name: "NEW BALANCE",
      svg: (
        <div className="flex items-center gap-1">
          <span className="font-black text-2xl italic tracking-tighter text-neutral-900">N</span>
          <span className="font-black text-sm tracking-widest uppercase text-neutral-900">balance</span>
        </div>
      ),
    },
    {
      name: "ELLESSE",
      svg: (
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded-full border-2 border-neutral-900 flex items-center justify-center text-[8px] font-bold">●</span>
          <span className="font-black text-base tracking-[0.2em] uppercase text-neutral-900">ellesse</span>
        </div>
      ),
    },
    {
      name: "ANTA",
      svg: (
        <span className="font-black text-xl italic tracking-widest uppercase text-neutral-900">
          ANTA
        </span>
      ),
    },
    {
      name: "CROCS",
      svg: (
        <span className="font-extrabold text-lg tracking-[0.1em] lowercase text-neutral-900">
          crocs™
        </span>
      ),
    },
    {
      name: "CONVERSE",
      svg: (
        <div className="flex items-center gap-1 text-neutral-900 font-black">
          <span className="text-xl">★</span>
          <span className="tracking-widest text-xs uppercase font-extrabold">CONVERSE</span>
        </div>
      ),
    },
  ];

  return (
    <section className="w-full bg-white py-8 sm:py-10 border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-around gap-8 sm:gap-12 opacity-80 hover:opacity-100 transition-opacity">
          {brands.map((brand, i) => (
            <div
              key={i}
              className="flex items-center justify-center grayscale hover:grayscale-0 hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              {brand.svg}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
