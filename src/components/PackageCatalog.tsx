"use client";

import React from "react";
import { Check, ArrowUpRight } from "lucide-react";
import { buildWhatsAppLink } from "@/utils/whatsapp";
import WhatsAppIcon from "@/components/WhatsAppIcon";

interface PackageCard {
  id: string;
  name: string;
  badge: string;
  storeSize: string;
  priceRange: string;
  idealFor: string;
  features: string[];
  isPopular?: boolean;
}

const PACKAGES: PackageCard[] = [
  {
    id: "paket-36",
    name: "Paket Toko Kelontong Modern",
    badge: "Modal Awal Ringkas",
    storeSize: "Luas 24 - 36 m²",
    priceRange: "Rp 12 Jt - 18 Jt",
    idealFor: "Upgrade toko sembako lama jadi toko modern bersih rapi",
    features: [
      "8-10 Unit Rak Single Dinding (4 susun)",
      "4-6 Unit Rak Double Island (Tengah)",
      "2 Unit End Gondola Penutup",
      "1 Unit Meja Kasir Standar Modern",
      "Free Desain Denah Layout 3D",
      "Free Ongkir Seluruh Jawa-Bali",
    ],
  },
  {
    id: "paket-60",
    name: "Paket Minimarket Standar",
    badge: "Paling Banyak Dipilih",
    storeSize: "Luas 50 - 75 m²",
    priceRange: "Rp 25 Jt - 38 Jt",
    idealFor: "Minimarket mandiri baru setara standar waralaba nasional",
    isPopular: true,
    features: [
      "14-18 Unit Rak Single Dinding (5 susun)",
      "10-14 Unit Rak Double Island (2 lorong)",
      "4 Unit End Gondola Promo Utama",
      "1 Unit Meja Kasir Display Mika",
      "Aksesoris Price Tag Mika Lengkap",
      "Free Desain 3D & Free Perakitan Teknisi",
    ],
  },
  {
    id: "paket-120",
    name: "Paket Supermarket & Swalayan",
    badge: "Kapasitas Maksimal",
    storeSize: "Luas 100 - 150 m²",
    priceRange: "Rp 55 Jt - 85 Jt",
    idealFor: "Toko retail besar, grosir sembako, atau swalayan multi-lorong",
    features: [
      "24-32 Unit Rak Single Dinding Heavy",
      "20-28 Unit Rak Double Island Lebar",
      "6-8 Unit End Gondola Bertingkat",
      "2 Unit Meja Kasir Dual Station",
      "Rak Gudang Medium Duty Backoffice",
      "Free 3D Desain, Free Ongkir & Free Rakit",
    ],
  },
];

import ScrollReveal from "@/components/ScrollReveal";

export default function PackageCatalog() {
  return (
    <div id="paket-toko" className="pt-20 sm:pt-28 pb-10 sm:pb-14 relative z-10 scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading with Upward Reveal */}
        <ScrollReveal direction="up" distance={32}>
          <div className="text-center max-w-6xl mx-auto mb-12 sm:mb-16 space-y-3 font-montserrat">
            <h2
              className="font-montserrat font-black text-[#1C1917] tracking-tight uppercase whitespace-nowrap leading-none"
              style={{ fontSize: "clamp(1.2rem, 4.8vw, 3.75rem)" }}
            >
              PILIHAN PAKET TERIMA BERES
            </h2>
            <p className="text-xs sm:text-sm text-[#78716C] font-montserrat font-medium leading-relaxed max-w-2xl mx-auto pt-1">
              Estimasi modal pengadaan rak komplit langsung dari pabrik. Seluruh paket sudah termasuk konsultasi denah 3D, pengiriman gratis Jawa-Bali, dan perakitan teknisi langsung.
            </p>
          </div>
        </ScrollReveal>

        {/* 3 Packages Grid with Directional Entrance (Left, Up, Right) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch font-montserrat">
          {PACKAGES.map((pkg, idx) => {
            const waPkgUrl = buildWhatsAppLink(
              `Halo Tim Ritelindo, saya berminat dengan ${pkg.name} (${pkg.storeSize}, perkiraan ${pkg.priceRange}). Bisakah saya mendapatkan rincian denah 3D dan penawarannya?`
            );

            // Left card comes from left, center from bottom, right from right
            const revealDirection = idx === 0 ? "left" : idx === 1 ? "up" : "right";
            const revealDelay = idx * 120;

            return (
              <ScrollReveal
                key={pkg.id}
                direction={revealDirection}
                delay={revealDelay}
                distance={40}
                className="h-full flex"
              >
                <div
                  className={`w-full rounded-[1.75rem] min-[360px]:rounded-[2rem] sm:rounded-[2.25rem] p-4 min-[360px]:p-5 sm:p-7 md:p-8 flex flex-col justify-between transition-all duration-300 relative ${pkg.isPopular
                    ? "bg-black text-white shadow-xl scale-102 border border-black"
                    : "bg-white text-[#1C1917] border border-[#E6DFD3] hover:border-black/30 shadow-xs"
                    }`}
                >
                {/* Popular Ribbon Tag */}
                {pkg.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#E8F878] text-[#1C1917] px-4 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase shadow-xs font-montserrat">
                    Paling Banyak Dipilih
                  </div>
                )}

                <div>
                  {/* Top Badge */}
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider block mb-2 font-montserrat ${pkg.isPopular ? "text-[#E8F878]" : "text-black/60"
                      }`}
                  >
                    {pkg.badge}
                  </span>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-montserrat font-bold tracking-tight mb-1.5">
                    {pkg.name}
                  </h3>

                  <p
                    className={`text-xs mb-5 font-medium leading-relaxed ${pkg.isPopular ? "text-neutral-300" : "text-[#78716C]"
                      }`}
                  >
                    {pkg.idealFor}
                  </p>

                  {/* Price Box */}
                  <div
                    className={`p-4 rounded-2xl mb-6 font-montserrat ${pkg.isPopular
                      ? "bg-white/10 border border-white/15"
                      : "bg-[#F9F6F0] border border-[#E6DFD3]"
                      }`}
                  >
                    <span className="text-[10px] uppercase font-bold tracking-wider block opacity-75">
                      Estimasi Modal Pabrik:
                    </span>
                    <span
                      className={`text-2xl sm:text-3xl font-extrabold block my-0.5 tracking-tight ${pkg.isPopular ? "text-[#E8F878]" : "text-black"
                        }`}
                    >
                      {pkg.priceRange}
                    </span>
                    <span className="text-[11px] block opacity-75 font-semibold mt-0.5">
                      Cocok untuk {pkg.storeSize}
                    </span>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2.5 text-xs font-montserrat">
                    <span className="text-[11px] font-bold uppercase tracking-wider block opacity-90 mb-2">
                      Sudah Termasuk:
                    </span>
                    {pkg.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5">
                        <Check
                          className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${pkg.isPopular ? "text-[#E8F878]" : "text-black"
                            }`}
                        />
                        <span className={pkg.isPopular ? "text-neutral-200" : "text-[#4A4540]"}>
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Button */}
                <div className="pt-5 mt-5 sm:pt-6 sm:mt-6 border-t border-current/10 font-montserrat">
                  <a
                    href={waPkgUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-2.5 sm:py-3 pl-3.5 sm:pl-5 pr-2 sm:pr-2.5 rounded-full flex items-center justify-between text-xs font-bold transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] active:scale-95 group relative overflow-hidden ${
                      pkg.isPopular
                        ? "bg-[#E8F878] hover:bg-[#DDF067] text-[#1C1917] shadow-md hover:shadow-[0_14px_30px_rgba(232,248,120,0.55)] before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700"
                        : "bg-black hover:bg-neutral-900 text-white shadow-md hover:shadow-[0_14px_30px_rgba(0,0,0,0.35)] before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700"
                    }`}
                  >
                    <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 relative z-10">
                      <WhatsAppIcon
                        className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6"
                      />
                      <span className="font-montserrat font-bold tracking-tight text-[10.5px] min-[360px]:text-[11.5px] sm:text-[13px] whitespace-nowrap">
                        Pilih Paket &amp; Konsultasi <span className="hidden min-[340px]:inline">WA</span>
                      </span>
                    </div>

                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 ml-1.5 sm:ml-2 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 relative z-10 ${
                        pkg.isPopular
                          ? "bg-black text-[#E8F878]"
                          : "bg-[#E8F878] text-[#1C1917]"
                      }`}
                    >
                      <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </a>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
        </div>

      </div>
    </div>
  );
}
