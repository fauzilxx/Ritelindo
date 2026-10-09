export interface ValueProp {
  id: string;
  title: string;
  shortDesc: string;
  badge?: string;
  iconName: string;
}

export const VALUE_PROPOSITIONS: ValueProp[] = [
  {
    id: "layout-3d",
    title: "Free Konsultasi & Layout 3D",
    shortDesc: "Simulasi penataan denah rak toko secara 3D presisi sebelum Anda membeli. Nol risiko salah ukuran.",
    badge: "Layanan Utama",
    iconName: "Box",
  },
  {
    id: "free-ongkir",
    title: "Free Ongkir Jawa - Bali",
    shortDesc: "Hemat jutaan rupiah biaya logistik armada pengiriman langsung sampai ke lokasi toko Anda.",
    badge: "Hemat Biaya",
    iconName: "Truck",
  },
  {
    id: "free-rakit",
    title: "Free Perakitan Jatim, Jateng & DIY",
    shortDesc: "Tim teknisi profesional pabrik kami rakitkan langsung di tempat hingga toko siap buka.",
    badge: "Tanpa Repot",
    iconName: "Wrench",
  },
  {
    id: "custom-ukuran",
    title: "Bisa Custom Sesuai Ruangan",
    shortDesc: "Tersedia pilihan tinggi, panjang ambalan, jumlah susun, serta warna tiang sesuai konsep toko Anda.",
    badge: "Fleksibel",
    iconName: "Ruler",
  },
  {
    id: "harga-pabrik",
    title: "Langsung dari Pabrik",
    shortDesc: "Harga tangan pertama tanpa perantara distributor. Kualitas plat baja Cold Rolled Steel kokoh & tahan lama.",
    badge: "Harga Terbaik",
    iconName: "Factory",
  },
  {
    id: "skala-fleksibel",
    title: "Satuan s/d Proyek Retail",
    shortDesc: "Melayani pembelian rak satuan, paket lengkap toko per meter, hingga pengadaan proyek minimarket jaringan.",
    badge: "Semua Skala",
    iconName: "Layers",
  },
  {
    id: "jasa-interior",
    title: "Jasa Interior Toko Modern",
    shortDesc: "Upgrade tampilan toko kelontong atau bangun minimarket stylish dengan pencahayaan dan signage modern.",
    badge: "Upgrade Toko",
    iconName: "Sparkles",
  },
];

export interface IndustrySector {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  recommendedShelf: string;
  highlightPoints: string[];
}

export const SECTORS: IndustrySector[] = [
  {
    id: "minimarket",
    name: "Minimarket Modern",
    slug: "minimarket",
    tagline: "Setup Toko Standar Retail Modern Mirip Waralaba",
    description: "Layout lorong lapang dengan kombinasi rak single dinding (Wall Gondola), double tengah (Island), dan rak promo muka (End Gondola) untuk memaksimalkan kapasitas display.",
    recommendedShelf: "Gondola Single H150/180cm, Gondola Double H120/150cm + Meja Kasir Shelving",
    highlightPoints: ["Sirkulasi belanja rapi", "Tahan beban berat per shelving 60-80 kg", "Mudah dipasangi price tag mika"],
  },
  {
    id: "sembako",
    name: "Toko Sembako / Kelontong",
    slug: "sembako",
    tagline: "Transformasi Toko Kelontong Tradisional Jadi Modern",
    description: "Tinggalkan kesan toko sembako kumuh dan sempit. Tingkatkan omzet hingga berlipat dengan penataan barang yang mudah dijangkau pembeli.",
    recommendedShelf: "Rak Gondola Heavy Support, Rak Beras & Minyak, Rak Chiki & Snack Gantung",
    highlightPoints: ["Kapasitas muat karung beras & karton minyak", "Toko terlihat 3x lebih bersih & luas", "Pelanggan betah berbelanja"],
  },
  {
    id: "apotek",
    name: "Apotek & Toko Obat",
    slug: "apotek",
    tagline: "Display Higienis, Rapi & Standar Farmasi",
    description: "Rak display obat bebas (OTC), etalase kaca, dan rak obat resep belakang dengan laci pembagi yang higienis serta finishing powder coating anti-debu.",
    recommendedShelf: "Gondola Back Mesh / Perforated + Gantungan Hook + Rak Obat Bertingkat",
    highlightPoints: ["Tampilan steril & elegan", "Pencarian obat lebih cepat", "Ambalan adjustable per ukuran botol/strip"],
  },
  {
    id: "petshop",
    name: "Pet Shop",
    slug: "petshop",
    tagline: "Kuat untuk Makanan Hewan Karungan & Aksesoris Lucu",
    description: "Kombinasi ambalan ekstra kuat untuk tumpukan dry food karung 20kg serta display hook ram kawat untuk tali kekang, kandang kecil, dan snack sachet.",
    recommendedShelf: "Gondola Heavy Duty Single 200cm + Wire Mesh Hook Display",
    highlightPoints: ["Plat shelving tidak melengkung", "Display aksesoris maksimal dengan ram kawat", "Tampilan toko eye-catching"],
  },
  {
    id: "atk",
    name: "Toko ATK & Fotokopi",
    slug: "atk",
    tagline: "Display Alat Tulis Berjenjang & Tertata",
    description: "Optimalisasi display kertas rim, buku tulis, map, pena, dan perlengkapan kantor dengan rak shelving bertingkat rapat dan partisi mika bening.",
    recommendedShelf: "Gondola Multi-tier 5-6 Shelving dengan Pembatas Mika Acrylic",
    highlightPoints: ["Display pena & kertas tertata rapi", "Menampung ratusan varian SKU", "Mudah dihitung stoknya"],
  },
  {
    id: "bahan-kue",
    name: "Toko Bahan Kue",
    slug: "bahan-kue",
    tagline: "Penyusunan Rapi Bahan Repack, Tepung & Loyang",
    description: "Display bahan kue membutuhkan kebersihan ekstra dan daya tahan terhadap beban tepung, mentega, sirup, hingga deretan cetakan kue.",
    recommendedShelf: "Gondola Powder Coating Tebal + Rak Keranjang Snack/Bumbu",
    highlightPoints: ["Mudah dibersihkan dari tumpahan bubuk", "Kapasitas muat kaleng & jerigen", "Estetis untuk toko kue modern"],
  },
  {
    id: "fashion",
    name: "Toko Fashion & Baby Shop",
    slug: "fashion",
    tagline: "Display Pakaian, Perlengkapan Bayi & Susu",
    description: "Kombinasi rak gondola susu formula yang kokoh, gantungan hanger pakaian anak, dan rak aksesoris popok yang empuk dan menarik.",
    recommendedShelf: "Gondola End Bar Hanger + Shelving Kayu/Putih Minimalis",
    highlightPoints: ["Finishing halus tidak merusak kain", "Kuat menopang kaleng susu", "Visual estetik dan bersih"],
  },
  {
    id: "bangunan",
    name: "Toko Bahan Bangunan",
    slug: "bangunan",
    tagline: "Kekuatan Ekstra untuk Cat, Keramik & Tools",
    description: "Menghadirkan konsep Toko Bangunan Modern / Mini Depo Bangunan dengan rak bertulang ganda yang tahan beban kaleng cat dan perkakas berat.",
    recommendedShelf: "Medium Duty Rack & Gondola Reinforced Steel (Beban 100kg/shelving)",
    highlightPoints: ["Baja tebal anti-bengkok", "Konstruksi tahan benturan", "Kesan modern untuk toko bangunan"],
  },
];

export interface StorePackage {
  id: string;
  name: string;
  targetSize: string;
  badge?: string;
  isPopular?: boolean;
  priceNote: string;
  idealFor: string;
  features: string[];
}

export const STORE_PACKAGES: StorePackage[] = [
  {
    id: "paket-kelontong",
    name: "Paket Toko Kelontong Modern",
    targetSize: "Ukuran Toko 18 - 30 m² (misal: 3x6m / 4x7m)",
    badge: "Solusi Upgrade Cepat",
    isPopular: false,
    priceNote: "Investasi Terjangkau Langsung Pabrik",
    idealFor: "Pemilik toko kelontong/sembako yang ingin beralih ke konsep swalayan modern.",
    features: [
      "Gratis Desain Denah Layout 3D",
      "8-12 Unit Rak Gondola Single Wall (Dinding)",
      "4-6 Unit Rak Gondola Double Island (Tengah)",
      "2 Unit Rak End Gondola (Display Promo Muka)",
      "1 Unit Meja Kasir Shelving Minimalis",
      "Gratis Ongkir Jawa-Bali",
      "Gratis Perakitan di Lokasi (Jatim, Jateng, DIY)",
      "Garansi Konstruksi Kokoh",
    ],
  },
  {
    id: "paket-minimarket",
    name: "Paket Minimarket Standar",
    targetSize: "Ukuran Toko 36 - 60 m² (misal: 5x8m / 6x10m)",
    badge: "Paling Banyak Dipilih",
    isPopular: true,
    priceNote: "Best Value Paket Lengkap",
    idealFor: "Minimarket baru, Apotek, Pet Shop, atau Cabang Baru berstandar retail nasional.",
    features: [
      "Gratis Full Layout 3D & Simulasi Jalur Pembeli",
      "14-20 Unit Rak Gondola Single Wall H180cm",
      "8-14 Unit Rak Gondola Double Island H150cm",
      "4-6 Unit Rak End Gondola Promo H150cm",
      "1 Set Meja Kasir L-Shape / Shelving Premium",
      "Pilihan Warna Tiang Custom Sesuai Konsep",
      "Gratis Ongkir Jawa-Bali",
      "Gratis Perakitan & Pengecekan Presisi Teknisi Pabrik",
    ],
  },
  {
    id: "paket-supermarket",
    name: "Paket Toko Besar & Supermarket",
    targetSize: "Ukuran Toko 80 - 150+ m² (Grosir / Swalayan)",
    badge: "Kapasitas Maksimal",
    isPopular: false,
    priceNote: "Kustomisasi Proyek Skala Besar",
    idealFor: "Toko Sembako Grosir, Toko ATK 2 Lantai, Bahan Bangunan Modern, atau Supermarket Lokal.",
    features: [
      "Masterplan Layout 3D Komprehensif + Konsultasi Zonasi Produk",
      "30+ Unit Rak Gondola Dinding H200cm (Tinggi)",
      "20+ Unit Rak Gondola Double Island H150/180cm",
      "8+ Unit Rak End Gondola + Wire Basket",
      "Meja Kasir Checkout Modern 2 Counter",
      "Tersedia Rak Gudang Heavy Duty Terpadu",
      "Gratis Pengiriman & Supervisi Teknisi Perakitan",
      "Jasa Konsultasi Interior & Tata Letak Lengkap",
    ],
  },
];

export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQS: FAQItem[] = [
  {
    question: "Bagaimana cara mendapatkan layanan Free Konsultasi & Desain Layout 3D?",
    answer: "Sangat mudah! Cukup klik tombol 'Konsultasi WA Gratis', sampaikan ukuran ruangan toko Anda (panjang x lebar) dan jenis usahanya. Tim desain teknis Ritelindo akan membuatkan denah tata letak rak 3D secara presisi tanpa dipungut biaya sebelum Anda memutuskan membeli.",
  },
  {
    question: "Apakah benar gratis ongkir ke seluruh wilayah Jawa dan Bali?",
    answer: "Ya, betul! Kami memberikan fasilitas Free Ongkir untuk pengiriman armada kami ke seluruh area pulau Jawa dan Bali sesuai dengan syarat minimum pemesanan paket toko. Anda tidak perlu khawatir dengan biaya kirim yang mahal.",
  },
  {
    question: "Daerah mana saja yang mendapatkan layanan Free Perakitan?",
    answer: "Layanan perakitan gratis oleh teknisi ahli pabrik Ritelindo mencakup wilayah Jawa Timur (Jatim), Jawa Tengah (Jateng), dan Daerah Istimewa Yogyakarta (DIY). Rak akan dirakitkan langsung sampai berdiri kokoh dan siap digunakan di toko Anda.",
  },
  {
    question: "Apakah bisa memesan rak secara custom sesuai ukuran ruangan saya?",
    answer: "Tentu bisa. Sebagai produsen langsung dari pabrik, kami memproduksi rak dengan berbagai variasi tinggi tiang (120cm, 150cm, 180cm, 200cm), kedalaman ambalan/shelving (30cm, 35cm, 40cm, 45cm), serta kustomisasi warna tiang (merah, biru, hijau, oranye, hitam, putih) yang serasi dengan identitas brand toko Anda.",
  },
  {
    question: "Berapa kapasitas beban untuk setiap ambalan/shelving rak Ritelindo?",
    answer: "Rak gondola standar Ritelindo menggunakan plat baja Cold Rolled Steel SPCC berkualitas dengan tulangan bawah ganda. Setiap ambalan mampu menahan beban merata antara 50 kg hingga 80 kg, dan tersedia varian Heavy/Medium Duty untuk beban hingga 100+ kg per ambalan.",
  },
  {
    question: "Apakah melayani pembelian dalam jumlah sedikit (satuan) atau hanya paket toko?",
    answer: "Kami melayani secara fleksibel: mulai dari pembelian eceran/satuan untuk penambahan rak toko yang sudah ada, paket lengkap setup toko baru, hingga pengadaan proyek retail jaringan ratusan cabang.",
  },
  {
    question: "Apa yang dimaksud dengan Jasa Interior Toko dari Ritelindo?",
    answer: "Selain menyuplai rak fisik, kami memiliki divisi desain interior toko retail. Kami membantu penataan visual merchandising, pembuatan signage/papan nama toko, pemilihan lampu display, meja kasir custom, hingga wall panel agar toko Anda memiliki tampilan estetik, modern, dan menarik banyak pelanggan.",
  },
];
