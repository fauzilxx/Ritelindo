"use client";

import React, { useRef, useEffect, useState } from "react";
import StoreCalculator from "./StoreCalculator";
import Testimonials from "./Testimonials";
import FAQSection from "./FAQSection";

export default function CalculatorToTestimonialsStack() {
  const stackWrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [dimOpacity, setDimOpacity] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (stackWrapperRef.current) {
            const rect = stackWrapperRef.current.getBoundingClientRect();
            const winH = window.innerHeight;

            // When top of stack container hits or passes top of viewport
            if (rect.top < 0) {
              const scrollDistance = -rect.top;
              const threshold = winH * 0.75;
              const progress = Math.min(1, Math.max(0, scrollDistance / threshold));

              setScale(1 - progress * 0.05); // Subtle luxury scale 1.0 -> 0.95
              setDimOpacity(progress * 0.35); // Subtle dark depth 0.0 -> 0.35
            } else {
              setScale(1);
              setDimOpacity(0);
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
    <div ref={stackWrapperRef} className="relative w-full">
      {/* 1. TOP CARD: Store Calculator - Sticky with subtle depth scale */}
      <div
        className="sticky top-0 z-10 origin-top will-change-transform transition-transform duration-75 ease-out bg-[#E8F878] font-montserrat"
        style={{
          transform: `scale(${scale})`,
        }}
      >
        {/* Seamless Continuous Architectural Black Square Grid Overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0, 0, 0, 0.16) 1.5px, transparent 1.5px),
              linear-gradient(to bottom, rgba(0, 0, 0, 0.16) 1.5px, transparent 1.5px)
            `,
            backgroundSize: "28px 28px",
          }}
        />

        <StoreCalculator />

        {/* Ambient shadow / dim overlay that activates as Kisah Sukses covers Store Calculator */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[#1C1917] pointer-events-none transition-opacity duration-75 ease-out z-20"
          style={{ opacity: dimOpacity }}
        />
      </div>

      {/* 2. BOTTOM CARD: Kisah Sukses & FAQ - Rising upward and covering Store Calculator */}
      <div className="relative z-20 shadow-[0_-35px_90px_rgba(0,0,0,0.85)] bg-white">
        {/* Concave Inward Scoop Transition Header */}
        <div className="absolute -top-10 sm:-top-14 md:-top-16 left-0 right-0 w-full overflow-hidden pointer-events-none z-30">
          <svg
            viewBox="0 0 1440 70"
            preserveAspectRatio="none"
            className="w-full h-10 sm:h-14 md:h-16 block text-white fill-current"
            aria-hidden="true"
          >
            <path d="M 0,0 C 0,44 36,70 80,70 L 1360,70 C 1404,70 1440,44 1440,0 L 1440,70 L 0,70 Z" />
            <path
              d="M 0,0 C 0,44 36,70 80,70 L 1360,70 C 1404,70 1440,44 1440,0"
              fill="none"
              stroke="rgba(28,25,23,0.12)"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* Kisah Sukses (Testimonials) */}
        <Testimonials />

        {/* Tanya Jawab Populer (FAQ) */}
        <FAQSection />
      </div>
    </div>
  );
}
