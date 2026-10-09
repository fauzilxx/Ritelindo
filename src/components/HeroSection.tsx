"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { buildWhatsAppLink } from "@/utils/whatsapp";
import HeroCurvedTitle from "./HeroCurvedTitle";
import WhatsAppIcon from "./WhatsAppIcon";
import ScrollReveal from "./ScrollReveal";

export default function HeroSection() {
  const waHeroUrl = buildWhatsAppLink(
    "Halo Tim Ritelindo, saya ingin konsultasi gratis dan klaim Desain Denah 3D untuk rencana toko saya."
  );

  return (
    <section className="relative w-full min-h-screen lg:h-screen flex flex-col justify-between overflow-hidden bg-black p-0 m-0">
      
      {/* Background Photography: 100% FULL-SCREEN FULL-BLEED, NO BROWN OVERLAY */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-store.webp"
          alt="Showroom Toko Retail Modern Ritelindo"
          fill
          priority
          className="object-cover object-center scale-100"
          sizes="100vw"
        />
        {/* Subtle natural neutral contrast for crystal-clear readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/15 to-black/30 pointer-events-none" />
      </div>

      {/* TOP CENTER: Hero Headline & Subtitle Block (Clear of Floating Navbar) */}
      <div className="relative z-10 text-center max-w-4xl lg:max-w-5xl mx-auto pt-24 sm:pt-28 md:pt-32 px-4 sm:px-6 space-y-3 sm:space-y-4">
        
        <ScrollReveal direction="down" distance={18} delay={120}>
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/20 text-[11px] font-semibold tracking-wider text-[#E8F878] uppercase shadow-sm">
            Pabrik Rak Gondola & Interior Retail
          </div>
        </ScrollReveal>

        {/* 2-Line Headline as requested */}
        <ScrollReveal direction="up" distance={28} delay={220}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-serif font-bold tracking-tight text-white leading-[1.15] drop-shadow-[0_2px_18px_rgba(0,0,0,0.85)]">
            <span className="block">Bangun Toko & Minimarket Modern</span>
            <span className="block mt-1 sm:mt-1.5">Sesuai Impian Anda</span>
          </h1>
        </ScrollReveal>

        <ScrollReveal direction="up" distance={22} delay={340}>
          <p className="text-xs sm:text-sm md:text-base text-neutral-100 max-w-xl mx-auto font-light leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
            Langsung dari pabrik. Dapatkan fasilitas <strong>Free Desain Layout 3D</strong>, <strong>Free Ongkir Jawa & Bali</strong>, dan <strong>Free Perakitan</strong> oleh teknisi berpengalaman.
          </p>
        </ScrollReveal>

      </div>

      {/* BOTTOM: Consultation Pill Button directly above RITELINDO + Giant Curved Title (Flush to bottom) */}
      <div className="relative z-10 w-full mt-auto flex flex-col items-center">
        
        {/* Consultation Button Positioned Directly Above the Curved Arch of RITELINDO */}
        <ScrollReveal direction="up" distance={20} delay={460} className="mb-2 sm:mb-3 lg:mb-4 z-20">
          <a
            href={waHeroUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-bold bg-[#E8F878] hover:bg-[#DDF067] text-[#1C1917] transition-all duration-300 shadow-2xl shadow-black/50 hover:scale-105 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(232,248,120,0.55)] active:scale-95 group relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700"
          >
            <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7 shrink-0 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6 relative z-10" />
            <span className="relative z-10 whitespace-nowrap">Konsultasi Desain 3D Gratis</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300 relative z-10" />
          </a>
        </ScrollReveal>

        {/* Giant Curved 'RITELINDO' Title (Subtly shifted down so only the very tip of the serifs slices into next section) */}
        <div className="w-full pb-0 mb-0 leading-none translate-y-1 sm:translate-y-2 md:translate-y-2.5 lg:translate-y-3">
          <HeroCurvedTitle />
        </div>

      </div>

    </section>
  );
}
