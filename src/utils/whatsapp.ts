// Utility helper untuk generate link WhatsApp dengan tracking pesan terstruktur

export const DEFAULT_WHATSAPP_NUMBER = "6282324905011"; // Nomor resmi WhatsApp Ritelindo

export interface WhatsAppMessageOptions {
  source?: string;
  storeType?: string;
  storeSize?: string;
  packageTitle?: string;
}

export function buildWhatsAppLink(
  customMessage?: string,
  options?: WhatsAppMessageOptions,
  phone = DEFAULT_WHATSAPP_NUMBER
): string {
  if (customMessage) {
    return `https://wa.me/${phone}?text=${encodeURIComponent(customMessage)}`;
  }

  let text = "Halo Tim Ritelindo Group, saya ingin konsultasi mengenai rak toko dan layanan Free Desain Layout 3D.";

  if (options?.packageTitle) {
    text = `Halo Tim Ritelindo Group, saya tertarik dengan *${options.packageTitle}*. Mohon informasi ketersediaan, estimasi pengiriman, dan rincian penawarannya.`;
  } else if (options?.storeType && options?.storeSize) {
    text = `Halo Tim Ritelindo Group, saya ingin konsultasi kebutuhan rak untuk jenis usaha *${options.storeType}* dengan estimasi ukuran toko *${options.storeSize}*. Mohon dibantu rancangan layout 3D dan rincian anggarannya.`;
  } else if (options?.source) {
    text = `Halo Tim Ritelindo Group, saya melihat penawaran dari Google Ads (${options.source}) dan ingin klaim promo *Free Desain Layout 3D, Free Ongkir Jawa-Bali, dan Free Perakitan*.`;
  }

  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
