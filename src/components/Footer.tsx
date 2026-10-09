"use client";

import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import FlowingMenu, { FlowingMenuItem } from "./FlowingMenu";
import WhatsAppIcon from "./WhatsAppIcon";
import { buildWhatsAppLink } from "@/utils/whatsapp";
import ScrollReveal from "./ScrollReveal";

// Social SVG Icons
function InstagramIcon({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TikTokIcon({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.209 1.62 2.89 2.89 0 0 1 2.313-4.512c.523 0 1.012.138 1.436.381V9.66a6.302 6.302 0 0 0-1.436-.164C5.972 9.496 3 12.468 3 15.992c0 3.524 2.972 6.496 6.496 6.496 3.524 0 6.382-2.858 6.382-6.382V9.012a8.167 8.167 0 0 0 4.711 1.488V7.055a4.836 4.836 0 0 1-1-.369z" />
    </svg>
  );
}

function LinkedInIcon({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function YouTubeIcon({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

// Social media list for FlowingMenu
const SOCIAL_ITEMS: FlowingMenuItem[] = [
  {
    text: "Instagram",
    handle: "@ritelindo.official",
    link: "https://www.instagram.com",
    image: "/hero-store.webp",
    icon: <InstagramIcon className="w-full h-full" />,
  },
  {
    text: "TikTok",
    handle: "@ritelindo.id",
    link: "https://www.tiktok.com",
    image: "/cash-counter.webp",
    icon: <TikTokIcon className="w-full h-full" />,
  },
  {
    text: "LinkedIn",
    handle: "PT Ritelindo Akselera Kolaborasi",
    link: "https://www.linkedin.com",
    image: "/craftsman.webp",
    icon: <LinkedInIcon className="w-full h-full" />,
  },
  {
    text: "YouTube",
    handle: "Ritelindo Group Official",
    link: "https://www.youtube.com",
    image: "/products/gondola-double.webp",
    icon: <YouTubeIcon className="w-full h-full" />,
  },
  {
    text: "WhatsApp",
    handle: "+62 823-2490-5011",
    link: buildWhatsAppLink(
      "Halo Tim Ritelindo, saya ingin konsultasi kebutuhan rak toko dan denah layout 3D gratis."
    ),
    image: "/layout-3d.webp",
    icon: <WhatsAppIcon className="w-full h-full" />,
  },
];

// Locations Data for Showroom & Facilities
const LOCATIONS = [
  {
    id: "sidoarjo",
    tabLabel: "Showroom & HQ (Sidoarjo)",
    name: "Showroom & Kantor Pusat",
    subheading: "Galeri Display Rak Gondola & Konsultasi Tata Letak 3D",
    address:
      "Jl. Raya Industri Pergudangan Modern No. 88, Lingkar Timur, Sidoarjo - Surabaya, Jawa Timur 61252",
    access:
      "~20 Menit dari Bandara Internasional Juanda • 5 Menit dari Exit Tol Waru / Sidoarjo",
    hours: "Senin – Sabtu, 08.00 – 17.00 WIB",
    phone: "0823-2490-5011 (WhatsApp 24 Jam)",
    gmapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Jl.+Raya+Industri+Lingkar+Timur+Sidoarjo+Jawa+Timur",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126646.2086475734!2d112.65!3d-7.45!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7e10000000000%3A0x0!2sSidoarjo%20Industrial%20Area!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid",
  },
  {
    id: "candi",
    tabLabel: "Pabrik Jatim (Candi)",
    name: "Fasilitas Fabrikasi Candi",
    subheading: "Manufaktur Baja SPCC & Powder Coating Plant",
    address:
      "Kawasan Industri Candi Blok B-12, Candi, Kabupaten Sidoarjo, Jawa Timur 61271",
    access:
      "Hub Fabrikasi & Armada Logistik Utama Pengiriman Wilayah Jawa Timur & Bali",
    hours: "Senin – Sabtu, 08.00 – 17.00 WIB",
    phone: "0823-2490-5011 (Logistik)",
    gmapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Kawasan+Industri+Candi+Sidoarjo",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.4025178657156!2d112.72145!3d-7.4812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7e6b0a1234567%3A0x1234567890abcdef!2sKawasan%20Industri%20Candi!5e0!3m2!1sen!2sid!4v1700000000001!5m2!1sen!2sid",
  },
  {
    id: "kendal",
    tabLabel: "Pabrik Jateng (Kendal)",
    name: "Fasilitas Fabrikasi Kendal",
    subheading: "Hub Logistik & Perakitan Area Jateng, DIY & Jabar",
    address:
      "Kawasan Industri Kendal (KIK) Boulevard Barat No. 18, Kendal, Jawa Tengah 51372",
    access:
      "Hub Ekspedisi Jalur Pantura & Tim Teknisi Perakitan Cepat Jawa Tengah & DIY",
    hours: "Senin – Sabtu, 08.00 – 17.00 WIB",
    phone: "0823-2490-5011 (Logistik)",
    gmapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Kawasan+Industri+Kendal+Jawa+Tengah",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.354672102554!2d110.2351!3d-6.9678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e705cf012345678%3A0x876543210fedcba!2sKendal%20Industrial%20Park!5e0!3m2!1sen!2sid!4v1700000000002!5m2!1sen!2sid",
  },
];

export default function Footer() {
  const [activeLocIdx, setActiveLocIdx] = useState(0);
  const currentYear = 2026;

  const activeLoc = LOCATIONS[activeLocIdx];

  return (
    <footer className="bg-[#120F17] text-neutral-400 text-xs pt-16 sm:pt-20 pb-16 relative z-[70] shadow-[0_-35px_90px_rgba(0,0,0,0.7)] font-montserrat">
      {/* Concave Inward Scoop Transition Header - Stacks over FAQSection */}
      <div className="absolute -top-10 sm:-top-14 md:-top-16 left-0 right-0 w-full overflow-hidden pointer-events-none z-30">
        <svg
          viewBox="0 0 1440 70"
          preserveAspectRatio="none"
          className="w-full h-10 sm:h-14 md:h-16 block text-[#120F17] fill-current"
          aria-hidden="true"
        >
          <path d="M 0,0 C 0,44 36,70 80,70 L 1360,70 C 1404,70 1440,44 1440,0 L 1440,70 L 0,70 Z" />
          <path
            d="M 0,0 C 0,44 36,70 80,70 L 1360,70 C 1404,70 1440,44 1440,0"
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* ======================================================== */}
      {/* 1. FLOWING MENU SECTION: Let's Connect                  */}
      {/* ======================================================== */}
      <div className="w-full pb-14 sm:pb-16">
        <ScrollReveal direction="up" distance={30}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8 sm:mb-10 space-y-2">
            {/* Cursive / Serif Italic Headline */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-serif italic text-white tracking-tight leading-tight">
              Let&apos;s Connect
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-xl mx-auto">
              Terhubung langsung dengan kanal resmi Ritelindo untuk melihat portofolio proyek toko mitra, video uji beban pabrik, dan tips penataan layout retail.
            </p>
          </div>
        </ScrollReveal>

        {/* The Flowing Menu Bar Container */}
        <ScrollReveal direction="up" distance={25} delay={100}>
          <div className="w-full border-y border-white/10 relative">
            <FlowingMenu
              items={SOCIAL_ITEMS}
              speed={14}
              textColor="#ffffff"
              bgColor="#120F17"
              marqueeBgColor="#E8F878"
              marqueeTextColor="#1C1917"
              borderColor="rgba(255, 255, 255, 0.10)"
            />
          </div>
        </ScrollReveal>
      </div>

      {/* ======================================================== */}
      {/* 2. FULL-BLEED ARCHITECTURAL SHOWROOM & MAP CANVAS       */}
      {/* ======================================================== */}
      <div className="w-full pb-14 sm:pb-20">
        <ScrollReveal direction="up" distance={30}>
          {/* Top Bar: Location Switcher Tabs - Responsive Wrap on Mobile, Row on Desktop */}
          <div className="w-full border-t border-b border-white/10 bg-white/[0.02] px-3.5 sm:px-8 lg:px-14 py-3 sm:py-3.5 flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-2.5">
            {LOCATIONS.map((loc, idx) => {
              const isActive = activeLocIdx === idx;
              return (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => setActiveLocIdx(idx)}
                  className={`px-3.5 sm:px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-[#E8F878] text-[#120F17] shadow-sm font-bold scale-[1.02]"
                      : "text-neutral-400 hover:text-white hover:bg-white/[0.06] bg-white/[0.03]"
                  }`}
                >
                  {loc.tabLabel}
                </button>
              );
            })}
          </div>

          {/* Full Screen Width Grid: Left Editorial Panel + Right Edge-to-Edge Map */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 min-h-[560px] lg:min-h-[620px]">
            {/* Left Column: Editorial Architectural Dossier */}
            <div className="lg:col-span-5 px-6 sm:px-10 lg:px-14 xl:px-16 py-8 sm:py-10 lg:py-14 flex flex-col justify-between space-y-7 bg-gradient-to-b from-white/[0.02] to-transparent">
              {/* Header Information */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-montserrat font-black text-white tracking-tight leading-tight">
                    PT Ritelindo Akselera Kolaborasi
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 font-medium pt-0.5">
                    {activeLoc.subheading}
                  </p>
                </div>

                <p className="text-xs sm:text-[13px] text-neutral-300 font-light leading-relaxed max-w-xl">
                  Showroom display rak gondola modern dan fasilitas fabrikasi langsung dari produsen baja. Terbuka untuk kunjungan konsultasi denah 3D bersama arsitek retail kami.
                </p>
              </div>

              {/* Typographic Metadata (Clean, Elegant Lines, Zero Nested Boxes) */}
              <div className="space-y-3.5 text-xs max-w-xl">
                {/* Address Row */}
                <div className="border-t border-white/10 pt-3.5 space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 block">
                    Alamat Fisik
                  </span>
                  <p className="text-neutral-200 font-medium leading-relaxed">
                    {activeLoc.address}
                  </p>
                </div>

                {/* Access Note */}
                <div className="border-t border-white/10 pt-3.5 space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 block">
                    Akses &amp; Transportasi
                  </span>
                  <p className="text-neutral-300 font-normal leading-relaxed">
                    {activeLoc.access}
                  </p>
                </div>

                {/* Operational Hours & Direct WhatsApp */}
                <div className="border-t border-white/10 pt-3.5 grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 block">
                      Jam Layanan
                    </span>
                    <p className="text-neutral-200 font-medium">
                      {activeLoc.hours}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 block">
                      Hotline WhatsApp
                    </span>
                    <p className="text-[#E8F878] font-bold">
                      {activeLoc.phone}
                    </p>
                  </div>
                </div>
              </div>

              {/* Primary Actions */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={activeLoc.gmapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-montserrat font-bold bg-[#E8F878] hover:bg-[#DDF067] text-[#120F17] transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 active:scale-95 group"
                >
                  <span>Buka di Google Maps</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>

            {/* Right Column: Full-Bleed Map Canvas Stretching to the Right Screen Edge */}
            <div className="lg:col-span-7 relative min-h-[420px] lg:min-h-full w-full bg-[#0E0C13] border-t lg:border-t-0 lg:border-l border-white/10 overflow-hidden">
              {/* Interactive Map Iframe with Dark Mode Filter */}
              <iframe
                title={`Peta Lokasi ${activeLoc.name}`}
                src={activeLoc.embedUrl}
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter: "invert(90%) hue-rotate(180deg) contrast(95%) brightness(92%)",
                }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[420px] lg:min-h-full block"
              />
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* ======================================================== */}
      {/* 3. BOTTOM ROW: Copyright & Trust Badges                  */}
      {/* ======================================================== */}
      <div className="w-full px-4 sm:px-8 lg:px-14 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500 font-light">
        <div>
          © {currentYear} PT Ritelindo Akselera Kolaborasi. Hak Cipta Dilindungi Undang-Undang.
        </div>
        <div className="flex flex-wrap items-center gap-5 text-neutral-400">
          <span>Garansi Plat Baja SPCC</span>
          <span>•</span>
          <span>Free Ongkir Jawa - Bali</span>
          <span>•</span>
          <span>Free Layout 3D</span>
          <span>•</span>
          <span>Free Perakitan Teknisi</span>
        </div>
      </div>
    </footer>
  );
}
