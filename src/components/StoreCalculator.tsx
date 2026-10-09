"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Plus,
  Minus,
} from "lucide-react";
import { buildWhatsAppLink } from "@/utils/whatsapp";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import ScrollReveal from "@/components/ScrollReveal";

interface StorePreset {
  label: string;
  dimension: string;
  area: number;
  type: string;
  desc: string;
}

const PRESETS: StorePreset[] = [
  {
    label: "Toko Kelontong / Sembako",
    dimension: "6m × 6m",
    area: 36,
    type: "sembako",
    desc: "1 lorong tengah, display beras & sembako maksimal",
  },
  {
    label: "Apotek & Farmasi",
    dimension: "5m × 8m",
    area: 40,
    type: "apotek",
    desc: "Ambalan rapat, display obat rapi & higienis BPOM",
  },
  {
    label: "Toko Bahan Kue / ATK",
    dimension: "7m × 8m",
    area: 56,
    type: "bahankue",
    desc: "Display toples bahan, packaging & rak perkakas",
  },
  {
    label: "Pet Shop / Baby Shop",
    dimension: "6m × 10m",
    area: 60,
    type: "petshop",
    desc: "Display pakan karung & rak gantung aksesoris",
  },
  {
    label: "Minimarket Standar",
    dimension: "8m × 8m",
    area: 64,
    type: "minimarket",
    desc: "2 lorong island tengah + rak dinding keliling",
  },
  {
    label: "Supermarket Retail",
    dimension: "10m × 12m",
    area: 120,
    type: "supermarket",
    desc: "Multi-lorong troli, meja kasir ganda & end gondola",
  },
];

export default function StoreCalculator() {
  const [storeArea, setStoreArea] = useState<number>(48);
  const [shelvingTier, setShelvingTier] = useState<number>(4);
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);

  // Accurate retail planning formulas
  const singleWallRacks = Math.max(6, Math.round(storeArea * 0.28));
  const doubleIslandRacks = Math.max(4, Math.round(storeArea * 0.18));
  const endGondolaRacks = Math.max(2, Math.round(doubleIslandRacks * 0.4));
  const cashCounters = storeArea >= 80 ? 2 : 1;
  const totalUnits = singleWallRacks + doubleIslandRacks + endGondolaRacks + cashCounters;

  // Shelving tier cost multiplier (4 susun: base, 5 susun: +10% ambalan, 6 susun: +20% ambalan)
  const tierMultiplier = shelvingTier === 6 ? 1.2 : shelvingTier === 5 ? 1.1 : 1.0;

  // Base factory direct wholesale rates (adjusted dynamically by shelving tier)
  const avgSinglePrice = Math.round(950000 * tierMultiplier);
  const avgDoublePrice = Math.round(1650000 * tierMultiplier);
  const avgEndPrice = Math.round(750000 * tierMultiplier);
  const avgCashCounterPrice = 2850000;

  const totalEstimate =
    singleWallRacks * avgSinglePrice +
    doubleIslandRacks * avgDoublePrice +
    endGondolaRacks * avgEndPrice +
    cashCounters * avgCashCounterPrice;

  // Approximate display capacity and total load
  const totalSkuCapacity = Math.round(
    (singleWallRacks + doubleIslandRacks * 2) * shelvingTier * 12
  );
  const totalLoadCapacityTons = (
    ((singleWallRacks + doubleIslandRacks * 2) * shelvingTier * 80) /
    1000
  ).toFixed(1);

  const handlePresetSelect = (idx: number) => {
    setSelectedPreset(idx);
    setStoreArea(PRESETS[idx].area);
  };

  const adjustArea = (delta: number) => {
    setStoreArea((prev) => {
      const next = Math.max(16, Math.min(200, prev + delta));
      setSelectedPreset(null);
      return next;
    });
  };

  const formatIDR = (num: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num);

  const formattedTotal = formatIDR(totalEstimate);

  const waCalcUrl = buildWhatsAppLink(
    `Halo Tim Ritelindo, saya telah menghitung estimasi kebutuhan toko dengan luas sekitar ${storeArea} m² (${shelvingTier} susun). Estimasi hasil kalkulator: ${singleWallRacks} Rak Dinding, ${doubleIslandRacks} Rak Tengah, ${endGondolaRacks} End Rak, dan ${cashCounters} Meja Kasir (Perkiraan: ${formattedTotal}). Mohon buatkan denah layout 3D gratis dan rincian penawarannya.`
  );

  return (
    <div
      id="kalkulator"
      className="pt-6 sm:pt-10 pb-20 sm:pb-28 relative z-10 scroll-mt-20"
    >

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Thematic Centered Section Heading (Inviting & Action-Oriented with Montserrat) */}
        <ScrollReveal direction="up" distance={30}>
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-montserrat font-extrabold text-[#1C1917] tracking-tight leading-tight">
              Berapa Kebutuhan Rak Toko Anda? Coba Hitung di Sini
            </h2>
            <p className="text-xs sm:text-sm text-[#78716C] font-montserrat font-medium leading-relaxed">
              Pilih jenis toko Anda atau geser ukuran luas ruangan di bawah untuk langsung melihat simulasi jumlah rak, kapasitas pajang produk, dan estimasi modal pabrik secara instan.
            </p>
          </div>
        </ScrollReveal>

        {/* Calculator Main Layout: Left Controls, Right Result Bento (Espresso Card) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Controls (7 cols) - Slide in from Left */}
          <ScrollReveal direction="left" distance={45} delay={100} className="lg:col-span-7 w-full">
            <div className="w-full bg-white rounded-[2.25rem] sm:rounded-[2.5rem] p-7 sm:p-10 border border-[#E6DFD3] shadow-xs space-y-8 font-montserrat">
            
            {/* Presets Row */}
            <div className="space-y-3">
              <div>
                <label className="text-base sm:text-lg font-montserrat font-bold text-[#1C1917] block tracking-tight">
                  Pilih Tipe / Luas Toko Populer:
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {PRESETS.map((preset, idx) => {
                  const isSelected = selectedPreset === idx;
                  return (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => handlePresetSelect(idx)}
                      className={`group p-3.5 sm:p-4 rounded-2xl text-left border transition-all duration-200 flex flex-col justify-between gap-2.5 relative font-montserrat ${
                        isSelected
                          ? "border-black bg-black text-white shadow-md scale-[1.01]"
                          : "border-[#E6DFD3] bg-[#F9F6F0] text-[#1C1917] hover:border-black/40 hover:bg-white hover:-translate-y-0.5"
                      }`}
                    >
                      {/* Top Header: Indicator + Dimension Tag + Area Pill */}
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`w-2 h-2 rounded-full transition-colors ${
                              isSelected
                                ? "bg-[#E8F878]"
                                : "bg-[#9C8062]/40 group-hover:bg-[#9C8062]"
                            }`}
                          />
                          <span
                            className={`text-xs font-bold tracking-tight ${
                              isSelected ? "text-[#E8F878]" : "text-black"
                            }`}
                          >
                            {preset.dimension}
                          </span>
                        </div>

                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                            isSelected
                              ? "bg-white/15 text-white"
                              : "bg-white text-[#1C1917] border border-[#E6DFD3] group-hover:border-[#9C8062]"
                          }`}
                        >
                          {preset.area} m²
                        </span>
                      </div>

                      {/* Content: Store Name & Architecture Subtitle */}
                      <div>
                        <span className="font-bold block leading-snug text-xs sm:text-[13px]">
                          {preset.label}
                        </span>
                        <span
                          className={`text-[10px] block mt-1 leading-snug ${
                            isSelected ? "text-neutral-300" : "text-[#78716C]"
                          }`}
                        >
                          {preset.desc}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Slider 1: Luas Toko + Stepper Controls */}
            <div className="space-y-4 pt-4 border-t border-[#E6DFD3]/70">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <label className="text-base sm:text-lg font-montserrat font-bold text-[#1C1917] block tracking-tight">
                    Luas Ruangan Toko:
                  </label>
                  <span className="text-xs sm:text-[13px] font-montserrat text-[#78716C] block mt-0.5">
                    Sesuaikan dengan panjang & lebar denah Anda
                  </span>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => adjustArea(-4)}
                    className="w-8 h-8 rounded-full border border-[#E6DFD3] bg-[#F9F6F0] hover:bg-black hover:text-[#E8F878] flex items-center justify-center transition-all text-[#1C1917]"
                    aria-label="Kurangi Luas"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>

                  <span className="text-base font-bold font-montserrat text-black px-3.5 py-1 rounded-full bg-[#E8F878] border border-black/5 shadow-2xs min-w-[76px] text-center">
                    {storeArea} m²
                  </span>

                  <button
                    type="button"
                    onClick={() => adjustArea(4)}
                    className="w-8 h-8 rounded-full border border-[#E6DFD3] bg-[#F9F6F0] hover:bg-black hover:text-[#E8F878] flex items-center justify-center transition-all text-[#1C1917]"
                    aria-label="Tambah Luas"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Slider Input */}
              <div className="space-y-2">
                <input
                  type="range"
                  min="16"
                  max="200"
                  step="2"
                  value={storeArea}
                  onChange={(e) => {
                    setStoreArea(Number(e.target.value));
                    setSelectedPreset(null);
                  }}
                  className="w-full h-2.5 bg-[#E6DFD3] rounded-lg appearance-none cursor-pointer accent-black"
                />
                <div className="flex justify-between text-[10px] text-[#78716C] font-montserrat font-medium">
                  <span>16 m² (Kios)</span>
                  <span>48 m²</span>
                  <span>80 m² (Minimarket)</span>
                  <span>140 m²</span>
                  <span>200 m² (Supermarket)</span>
                </div>
              </div>
            </div>

            {/* Slider 2: Jumlah Susun Shelving (Ambalan) */}
            <div className="space-y-3 pt-4 border-t border-[#E6DFD3]/70">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <label className="text-base sm:text-lg font-montserrat font-bold text-[#1C1917] block tracking-tight">
                    Jumlah Tingkat Shelving (Ambalan):
                  </label>
                  <span className="text-xs sm:text-[13px] font-montserrat text-[#78716C] block mt-0.5">
                    Kapasitas display vertikal per modul rak
                  </span>
                </div>
                <span className="text-xs sm:text-sm font-bold font-montserrat text-[#1C1917] px-3.5 py-1 rounded-full bg-[#F9F6F0] border border-[#E6DFD3] flex-shrink-0">
                  {shelvingTier} Susun
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { tier: 4, tag: "Standar", desc: "1 Dasar + 3 Atas" },
                  { tier: 5, tag: "Paling Populer", desc: "1 Dasar + 4 Atas" },
                  { tier: 6, tag: "Maksimal SKU", desc: "1 Dasar + 5 Atas" },
                ].map((item) => (
                  <button
                    key={item.tier}
                    type="button"
                    onClick={() => setShelvingTier(item.tier)}
                    className={`py-3 px-3 rounded-2xl border text-center transition-all font-montserrat ${
                      shelvingTier === item.tier
                        ? "border-black bg-black text-white shadow-sm"
                        : "border-[#E6DFD3] bg-[#F9F6F0] text-[#1C1917] hover:border-black/40 hover:bg-white"
                    }`}
                  >
                    <span className="font-bold text-xs block font-montserrat">
                      {item.tier} Tingkat
                    </span>
                    <span
                      className={`text-[10px] block mt-0.5 font-montserrat ${
                        shelvingTier === item.tier
                          ? "text-[#E8F878] font-bold"
                          : "text-[#78716C] font-semibold"
                      }`}
                    >
                      {item.tag}
                    </span>
                    <span
                      className={`text-[9px] block opacity-75 font-montserrat mt-0.5 font-medium ${
                        shelvingTier === item.tier
                          ? "text-neutral-300"
                          : "text-neutral-500"
                      }`}
                    >
                      {item.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>



            </div>
          </ScrollReveal>

          {/* RIGHT: Results Summary Card - Slide in from Right */}
          <ScrollReveal direction="right" distance={45} delay={200} className="lg:col-span-5 w-full">
            <div className="w-full bg-white text-[#1C1917] rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-8 lg:p-10 shadow-xs border border-[#E6DFD3] space-y-6 flex flex-col justify-between relative overflow-hidden font-montserrat">
            
            <div className="space-y-5 relative z-10 font-montserrat">
              
              {/* Header Box */}
              <div className="border-b border-[#E6DFD3] pb-4">
                <h3 className="text-base sm:text-lg font-montserrat font-bold text-black tracking-tight uppercase">
                  RINCIAN MODUL TOKO
                </h3>
              </div>

              {/* Breakdown List of Module Units */}
              <div className="space-y-2.5 text-xs">
                
                {/* 1. Single Wall */}
                <div className="p-3.5 rounded-2xl bg-[#F9F6F0] border border-[#E6DFD3] flex items-center justify-between hover:bg-[#F3EFE6] transition-colors">
                  <div>
                    <span className="font-montserrat font-bold block text-[#1C1917] text-xs sm:text-[13px]">
                      Rak Single Dinding (Wall)
                    </span>
                    <span className="text-[10px] text-[#78716C] block font-montserrat font-medium mt-0.5">
                      Menempel tembok • {shelvingTier} ambalan
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold font-montserrat text-base text-black block">
                      {singleWallRacks} Unit
                    </span>
                    <span className="text-[9px] font-montserrat font-semibold text-[#78716C] block">
                      @{formatIDR(avgSinglePrice)}
                    </span>
                  </div>
                </div>

                {/* 2. Double Island */}
                <div className="p-3.5 rounded-2xl bg-[#F9F6F0] border border-[#E6DFD3] flex items-center justify-between hover:bg-[#F3EFE6] transition-colors">
                  <div>
                    <span className="font-montserrat font-bold block text-[#1C1917] text-xs sm:text-[13px]">
                      Rak Double Island (Tengah)
                    </span>
                    <span className="text-[10px] text-[#78716C] block font-montserrat font-medium mt-0.5">
                      Display 2 sisi lorong • {shelvingTier} ambalan
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold font-montserrat text-base text-black block">
                      {doubleIslandRacks} Unit
                    </span>
                    <span className="text-[9px] font-montserrat font-semibold text-[#78716C] block">
                      @{formatIDR(avgDoublePrice)}
                    </span>
                  </div>
                </div>

                {/* 3. End Gondola */}
                <div className="p-3.5 rounded-2xl bg-[#F9F6F0] border border-[#E6DFD3] flex items-center justify-between hover:bg-[#F3EFE6] transition-colors">
                  <div>
                    <span className="font-montserrat font-bold block text-[#1C1917] text-xs sm:text-[13px]">
                      End Gondola (Tutup Lorong)
                    </span>
                    <span className="text-[10px] text-[#78716C] block font-montserrat font-medium mt-0.5">
                      Penutup ujung island • Promo display
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold font-montserrat text-base text-black block">
                      {endGondolaRacks} Unit
                    </span>
                    <span className="text-[9px] font-montserrat font-semibold text-[#78716C] block">
                      @{formatIDR(avgEndPrice)}
                    </span>
                  </div>
                </div>

                {/* 4. Cash Counter */}
                <div className="p-3.5 rounded-2xl bg-[#F9F6F0] border border-[#E6DFD3] flex items-center justify-between hover:bg-[#F3EFE6] transition-colors">
                  <div>
                    <span className="font-montserrat font-bold block text-[#1C1917] text-xs sm:text-[13px]">
                      Meja Kasir Modern
                    </span>
                    <span className="text-[10px] text-[#78716C] block font-montserrat font-medium mt-0.5">
                      Stainless steel / display slat checkout
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold font-montserrat text-base text-black block">
                      {cashCounters} Unit
                    </span>
                    <span className="text-[9px] font-montserrat font-semibold text-[#78716C] block">
                      @{formatIDR(avgCashCounterPrice)}
                    </span>
                  </div>
                </div>

              </div>

              {/* Architectural Capacity Blueprint Ribbon */}
              <div className="p-3.5 rounded-2xl bg-[#F9F6F0] border border-[#E6DFD3] grid grid-cols-3 gap-2 text-center font-montserrat">
                <div>
                  <span className="text-[9px] uppercase font-montserrat font-semibold text-[#78716C] block tracking-wider">
                    Total Modul
                  </span>
                  <span className="text-xs font-bold font-montserrat text-[#1C1917]">
                    {totalUnits} Unit
                  </span>
                </div>
                <div className="border-x border-[#E6DFD3]">
                  <span className="text-[9px] uppercase font-montserrat font-semibold text-[#78716C] block tracking-wider">
                    Kapasitas SKU
                  </span>
                  <span className="text-xs font-bold font-montserrat text-black">
                    ±{totalSkuCapacity} Pcs
                  </span>
                </div>
                <div>
                  <span className="text-[9px] uppercase font-montserrat font-semibold text-[#78716C] block tracking-wider">
                    Daya Beban
                  </span>
                  <span className="text-xs font-bold font-montserrat text-[#1C1917]">
                    {totalLoadCapacityTons} Ton
                  </span>
                </div>
              </div>

              {/* Total Price Estimate Box (Clean Warm Inset) */}
              <div className="p-5 rounded-2xl bg-[#F9F6F0] border border-[#E6DFD3] space-y-1 relative overflow-hidden font-montserrat">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider text-[#78716C] block font-montserrat font-semibold">
                    Perkiraan Modal Pengadaan Rak:
                  </span>
                  <span className="text-[9px] font-montserrat px-2 py-0.5 rounded-full bg-[#E8F878] text-[#1C1917] border border-black/5 font-bold tracking-wider uppercase">
                    Harga Grosir Pabrik
                  </span>
                </div>
                <span className="text-2xl sm:text-3xl lg:text-4xl font-montserrat font-extrabold text-black block tracking-tight">
                  {formattedTotal}
                </span>
                <p className="text-[10px] text-[#78716C] leading-tight pt-1 font-montserrat font-normal">
                  *Estimasi netto pabrik. Sudah termasuk Free Desain Denah 3D, Free Ongkir Jawa-Bali, dan perakitan teknisi.
                </p>
              </div>
            </div>

            {/* Direct WhatsApp Action Button */}
            <div className="pt-4 space-y-2 relative z-10 font-montserrat">
              <a
                href={waCalcUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 sm:py-3 pl-3.5 sm:pl-6 pr-2 sm:pr-2.5 rounded-full flex items-center justify-between font-bold text-xs sm:text-sm bg-[#E8F878] hover:bg-[#DDF067] text-[#1C1917] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] active:scale-95 group font-montserrat border border-black/10 shadow-md hover:shadow-[0_14px_30px_rgba(232,248,120,0.55)] relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700"
              >
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 relative z-10">
                  <WhatsAppIcon className="w-5 h-5 sm:w-7 sm:h-7 shrink-0 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6" />
                  <span className="font-montserrat font-bold tracking-tight text-[11px] min-[370px]:text-xs sm:text-[13px] whitespace-nowrap">
                    Kirim Hitungan &amp; Minta Desain 3D
                  </span>
                </div>

                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black text-[#E8F878] flex items-center justify-center shrink-0 ml-1.5 sm:ml-2 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 relative z-10">
                  <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </a>

              <p className="text-[10px] text-center text-[#78716C] font-montserrat font-medium">
                Respon Cepat via WhatsApp Pabrik • Konsultasi 100% Gratis &amp; Tanpa Komitmen
              </p>
            </div>

            </div>
          </ScrollReveal>

        </div>

      </div>
    </div>
  );
}

