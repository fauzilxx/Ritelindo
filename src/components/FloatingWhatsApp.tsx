"use client";

import React, { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { buildWhatsAppLink } from "@/utils/whatsapp";
import WhatsAppIcon from "./WhatsAppIcon";

export default function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show after intro animation finishes or after 6s fallback
    const handleIntroDone = () => {
      setIsVisible(true);
      setTimeout(() => setShowTooltip(true), 2500);
    };

    window.addEventListener("intro-finished", handleIntroDone);

    const fallbackTimer = setTimeout(() => {
      setIsVisible(true);
      setTimeout(() => setShowTooltip(true), 2500);
    }, 6500);

    return () => {
      window.removeEventListener("intro-finished", handleIntroDone);
      clearTimeout(fallbackTimer);
    };
  }, []);

  const waUrl = buildWhatsAppLink(
    "Halo Tim Ritelindo, saya ingin konsultasi gratis mengenai kebutuhan rak toko dan klaim desain layout 3D."
  );

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-5 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end gap-2 font-montserrat select-none">
      
      {/* Friendly Auto-Popping Tooltip Bubble (Dismissible) */}
      {showTooltip && (
        <div className="relative max-w-[260px] sm:max-w-xs bg-white text-[#1C1917] p-3 sm:p-3.5 rounded-2xl shadow-[0_12px_35px_rgba(0,0,0,0.22)] border border-[#1C1917]/10 animate-fade-up text-xs font-montserrat">
          <button
            type="button"
            onClick={() => setShowTooltip(false)}
            className="absolute top-2 right-2 p-1 rounded-full text-neutral-400 hover:text-black hover:bg-neutral-100 transition-colors"
            aria-label="Tutup pesan"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
              Konsultan Retail Online
            </span>
          </div>

          <p className="text-[11px] sm:text-xs text-[#44403C] leading-snug font-medium pr-3">
            Butuh estimasi modal atau <strong>Desain Denah 3D Gratis</strong>? Chat tim teknis Ritelindo sekarang!
          </p>
        </div>
      )}

      {/* Floating Main WhatsApp Pill Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2.5 sm:gap-3 pl-3.5 sm:pl-4 pr-4 sm:pr-5 py-3 sm:py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-[0_10px_30px_rgba(37,211,102,0.45)] hover:shadow-[0_14px_40px_rgba(37,211,102,0.65)] hover:scale-105 active:scale-95 transition-all duration-300 relative overflow-hidden"
        aria-label="Konsultasi WA Gratis dengan Tim Ritelindo"
      >
        {/* Glowing pulse ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-35 animate-ping-slow pointer-events-none -z-10" />

        <div className="relative">
          <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7 shrink-0 transition-transform duration-300 group-hover:scale-115 group-hover:rotate-6 text-white" />
        </div>

        <div className="flex flex-col text-left">
          <span className="text-xs sm:text-[13px] font-extrabold tracking-tight leading-none text-white whitespace-nowrap">
            Konsultasi WA Gratis
          </span>
          <span className="text-[9.5px] sm:text-[10px] text-white/90 font-medium leading-tight mt-0.5 whitespace-nowrap flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            Respon Cepat 24 Jam
          </span>
        </div>
      </a>
      
    </div>
  );
}
