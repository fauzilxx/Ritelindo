"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import DomeGallery from "./DomeGallery";
import ScrollReveal from "./ScrollReveal";

// Official brand partner logos with transparent backgrounds
const PARTNER_IMAGES = [
  { src: "/partners/logo-alfamart.webp", alt: "Alfamart" },
  { src: "/partners/logo-indomaret.webp", alt: "Indomaret" },
  { src: "/partners/logo-aeon.webp", alt: "AEON Supermarket" },
  { src: "/partners/logo-familymart.webp", alt: "FamilyMart" },
  { src: "/partners/logo-k3mart.webp", alt: "K3 Mart" },
  { src: "/partners/logo-mayora.webp", alt: "Mayora" },
  { src: "/partners/logo-wings.webp", alt: "Wings Group" },
  { src: "/partners/logo-kopdeskel.webp", alt: "Koperasi Merah Putih" },
  // Duplicate array elements to ensure seamless high-density tiling across dome segments
  { src: "/partners/card-alfamart.webp", alt: "Alfamart Minimarket" },
  { src: "/partners/card-indomaret.webp", alt: "Indomaret Retail" },
  { src: "/partners/card-aeon.webp", alt: "AEON Supermarket Modern" },
  { src: "/partners/card-familymart.webp", alt: "FamilyMart Convenience" },
  { src: "/partners/card-k3mart.webp", alt: "K3 Mart Lifestyle" },
  { src: "/partners/card-mayora.webp", alt: "Mayora FMCG" },
  { src: "/partners/card-wings.webp", alt: "Wings Group Indonesia" },
  { src: "/partners/card-kopdeskel.webp", alt: "Kopdeskel Merah Putih" },
];

// Clean partner metadata for mobile marquee cards
const MOBILE_PARTNERS_ROW1 = [
  { name: "Alfamart", role: "Minimarket Nasional", logo: "/partners/logo-alfamart.webp" },
  { name: "Indomaret", role: "Jaringan Retail", logo: "/partners/logo-indomaret.webp" },
  { name: "AEON", role: "Supermarket Modern", logo: "/partners/logo-aeon.webp" },
  { name: "FamilyMart", role: "Convenience Store", logo: "/partners/logo-familymart.webp" },
];

const MOBILE_PARTNERS_ROW2 = [
  { name: "K3 Mart", role: "Lifestyle Mart", logo: "/partners/logo-k3mart.webp" },
  { name: "Mayora", role: "FMCG Partner", logo: "/partners/logo-mayora.webp" },
  { name: "Wings Group", role: "Distribusi FMCG", logo: "/partners/logo-wings.webp" },
  { name: "Kopdeskel", role: "Koperasi Modern", logo: "/partners/logo-kopdeskel.webp" },
];

export default function CompanyPartnership() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [exitScale, setExitScale] = useState(1);
  const [exitDimOpacity, setExitDimOpacity] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const winH = window.innerHeight;
            const scrolledDistance = -rect.top;

            // Phase: StoreCalculator rises up with -mt-[100vh] over CompanyPartnership
            // - On desktop: CompanyPartnership is fully visible and stationary until winH * 0.75
            // - On mobile: Balanced height (~156vh) gives clean bottom breathing space below trust metrics
            const isMobile = window.innerWidth < 768;
            const exitStart = isMobile ? winH * 0.25 : winH * 0.75;
            const exitDuration = isMobile ? winH * 0.45 : winH * 1.0;

            if (scrolledDistance >= exitStart) {
              const exitProgress = Math.max(
                0,
                Math.min(1, (scrolledDistance - exitStart) / exitDuration)
              );
              setExitScale(isMobile ? 1 : 1 - exitProgress * 0.05); // Keep 100% flush width on mobile
              setExitDimOpacity(exitProgress * 0.35); // Subtle dark depth 0.0 -> 0.35
            } else {
              setExitScale(1);
              setExitDimOpacity(0);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      id="kemitraan"
      ref={containerRef}
      className="relative z-30 w-full -mt-[100vh] bg-[#0A090D] shadow-[0_-35px_90px_rgba(0,0,0,0.85)] font-montserrat min-h-[155vh] min-[390px]:min-h-[158vh] sm:min-h-[165vh] md:min-h-[275vh]"
    >
      {/* Concave Inward Scoop Transition Header - Exactly matches Catalog to Why Ritelindo */}
      <div className="absolute -top-10 sm:-top-14 md:-top-16 left-0 right-0 w-full overflow-hidden pointer-events-none z-30">
        <svg
          viewBox="0 0 1440 70"
          preserveAspectRatio="none"
          className="w-full h-10 sm:h-14 md:h-16 block text-[#0A090D] fill-current"
          aria-hidden="true"
        >
          <path d="M 0,0 C 0,44 36,70 80,70 L 1360,70 C 1404,70 1440,44 1440,0 L 1440,70 L 0,70 Z" />
          <path
            d="M 0,0 C 0,44 36,70 80,70 L 1360,70 C 1404,70 1440,44 1440,0"
            fill="none"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* 
        Sticky Card Container:
        - Scales down subtly (1.0 -> 0.95) as StoreCalculator covers it
        - Ambient dimming overlay gives stacked physical card depth
      */}
      <div 
        className="sticky top-0 w-full h-screen overflow-hidden bg-[#0A090D] select-none origin-top will-change-transform transition-transform duration-75 ease-out flex flex-col items-center justify-start md:justify-center pt-8 min-[380px]:pt-10 sm:pt-14 md:pt-0"
        style={{
          transform: `scale(${exitScale})`,
        }}
      >
        {/* Hidden eager preloader to guarantee instant GPU rendering of all 8 logos */}
        <div className="hidden" aria-hidden="true">
          {[...MOBILE_PARTNERS_ROW1, ...MOBILE_PARTNERS_ROW2].map((p, idx) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={`preload-${idx}`} src={p.logo} alt="" loading="eager" decoding="sync" />
          ))}
        </div>

        {/* ======================================================== */}
        {/* MOBILE VIEW (< md): Cut Top Space & Instant Logo Render   */}
        {/* ======================================================== */}
        <div className="md:hidden w-full flex flex-col items-center gap-3.5 sm:gap-4 px-3 pt-1 sm:pt-3 pb-3 relative z-20">
          
          {/* Top Section Header (Starts high up, zero empty space above) */}
          <div className="text-center space-y-1.5 max-w-xs mx-auto">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-extrabold tracking-widest text-[#E8F878] uppercase bg-white/10 border border-white/15">
              JARINGAN MITRA &amp; WARALABA
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-black tracking-tight text-white leading-tight">
              Dipercaya Jaringan Retail Indonesia
            </h2>
            <p className="text-[11px] text-neutral-300 font-light leading-snug">
              Suplier rak gondola terpercaya untuk waralaba nasional, supermarket, dan ratusan minimarket mandiri.
            </p>
          </div>

          {/* Center: Dual-Track Seamless Infinite Marquee Showcase (Instant Eager Render) */}
          <div className="w-full space-y-2.5 relative overflow-hidden py-1">
            {/* Left/Right Edge Fades */}
            <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#0A090D] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#0A090D] to-transparent z-10 pointer-events-none" />

            {/* Marquee Row 1 (Moving Left) */}
            <div className="flex gap-2.5 overflow-hidden">
              <div className="flex gap-2.5 shrink-0 animate-marquee-left">
                {[...MOBILE_PARTNERS_ROW1, ...MOBILE_PARTNERS_ROW1, ...MOBILE_PARTNERS_ROW1].map((partner, idx) => (
                  <div
                    key={`row1-${idx}`}
                    className="w-[130px] sm:w-[145px] h-[68px] sm:h-[74px] bg-white rounded-xl p-2 flex flex-col items-center justify-between shadow-md border border-white/20 shrink-0"
                  >
                    <div className="h-7 sm:h-8 w-full flex items-center justify-center overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        loading="eager"
                        decoding="sync"
                        className="h-full w-auto max-w-[85%] object-contain select-none pointer-events-none"
                      />
                    </div>
                    <span className="text-[8.5px] font-extrabold text-[#1C1917]/75 uppercase tracking-wide truncate w-full text-center">
                      {partner.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Marquee Row 2 (Moving Right) */}
            <div className="flex gap-2.5 overflow-hidden">
              <div className="flex gap-2.5 shrink-0 animate-marquee-right">
                {[...MOBILE_PARTNERS_ROW2, ...MOBILE_PARTNERS_ROW2, ...MOBILE_PARTNERS_ROW2].map((partner, idx) => (
                  <div
                    key={`row2-${idx}`}
                    className="w-[130px] sm:w-[145px] h-[68px] sm:h-[74px] bg-white rounded-xl p-2 flex flex-col items-center justify-between shadow-md border border-white/20 shrink-0"
                  >
                    <div className="h-7 sm:h-8 w-full flex items-center justify-center overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        loading="eager"
                        decoding="sync"
                        className="h-full w-auto max-w-[85%] object-contain select-none pointer-events-none"
                      />
                    </div>
                    <span className="text-[8.5px] font-extrabold text-[#1C1917]/75 uppercase tracking-wide truncate w-full text-center">
                      {partner.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Trust Metrics Pill */}
          <div className="text-center pt-1.5 pb-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-neutral-300 font-medium">
              <span className="text-[#E8F878] font-bold">500+</span> Toko Mitra
              <span className="text-white/20">•</span>
              <span className="text-[#E8F878] font-bold">Jawa &amp; Bali</span>
              <span className="text-white/20">•</span>
              <span className="text-[#E8F878] font-bold">Standar Pabrik</span>
            </div>
          </div>

        </div>

        {/* ======================================================== */}
        {/* DESKTOP VIEW (>= md): 3D Spherical Dome + Frosted Card */}
        {/* ======================================================== */}
        <div className="hidden md:block absolute inset-0 w-full h-full">
          {/* 3D Spherical Dome Gallery */}
          <div className="absolute inset-0 w-full h-full">
            <DomeGallery
              images={PARTNER_IMAGES}
              fit={1.0}
              minRadius={900}
              maxVerticalRotationDeg={0}
              segments={28}
              dragDampening={2}
              grayscale={false}
              imageBorderRadius="14px"
              overlayBlurColor="#0A090D"
              autoRotateSpeed={0.045}
            />
          </div>

          {/* Floating Centered Typography with Protected Frosted Backing to Guarantee 0 Collision */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-30 select-none px-4 text-center">
            <ScrollReveal direction="up" distance={30}>
              <div className="max-w-xl mx-auto p-8 lg:p-10 rounded-3xl bg-[#0A090D]/85 backdrop-blur-2xl border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
                <span className="inline-flex items-center px-4 py-1 rounded-full text-[10px] font-bold tracking-widest text-[#E8F878] uppercase bg-white/10 border border-white/15 mb-3 font-montserrat">
                  JARINGAN MITRA &amp; WARALABA
                </span>

                <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white font-serif drop-shadow-[0_12px_45px_rgba(0,0,0,1)]">
                  Ritelindo
                </h2>

                <p className="mt-3 text-xs sm:text-base text-neutral-300 font-medium leading-relaxed max-w-md mx-auto font-montserrat">
                  Solusi Rak Gondola &amp; Display Komersial Terpercaya untuk Jaringan Toko Modern Indonesia
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Ambient shadow / dim overlay that activates as StoreCalculator covers CompanyPartnership */}
        <div 
          aria-hidden="true"
          className="absolute inset-0 bg-[#0A090D] pointer-events-none transition-opacity duration-75 ease-out z-[70]"
          style={{ opacity: exitDimOpacity }}
        />
      </div>
    </div>
  );
}
