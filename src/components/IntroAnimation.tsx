"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";

export default function IntroAnimation() {
  // view:
  // 0 = View 1: Kinetic Staggered Wave
  // 1 = View 2: Brandmark + 3 Enriched Showcase Cards (Extended duration & larger size!)
  // 2 = View 3: Giant Typography Stretch RITELINDO
  // 3 = Exit curtain slide-up reveal
  // 4 = Complete / Unmounted
  const [view, setView] = useState<number>(0);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);

  useEffect(() => {
    // Lock body scroll during animation
    document.body.style.overflow = "hidden";

    // View 1 (Kinetic Wave): 0.0s -> 1.3s
    const t1 = setTimeout(() => setView(1), 1300);

    // View 2 (Showcase Cards - EXTENDED DURATION as requested: 1.3s -> 4.5s, full 3.2s display!)
    const t2 = setTimeout(() => setView(2), 4500);

    // View 3 (Giant Typography): 4.5s -> 5.8s
    const t3 = setTimeout(() => setView(3), 5800);

    // Exit Curtain Wipe: 5.8s -> 6.6s
    const t4 = setTimeout(() => {
      setView(4);
      setIsDismissed(true);
      document.body.style.overflow = "";
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("intro-finished"));
      }
    }, 6600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      document.body.style.overflow = "";
    };
  }, []);

  const handleSkip = () => {
    setView(4);
    setIsDismissed(true);
    document.body.style.overflow = "";
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("intro-finished"));
    }
  };

  if (isDismissed || view === 4) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] select-none overflow-hidden transition-transform duration-800 ease-[cubic-bezier(0.85,0,0.15,1)] ${
        view === 3 ? "-translate-y-full" : "translate-y-0"
      }`}
      style={{
        backgroundColor: "#E8F878", // Uniform Chartreuse Lime background throughout entire intro
      }}
    >
      {/* Skip Button Top Right */}
      <button
        onClick={handleSkip}
        className="absolute top-5 right-5 z-50 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-mono tracking-wider bg-black/15 hover:bg-black/25 text-[#1C1917] transition-all cursor-pointer backdrop-blur-xs"
        aria-label="Lewati Intro"
      >
        <span>Lewati [Skip]</span>
        <X className="w-3.5 h-3.5" />
      </button>

      {/* ============================================================ */}
      {/* VIEW 1: KINETIC STAGGERED WAVE (Text only, icon removed)     */}
      {/* ============================================================ */}
      <div
        className={`absolute inset-0 flex items-center justify-center p-4 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          view === 0
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-125 -translate-y-8 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center max-w-5xl w-full">
          {/* Stepped Wave Typography Block */}
          <div className="flex items-end justify-center gap-1 sm:gap-2 w-full overflow-hidden">
            {["R", "I", "T", "E", "L", "I", "N", "D", "O"].map((char, i) => {
              const heights = [
                "h-28 sm:h-44 md:h-52",
                "h-32 sm:h-48 md:h-56",
                "h-36 sm:h-52 md:h-60",
                "h-40 sm:h-56 md:h-64",
                "h-36 sm:h-52 md:h-60",
                "h-32 sm:h-48 md:h-56",
                "h-28 sm:h-44 md:h-52",
                "h-24 sm:h-40 md:h-48",
                "h-20 sm:h-36 md:h-44",
              ];
              return (
                <div
                  key={i}
                  style={{
                    transitionDelay: `${i * 35}ms`,
                  }}
                  className={`flex-1 flex items-center justify-center bg-[#1C1917] text-[#FAF6F0] font-black text-3xl sm:text-5xl md:text-6xl font-mono tracking-tighter rounded-xl sm:rounded-2xl shadow-xl ${heights[i]} transition-all duration-500 transform hover:scale-105`}
                >
                  <span className="drop-shadow-sm">{char}</span>
                </div>
              );
            })}
          </div>

          {/* Subtitle Text Only (Logo/Sparkles icon removed as requested) */}
          <div className="mt-8 flex items-center justify-center text-[11px] sm:text-xs font-mono font-bold tracking-[0.25em] text-[#1C1917]/85 uppercase">
            <span>PABRIK RAK GONDOLA MINIMARKET & RETAIL</span>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* VIEW 2: BRANDMARK + 3 SHOWCASE CARDS (LARGER & LONGER DURATION) */}
      {/* ============================================================ */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center px-4 py-6 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          view === 1
            ? "opacity-100 scale-100 translate-y-0"
            : view < 1
            ? "opacity-0 scale-75 translate-y-12 pointer-events-none"
            : "opacity-0 scale-90 -translate-y-8 pointer-events-none"
        }`}
      >
        {/* Centered Brand Title */}
        <div className="text-center mb-5 sm:mb-8 z-10 shrink-0">
          <div className="flex items-center justify-center">
            <span className="font-serif font-black text-4xl sm:text-6xl lg:text-7xl text-[#1C1917] tracking-[0.14em]">
              RITELINDO
            </span>
          </div>
          <p className="text-[11px] sm:text-xs font-mono tracking-[0.22em] text-[#1C1917]/85 uppercase mt-1.5 font-bold">
            Pabrikasi Langsung • Free Desain 3D • Free Ongkir Jawa-Bali
          </p>
        </div>

        {/* 3 Showcase Poster Cards: 3 EQUAL-SIZED RECTANGULAR CARDS (ENLARGED, RESPONSIVE, NEVER CLIPPED) */}
        <div className="flex items-center justify-center gap-2.5 sm:gap-5 lg:gap-7 w-full max-w-6xl z-10 px-1 sm:px-4">
          
          {/* Card 1: Showroom Retail Modern */}
          <div className="flex-1 max-w-[340px] lg:max-w-[380px] aspect-[3/4] max-h-[56vh] sm:max-h-[60vh] rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-2xl border-2 border-black/15 relative group transition-all duration-500 hover:scale-[1.03] hover:shadow-black/40">
            <Image
              src="/hero-store.webp"
              alt="Minimarket Modern Showcase"
              fill
              priority
              quality={95}
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 640px) 33vw, (max-width: 1024px) 33vw, 400px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-3 sm:p-5 lg:p-6 text-white">
              <span className="text-[8px] sm:text-[10px] uppercase font-mono tracking-wider text-[#E8F878] font-bold">
                Showroom Retail
              </span>
              <span className="text-xs sm:text-base lg:text-lg font-bold font-serif leading-tight mt-0.5 sm:mt-1">
                Kerapian Standar Modern
              </span>
              <p className="hidden md:block text-[11px] text-neutral-200 mt-1 font-light line-clamp-1">
                Tata letak lorong rak minimarket profesional
              </p>
            </div>
          </div>

          {/* Card 2: 3D Architectural Layout Showcase (EQUAL SIZE) */}
          <div className="flex-1 max-w-[340px] lg:max-w-[380px] aspect-[3/4] max-h-[56vh] sm:max-h-[60vh] rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-2xl border-2 border-black/15 relative group transition-all duration-500 hover:scale-[1.03] hover:shadow-black/40">
            <Image
              src="/layout-3d.webp"
              alt="Desain Layout 3D Presisi"
              fill
              priority
              quality={95}
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 640px) 33vw, (max-width: 1024px) 33vw, 400px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-3 sm:p-5 lg:p-6 text-white">
              <span className="text-[8px] sm:text-[10px] uppercase font-mono tracking-wider text-[#E8F878] font-bold">
                100% Free Desain
              </span>
              <span className="text-xs sm:text-base lg:text-lg font-bold font-serif leading-tight mt-0.5 sm:mt-1">
                Simulasi Denah 3D Retail
              </span>
              <p className="hidden md:block text-[11px] text-neutral-200 mt-1 font-light line-clamp-1">
                Presisi lorong troli, titik kasir & modul rak
              </p>
            </div>
          </div>

          {/* Card 3: Fabrikasi Teknisi Pabrik (EQUAL SIZE) */}
          <div className="flex-1 max-w-[340px] lg:max-w-[380px] aspect-[3/4] max-h-[56vh] sm:max-h-[60vh] rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-2xl border-2 border-black/15 relative group transition-all duration-500 hover:scale-[1.03] hover:shadow-black/40">
            <Image
              src="/craftsman.webp"
              alt="Fabrikasi Plat Baja"
              fill
              priority
              quality={95}
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 640px) 33vw, (max-width: 1024px) 33vw, 400px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-3 sm:p-5 lg:p-6 text-white">
              <span className="text-[8px] sm:text-[10px] uppercase font-mono tracking-wider text-[#E8F878] font-bold">
                Standar Mutu Pabrik
              </span>
              <span className="text-xs sm:text-base lg:text-lg font-bold font-serif leading-tight mt-0.5 sm:mt-1">
                Plat Baja Cold Rolled SPCC
              </span>
              <p className="hidden md:block text-[11px] text-neutral-200 mt-1 font-light line-clamp-1">
                Finishing powder coating anti gores & kokoh
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ============================================================ */}
      {/* VIEW 3: GIANT TYPOGRAPHY STRETCH (Impact Zoom-In Reveal)    */}
      {/* ============================================================ */}
      <div
        className={`absolute inset-0 flex items-center justify-center p-4 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          view === 2
            ? "opacity-100 scale-100 translate-y-0"
            : view < 2
            ? "opacity-0 scale-75 translate-y-12 pointer-events-none"
            : "opacity-0 scale-105 pointer-events-none"
        }`}
      >
        <div className="w-full text-center">
          <span className="block font-serif font-black tracking-tight text-[16vw] sm:text-[14vw] lg:text-[11.5rem] leading-[0.82] select-none text-[#1C1917] drop-shadow-sm">
            RITELINDO
          </span>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm font-bold tracking-widest uppercase font-mono text-[#1C1917]/90">
            <span className="bg-black/10 px-3.5 py-1 rounded-full">Pabrikasi Langsung</span>
            <span>•</span>
            <span className="bg-black/10 px-3.5 py-1 rounded-full">Free Ongkir Jawa-Bali</span>
            <span>•</span>
            <span className="bg-black/10 px-3.5 py-1 rounded-full">Free Desain 3D</span>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* BOTTOM ELEGANT PROGRESS LINE                                 */}
      {/* ============================================================ */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/10">
        <div
          className="h-full bg-[#1C1917] transition-all duration-700 ease-linear"
          style={{ width: `${Math.min(100, ((view + 1) / 3) * 100)}%` }}
        />
      </div>
    </div>
  );
}
