import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import Hero from "@/components/sections/Hero";
import MenuSection from "@/components/sections/MenuSection";
import ReviewsSection from "@/components/sections/ReviewsSection";
import PromotionsSection from "@/components/sections/PromotionsSection";
import AppPreviewSection from "@/components/sections/AppPreviewSection";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <MenuSection />
        <ReviewsSection />
        <PromotionsSection />
        <AppPreviewSection />
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
