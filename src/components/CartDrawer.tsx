"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const { cart, isOpen, closeCart, removeFromCart, updateQuantity, subtotal, totalItems } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity"
          />

          {/* Drawer Panel */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-white text-neutral-900 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold tracking-tight">Your Cart</h2>
                <span className="ml-1 px-2 py-0.5 text-xs font-semibold bg-blue-50 text-blue-600 rounded-full">
                  {totalItems} items
                </span>
              </div>
              <button
                onClick={closeCart}
                className="p-2 text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 rounded-full transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Item List */}
            <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-neutral-100">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-4 text-neutral-400">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold text-neutral-800 text-lg mb-1">Your cart is empty</h3>
                  <p className="text-neutral-500 text-sm max-w-xs mb-6">
                    Looks like you haven&apos;t added any sneakers to your collection yet.
                  </p>
                  <button
                    onClick={closeCart}
                    className="px-6 py-2.5 bg-blue-600 text-white rounded-full font-medium text-sm hover:bg-blue-700 transition"
                  >
                    Start Exploring
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="py-4 flex gap-4 items-center">
                    <div className="relative w-20 h-20 rounded-2xl bg-neutral-50 p-2 border border-neutral-100 flex-shrink-0 flex items-center justify-center overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={70}
                        height={70}
                        className="object-contain transform hover:scale-110 transition duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm text-neutral-900 truncate">{item.name}</h4>
                      <p className="text-xs text-neutral-500 mb-2">Size: {item.size}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-blue-600">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <div className="flex items-center gap-2 bg-neutral-100 rounded-full px-2 py-1">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-0.5 text-neutral-600 hover:text-black transition"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-semibold w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-0.5 text-neutral-600 hover:text-black transition"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-neutral-400 hover:text-red-500 p-1.5 transition"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Summary */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-neutral-100 bg-neutral-50/50 space-y-4">
                <div className="flex justify-between items-center text-sm text-neutral-600">
                  <span>Shipping</span>
                  <span className="text-emerald-600 font-medium">Free Express</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="font-semibold text-neutral-800">Subtotal</span>
                  <span className="text-2xl font-black text-neutral-900 tracking-tight">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={() => alert("Checkout initiated! Total: $" + subtotal.toFixed(2))}
                  className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 transition-all group"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-center text-xs text-neutral-400">
                  Complimentary 30-day returns & authenticity guaranteed
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
