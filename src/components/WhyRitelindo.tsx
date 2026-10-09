"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import Image from "next/image";
import {
  Factory,
  LayoutTemplate,
  Layers,
  Truck,
  Wrench,
  Sparkles,
  ArrowRight,
  Ruler,
  Boxes,
  Palette,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { buildWhatsAppLink } from "@/utils/whatsapp";
import WhatsAppIcon from "./WhatsAppIcon";
import ScrollReveal from "./ScrollReveal";

interface AdvantageItem {
  id: string;
  badge: string;
  category: string;
  title: string;
  englishTitle: string;
  subtitle: string;
  description: string;
  statBadge: string;
  ctaText: string;
  ctaUrl: string;
  image: string;
  imageAlt: string;
  headerBg: string;
  headerTextColor: string;
  icon: React.ReactNode;
}

const ADVANTAGES: AdvantageItem[] = [
  // 1. Free Konsultasi & Layout 3D (Layanan utama sebelum pembelian)
  {
    id: "layout-3d",
    badge: "LAYANAN UTAMA SEBELUM PEMBELIAN",
    category: "DENAH 3D",
    title: "Free Konsultasi & Layout 3D",
    englishTitle: "Complimentary 3D Store Architecture",
    subtitle: "Simulasi Denah Isometrik Presisi Sebelum Membeli",
    description:
      "Arsitek retail kami membuatkan simulasi denah isometrik 3D gratis untuk toko Anda. Menghitung kebutuhan modul rak, sirkulasi lorong belanja, dan sudut pandang display tanpa biaya awal.",
    statBadge: "100% Free Desain Layout 3D",
    ctaText: "Klaim Desain 3D Gratis",
    ctaUrl: buildWhatsAppLink(
      "Halo Tim Ritelindo, saya ingin klaim Free Konsultasi & Desain Denah 3D untuk rencana toko saya."
    ),
    image: "/layout-3d.webp",
    imageAlt: "Desain Denah 3D Retail Ritelindo",
    headerBg: "bg-[#E5E7EB]",
    headerTextColor: "text-[#1C1917]",
    icon: <LayoutTemplate className="w-4 h-4 text-[#1C1917]" />,
  },
  // 2. Free Ongkir Jawa-Bali
  {
    id: "free-shipping",
    badge: "PENGIRIMAN GRATIS JAWA & BALI",
    category: "FREE ONGKIR",
    title: "Free Ongkir Jawa - Bali",
    englishTitle: "Free Island-Wide Shipping Fleet",
    subtitle: "Armada Truk Pengiriman Khusus Pabrik Sendiri",
    description:
      "Bebas biaya ekspedisi kargo pihak ketiga yang mahal. Armada logistik pabrik Ritelindo mengirimkan pesanan langsung ke lokasi toko Anda di seluruh wilayah Jawa dan Bali dengan garansi selamat.",
    statBadge: "Rp 0 Biaya Kirim Jawa & Bali",
    ctaText: "Cek Jadwal Pengiriman",
    ctaUrl: buildWhatsAppLink(
      "Halo Tim Ritelindo, apakah lokasi toko saya di Jawa / Bali masuk jangkauan promo Free Ongkir?"
    ),
    image: "/products/heavy-duty.webp",
    imageAlt: "Armada Pengiriman Logistik Ritelindo",
    headerBg: "bg-[#E5E7EB]",
    headerTextColor: "text-[#1C1917]",
    icon: <Truck className="w-4 h-4 text-[#1C1917]" />,
  },
  // 3. Free Perakitan Jatim, Jateng & DIY
  {
    id: "expert-assembly",
    badge: "INSTALASI PROFESIONAL TEKNISI",
    category: "FREE RAKIT",
    title: "Free Perakitan Jatim, Jateng & DIY",
    englishTitle: "Complimentary On-Site Assembly",
    subtitle: "Terpasang Presisi & Rapi Langsung di Lokasi Toko",
    description:
      "Bebas repot merakit sendiri. Teknisi berpengalaman pabrik kami datang langsung ke lokasi toko Anda untuk menyetel, merakit, dan memastikan seluruh rak berdiri kokoh dan rata air siap pakai.",
    statBadge: "Selesai Rapi Siap Display",
    ctaText: "Jadwalkan Tim Teknisi",
    ctaUrl: buildWhatsAppLink(
      "Halo Tim Ritelindo, saya ingin jadwal perakitan rak langsung oleh teknisi di lokasi toko saya (Jatim/Jateng/DIY)."
    ),
    image: "/craftsman.webp",
    imageAlt: "Teknisi Ahli Fabrikasi Ritelindo",
    headerBg: "bg-[#E5E7EB]",
    headerTextColor: "text-[#1C1917]",
    icon: <Wrench className="w-4 h-4 text-[#1C1917]" />,
  },
  // 4. Bisa Custom sesuai kebutuhan & ukuran ruangan toko
  {
    id: "custom-sizing",
    badge: "KUSTOMISASI DENAH & RUANG",
    category: "CUSTOM UKURAN",
    title: "Bisa Custom Sesuai Ukuran Toko",
    englishTitle: "Tailored Dimensions & Brand Palette",
    subtitle: "Sesuaikan Tinggi Tiang, Lebar Ambalan & Warna Identitas",
    description:
      "Setiap ruangan toko memiliki tata letak dan tiang gedung unik. Kami melayani penyesuaian tinggi tiang rak, kedalaman ambalan, tipe back-panel, hingga warna powder coating tiang sesuai identitas brand toko Anda.",
    statBadge: "Fleksibel Menyesuaikan Denah",
    ctaText: "Konsultasi Rak Custom",
    ctaUrl: buildWhatsAppLink(
      "Halo Tim Ritelindo, saya ingin konsultasi ukuran rak custom dan pilihan warna tiang sesuai ruangan toko saya."
    ),
    image: "/gondola-rack.webp",
    imageAlt: "Kustomisasi Ukuran Rak Toko Ritelindo",
    headerBg: "bg-[#E5E7EB]",
    headerTextColor: "text-[#1C1917]",
    icon: <Ruler className="w-4 h-4 text-[#1C1917]" />,
  },
  // 5. Produk Langsung dari Pabrik (Harga kompetitif)
  {
    id: "factory-direct",
    badge: "PRODUSEN TANGAN PERTAMA",
    category: "HARGA PABRIK",
    title: "Produk Langsung dari Pabrik",
    englishTitle: "Direct-From-Foundry Pricing",
    subtitle: "Harga Kompetitif Produsen Tanpa Perantara Distributor",
    description:
      "Diproduksi langsung di fasilitas manufaktur baja Ritelindo dari plat baja dingin SPCC bermutu tinggi. Dapatkan harga tangan pertama yang paling kompetitif dan hemat hingga 30% dibanding membeli dari perantara.",
    statBadge: "Hemat Hingga 30% vs Reseller",
    ctaText: "Dapatkan Harga Pabrik",
    ctaUrl: buildWhatsAppLink(
      "Halo Tim Ritelindo, saya ingin minta penawaran harga grosir langsung dari pabrik untuk kebutuhan toko saya."
    ),
    image: "/hero-store.webp",
    imageAlt: "Pabrik Rak Toko Ritelindo",
    headerBg: "bg-[#E5E7EB]",
    headerTextColor: "text-[#1C1917]",
    icon: <Factory className="w-4 h-4 text-[#1C1917]" />,
  },
  // 6. Melayani pembelian satuan, paket toko, hingga proyek retail
  {
    id: "flexible-orders",
    badge: "SKALA PEMESANAN FLEKSIBEL",
    category: "SATUAN & PROYEK",
    title: "Satuan, Paket Toko & Proyek Retail",
    englishTitle: "Retail, Package & Corporate Scalability",
    subtitle: "Fleksibel Dari Tambah 1 Unit Hingga Buka Ratusan Cabang",
    description:
      "Kami siap melayani kebutuhan dari berbagai skala: pembelian eceran satuan untuk penambahan rak toko eksisting, paket terima beres hemat untuk buka toko baru, hingga pengadaan proyek retail jaringan modern puluhan cabang.",
    statBadge: "Satuan • Paket • Proyek",
    ctaText: "Tanya Opsi Pembelian",
    ctaUrl: buildWhatsAppLink(
      "Halo Tim Ritelindo, saya ingin tanya opsi pemesanan (satuan / paket toko / pengadaan retail skala besar)."
    ),
    image: "/products/gondola-double.webp",
    imageAlt: "Pemesanan Rak Satuan dan Paket Ritelindo",
    headerBg: "bg-[#E5E7EB]",
    headerTextColor: "text-[#1C1917]",
    icon: <Boxes className="w-4 h-4 text-[#1C1917]" />,
  },
  // 7. Jasa Interior Toko agar tampilan toko lebih stylish & modern
  {
    id: "interior-design",
    badge: "DESAIN INTERIOR RETAIL",
    category: "INTERIOR TOKO",
    title: "Jasa Interior Toko Modern & Stylish",
    englishTitle: "Modern Retail Interior & Visual Merchandising",
    subtitle: "Tingkatkan Daya Tarik & Omzet Toko Anda",
    description:
      "Bukan hanya sekadar rak display — tim arsitek dan interior retail kami membantu merancang konsep interior toko modern: pencahayaan ambalan LED, meja kasir estetik, wall branding, dan tata ruang kasir agar toko Anda tampil berkelas dan memikat pembeli.",
    statBadge: "Tampilan Toko Modern & Stylish",
    ctaText: "Konsultasi Interior Toko",
    ctaUrl: buildWhatsAppLink(
      "Halo Tim Ritelindo, saya tertarik dengan layanan Jasa Interior Toko Modern agar toko saya lebih stylish."
    ),
    image: "/cash-counter.webp",
    imageAlt: "Interior Toko Retail Modern Ritelindo",
    headerBg: "bg-[#E5E7EB]",
    headerTextColor: "text-[#1C1917]",
    icon: <Palette className="w-4 h-4 text-[#1C1917]" />,
  },
];

// Symmetrical, curved monumental letters matching HeroCurvedTitle
const CURVED_LETTERS = [
  { char: "R", cx: 131, scaleX: 0.98, u: -1.0 },
  { char: "I", cx: 271, scaleX: 1.15, u: -0.75 },
  { char: "T", cx: 406, scaleX: 0.96, u: -0.5 },
  { char: "E", cx: 553, scaleX: 0.96, u: -0.25 },
  { char: "L", cx: 695, scaleX: 0.96, u: 0.0 }, // Center
  { char: "I", cx: 823, scaleX: 1.15, u: 0.25 },
  { char: "N", cx: 965, scaleX: 0.98, u: 0.5 },
  { char: "D", cx: 1132, scaleX: 0.98, u: 0.75 },
  { char: "O", cx: 1303, scaleX: 1.00, u: 1.0 },
];

const CURVED_BASELINE = 358;
const CURVED_FONT_SIZE = 215;
const CURVED_CAP_HEIGHT = 150;
const CURVED_CENTER_HEIGHT = 225;
const CURVED_PEAK_EXTRA = 115; // Dramatic 115px concave curve

export default function WhyRitelindo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredLeft, setHoveredLeft] = useState<number | null>(null);
  const [hoveredRight, setHoveredRight] = useState<number | null>(null);
  const [tabHeight, setTabHeight] = useState(24);

  // Responsive tab height (24px on mobile, 32px on desktop)
  useEffect(() => {
    const updateTabH = () => {
      setTabHeight(window.innerWidth >= 640 ? 32 : 24);
    };
    updateTabH();
    window.addEventListener("resize", updateTabH);
    return () => window.removeEventListener("resize", updateTabH);
  }, []);

  // Real-time scroll progress tracker
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const winH = window.innerHeight;

            if (rect.top <= 0) {
              const scrolledDistance = -rect.top;

              // Phase 1: Card Deck Stacking (7 cards: cards 0 to 6)
              // Generous 4.2 * winH distance so each card has calm breathing room and card 7 fully opens
              const deckMaxDistance = winH * 4.2;
              const rawDeckProgress = Math.max(
                0,
                Math.min(1, scrolledDistance / deckMaxDistance)
              );
              setScrollProgress(rawDeckProgress);
            } else {
              setScrollProgress(0);
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

  // Active card index (0 to 6)
  const activeCardIdx = useMemo(() => {
    const totalSteps = ADVANTAGES.length - 1;
    const scaled = scrollProgress * totalSteps;
    const step = Math.min(totalSteps - 1, Math.floor(scaled));
    const fraction = scaled - step;
    return fraction > 0.5 ? Math.min(totalSteps, step + 1) : step;
  }, [scrollProgress]);

  // Programmatic smooth navigation to any card
  const goToCard = (targetIdx: number) => {
    if (!sectionRef.current) return;
    const clampedIdx = Math.max(0, Math.min(ADVANTAGES.length - 1, targetIdx));
    const rect = sectionRef.current.getBoundingClientRect();
    const sectionAbsoluteTop = window.scrollY + rect.top;
    
    const totalSteps = ADVANTAGES.length - 1;
    const targetProgress = clampedIdx / totalSteps;
    const winH = window.innerHeight;
    const deckMaxDistance = winH * 4.2;
    const targetY = sectionAbsoluteTop + targetProgress * deckMaxDistance + (clampedIdx > 0 ? 35 : 0);
    
    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  };

  // Touch swipe support on mobile
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    
    // Detect horizontal swipe (> 45px delta and more horizontal than vertical)
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        goToCard(activeCardIdx + 1);
      } else {
        goToCard(activeCardIdx - 1);
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <section
      id="keunggulan"
      ref={sectionRef}
      className="relative w-full bg-[#1C1917] text-[#1C1917] select-none"
      style={{ height: "700vh" }}
    >
      {/* ======================================================== */}
      {/* STICKY VIEWPORT CONTAINER: Stays centered while scrolling */}
      {/* Scales down (1.0 -> 0.95) as Mitra covers it             */}
      {/* ======================================================== */}
      <div 
        className="sticky top-0 h-screen w-full relative overflow-hidden bg-[#E8F878]"
      >
        {/* Background Architectural Black Square Grid (Kertas Berpetak) Motif Overlay */}
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

        {/* Subtle organic ambient background glow centered behind the card deck */}
        <div
          aria-hidden="true"
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[680px] h-[680px] bg-white/20 rounded-full blur-[130px] pointer-events-none -z-10"
        />

        {/* ======================================================== */}
        {/* LEFT COLUMN: Flush-Left Monumental Curved Brandmark (White, Hero Style) */}
        {/* ======================================================== */}
        <div className="absolute left-0 top-0 bottom-0 z-0 hidden md:flex items-center justify-start pl-0 pointer-events-none select-none">
          <svg
            viewBox="0 0 380 1440"
            preserveAspectRatio="xMidYMid meet"
            textRendering="geometricPrecision"
            shapeRendering="geometricPrecision"
            className="h-[88vh] sm:h-[90vh] max-h-[960px] w-auto max-w-[140px] lg:max-w-[190px] xl:max-w-[230px] 2xl:max-w-[270px] overflow-visible drop-shadow-[0_2px_10px_rgba(28,25,23,0.08)]"
            aria-hidden="true"
          >
            <g
              transform="translate(360, 0) rotate(90)"
              className="pointer-events-auto"
            >
              {CURVED_LETTERS.map((item, idx) => {
                const isHovered = hoveredLeft === idx;
                const letterHeight = CURVED_CENTER_HEIGHT + CURVED_PEAK_EXTRA * (item.u * item.u);
                const scaleY = (letterHeight / CURVED_CAP_HEIGHT).toFixed(3);

                return (
                  <g
                    key={idx}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredLeft(idx)}
                    onMouseLeave={() => setHoveredLeft(null)}
                    transform={`translate(${item.cx}, ${CURVED_BASELINE}) scale(${item.scaleX}, ${scaleY}) translate(-${item.cx}, -${CURVED_BASELINE})`}
                    style={{ cursor: "pointer", pointerEvents: "auto" }}
                  >
                    <text
                      x={item.cx}
                      y={CURVED_BASELINE}
                      textAnchor="middle"
                      fontFamily="'Playfair Display', Georgia, serif"
                      fontWeight="900"
                      fontSize={CURVED_FONT_SIZE}
                      fill={isHovered ? "#1C1917" : "#FFFFFF"}
                      style={{
                        transition: "fill 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                        cursor: "pointer",
                      }}
                    >
                      {item.char}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        {/* ======================================================== */}
        {/* CENTER CONTAINER: Section Header + Stacking Card Deck    */}
        {/* ======================================================== */}
        <div className="relative z-10 w-full h-full flex flex-col justify-between pt-12 sm:pt-20 lg:pt-28 pb-2 sm:pb-6 max-w-[94vw] sm:max-w-[88vw] md:max-w-[700px] lg:max-w-[800px] xl:max-w-[880px] 2xl:max-w-[960px] mx-auto px-2 sm:px-4">
          
          {/* TOP: Section Header & Title (Pushed below floating navbar)*/}
          <ScrollReveal direction="down" distance={25} className="shrink-0 mb-1 sm:mb-2 px-2">
            <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
              <h2 className="text-xl sm:text-3xl md:text-5xl lg:text-[3.35rem] xl:text-[3.75rem] font-montserrat font-black text-[#1C1917] tracking-tight leading-[1.1]">
                Why Leading Modern Retailers Choose Ritelindo
              </h2>
            </div>
          </ScrollReveal>

          {/* CENTER: Stacking Card Deck */}
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="my-auto pt-3 sm:pt-10 pb-1 sm:pb-2 w-full flex items-center justify-center relative h-[450px] min-[380px]:h-[490px] sm:h-[490px] lg:h-[520px]"
          >
            <div className="relative w-full h-full flex items-center justify-center z-10">
            
            {ADVANTAGES.map((card, idx) => {
              // Mathematical stacking calculation with dedicated resting/dwell zones:
              // totalSteps = 6 transitions between 7 cards
              const totalCards = ADVANTAGES.length;
              const totalSteps = totalCards - 1;

              // Scaled progress from 0 to 6
              const scaledProgress = scrollProgress * totalSteps;
              const currentStep = Math.min(totalSteps - 1, Math.floor(scaledProgress));
              const stepFraction = scaledProgress - currentStep;

              // Dwell zone: First 35% of each step is completely stationary (reading zone)
              // Remaining 65% is gentle sinusoidal transition to next card
              const DWELL_RATIO = 0.35;

              let translateYPx = 0;
              let opacity = 1;
              let scale = 1;

              if (idx <= currentStep) {
                // Card has already landed in the top stack
                let transitionFactor = 0;
                if (stepFraction > DWELL_RATIO) {
                  const t = (stepFraction - DWELL_RATIO) / (1 - DWELL_RATIO);
                  // Gentle sinusoidal ease: zero initial velocity, zero terminal velocity
                  transitionFactor = 0.5 - 0.5 * Math.cos(Math.PI * t);
                }

                // Offset upwards so ONLY the top tabHeight strip of each previous card is exposed
                const stepsAhead = (currentStep - idx) + transitionFactor;
                translateYPx = -stepsAhead * tabHeight;
                scale = Math.max(0.92, 1 - stepsAhead * 0.012);
                opacity = 1;
              } else if (idx === currentStep + 1) {
                // Next card: either waiting below screen or emerging
                if (stepFraction <= DWELL_RATIO) {
                  // Resting in dwell zone of previous card -> offscreen below
                  translateYPx = 540;
                  scale = 0.94;
                  opacity = 0;
                } else {
                  // Emerging smoothly from below
                  const t = (stepFraction - DWELL_RATIO) / (1 - DWELL_RATIO);
                  const transitionFactor = 0.5 - 0.5 * Math.cos(Math.PI * t);
                  translateYPx = (1 - transitionFactor) * 540;
                  scale = 0.94 + 0.06 * transitionFactor;
                  opacity = Math.min(1, transitionFactor * 3.0);
                }
              } else {
                // Waiting further below
                translateYPx = 680;
                scale = 0.92;
                opacity = 0;
              }

              // z-index ensures later cards stack on top of earlier cards
              const zIndex = 10 + idx * 10;
              const isPastCard = idx < activeCardIdx;

              return (
                <div
                  key={card.id}
                  style={{
                    transform: `translate3d(0, ${translateYPx}px, 0) scale(${scale})`,
                    opacity: opacity,
                    zIndex: zIndex,
                    transition: "box-shadow 0.3s ease, border-color 0.3s ease",
                  }}
                  className={`absolute inset-0 w-full h-full bg-white border-2 border-[#1C1917] rounded-[1.75rem] sm:rounded-[2.25rem] shadow-[0_20px_50px_-10px_rgba(28,25,23,0.3)] overflow-hidden flex flex-col justify-between will-change-transform ${
                    opacity === 0 ? "pointer-events-none" : ""
                  }`}
                >
                  {/* Top Layered Tab Stripe */}
                  <div
                    onClick={isPastCard ? () => goToCard(idx) : undefined}
                    className={`w-full h-7 sm:h-8 ${card.headerBg} border-b border-[#1C1917]/15 shrink-0 flex items-center justify-between px-3 sm:px-6 select-none ${
                      isPastCard ? "cursor-pointer hover:bg-neutral-200 transition-colors pointer-events-auto" : ""
                    }`}
                    title={isPastCard ? `Klik untuk membuka kartu ${idx + 1}` : undefined}
                  >
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span className="text-[10px] sm:text-xs font-montserrat font-extrabold text-[#1C1917]/70">
                        0{idx + 1}
                      </span>
                      {card.icon && <span className="opacity-75 scale-90">{card.icon}</span>}
                      {isPastCard && (
                        <span className="text-[9px] font-montserrat font-semibold text-[#1C1917]/50 hidden sm:inline">
                          • Buka
                        </span>
                      )}
                    </div>
                    <span className="text-[9.5px] sm:text-xs font-montserrat font-bold tracking-wider uppercase text-[#1C1917] truncate max-w-[190px] min-[360px]:max-w-[240px] sm:max-w-none">
                      {card.badge}
                    </span>
                  </div>

                  {/* Card Body: Responsive Layout (Full Flex on Mobile with Real Photo, 2-Column Bento on Desktop) */}
                  <div className={`p-3.5 sm:p-7 lg:p-8 flex-1 flex flex-col md:grid md:grid-cols-12 gap-2.5 sm:gap-6 lg:gap-8 justify-between md:items-center overflow-hidden relative ${
                    isPastCard ? "pointer-events-none" : ""
                  }`}>
                    
                    {/* Mobile Visual Showcase Photo Banner (Displayed prominently on mobile like web) */}
                    <div className="md:hidden w-full h-28 min-[380px]:h-36 shrink-0 relative rounded-xl overflow-hidden border border-[#1C1917]/15 shadow-sm group">
                      <Image
                        src={card.image}
                        alt={card.imageAlt}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 768px) 100vw, 420px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent pointer-events-none" />

                      {/* Floating Watermark on Photograph */}
                      <div className="absolute bottom-1.5 right-2 text-[9px] font-montserrat font-semibold tracking-wider text-white/90 drop-shadow">
                        <span>Ritelindo Official</span>
                      </div>
                    </div>

                    {/* Left Column (or Mobile Flow below image): Text Content & Action */}
                    <div className="md:col-span-7 flex flex-col justify-between h-full space-y-1.5 sm:space-y-4 relative z-10">
                      <div>
                        {/* Subtitle Eyebrow + Stat Badge */}
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
                          <span className="text-[10px] sm:text-xs font-montserrat font-semibold text-[#78716C]">
                            {card.subtitle}
                          </span>
                          {card.statBadge && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-montserrat font-bold bg-[#E8F878] text-[#1C1917] border border-[#1C1917]/15 shadow-2xs">
                              {card.statBadge}
                            </span>
                          )}
                        </div>

                        {/* Monumental Headline */}
                        <h3 className="text-base min-[360px]:text-lg sm:text-2xl lg:text-[2rem] font-montserrat font-extrabold text-[#1C1917] leading-tight tracking-tight">
                          {card.title}
                        </h3>

                        {/* English Subheadline */}
                        <p className="text-[9.5px] sm:text-xs font-montserrat font-semibold text-[#78716C] mt-0.5 sm:mt-1 tracking-wide uppercase">
                          {card.englishTitle}
                        </p>

                        {/* Explanatory Paragraph */}
                        <p className="mt-1 sm:mt-3 text-xs sm:text-[13px] lg:text-[14px] font-montserrat text-[#44403C] leading-relaxed line-clamp-2 min-[380px]:line-clamp-3 sm:line-clamp-none font-normal">
                          {card.description}
                        </p>
                      </div>

                      {/* CTA Button */}
                      <div className="pt-1.5 sm:pt-3 shrink-0">
                        <a
                          href={card.ctaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto px-4 py-2.5 sm:px-7 sm:py-3.5 rounded-full text-xs sm:text-sm font-montserrat font-bold bg-[#1C1917] hover:bg-black text-[#FAF6F0] hover:text-[#E8F878] transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 active:scale-95 group relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700"
                        >
                          <WhatsAppIcon className="w-4.5 h-4.5 sm:w-6.5 sm:h-6.5 shrink-0 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6 relative z-10" />
                          <span className="relative z-10 whitespace-nowrap">{card.ctaText}</span>
                          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
                        </a>
                      </div>
                    </div>

                    {/* Right Column: Visual Showcase Photo Card (Desktop/Tablet) */}
                    <div className="hidden md:block md:col-span-5 md:h-full relative rounded-xl sm:rounded-3xl overflow-hidden border border-[#1C1917]/20 sm:border-2 shadow-sm group">
                      <Image
                        src={card.image}
                        alt={card.imageAlt}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 480px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent pointer-events-none" />

                      {/* Floating Watermark on Photograph */}
                      <div className="absolute bottom-2 right-2 sm:bottom-3.5 sm:right-3.5 text-[10px] sm:text-[11px] font-montserrat font-semibold tracking-wider text-white/80">
                        <span>Ritelindo Official</span>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}

            </div>
          </div>

          {/* BOTTOM CONTROLS: Luxury Prev/Next & Step Indicator */}
          <div className="shrink-0 mt-2 sm:mt-3 w-full flex items-center justify-between gap-2 max-w-xs sm:max-w-md mx-auto z-30">
            {/* Prev Button */}
            <button
              type="button"
              onClick={() => goToCard(activeCardIdx - 1)}
              disabled={activeCardIdx === 0}
              className="inline-flex items-center gap-1 sm:gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-montserrat font-bold bg-[#1C1917] text-white disabled:opacity-25 disabled:cursor-not-allowed hover:bg-black transition-all active:scale-95 shadow-md cursor-pointer"
              aria-label="Kartu Sebelumnya"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-[11px] sm:text-xs">Prev</span>
            </button>

            {/* Active Step Indicator Pill with Micro Dots */}
            <div className="flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-black/10 backdrop-blur-md border border-[#1C1917]/15 select-none">
              <span className="text-[11px] sm:text-xs font-montserrat font-extrabold text-[#1C1917] tracking-wider">
                0{activeCardIdx + 1} <span className="text-[#1C1917]/40 font-normal">/</span> 0{ADVANTAGES.length}
              </span>
              <div className="flex items-center gap-1 ml-1">
                {ADVANTAGES.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    onClick={() => goToCard(dotIdx)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      dotIdx === activeCardIdx
                        ? "w-3 sm:w-4 bg-[#1C1917]"
                        : "w-1.5 bg-[#1C1917]/25 hover:bg-[#1C1917]/60"
                    }`}
                    aria-label={`Buka kartu ${dotIdx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={() => goToCard(activeCardIdx + 1)}
              disabled={activeCardIdx === ADVANTAGES.length - 1}
              className="inline-flex items-center gap-1 sm:gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-montserrat font-bold bg-[#1C1917] text-white disabled:opacity-25 disabled:cursor-not-allowed hover:bg-black transition-all active:scale-95 shadow-md cursor-pointer"
              aria-label="Kartu Berikutnya"
            >
              <span className="text-[11px] sm:text-xs">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* ======================================================== */}
        {/* RIGHT COLUMN: Flush-Right Monumental Curved Brandmark (White, Hero Style) */}
        {/* ======================================================== */}
        <div className="absolute right-0 top-0 bottom-0 z-0 hidden md:flex items-center justify-end pr-0 pointer-events-none select-none">
          <svg
            viewBox="0 0 380 1440"
            preserveAspectRatio="xMidYMid meet"
            textRendering="geometricPrecision"
            shapeRendering="geometricPrecision"
            className="h-[88vh] sm:h-[90vh] max-h-[960px] w-auto max-w-[140px] lg:max-w-[190px] xl:max-w-[230px] 2xl:max-w-[270px] overflow-visible drop-shadow-[0_2px_10px_rgba(28,25,23,0.08)]"
            aria-hidden="true"
          >
            <g
              transform="translate(20, 1440) rotate(-90)"
              className="pointer-events-auto"
            >
              {CURVED_LETTERS.map((item, idx) => {
                const isHovered = hoveredRight === idx;
                const letterHeight = CURVED_CENTER_HEIGHT + CURVED_PEAK_EXTRA * (item.u * item.u);
                const scaleY = (letterHeight / CURVED_CAP_HEIGHT).toFixed(3);

                return (
                  <g
                    key={idx}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredRight(idx)}
                    onMouseLeave={() => setHoveredRight(null)}
                    transform={`translate(${item.cx}, ${CURVED_BASELINE}) scale(${item.scaleX}, ${scaleY}) translate(-${item.cx}, -${CURVED_BASELINE})`}
                    style={{ cursor: "pointer", pointerEvents: "auto" }}
                  >
                    <text
                      x={item.cx}
                      y={CURVED_BASELINE}
                      textAnchor="middle"
                      fontFamily="'Playfair Display', Georgia, serif"
                      fontWeight="900"
                      fontSize={CURVED_FONT_SIZE}
                      fill={isHovered ? "#1C1917" : "#FFFFFF"}
                      style={{
                        transition: "fill 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                        cursor: "pointer",
                      }}
                    >
                      {item.char}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

      </div>
    </section>
  );
}
