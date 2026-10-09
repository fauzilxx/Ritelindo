"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  city: string;
  avatar: string;
  quote: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 0,
    name: "Bambang Setiawan",
    role: "Toko Sembako Makmur",
    city: "Malang, Jawa Timur",
    avatar: "/avatar-bambang.webp",
    quote:
      "Awalnya ragu mau upgrade toko kelontong jadi minimarket modern karena takut biaya bengkak. Di Ritelindo dibuatkan desain denah 3D gratis dulu. Rak dikirim langsung dari pabrik dan dirakit teknisi. Toko jadi bersih, rapi, dan omzet naik lebih dari 2x lipat!",
  },
  {
    id: 1,
    name: "apt. Rahma Wijaya, S.Farm",
    role: "Apotek Sehat Mandiri",
    city: "Solo, Jawa Tengah",
    avatar: "/avatar-rahma.webp",
    quote:
      "Untuk apotek, display obat harus rapi dan higienis. Rak Ritelindo finishing cat oven-nya sangat halus dan tidak berbau cat. Ambalan mudah diatur tingginya untuk botol sirup. Layanan denah 3D sangat membantu saat pengajuan izin tata ruang apotek.",
  },
  {
    id: 2,
    name: "I Made Wira Pratama",
    role: "Dewata Retail Market",
    city: "Denpasar, Bali",
    avatar: "/avatar-wira.webp",
    quote:
      "Paling hemat dan puas dengan fasilitas Free Ongkir ke Bali. Kami hemat biaya kirim belasan juta dibanding supplier lain. Kualitas plat baja SPCC-nya tebal dan kokoh, ambalan tidak melengkung biarpun diisi tumpukan sembako dan minuman berat.",
  },
  {
    id: 3,
    name: "Hendra Kusuma, S.E.",
    role: "Minimarket Sinar Mandiri",
    city: "Surabaya, Jawa Timur",
    avatar: "/avatar-bambang.webp",
    quote:
      "Rak gondola custom Ritelindo sangat pas dengan tiang gedung toko kami. Rak single menempel dinding rapi dan rak double di tengah membuat lorong belanja lega. Pelanggan jauh lebih betah berbelanja kebutuhan sehari-hari.",
  },
];

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Smooth sync between scroll position and active index
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let timeoutId: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (!container) return;
        const scrollLeft = container.scrollLeft;
        const firstCard = container.children[0] as HTMLElement | null;
        if (!firstCard) return;
        const cardWidth = firstCard.offsetWidth + (window.innerWidth < 640 ? 16 : 24);
        const newIndex = Math.round(scrollLeft / cardWidth);
        setActiveIndex(Math.max(0, Math.min(TESTIMONIALS.length - 1, newIndex)));
      }, 40);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      container.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const clampedIndex = Math.max(0, Math.min(TESTIMONIALS.length - 1, index));
    const targetCard = container.children[clampedIndex] as HTMLElement | null;
    if (targetCard) {
      const containerLeft = container.offsetLeft;
      const cardLeft = targetCard.offsetLeft;
      const offset = cardLeft - containerLeft - (window.innerWidth < 640 ? 16 : 0);
      container.scrollTo({
        left: Math.max(0, offset),
        behavior: "smooth",
      });
      setActiveIndex(clampedIndex);
    }
  };

  const handlePrev = () => {
    const nextIdx = activeIndex === 0 ? TESTIMONIALS.length - 1 : activeIndex - 1;
    scrollToIndex(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = activeIndex === TESTIMONIALS.length - 1 ? 0 : activeIndex + 1;
    scrollToIndex(nextIdx);
  };

  // Touch swipe support for ultra-fluid native mobile gesture
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Detect intentional horizontal swipe (> 35px delta and more horizontal than vertical)
    if (Math.abs(deltaX) > 35 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <section
      id="testimoni"
      className="relative z-10 bg-white pt-16 sm:pt-20 lg:pt-24 pb-10 sm:pb-14 lg:pb-16 font-montserrat"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block: Title on Left, Carousel Navigation on Right */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-16">
          
          <ScrollReveal direction="left" distance={35} className="max-w-2xl">
            <div className="space-y-3">
              {/* 2-Line Monumental Serif Italic Headline */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-serif italic text-[#1C1917] tracking-tight leading-[1.14]">
                <span className="block">Kisah Nyata Mitra Retail</span>
                <span className="block mt-1 sm:mt-1.5">Tumbuh Bersama Ritelindo</span>
              </h2>

              {/* Clean sans-serif subtitle under the heading */}
              <p className="text-xs sm:text-sm md:text-[15px] text-[#635E59] font-light leading-relaxed pt-1">
                Pengalaman langsung para pemilik minimarket mandiri, toko sembako modern, apotek, dan jaringan retail yang mempercayakan rancangan layout dan pengadaan rak pabrik kepada Ritelindo Group.
              </p>
            </div>
          </ScrollReveal>

          {/* Circular Carousel Arrow Navigation (←) (→) */}
          <ScrollReveal direction="right" distance={35} className="shrink-0 self-end md:self-auto">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <button
                type="button"
                onClick={handlePrev}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-neutral-300 hover:border-black bg-white flex items-center justify-center text-[#1C1917] hover:bg-black hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
                aria-label="Lihat Sebelumnya"
              >
                <ArrowLeft className="w-5 h-5 stroke-[1.5]" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-neutral-300 hover:border-black bg-white flex items-center justify-center text-[#1C1917] hover:bg-black hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
                aria-label="Lihat Berikutnya"
              >
                <ArrowRight className="w-5 h-5 stroke-[1.5]" />
              </button>
            </div>
          </ScrollReveal>

        </div>

        {/* Testimonial Cards Carousel Track */}
        <ScrollReveal direction="up" distance={40} delay={100}>
          <div
            ref={scrollRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{
              WebkitOverflowScrolling: "touch",
              overscrollBehaviorX: "contain",
              scrollPaddingLeft: "16px",
              scrollPaddingRight: "16px",
            }}
            className="flex gap-4 sm:gap-6 lg:gap-7 overflow-x-auto scrollbar-none scroll-smooth snap-x snap-mandatory pt-2 pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 cursor-grab active:cursor-grabbing"
          >
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="group shrink-0 w-[84vw] max-w-[340px] sm:w-[calc(50%-0.85rem)] lg:w-[calc(33.333%-1.2rem)] snap-start bg-white rounded-2xl sm:rounded-[1.75rem] p-6 sm:p-8 md:p-9 flex flex-col justify-between shadow-[0_4px_25px_rgba(0,0,0,0.05)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-neutral-200/80 select-none"
            >
              {/* Quote Text */}
              <div className="space-y-2">
                <p className="font-montserrat text-[13px] sm:text-sm md:text-[14.5px] text-[#2C2825] leading-relaxed font-normal">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Card Footer: Avatar + Name on left, Sage Green Quotation Mark on right */}
              <div className="mt-8 sm:mt-10 pt-4 flex items-center justify-between gap-4 border-t border-neutral-100">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden shrink-0 border border-black/10">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      fill
                      className="object-cover"
                      sizes="44px"
                    />
                  </div>
                  <div className="min-w-0 font-montserrat">
                    <h3 className="font-bold text-xs sm:text-[13px] text-[#1C1917] truncate leading-tight">
                      {t.name}
                    </h3>
                    <p className="text-[11px] text-[#78716C] truncate mt-0.5">
                      {t.role} • {t.city.split(",")[0]}
                    </p>
                  </div>
                </div>

                {/* Twin Quotation Mark Icon in Muted Olive/Sage Green */}
                <svg
                  className="w-7 h-7 sm:w-8 sm:h-8 text-[#8C987E] fill-current shrink-0 select-none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                </svg>
              </div>

            </div>
          ))}
        </div>

        {/* Mobile Pagination Stepper Dots */}
        <div className="flex sm:hidden items-center justify-center gap-2 mt-4 select-none">
          {TESTIMONIALS.map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              onClick={() => scrollToIndex(dotIdx)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                dotIdx === activeIndex
                  ? "w-6 bg-[#1C1917]"
                  : "w-2 bg-neutral-300 hover:bg-neutral-500"
              }`}
              aria-label={`Buka testimoni ${dotIdx + 1}`}
            />
          ))}
        </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
