import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PopularCollections from "@/components/PopularCollections";
import PromoBanners from "@/components/PromoBanners";
import TopTrends from "@/components/TopTrends";
import TestimonialSection from "@/components/TestimonialSection";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/context/CartContext";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

export default function Home() {
  return (
    <CartProvider>
      <SmoothScrollProvider>
        <main className="w-full min-h-screen bg-[#fbfcfd] text-neutral-900 overflow-x-hidden selection:bg-blue-600 selection:text-white">
          <Navbar />
          <Hero />
          <PopularCollections />
          <PromoBanners />
          <TopTrends />
          <TestimonialSection />
          <Footer />
          <CartDrawer />
        </main>
      </SmoothScrollProvider>
    </CartProvider>
  );
}
