"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { buildWhatsAppLink } from "@/utils/whatsapp";
import WhatsAppIcon from "./WhatsAppIcon";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Reveal navbar once intro animation finishes or is skipped
    const handleIntroDone = () => setIsVisible(true);
    window.addEventListener("intro-finished", handleIntroDone);

    // Safety fallback timer matching entrance duration (6.6s)
    const fallbackTimer = setTimeout(() => setIsVisible(true), 6600);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("intro-finished", handleIntroDone);
      clearTimeout(fallbackTimer);
    };
  }, []);

  const waNavUrl = buildWhatsAppLink(
    "Halo Tim Ritelindo, saya ingin konsultasi mengenai kebutuhan rak toko dan denah 3D."
  );

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-12 pointer-events-none"
      }`}
    >
      {/* ======================================================== */}
      {/* 1. FULL EXPANDED NAVBAR: Centered Island (At Top of Page) */}
      {/* ======================================================== */}
      <div className="w-full flex justify-center px-3 sm:px-6">
        <div
          className={`pointer-events-auto relative flex items-center justify-between rounded-full border border-white/20 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isScrolled
              ? "opacity-0 -translate-y-8 pointer-events-none scale-95 absolute"
              : "w-[96%] max-w-6xl py-3.5 px-6 sm:px-9 mt-4 sm:mt-6 bg-black/35 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.35)] opacity-100 translate-y-0 scale-100"
          }`}
        >
          {/* LEFT: Clean Brand Logo */}
          <a href="#" className="flex items-center group select-none flex-shrink-0">
            <span className="font-sans font-bold text-lg sm:text-xl text-white tracking-tight group-hover:text-white/90 transition-colors">
              Ritelindo
            </span>
          </a>

          {/* CENTER: 6 Navigation Links */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-7 text-xs sm:text-[13px] font-medium text-white/80">
            <a href="#koleksi-rak" className="hover:text-white transition-colors">
              Produk
            </a>
            <a href="#paket-toko" className="hover:text-white transition-colors">
              Paket Toko
            </a>
            <a href="#kalkulator" className="hover:text-white transition-colors">
              Kalkulator
            </a>
            <a href="#sektor-toko" className="hover:text-white transition-colors">
              Sektor Toko
            </a>
            <a href="#keunggulan" className="hover:text-white transition-colors">
              Keunggulan
            </a>
            <a href="#faq" className="hover:text-white transition-colors">
              FAQ
            </a>
          </nav>

          {/* RIGHT: High-Contrast Pill Button */}
          <div className="flex items-center gap-3">
            <a
              href={waNavUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-xs font-semibold bg-[#E8F878] hover:bg-[#DDF067] text-[#1C1917] shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95 group relative overflow-hidden"
            >
              <WhatsAppIcon className="w-4.5 h-4.5 sm:w-5 sm:h-5 shrink-0 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6 relative z-10" />
              <span className="relative z-10 font-bold">Konsultasi WA</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#1C1917] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 relative z-10" />
            </a>

            {/* Mobile Hamburger Button for top state */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-full text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Glass Dropdown Menu for Top State */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 mt-3 p-5 rounded-3xl bg-black/85 backdrop-blur-2xl border border-white/15 shadow-2xl flex flex-col gap-3 text-white animate-in fade-in slide-in-from-top-2 duration-200">
              <a
                href="#koleksi-rak"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-white/10 text-sm font-medium hover:text-[#E8F878]"
              >
                Koleksi Rak Unggulan
              </a>
              <a
                href="#paket-toko"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-white/10 text-sm font-medium hover:text-[#E8F878]"
              >
                Paket Setup Toko
              </a>
              <a
                href="#kalkulator"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-white/10 text-sm font-medium hover:text-[#E8F878]"
              >
                Kalkulator Estimasi Toko
              </a>
              <a
                href="#sektor-toko"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-white/10 text-sm font-medium hover:text-[#E8F878]"
              >
                Sektor Industri Toko
              </a>
              <a
                href="#keunggulan"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-white/10 text-sm font-medium hover:text-[#E8F878]"
              >
                Keunggulan Pabrik
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-sm font-medium hover:text-[#E8F878]"
              >
                Tanya Jawab (FAQ)
              </a>

              <div className="pt-2">
                <a
                  href={waNavUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-full text-xs font-bold bg-[#E8F878] hover:bg-[#DDF067] text-[#1C1917] shadow-sm transition-all duration-300 hover:scale-[1.02] active:scale-95 group relative overflow-hidden"
                >
                  <WhatsAppIcon className="w-5 h-5 sm:w-5.5 sm:h-5.5 shrink-0 transition-transform duration-300 group-hover:scale-125" />
                  <span>Konsultasi WA Gratis</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. MINIMIZED SCROLLED NAVBAR: Dual Corner Island Pods   */}
      {/* ======================================================== */}
      <div
        className={`pointer-events-none fixed top-0 inset-x-0 z-50 flex items-center justify-between px-3 sm:px-6 lg:px-10 pt-3 sm:pt-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-8 pointer-events-none"
        }`}
      >
        {/* LEFT POD: Clean Ritelindo Capsule */}
        <div className="flex items-center">
          <a
            href="#"
            className="flex items-center px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-black/75 hover:bg-black/85 backdrop-blur-2xl border border-white/20 shadow-[0_12px_40px_rgba(0,0,0,0.6)] transition-all duration-300 hover:scale-105 active:scale-95 group select-none cursor-pointer"
            aria-label="Kembali ke atas"
          >
            <span className="font-sans font-bold text-base sm:text-lg text-white tracking-tight group-hover:text-white/90">
              Ritelindo
            </span>
          </a>
        </div>

        {/* RIGHT POD: Hubungi Kami Button Pod */}
        <div className="flex items-center">
          <a
            href={waNavUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-montserrat font-bold bg-white hover:bg-neutral-100 text-[#1C1917] shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition-all duration-300 hover:scale-105 active:scale-95 group relative overflow-hidden"
          >
            <WhatsAppIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0 transition-transform duration-300 group-hover:scale-110" />
            <span className="font-montserrat font-bold">Hubungi Kami</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#1C1917] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </header>
  );
}
