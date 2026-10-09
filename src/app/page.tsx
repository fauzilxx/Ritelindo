import IntroAnimation from "@/components/IntroAnimation";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CatalogToWhyStack from "@/components/CatalogToWhyStack";
import PackageCatalog from "@/components/PackageCatalog";
import StoreCalculator from "@/components/StoreCalculator";
import RetailSectors from "@/components/RetailSectors";
import Testimonials from "@/components/Testimonials";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1C1917] selection:bg-[#1C1917] selection:text-[#E8F878]">
      {/* 0. Kinetic First-Load Intro Animation */}
      <IntroAnimation />

      {/* 1. Main Navigation Bar with Center 'RITEL ⧗ INDO' Mark */}
      <Navbar />

      {/* 3. Main Content Container */}
      <main className="flex-1">
        {/* Hero Section: Centered headline, Chartreuse Lime Button, and Giant RITELINDO Serif Watermark */}
        <HeroSection />

        {/* 3-Card Stack Transition: Featured Products (Catalog) -> Why Ritelindo -> Company Partnership (Mitra) */}
        <CatalogToWhyStack />

        {/* Paket Setup Toko & Kalkulator Interaktif (Rising over CompanyPartnership) - Satu Kesatuan Tanpa Pembatas */}
        <section className="relative z-30 -mt-[100vh] bg-[#E8F878] shadow-[0_-35px_90px_rgba(0,0,0,0.85)] font-montserrat">
          {/* Concave Inward Scoop Transition Header - Covers CompanyPartnership */}
          <div className="absolute -top-10 sm:-top-14 md:-top-16 left-0 right-0 w-full overflow-hidden pointer-events-none z-30">
            <svg
              viewBox="0 0 1440 70"
              preserveAspectRatio="none"
              className="w-full h-10 sm:h-14 md:h-16 block text-[#E8F878] fill-current"
              aria-hidden="true"
            >
              <path d="M 0,0 C 0,44 36,70 80,70 L 1360,70 C 1404,70 1440,44 1440,0 L 1440,70 L 0,70 Z" />
              <path
                d="M 0,0 C 0,44 36,70 80,70 L 1360,70 C 1404,70 1440,44 1440,0"
                fill="none"
                stroke="rgba(28,25,23,0.18)"
                strokeWidth="2"
              />
            </svg>
          </div>

          {/* Seamless Continuous Architectural Black Square Grid Overlay */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(0, 0, 0, 0.16) 1.5px, transparent 1.5px),
                linear-gradient(to bottom, rgba(0, 0, 0, 0.16) 1.5px, transparent 1.5px)
              `,
              backgroundSize: "28px 28px",
            }}
          />

          {/* 1. Paket Setup Siap Buka */}
          <PackageCatalog />

          {/* 2. Kalkulator Interaktif - Mengalir langsung di kanvas yang sama tanpa pembatas */}
          <StoreCalculator />
        </section>

        {/* 2. Sektor Usaha Ritel, Kisah Sukses (Testimoni) & Tanya Jawab FAQ */}
        <section className="relative z-30 shadow-[0_-35px_90px_rgba(0,0,0,0.85)] bg-white font-montserrat">
          {/* Concave Inward Scoop Transition Header */}
          <div className="absolute -top-10 sm:-top-14 md:-top-16 left-0 right-0 w-full overflow-hidden pointer-events-none z-30">
            <svg
              viewBox="0 0 1440 70"
              preserveAspectRatio="none"
              className="w-full h-10 sm:h-14 md:h-16 block text-white fill-current"
              aria-hidden="true"
            >
              <path d="M 0,0 C 0,44 36,70 80,70 L 1360,70 C 1404,70 1440,44 1440,0 L 1440,70 L 0,70 Z" />
              <path
                d="M 0,0 C 0,44 36,70 80,70 L 1360,70 C 1404,70 1440,44 1440,0"
                fill="none"
                stroke="rgba(28,25,23,0.12)"
                strokeWidth="2"
              />
            </svg>
          </div>

          {/* Sektor Industri Toko Retail & 3 Target Customer Segments */}
          <RetailSectors />

          {/* Kisah Sukses (Testimonials) */}
          <Testimonials />

          {/* Tanya Jawab Populer (FAQ) */}
          <FAQSection />
        </section>
      </main>

      {/* 4. Luxury Deep Espresso Footer */}
      <Footer />

      {/* 5. High-Converting Floating WhatsApp Button */}
      <FloatingWhatsApp />
    </div>
  );
}
