"use client";

import React, { useState } from "react";
import {
  ShoppingBag,
  Store,
  Pill,
  Dog,
  BookOpen,
  Cake,
  Shirt,
  Hammer,
  Check,
  ArrowRight,
} from "lucide-react";
import { SECTORS } from "@/data/landingData";
import { buildWhatsAppLink } from "@/utils/whatsapp";
import WhatsAppIcon from "./WhatsAppIcon";
import ScrollReveal from "./ScrollReveal";

const ICONS_MAP: Record<string, React.ReactNode> = {
  minimarket: <Store className="w-5 h-5" />,
  sembako: <ShoppingBag className="w-5 h-5" />,
  apotek: <Pill className="w-5 h-5" />,
  petshop: <Dog className="w-5 h-5" />,
  atk: <BookOpen className="w-5 h-5" />,
  "bahan-kue": <Cake className="w-5 h-5" />,
  fashion: <Shirt className="w-5 h-5" />,
  bangunan: <Hammer className="w-5 h-5" />,
};

export default function RetailSectors() {
  const [activeSectorId, setActiveSectorId] = useState(SECTORS[0].id);

  const activeSector = SECTORS.find((s) => s.id === activeSectorId) || SECTORS[0];

  const waSectorUrl = buildWhatsAppLink(
    `Halo Tim Ritelindo, saya berencana membuka/upgrade ${activeSector.name} (${activeSector.tagline}). Bisakah saya mendapatkan rekomendasi tipe rak dan simulasi denah 3D gratis?`
  );

  return (
    <section
      id="sektor-toko"
      className="py-16 sm:py-24 bg-white font-montserrat relative z-10 scroll-mt-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal direction="up" distance={30}>
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1C1917] tracking-tight leading-tight">
              Solusi Rak Presisi untuk Segala Sektor Bisnis
            </h2>
            <p className="text-xs sm:text-sm text-[#78716C] font-medium leading-relaxed max-w-2xl mx-auto">
              Setiap sektor memiliki karakteristik beban dan zonasi display yang berbeda. Tim arsitek Ritelindo merancang layout rak khusus yang disesuaikan dengan produk dagangan Anda.
            </p>
          </div>
        </ScrollReveal>

        {/* 8 Sector Quick Chips Switcher (Flex-Wrap Centered, Zero Cut-off) */}
        <ScrollReveal direction="up" distance={20} delay={150}>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-8 sm:mb-10 max-w-5xl mx-auto">
            {SECTORS.map((sec) => {
              const isActive = sec.id === activeSectorId;
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => setActiveSectorId(sec.id)}
                  className={`inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#E8F878] text-[#1C1917] border border-black/20 shadow-sm scale-102"
                      : "bg-[#F9F6F0] text-[#78716C] border border-[#E6DFD3] hover:text-[#1C1917] hover:bg-white"
                  }`}
                >
                  <span className={isActive ? "text-[#1C1917]" : "text-[#78716C]"}>
                    {ICONS_MAP[sec.id] || <Store className="w-4 h-4" />}
                  </span>
                  <span>{sec.name}</span>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Active Sector Detailed Bento Card */}
        <ScrollReveal direction="up" distance={30} delay={200}>
          <div className="w-full bg-[#FAF6F0] rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 lg:p-12 border border-[#E6DFD3] shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Sector Info & Technical Highlights */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E6DFD3] text-[10px] font-bold uppercase tracking-wider text-[#1C1917] mb-3">
                    {ICONS_MAP[activeSector.id]}
                    <span>{activeSector.name}</span>
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1C1917] tracking-tight leading-tight">
                    {activeSector.tagline}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-[#57534E] leading-relaxed">
                    {activeSector.description}
                  </p>
                </div>

                {/* Technical Highlights Checklist */}
                <div className="space-y-2.5 pt-2 border-t border-[#E6DFD3]/80">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#78716C] block">
                    Keunggulan Teknis Rak:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {activeSector.highlightPoints.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2 text-[#292524]">
                        <div className="w-4 h-4 rounded-full bg-[#E8F878] flex items-center justify-center shrink-0 mt-0.5 border border-black/10">
                          <Check className="w-2.5 h-2.5 text-[#1C1917] stroke-[3]" />
                        </div>
                        <span className="font-medium text-[11.5px] sm:text-xs">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Action */}
                <div className="pt-2">
                  <a
                    href={waSectorUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold bg-[#1C1917] hover:bg-black text-white hover:text-[#E8F878] transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 active:scale-95 group"
                  >
                    <WhatsAppIcon className="w-5 h-5 shrink-0 transition-transform duration-300 group-hover:scale-125" />
                    <span>Konsultasi Rak {activeSector.name}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>

              {/* Right Column: Recommended Shelf Specification Box */}
              <div className="lg:col-span-5">
                <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-[#E6DFD3] shadow-sm space-y-4">
                  <span className="text-[10px] font-extrabold tracking-widest text-[#1C1917]/70 uppercase block">
                    REKOMENDASI KONFIGURASI PABRIK:
                  </span>

                  <div className="p-4 rounded-xl bg-[#F9F6F0] border border-[#E6DFD3]">
                    <span className="text-xs font-bold text-[#1C1917] block leading-snug">
                      {activeSector.recommendedShelf}
                    </span>
                  </div>

                  <div className="space-y-2 text-[11px] text-[#78716C]">
                    <div className="flex items-center justify-between py-1 border-b border-[#E6DFD3]/60">
                      <span>Layanan Denah</span>
                      <strong className="text-[#1C1917]">Free Layout 3D</strong>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-[#E6DFD3]/60">
                      <span>Pengiriman</span>
                      <strong className="text-[#1C1917]">Free Ongkir Jawa-Bali</strong>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-[#E6DFD3]/60">
                      <span>Instalasi</span>
                      <strong className="text-[#1C1917]">Free Perakitan Teknisi</strong>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <span>Material</span>
                      <strong className="text-[#1C1917]">Plat Baja SPCC Cold-Rolled</strong>
                    </div>
                  </div>

                  <p className="text-[10px] text-center text-[#78716C] pt-1">
                    *Ukuran tinggi tiang &amp; ambalan dapat di-custom sesuai denah ruangan.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
