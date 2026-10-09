"use client";

import React, { useRef, useState, useEffect, useCallback, memo } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { buildWhatsAppLink } from "@/utils/whatsapp";
import WhatsAppIcon from "./WhatsAppIcon";

import ScrollReveal from "./ScrollReveal";

interface ProductItem {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  image: string;
  specs: string;
}

const PRODUCTS: ProductItem[] = [
  {
    id: "gondola-single",
    name: "Rak Gondola Single Dinding",
    subtitle: "Modular Wall Shelving",
    price: "Mulai Rp 850.000",
    image: "/products/gondola-single.webp",
    specs: "Tinggi 120-200cm • Plat SPCC Cold-Rolled",
  },
  {
    id: "gondola-double",
    name: "Rak Gondola Double Island",
    subtitle: "Island Center Display",
    price: "Mulai Rp 1.450.000",
    image: "/products/gondola-double.webp",
    specs: "Display 2 Sisi • Beban 80kg/shelving",
  },
  {
    id: "cash-counter",
    name: "Meja Kasir Modern & Showcase",
    subtitle: "Boutique Checkout Desk",
    price: "Mulai Rp 2.850.000",
    image: "/products/cash-counter.webp",
    specs: "Fluted Wood Slats • Honed Travertine Top",
  },
  {
    id: "end-gondola",
    name: "Rak End Gondola Semicircular",
    subtitle: "Curved End-Cap Display",
    price: "Mulai Rp 750.000",
    image: "/products/end-gondola.webp",
    specs: "Tutup Ujung Island • Warm LED Accent",
  },
  {
    id: "pegboard",
    name: "Rak Display Aksesoris Pegboard",
    subtitle: "Perforated Hanging System",
    price: "Mulai Rp 650.000",
    image: "/products/pegboard.webp",
    specs: "Solid Oak Board • Matte Black Steel Frame",
  },
  {
    id: "heavy-duty",
    name: "Rak Heavy Duty & Gudang",
    subtitle: "Industrial Storage Rack",
    price: "Mulai Rp 1.950.000",
    image: "/products/heavy-duty.webp",
    specs: "Kapasitas 250kg-500kg per ambalan",
  },
];
interface ProductCardProps {
  prod: ProductItem;
  onClick: (prod: ProductItem) => void;
}

// Memoized ProductCard to ensure zero unnecessary DOM updates
const ProductCard = memo(function ProductCard({
  prod,
  onClick,
}: ProductCardProps) {
  return (
    <div
      onClick={() => onClick(prod)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick(prod);
        }
      }}
      role="button"
      tabIndex={0}
      className="group flex-shrink-0 w-[84%] sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1.35rem)] block cursor-pointer select-none focus:outline-hidden"
      aria-label={`Lihat detail produk ${prod.name}`}
    >
      {/* Square Product Image Container */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xs bg-[#EDE6D8]/50 shadow-2xs pointer-events-none select-none">
        <Image
          src={prod.image}
          alt={prod.name}
          fill
          priority
          draggable={false}
          className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out select-none pointer-events-none"
          sizes="(max-width: 640px) 84vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Floating CTA Quick-Action Badge on Hover */}
        <div className="absolute bottom-3 right-3 opacity-95 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 translate-y-0 sm:translate-y-1 sm:group-hover:translate-y-0 z-10 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold font-montserrat bg-[#E8F878] group-hover:bg-[#DDF067] text-[#1C1917] shadow-lg shadow-black/25 group-hover:scale-105 active:scale-95 transition-all duration-300 pointer-events-auto">
            <WhatsAppIcon className="w-4.5 h-4.5 sm:w-5 sm:h-5 shrink-0" />
            Tanya Brosur
          </span>
        </div>
      </div>

      {/* Product Info Directly Underneath the Image with fixed heights to prevent layout shifts */}
      <div className="mt-3.5 sm:mt-4 space-y-1 font-montserrat pointer-events-none select-none">
        <h3 className="text-base sm:text-lg lg:text-[19px] font-semibold text-[#1C1917] group-hover:underline underline-offset-4 decoration-1 transition-colors leading-snug tracking-tight font-montserrat line-clamp-1">
          {prod.name}
        </h3>
        <div className="flex items-center justify-between text-xs sm:text-sm text-[#78716C] pt-0.5 font-montserrat">
          <span className="font-semibold text-[#1C1917] font-montserrat shrink-0">
            {prod.price}
          </span>
          <span className="text-[11px] sm:text-xs text-[#78716C] font-medium font-montserrat truncate ml-2 text-right">
            {prod.specs}
          </span>
        </div>
      </div>
    </div>
  );
});

export default function FeaturedProducts() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [, setResizeTick] = useState(0);

  // Gesture coordinate tracking
  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);
  const isHorizontalSwipeRef = useRef<boolean | null>(null);
  const hasMovedRef = useRef(false);
  const isMouseDownRef = useRef(false);

  // Compute maximum index dynamically based on visible cards
  const getMaxIndex = useCallback(() => {
    if (typeof window === "undefined") return PRODUCTS.length - 1;
    const w = window.innerWidth;
    if (w >= 1024) return Math.max(0, PRODUCTS.length - 3); // 3 cards visible on desktop
    if (w >= 640) return Math.max(0, PRODUCTS.length - 2);  // 2 cards visible on tablet
    return PRODUCTS.length - 1;                            // 1 card visible on mobile
  }, []);

  const [maxIndex, setMaxIndex] = useState(PRODUCTS.length - 1);

  // Measure card offset dynamically
  const getCardOffset = useCallback((index: number) => {
    if (!trackRef.current) return index * 320;
    const track = trackRef.current;
    const target = track.children[index] as HTMLElement | null;
    const first = track.children[0] as HTMLElement | null;
    if (target && first) {
      return target.offsetLeft - first.offsetLeft;
    }
    return index * 320;
  }, []);

  // Update on window resize
  useEffect(() => {
    const handleResize = () => {
      const newMax = getMaxIndex();
      setMaxIndex(newMax);
      setCurrentIndex((prev) => Math.min(prev, newMax));
      setResizeTick((t) => t + 1);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getMaxIndex]);

  // Prev / Next button handlers with smooth looping
  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  }, [maxIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  }, [maxIndex]);

  // Touch gesture handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
    isHorizontalSwipeRef.current = null;
    hasMovedRef.current = false;
    setIsDragging(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const dx = e.touches[0].clientX - touchStartXRef.current;
    const dy = e.touches[0].clientY - touchStartYRef.current;

    // Determine swipe axis on first movement threshold
    if (isHorizontalSwipeRef.current === null) {
      if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
        isHorizontalSwipeRef.current = Math.abs(dx) > Math.abs(dy);
        if (isHorizontalSwipeRef.current) {
          setIsDragging(true);
        }
      }
    }

    if (isHorizontalSwipeRef.current) {
      hasMovedRef.current = true;
      let delta = dx;
      // Fluid rubber-band resistance at track ends
      if (
        (currentIndex === 0 && dx > 0) ||
        (currentIndex >= maxIndex && dx < 0)
      ) {
        delta = dx * 0.35;
      }
      setDragOffset(delta);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging && !hasMovedRef.current) {
      setDragOffset(0);
      return;
    }

    setIsDragging(false);
    const step = getCardOffset(1) || 320;
    const threshold = Math.min(step * 0.18, 50);

    if (dragOffset < -threshold) {
      // Swiped left -> Next slide
      handleNext();
    } else if (dragOffset > threshold) {
      // Swiped right -> Previous slide
      handlePrev();
    }
    setDragOffset(0);
  };

  // Mouse drag handlers for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    touchStartXRef.current = e.clientX;
    isMouseDownRef.current = true;
    hasMovedRef.current = false;
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDownRef.current) return;
    const dx = e.clientX - touchStartXRef.current;
    if (Math.abs(dx) > 5) {
      hasMovedRef.current = true;
    }
    let delta = dx;
    if (
      (currentIndex === 0 && dx > 0) ||
      (currentIndex >= maxIndex && dx < 0)
    ) {
      delta = dx * 0.35;
    }
    setDragOffset(delta);
  };

  const handleMouseUp = () => {
    if (!isMouseDownRef.current) return;
    isMouseDownRef.current = false;
    handleTouchEnd();
  };

  const handleMouseLeave = () => {
    if (isMouseDownRef.current) {
      handleMouseUp();
    }
  };

  // Safe click handler that ignores drags/swipes
  const handleCardClick = useCallback((prod: ProductItem) => {
    if (hasMovedRef.current) return;
    const waItemUrl = buildWhatsAppLink(
      `Halo Tim Ritelindo, saya tertarik dengan produk ${prod.name} (${prod.price}). Bisakah saya mendapatkan brosur spesifikasinya?`
    );
    window.open(waItemUrl, "_blank", "noopener,noreferrer");
  }, []);

  // Compute hardware-accelerated GPU translation
  const baseTranslate = -getCardOffset(currentIndex);
  const currentTranslate = baseTranslate + dragOffset;

  return (
    <section id="koleksi-rak" className="py-16 sm:py-24 bg-[#FAF6F0] overflow-hidden select-none">
      {/* Container melebar max-w-[1600px] agar ruang kosong kanan-kiri pas & foto jauh lebih besar */}
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        
        {/* Editorial Header (Title on left, circular arrow buttons on right) */}
        <div className="flex items-center justify-between gap-4 mb-8 sm:mb-12">
          <ScrollReveal direction="left" distance={35}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-serif font-bold text-[#1C1917] tracking-tight">
              Koleksi Rak Unggulan
            </h2>
          </ScrollReveal>

          {/* Circular Carousel Arrow Navigation (←) (→) */}
          <ScrollReveal direction="right" distance={35}>
            <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
              <button
                type="button"
                onClick={handlePrev}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[#1C1917]/35 hover:border-[#1C1917] flex items-center justify-center text-[#1C1917] hover:bg-[#1C1917] hover:text-[#FAF6F0] transition-all duration-300 hover:scale-110 active:scale-90 cursor-pointer shadow-sm"
                aria-label="Lihat Sebelumnya"
              >
                <ArrowLeft className="w-5 h-5 stroke-[1.5]" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[#1C1917]/35 hover:border-[#1C1917] flex items-center justify-center text-[#1C1917] hover:bg-[#1C1917] hover:text-[#FAF6F0] transition-all duration-300 hover:scale-110 active:scale-90 cursor-pointer shadow-sm"
                aria-label="Lihat Berikutnya"
              >
                <ArrowRight className="w-5 h-5 stroke-[1.5]" />
              </button>
            </div>
          </ScrollReveal>
        </div>

        {/* Carousel Track (100% GPU-accelerated Transform Slider with Apple-grade Cubic-Bezier Easing) */}
        <div className="overflow-hidden w-full">
          <div
            ref={trackRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `translate3d(${currentTranslate}px, 0, 0)`,
              transition: isDragging
                ? "none"
                : "transform 500ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
            className="flex gap-4 sm:gap-6 lg:gap-8 will-change-transform cursor-grab active:cursor-grabbing pb-2 sm:pb-4 touch-pan-y"
          >
            {PRODUCTS.map((prod) => (
              <ProductCard
                key={prod.id}
                prod={prod}
                onClick={handleCardClick}
              />
            ))}
          </div>

          {/* Mobile Pagination Indicator Dots */}
          <div className="flex sm:hidden items-center justify-center gap-1.5 mt-5">
            {PRODUCTS.map((prod, idx) => (
              <button
                key={prod.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Slide ke ${idx + 1}: ${prod.name}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === idx
                    ? "w-6 bg-[#1C1917]"
                    : "w-1.5 bg-[#1C1917]/25 hover:bg-[#1C1917]/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
