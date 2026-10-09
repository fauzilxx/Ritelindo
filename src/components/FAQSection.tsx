"use client";

import React, { useState } from "react";
import { FAQS, FAQItem } from "@/data/landingData";
import { ArrowUpRight } from "lucide-react";
import { buildWhatsAppLink } from "@/utils/whatsapp";
import WhatsAppIcon from "./WhatsAppIcon";

import ScrollReveal from "./ScrollReveal";

function FAQItemCard({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <ScrollReveal direction="right" distance={35} delay={index * 60}>
      <div
        className={`rounded-2xl transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] bg-white border ${
          isOpen
            ? "border-black/15 shadow-[0_4px_25px_rgba(0,0,0,0.06)]"
            : "border-black/5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-black/15 hover:shadow-sm"
        } overflow-hidden`}
      >
        <button
          type="button"
          onClick={onToggle}
          className="w-full flex items-center justify-between p-5 sm:p-6 text-left transition-colors gap-4 cursor-pointer select-none"
          aria-expanded={isOpen}
        >
          <span className="text-xs sm:text-[14px] md:text-[14.5px] font-bold text-[#1C1917] leading-snug">
            {faq.question}
          </span>

          {/* Circular Button with Smooth Vector Transition */}
          <div
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isOpen
                ? "border-[#1C1917] bg-[#1C1917] text-white shadow-sm rotate-90"
                : "border-neutral-300 bg-transparent text-neutral-600 hover:border-black rotate-0"
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              {/* Horizontal line */}
              <line x1="5" y1="12" x2="19" y2="12" />
              {/* Vertical line (smoothly scales to 0 and fades out when open) */}
              <line
                x1="12"
                y1="5"
                x2="12"
                y2="19"
                className={`origin-center transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isOpen ? "scale-y-0 opacity-0" : "scale-y-100 opacity-100"
                }`}
              />
            </svg>
          </div>
        </button>

        {/* Hardware-Accelerated CSS Grid Accordion: Zero Reflow Lag */}
        <div
          className={`grid transition-[grid-template-rows,opacity] duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="px-5 pb-6 sm:px-6 pt-0 text-[#57534E] text-xs sm:text-[13.5px] leading-relaxed border-t border-black/5">
              <p
                className="pt-3.5 font-normal leading-relaxed transition-transform duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  transform: isOpen ? "translateY(0)" : "translateY(-4px)",
                }}
              >
                {faq.answer}
              </p>
            </div>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const waFaqUrl = buildWhatsAppLink(
    "Halo Tim Ritelindo, saya memiliki pertanyaan spesifik mengenai pemesanan rak toko dan ingin berkonsultasi langsung."
  );

  return (
    <div id="faq" className="pt-8 sm:pt-12 pb-20 sm:pb-24 lg:pb-28 font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Subtle separator connecting seamlessly from Kisah Sukses */}
        <div className="border-t border-black/5 mb-12 sm:mb-16 lg:mb-20" />

        {/* 2-Column FAQ Layout with Directional Entrances (Left + Right Stagger) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* LEFT COLUMN: Slide in from Left */}
          <ScrollReveal direction="left" distance={40} className="lg:col-span-5 w-full">
            <div className="flex flex-col justify-between space-y-8 lg:space-y-12 lg:sticky lg:top-28">
              <div className="space-y-3.5">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111827] tracking-tight leading-[1.12]">
                  Pertanyaan Umum <br />
                  dari Pelanggan.
                </h2>
                <p className="text-xs sm:text-sm text-[#78716C] font-normal leading-relaxed max-w-md pt-1">
                  Informasi lengkap seputar pemesanan rak pabrik, simulasi tata letak denah 3D gratis, hingga teknis perakitan oleh tim ahli kami.
                </p>
              </div>

              {/* Bottom block of Left Column */}
              <div className="space-y-4 pt-6 sm:pt-8 border-t border-black/5">
                <p className="text-xs sm:text-[13px] text-[#57534E] leading-relaxed max-w-sm">
                  Tim konsultan retail kami selalu siap membantu Anda dengan jawaban cepat, jelas, dan dapat diandalkan kapan pun dibutuhkan.
                </p>

                <div>
                  <a
                    href={waFaqUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold bg-[#1C1917] hover:bg-black text-white transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 active:scale-95 group"
                  >
                    <WhatsAppIcon className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:scale-110" />
                    <span>Hubungi Tim Kami</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* RIGHT COLUMN: Cascade in from Right with Stagger */}
          <div className="lg:col-span-7 space-y-3.5">
            {FAQS.map((faq: FAQItem, index: number) => (
              <FAQItemCard
                key={index}
                faq={faq}
                index={index}
                isOpen={openIndex === index}
                onToggle={() => toggleAccordion(index)}
              />
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
