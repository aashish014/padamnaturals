import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lenis from "lenis";
import { Toaster } from "sonner";
import { CartProvider } from "@/context/CartContext";
import { LanguageProvider } from "@/i18n";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { FloatingCart } from "@/components/FloatingCart";
import { lenisStore } from "@/lib/scroll";
import Home from "@/pages/Home";
import Shop from "@/pages/Shop";
import ProductDetail from "@/pages/ProductDetail";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import SeedService from "@/pages/SeedService";
import TrackOrder from "@/pages/TrackOrder";
import Admin from "@/pages/Admin";
import { BottomNav } from "@/components/BottomNav";

function App() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1 });
    lenisStore.current = lenis;
    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisStore.current = null;
    };
  }, []);

  return (
    <div className="grain">
      <BrowserRouter>
        <LanguageProvider>
          <CartProvider>
          <Navbar />
          <CartDrawer />
          <FloatingCart />
          <Routes>            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/your-seed-your-oil" element={<SeedService />} />
            <Route path="/product/:slug" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/track" element={<TrackOrder />} />
            <Route path="/track/:orderId" element={<TrackOrder />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
          <Footer />
          <div className="h-16 md:hidden" aria-hidden="true" />
          <BottomNav />
          <Toaster position="bottom-center" toastOptions={{ style: { background: "#1F2922", color: "#FAF7F2", border: "none" } }} />
          </CartProvider>
        </LanguageProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
