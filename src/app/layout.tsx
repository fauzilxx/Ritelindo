import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ritelindo.com"),
  title: "Pabrik Rak Minimarket & Paket Setup Toko Retail B2B | Ritelindo",
  description:
    "Produsen rak gondola minimarket langsung dari pabrik. Dapatkan Free Desain Layout 3D, Free Ongkir Jawa-Bali, dan Free Perakitan Jatim, Jateng & DIY. Konsultasi rancangan toko Anda gratis via WhatsApp!",
  alternates: {
    canonical: "https://ritelindo.com",
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  keywords: [
    "pabrik rak minimarket",
    "rak gondola toko",
    "paket setup toko retail",
    "rak toko sembako modern",
    "layout toko 3d gratis",
    "distributor rak minimarket surabaya jawa timur jawa tengah bali",
    "meja kasir minimarket",
    "rak apotek",
    "rak pet shop",
    "ritelindo akselera kolaborasi",
  ],
  authors: [{ name: "PT Ritelindo Akselera Kolaborasi" }],
  creator: "Ritelindo Group",
  publisher: "PT Ritelindo Akselera Kolaborasi",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://ritelindo.com",
    siteName: "Ritelindo Group",
    title: "Pabrik Rak Minimarket & Paket Setup Toko Retail B2B | Ritelindo",
    description:
      "Produsen rak gondola minimarket langsung dari pabrik. Free Desain Layout 3D, Free Ongkir Jawa-Bali, dan Free Perakitan Jatim, Jateng & DIY. Konsultasi WhatsApp gratis!",
    images: [
      {
        url: "/hero-store.webp",
        width: 1200,
        height: 630,
        alt: "Pabrik Rak Minimarket & Perlengkapan Retail Ritelindo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pabrik Rak Minimarket & Paket Setup Toko Retail B2B | Ritelindo",
    description:
      "Produsen rak gondola minimarket langsung dari pabrik. Free Desain Layout 3D, Free Ongkir Jawa-Bali, dan Free Perakitan.",
    images: ["/hero-store.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema.org JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://ritelindo.com/#organization",
        name: "PT Ritelindo Akselera Kolaborasi",
        alternateName: "Ritelindo Group",
        url: "https://ritelindo.com",
        telephone: "+6282324905011",
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          addressRegion: "Jawa Timur & Jawa Tengah",
          addressCountry: "ID",
        },
        description:
          "Produsen rak gondola minimarket, rak toko retail, rak gudang, dan layanan desain interior toko modern.",
        areaServed: [
          { "@type": "AdministrativeArea", name: "Jawa Timur" },
          { "@type": "AdministrativeArea", name: "Jawa Tengah" },
          { "@type": "AdministrativeArea", name: "Daerah Istimewa Yogyakarta" },
          { "@type": "AdministrativeArea", name: "Jawa Barat" },
          { "@type": "AdministrativeArea", name: "DKI Jakarta" },
          { "@type": "AdministrativeArea", name: "Banten" },
          { "@type": "AdministrativeArea", name: "Bali" },
        ],
      },
      {
        "@type": "Service",
        name: "Konsultasi & Desain Layout Toko 3D",
        provider: { "@id": "https://ritelindo.com/#organization" },
        description:
          "Layanan gratis konsultasi tata letak denah rak gondola minimarket 3D sebelum pembelian.",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "IDR",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Bagaimana cara mendapatkan layanan Free Konsultasi & Desain Layout 3D?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Cukup klik tombol Konsultasi WA Gratis dan kirimkan ukuran ruangan toko Anda. Tim teknis Ritelindo akan membuatkan denah 3D tanpa biaya.",
            },
          },
          {
            "@type": "Question",
            name: "Apakah benar gratis ongkir ke seluruh Jawa dan Bali?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Ya, kami memberikan fasilitas Free Ongkir armada kami ke seluruh area pulau Jawa dan Bali sesuai syarat pemesanan paket toko.",
            },
          },
          {
            "@type": "Question",
            name: "Daerah mana saja yang mendapatkan Free Perakitan?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Layanan perakitan gratis oleh teknisi ahli mencakup wilayah Jawa Timur (Jatim), Jawa Tengah (Jateng), dan DIY.",
            },
          },
        ],
      },
    ],
  };

  return (
    <html lang="id" className="scroll-smooth bg-white">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#FFFFFF" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-white text-[#1C1917]" style={{ backgroundColor: '#FFFFFF', color: '#1C1917' }}>
        {children}
      </body>
    </html>
  );
}
