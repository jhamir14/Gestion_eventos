import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ProductSpecifications {
  ram: string;
  storage: string;
  network?: string;
  screen?: string;
  rearCamera?: string;
  frontCamera?: string;
  processor?: string;
  battery?: string;
  charging?: string;
  resistance?: string;
  aiExtras?: string;
  accessories?: string;
}

export interface Product {
  id: string;
  brand: string;
  model: string;
  image: string;
  description?: string;
  specifications: ProductSpecifications;
  priceCash: number;
  initialPayment: number;
  weeklyPayment: number;
  weeks: number;
}

interface StoreState {
  products: Product[];
  wishlist: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (id: string) => void;
  toggleWishlist: (product: Product) => void;
}

const INITIAL_PRODUCTS: Product[] = [
  // ==========================================
  // APPLE / IPHONE
  // ==========================================
  {
    id: 'iphone-15',
    brand: 'Apple',
    model: 'iPhone 15',
    image: 'https://coolboxpe.vtexassets.com/arquivos/ids/498754/iPhone-15-128GB-6GB_2.jpg?v=638975178440230000',
    description: 'Innovación con Dynamic Island, cámara principal de 48 MP con zoom 2x de calidad óptica y nuevo conector universal USB-C.',
    specifications: {
      ram: '6GB',
      storage: '128GB',
      network: '5G',
      screen: '6.1" Super Retina XDR OLED 2000 nits',
      rearCamera: '48 MP + 12 MP',
      frontCamera: '12 MP TrueDepth',
      processor: 'A16 Bionic',
      battery: '3349 mAh',
      charging: '20 W (MagSafe 15W)',
      resistance: 'IP68',
      aiExtras: 'Dynamic Island, Photonic Engine',
      accessories: 'Cable USB-C tejido'
    },
    priceCash: 2800,
    initialPayment: 300,
    weeklyPayment: 150,
    weeks: 29
  },
  {
    id: 'iphone-16',
    brand: 'Apple',
    model: 'iPhone 16',
    image: 'https://coolboxpe.vtexassets.com/arquivos/ids/412964-800-800?v=638727206727630000&width=800&height=800&aspect=true',
    description: 'Equipado con el nuevo botón Control de Cámara táctil, potente chip A18 preparado para Apple Intelligence y batería de larga duración.',
    specifications: {
      ram: '8GB',
      storage: '128GB',
      network: '5G',
      screen: '6.1" Super Retina XDR OLED',
      rearCamera: '48 MP Fusion + 12 MP',
      frontCamera: '12 MP TrueDepth',
      processor: 'A18 Bionic',
      battery: '3561 mAh',
      charging: '25 W (MagSafe 25W)',
      resistance: 'IP68',
      aiExtras: 'Apple Intelligence, Camera Control',
      accessories: 'Cable USB-C'
    },
    priceCash: 3000,
    initialPayment: 300,
    weeklyPayment: 150,
    weeks: 32
  },
  {
    id: 'iphone-16-pro-max',
    brand: 'Apple',
    model: 'iPhone 16 Pro Max',
    image: '/phones/iphone-16-pro-max.jpg',
    description: 'Pantalla inmersiva de 6.9 pulgadas con bordes ultra delgados, chasis de titanio grado 5, botón Control de Cámara y chip A18 Pro con Apple Intelligence.',
    specifications: {
      ram: '8GB',
      storage: '256GB',
      network: '5G',
      screen: '6.9" Super Retina XDR OLED ProMotion 120Hz',
      rearCamera: '48 MP Fusión + 48 MP Ultra Gran Angular + 12 MP Telefoto 5x',
      frontCamera: '12 MP TrueDepth',
      processor: 'A18 Pro',
      battery: '4685 mAh',
      charging: '25 W (MagSafe 25W)',
      resistance: 'IP68',
      aiExtras: 'Apple Intelligence, Botón Control de Cámara, Titanio Grado 5',
      accessories: 'Cable USB-C tejido'
    },
    priceCash: 4200,
    initialPayment: 500,
    weeklyPayment: 200,
    weeks: 30
  },
  {
    id: 'iphone-17',
    brand: 'Apple',
    model: 'iPhone 17',
    image: 'https://coolboxpe.vtexassets.com/arquivos/ids/508046-800-800?v=639011535657570000&width=800&height=800&aspect=true',
    description: 'Próxima generación de Apple con pantalla ProMotion fluida a 120Hz, doble sensor de 48 MP y chip A19 con máxima eficiencia térmica.',
    specifications: {
      ram: '8GB',
      storage: '256GB',
      network: '5G',
      screen: '6.3" Super Retina XDR ProMotion 120Hz',
      rearCamera: '48 MP + 48 MP Ultra Gran Angular',
      frontCamera: '24 MP TrueDepth',
      processor: 'A19 Bionic',
      battery: '3800 mAh',
      charging: '30 W',
      resistance: 'IP68',
      aiExtras: 'Apple Intelligence Pro',
      accessories: 'Cable USB-C'
    },
    priceCash: 3500,
    initialPayment: 300,
    weeklyPayment: 150,
    weeks: 35
  },
  {
    id: 'iphone-17-pro',
    brand: 'Apple',
    model: 'iPhone 17 Pro',
    image: 'https://coolboxpe.vtexassets.com/arquivos/ids/512334/Iphone-17-pro-max-deep-blue-conChip.jpg?v=639023810900630000',
    description: 'El estándar definitivo de la industria móvil: chasis de titanio de grado 5, triple cámara de 48 MP con telefoto 5x y chip A19 Pro.',
    specifications: {
      ram: '12GB',
      storage: '256GB',
      network: '5G',
      screen: '6.3" ProMotion 120Hz Always-On',
      rearCamera: '48 MP + 48 MP + 48 MP Telefoto 5x',
      frontCamera: '24 MP',
      processor: 'A19 Pro',
      battery: '4200 mAh',
      charging: '35 W',
      resistance: 'IP68',
      aiExtras: 'Apple Intelligence Pro, ProRes 4K 120fps',
      accessories: 'Cable USB-C trenzado'
    },
    priceCash: 4950,
    initialPayment: 300,
    weeklyPayment: 150,
    weeks: 40
  },
  {
    id: 'iphone-17-pro-max',
    brand: 'Apple',
    model: 'iPhone 17 Pro Max',
    image: '/phones/iphone-17-pro-max.jpg',
    description: 'El buque insignia definitivo de Apple: máxima potencia con chip A19 Pro, pantalla expansiva de 6.9 pulgadas ProMotion a 120Hz y autonomía líder en la industria.',
    specifications: {
      ram: '12GB',
      storage: '256GB',
      network: '5G',
      screen: '6.9" ProMotion 120Hz Always-On',
      rearCamera: '48 MP + 48 MP + 48 MP Telefoto 5x',
      frontCamera: '24 MP TrueDepth',
      processor: 'A19 Pro',
      battery: '4800 mAh',
      charging: '35 W',
      resistance: 'IP68',
      aiExtras: 'Apple Intelligence Pro, ProRes 4K 120fps, Titanio',
      accessories: 'Cable USB-C trenzado'
    },
    priceCash: 4600,
    initialPayment: 500,
    weeklyPayment: 200,
    weeks: 32
  },
  {
    id: 'iphone-18-pro-max',
    brand: 'Apple',
    model: 'iPhone 18 Pro Max',
    image: '/phones/iphone-18-pro-max.jpg',
    description: 'La cúspide de la tecnología móvil de Apple: procesador A20 Pro, sistema fotográfico Pro Fusion con zoom periscópico y batería de máxima duración.',
    specifications: {
      ram: '12GB',
      storage: '256GB',
      network: '5G',
      screen: '6.9" ProMotion 120Hz Always-On Ultra HDR',
      rearCamera: '48 MP Pro Fusion + 48 MP + 48 MP Periscopio 10x',
      frontCamera: '24 MP TrueDepth',
      processor: 'A20 Pro',
      battery: '5000 mAh',
      charging: '40 W',
      resistance: 'IP68',
      aiExtras: 'Apple Intelligence Neural V2, eSIM Avanzado',
      accessories: 'Cable USB-C trenzado'
    },
    priceCash: 5100,
    initialPayment: 500,
    weeklyPayment: 200,
    weeks: 34
  },

  // ==========================================
  // SAMSUNG (6 modelos oficiales del catálogo)
  // ==========================================
  {
    id: 'samsung-a17-4g-256',
    brand: 'Samsung',
    model: 'Samsung A17 4G',
    image: '/phones/samsung-a17-4g.jpg',
    description: 'Diseño moderno y confiable con pantalla AMOLED de 90Hz, cámara de 50 MP con estabilización óptica OIS y protección Knox Vault.',
    specifications: {
      ram: '8GB',
      storage: '256GB',
      network: '4G',
      screen: '6.7" AMOLED FHD+ 90 Hz',
      rearCamera: '50 + 5 + 2 MP OIS',
      frontCamera: '13 MP',
      processor: 'Helio G99',
      battery: '5000 mAh',
      charging: '25 W',
      resistance: 'IP54',
      aiExtras: 'Gemini; One UI, Knox Vault',
      accessories: 'USB-C; consultar caja'
    },
    priceCash: 950,
    initialPayment: 150,
    weeklyPayment: 107,
    weeks: 12
  },
  {
    id: 'samsung-a27-5g-128',
    brand: 'Samsung',
    model: 'Samsung A27 5G',
    image: '/phones/samsung-a27-5g.jpg',
    description: 'Conectividad 5G con procesador Snapdragon 6 Gen 3, pantalla AMOLED fluida a 120Hz y funciones inteligentes Awesome Intelligence.',
    specifications: {
      ram: '6GB',
      storage: '128GB',
      network: '5G',
      screen: '6.7" AMOLED FHD+ 120 Hz',
      rearCamera: '50 OIS + 5 + 2 MP',
      frontCamera: '12 MP',
      processor: 'Snapdragon 6 Gen 3',
      battery: '5000 mAh',
      charging: '25 W',
      resistance: 'IP64',
      aiExtras: 'Awesome Intelligence, Knox Vault',
      accessories: 'USB-C; consultar caja'
    },
    priceCash: 1150,
    initialPayment: 150,
    weeklyPayment: 133,
    weeks: 12
  },
  {
    id: 'samsung-a36-5g-128',
    brand: 'Samsung',
    model: 'Samsung A36 5G',
    image: '/phones/samsung-a36-5g.jpg',
    description: 'Equilibrio perfecto con pantalla AMOLED 120Hz, carga rápida de 45W, resistencia IP67, Circle to Search y Borrador de objetos con IA.',
    specifications: {
      ram: '6GB',
      storage: '128GB',
      network: '5G',
      screen: '6.7" AMOLED FHD+ 120 Hz',
      rearCamera: '50 OIS + 8 + 5 MP',
      frontCamera: '12 MP',
      processor: 'Snapdragon 6 Gen 3',
      battery: '5000 mAh',
      charging: '45 W',
      resistance: 'IP67',
      aiExtras: 'Circle to Search, Borrador objetos',
      accessories: 'USB-C; consultar caja'
    },
    priceCash: 1250,
    initialPayment: 150,
    weeklyPayment: 147,
    weeks: 12
  },
  {
    id: 'samsung-a54-5g-256',
    brand: 'Samsung',
    model: 'Samsung A54 5G',
    image: '/phones/samsung-a54-5g.jpg',
    description: 'Cámara triple de 50 MP OIS con Nightography, sensor frontal de 32 MP, pantalla premium AMOLED 120Hz y resistencia sumergible IP67.',
    specifications: {
      ram: '8GB',
      storage: '256GB',
      network: '5G',
      screen: '6.4" AMOLED FHD+ 120 Hz',
      rearCamera: '50 OIS + 12 + 5 MP',
      frontCamera: '32 MP',
      processor: 'Exynos 1380',
      battery: '5000 mAh',
      charging: '25 W',
      resistance: 'IP67',
      aiExtras: 'Knox; fotografía Nightography',
      accessories: 'USB-C; consultar caja'
    },
    priceCash: 1350,
    initialPayment: 150,
    weeklyPayment: 160,
    weeks: 12
  },
  {
    id: 'samsung-a56-5g-256',
    brand: 'Samsung',
    model: 'Samsung A56 5G',
    image: '/phones/samsung-a56-5g.jpg',
    description: 'Gran capacidad con 12GB de memoria RAM, procesador Exynos 1580, carga de 45W, resistencia IP67, Circle to Search y soporte eSIM Perú.',
    specifications: {
      ram: '12GB',
      storage: '256GB',
      network: '5G',
      screen: '6.7" AMOLED FHD+ 120 Hz',
      rearCamera: '50 OIS + 12 + 5 MP',
      frontCamera: '12 MP',
      processor: 'Exynos 1580',
      battery: '5000 mAh',
      charging: '45 W',
      resistance: 'IP67',
      aiExtras: 'Circle to Search, Best Face (eSIM SKU PE)',
      accessories: 'USB-C; consultar caja'
    },
    priceCash: 1500,
    initialPayment: 150,
    weeklyPayment: 180,
    weeks: 12
  },
  {
    id: 'samsung-a57-5g-256',
    brand: 'Samsung',
    model: 'Samsung A57 5G',
    image: '/phones/samsung-a57-5g.jpg',
    description: 'El buque insignia de la serie Galaxy A: procesador Exynos 1680, resistencia máxima IP68, funciones de IA Best Face y transcripción de voz.',
    specifications: {
      ram: '8GB',
      storage: '256GB',
      network: '5G',
      screen: '6.7" AMOLED+ FHD+ 120 Hz',
      rearCamera: '50 OIS + 12 + 5 MP',
      frontCamera: '12 MP',
      processor: 'Exynos 1680',
      battery: '5000 mAh',
      charging: '45 W',
      resistance: 'IP68',
      aiExtras: 'Best Face; Borrador, Transcripción voz',
      accessories: 'USB-C; consultar caja'
    },
    priceCash: 1550,
    initialPayment: 200,
    weeklyPayment: 180,
    weeks: 12
  },

  // ==========================================
  // ZTE / NUBIA (6 modelos oficiales)
  // ==========================================
  {
    id: 'nubia-neo-3-gt-256',
    brand: 'ZTE',
    model: 'Nubia Neo 3 GT',
    image: '/phones/nubia-neo-3-gt.jpg',
    description: 'Rendimiento gaming accesible con pantalla OLED a 120Hz, gatillos táctiles incorporados, batería de 6000 mAh y carga bestial de 80W.',
    specifications: {
      ram: '8GB',
      storage: '256GB',
      network: '5G',
      screen: 'OLED 120 Hz',
      rearCamera: '50 + 2 MP',
      frontCamera: '16 MP',
      processor: 'Unisoc T9100',
      battery: '6000 mAh',
      charging: '80 W',
      resistance: 'Por confirmar',
      aiExtras: 'Gatillos gaming, NeoTurbo',
      accessories: 'Consultar empaque'
    },
    priceCash: 950,
    initialPayment: 150,
    weeklyPayment: 107,
    weeks: 12
  },
  {
    id: 'nubia-air-5g-256',
    brand: 'ZTE',
    model: 'Nubia Air 5G',
    image: '/phones/nubia-air-5g.jpg',
    description: 'Diseño ultradelgado y elegante con pantalla AMOLED 1.5K, certificación extrema IP68/IP69/IP69K y herramientas de inteligencia artificial.',
    specifications: {
      ram: '8GB',
      storage: '256GB',
      network: '5G',
      screen: '6.78" AMOLED 1.5K · 120 Hz',
      rearCamera: '50 MP + extras',
      frontCamera: '20 MP',
      processor: 'UNISOC 5G octacore',
      battery: '5000 mAh',
      charging: '33 W',
      resistance: 'IP68 / IP69 / IP69K',
      aiExtras: 'AI Magic Photos, Traducción IA',
      accessories: 'Consultar empaque'
    },
    priceCash: 1000,
    initialPayment: 150,
    weeklyPayment: 113,
    weeks: 12
  },
  {
    id: 'nubia-neo-5-5g-256',
    brand: 'ZTE',
    model: 'Nubia Neo 5 5G',
    image: '/phones/nubia-neo-5-5g.jpg',
    description: 'Estética gamer futurista, gatillos físicos laterales, procesador T9300, batería extendida de 6050 mAh y pantalla ultra fluida de 120Hz.',
    specifications: {
      ram: '8GB',
      storage: '256GB',
      network: '5G',
      screen: '6.8" LCD 120 Hz',
      rearCamera: '50 + 2 MP',
      frontCamera: '16 MP',
      processor: 'Unisoc T9300',
      battery: '6050 mAh',
      charging: '45 W',
      resistance: 'Por confirmar',
      aiExtras: 'Gatillos gaming, NeoTurbo',
      accessories: 'Consultar empaque'
    },
    priceCash: 1100,
    initialPayment: 150,
    weeklyPayment: 127,
    weeks: 12
  },
  {
    id: 'nubia-focus-2-ultra-512',
    brand: 'ZTE',
    model: 'Nubia Focus 2 Ultra',
    image: '/phones/nubia-focus-2-ultra.jpg',
    description: 'Diseñado para fotografía con sensor gran tamaño 1/1.55", anillo giratorio de zoom estilo cámara réflex y masivos 512GB de almacenamiento.',
    specifications: {
      ram: '8GB',
      storage: '512GB',
      network: '5G',
      screen: '6.8" AMOLED',
      rearCamera: 'Sensor 1/1.55"',
      frontCamera: '32 MP',
      processor: 'Octa-core 2.2 GHz',
      battery: '5000 mAh',
      charging: '33 W',
      resistance: 'Por confirmar',
      aiExtras: 'Anillo giratorio para fotografía (Ultra)',
      accessories: 'Kit según versión'
    },
    priceCash: 1150,
    initialPayment: 150,
    weeklyPayment: 133,
    weeks: 12
  },
  {
    id: 'nubia-focus-pro-5g-256',
    brand: 'ZTE',
    model: 'Nubia Focus Pro 5G',
    image: '/phones/nubia-focus-pro-5g.jpg',
    description: 'Cámara principal de 108 MP con estabilización óptica OIS, selfie de 32 MP, pantalla Full HD+ y kit fotográfico profesional incluido.',
    specifications: {
      ram: '8GB',
      storage: '256GB',
      network: '5G',
      screen: '6.72" FHD+',
      rearCamera: '108 MP OIS',
      frontCamera: '32 MP',
      processor: 'Octa-core 2.2 GHz',
      battery: '5000 mAh',
      charging: '33 W',
      resistance: 'Por confirmar',
      aiExtras: 'Kit de foto incluido (Pro)',
      accessories: 'Kit según versión'
    },
    priceCash: 1200,
    initialPayment: 150,
    weeklyPayment: 140,
    weeks: 12
  },
  {
    id: 'nubia-neo-5-gt-5g-256',
    brand: 'ZTE',
    model: 'Nubia Neo 5 GT 5G',
    image: '/phones/nubia-neo-5-gt-5g.jpg',
    description: 'La bestia gaming definitiva: ventilador interno activo, pantalla OLED a 144Hz, procesador Dimensity 7400 y carga ultrarrápida de 80W.',
    specifications: {
      ram: '12GB',
      storage: '256GB',
      network: '5G',
      screen: '6.8" OLED 1.5K · 144 Hz',
      rearCamera: '50 + 2 MP',
      frontCamera: '16 MP',
      processor: 'Dimensity 7400',
      battery: '6210 mAh',
      charging: '80 W',
      resistance: 'IP64 (ventilador IP54)',
      aiExtras: 'Ventilador interno, Gatillos gaming',
      accessories: 'USB-C; kit según versión'
    },
    priceCash: 1250,
    initialPayment: 150,
    weeklyPayment: 147,
    weeks: 12
  },

  // ==========================================
  // HONOR (6 modelos oficiales del catálogo)
  // ==========================================
  {
    id: 'honor-x7d-5g-256',
    brand: 'Honor',
    model: 'Honor X7D 5G',
    image: '/phones/honor-x7d-5g.jpg',
    description: 'Batería colosal de 6500 mAh, botón físico dedicado para funciones de IA, resistencia IP65 y sistema inteligente MagicOS 9.',
    specifications: {
      ram: '6GB',
      storage: '256GB',
      network: '5G',
      screen: '6.77" LCD HD+',
      rearCamera: '50 + 2 MP',
      frontCamera: '5 MP',
      processor: 'Snapdragon 6s Gen 3',
      battery: '6500 mAh',
      charging: '35 W',
      resistance: 'IP65',
      aiExtras: 'Botón IA; borrador MagicOS 9',
      accessories: 'Cargador + cable'
    },
    priceCash: 1000,
    initialPayment: 150,
    weeklyPayment: 113,
    weeks: 12
  },
  {
    id: 'honor-x8c-5g-256',
    brand: 'Honor',
    model: 'Honor X8C 5G',
    image: '/phones/honor-x8c-5g.jpg',
    description: 'Cámara ultranítida de 108 MP, pantalla AMOLED FHD+ brillante, diseño delgado y chip Dimensity 7025-Ultra con conectividad 5G.',
    specifications: {
      ram: '8GB',
      storage: '256GB',
      network: '5G',
      screen: '6.7" AMOLED FHD+',
      rearCamera: '108 + 5 MP',
      frontCamera: '16 MP',
      processor: 'Dimensity 7025-Ultra',
      battery: '5230 mAh',
      charging: '35 W',
      resistance: 'Por verificar',
      aiExtras: 'Edición IA Operadora PE',
      accessories: 'Consultar vendedor'
    },
    priceCash: 1150,
    initialPayment: 150,
    weeklyPayment: 133,
    weeks: 12
  },
  {
    id: 'honor-400-lite-5g-256',
    brand: 'Honor',
    model: 'Honor 400 Lite 5G',
    image: '/phones/honor-400-lite-5g.jpg',
    description: 'Potencia con 12GB de RAM, pantalla AMOLED 120Hz, cámara de 108 MP con botón de captura IA y certificación de resistencia IP65.',
    specifications: {
      ram: '12GB',
      storage: '256GB',
      network: '5G',
      screen: '6.7" AMOLED FHD+ · 120 Hz',
      rearCamera: '108 + 5 MP',
      frontCamera: '16 MP',
      processor: 'Dimensity 7025-Ultra',
      battery: '5230 mAh',
      charging: '35 W',
      resistance: 'IP65',
      aiExtras: 'Botón cámara IA MagicOS 9',
      accessories: 'Cargador + funda'
    },
    priceCash: 1400,
    initialPayment: 150,
    weeklyPayment: 167,
    weeks: 12
  },
  {
    id: 'honor-magic-7-lite-256',
    brand: 'Honor',
    model: 'Honor Magic 7 Lite',
    image: '/phones/honor-magic-7-lite.jpg',
    description: 'Pantalla curva AMOLED 1.5K ultra resistente a impactos, cámara 108 MP OIS, batería de 6600 mAh y carga rápida SuperCharge de 66W.',
    specifications: {
      ram: '8GB',
      storage: '256GB',
      network: '5G',
      screen: '6.78" AMOLED 1.5K · 120 Hz',
      rearCamera: '108 OIS + 5 MP',
      frontCamera: '16 MP',
      processor: 'Snapdragon 6 Gen 1',
      battery: '6600 mAh',
      charging: '66 W',
      resistance: 'IP65M',
      aiExtras: 'Edición IA MagicOS 8',
      accessories: 'Cargador 66W incluido'
    },
    priceCash: 1700,
    initialPayment: 200,
    weeklyPayment: 200,
    weeks: 12
  },
  {
    id: 'honor-magic-8-lite-512',
    brand: 'Honor',
    model: 'Honor Magic 8 Lite',
    image: '/phones/honor-magic-8-lite.jpg',
    description: 'El rey indiscutible de la autonomía: récord de 8300 mAh de batería, 512GB de almacenamiento, máxima resistencia IP69K y pantalla 1.5K.',
    specifications: {
      ram: '8GB',
      storage: '512GB',
      network: '5G',
      screen: '6.79" AMOLED 1.5K · 120 Hz',
      rearCamera: '108 OIS + 5 MP',
      frontCamera: '16 MP',
      processor: 'Snapdragon 6 Gen 4',
      battery: '8300 mAh',
      charging: '66 W',
      resistance: 'IP69K',
      aiExtras: 'AI Studio MagicOS',
      accessories: 'Consultar caja'
    },
    priceCash: 1800,
    initialPayment: 200,
    weeklyPayment: 213,
    weeks: 12
  },
  {
    id: 'honor-400-5g-512',
    brand: 'Honor',
    model: 'Honor 400 5G',
    image: '/phones/honor-400-5g.jpg',
    description: 'Sensor insignia de 200 MP OIS, cámara selfie de 50 MP, procesador Snapdragon 7 Gen 3, carga de 80W e integración nativa con Google Gemini.',
    specifications: {
      ram: '12GB',
      storage: '512GB',
      network: '5G',
      screen: '6.55" AMOLED 1.5K · 120 Hz',
      rearCamera: '200 OIS + 12 MP',
      frontCamera: '50 MP',
      processor: 'Snapdragon 7 Gen 3',
      battery: '6000 mAh',
      charging: '80 W',
      resistance: 'IP66',
      aiExtras: 'Gemini; AI Studio MagicOS 9',
      accessories: 'Consultar caja'
    },
    priceCash: 1900,
    initialPayment: 200,
    weeklyPayment: 227,
    weeks: 12
  },

  // ==========================================
  // XIAOMI (6 modelos oficiales del catálogo)
  // ==========================================
  {
    id: 'xiaomi-note-14-128',
    brand: 'Xiaomi',
    model: 'Redmi Note 14',
    image: '/phones/redmi-note-14.jpg',
    description: 'Pantalla AMOLED 120Hz fluida, cámara de 108 MP con inteligencia artificial, lector de huella en pantalla y batería de 5500 mAh.',
    specifications: {
      ram: '6GB',
      storage: '128GB',
      network: '4G',
      screen: '6.67" AMOLED FHD+ · 120 Hz',
      rearCamera: '108 + 2 + 2 MP',
      frontCamera: '20 MP',
      processor: 'Helio G99-Ultra',
      battery: '5500 mAh',
      charging: '33 W',
      resistance: 'IP54',
      aiExtras: 'Cámara IA, Huella en pantalla',
      accessories: 'USB-C; verificar caja'
    },
    priceCash: 900,
    initialPayment: 120,
    weeklyPayment: 104,
    weeks: 12
  },
  {
    id: 'xiaomi-note-15-4g-256',
    brand: 'Xiaomi',
    model: 'Redmi Note 15 4G',
    image: '/phones/redmi-note-15-4g.jpg',
    description: 'Gran batería de 6000 mAh, pantalla AMOLED de 6.77" a 120Hz, cámara de 108 MP, chip Helio G100-Ultra y funciones avanzadas con Gemini.',
    specifications: {
      ram: '8GB',
      storage: '256GB',
      network: '4G',
      screen: '6.77" AMOLED FHD+ · 120 Hz',
      rearCamera: '108 + 2 MP',
      frontCamera: '20 MP',
      processor: 'Helio G100-Ultra',
      battery: '6000 mAh',
      charging: '33 W',
      resistance: 'IP64',
      aiExtras: 'Gemini; AI foto HyperOS 2',
      accessories: 'Cargador 33W'
    },
    priceCash: 1050,
    initialPayment: 150,
    weeklyPayment: 120,
    weeks: 12
  },
  {
    id: 'xiaomi-note-14-pro-4g-256',
    brand: 'Xiaomi',
    model: 'Redmi Note 14 Pro 4G',
    image: '/phones/redmi-note-14-pro-4g.jpg',
    description: 'Sensor insignia de 200 MP con estabilización óptica OIS, selfie de 32 MP, carga rápida de 45W y pantalla AMOLED curva de gran nitidez.',
    specifications: {
      ram: '8GB',
      storage: '256GB',
      network: '4G',
      screen: '6.67" AMOLED FHD+ · 120 Hz',
      rearCamera: '200 OIS + 8 + 2 MP',
      frontCamera: '32 MP',
      processor: 'Helio G100-Ultra',
      battery: '5500 mAh',
      charging: '45 W',
      resistance: 'IP64',
      aiExtras: 'Gemini; edición IA HyperOS',
      accessories: 'Cargador 45W'
    },
    priceCash: 1100,
    initialPayment: 150,
    weeklyPayment: 127,
    weeks: 12
  },
  {
    id: 'xiaomi-note-15-pro-4g-512',
    brand: 'Xiaomi',
    model: 'Redmi Note 15 Pro 4G',
    image: '/phones/redmi-note-15-pro-4g.jpg',
    description: 'Máxima capacidad con 12GB RAM y 512GB, cámara de 200 MP OIS, batería masiva de 6500 mAh, Circle to Search y editor fotográfico IA.',
    specifications: {
      ram: '12GB',
      storage: '512GB',
      network: '4G',
      screen: '6.77" AMOLED FHD+ · 120 Hz',
      rearCamera: '200 OIS + 8 MP',
      frontCamera: '32 MP',
      processor: 'Helio G200-Ultra',
      battery: '6500 mAh',
      charging: '45 W',
      resistance: 'IP65',
      aiExtras: 'Circle to Search, Editor de imagen IA',
      accessories: 'Cargador 45W'
    },
    priceCash: 1350,
    initialPayment: 150,
    weeklyPayment: 160,
    weeks: 12
  },
  {
    id: 'xiaomi-poco-x7-pro-512',
    brand: 'Xiaomi',
    model: 'Poco X7 Pro',
    image: '/phones/poco-x7-pro.jpg',
    description: 'Poder gaming de gama alta con chip Dimensity 8400-Ultra, carga hiperrápida de 90W, resistencia sumergible IP68 y pantalla AMOLED 1.5K.',
    specifications: {
      ram: '12GB',
      storage: '512GB',
      network: '5G',
      screen: '6.67" AMOLED 1.5K · 120 Hz',
      rearCamera: '50 OIS + 8 MP',
      frontCamera: '20 MP',
      processor: 'Dimensity 8400-Ultra',
      battery: '6000 mAh',
      charging: '90 W',
      resistance: 'IP68',
      aiExtras: 'Gemini; Game Turbo HyperOS',
      accessories: 'Ver caja de región'
    },
    priceCash: 1400,
    initialPayment: 150,
    weeklyPayment: 167,
    weeks: 12
  },
  {
    id: 'xiaomi-poco-x8-pro-512',
    brand: 'Xiaomi',
    model: 'Poco X8 Pro',
    image: '/phones/poco-x8-pro.jpg',
    description: 'Máximo rendimiento insignia: procesador Dimensity 8500-Ultra, colosal carga de 100W, batería de 6500 mAh, resistencia IP68 y HyperOS 3.',
    specifications: {
      ram: '12GB',
      storage: '512GB',
      network: '5G',
      screen: '6.59" AMOLED 1.5K · 120 Hz',
      rearCamera: '50 OIS + 8 MP',
      frontCamera: '20 MP',
      processor: 'Dimensity 8500-Ultra',
      battery: '6500 mAh',
      charging: '100 W',
      resistance: 'IP68',
      aiExtras: 'HyperOS 3, Editor IA',
      accessories: 'USB-C; ver región'
    },
    priceCash: 1650,
    initialPayment: 200,
    weeklyPayment: 193,
    weeks: 12
  },

  // ==========================================
  // MOTOROLA (6 modelos oficiales del catálogo)
  // ==========================================
  {
    id: 'moto-g56-5g-256',
    brand: 'Motorola',
    model: 'Moto G56 5G',
    image: '/phones/moto-g56-5g.jpg',
    description: 'Construcción ultrarresistente con doble certificación IP68/IP69, selfie nítida de 32 MP, pantalla fluida a 120Hz y conectividad 5G.',
    specifications: {
      ram: '8GB',
      storage: '256GB',
      network: '5G',
      screen: '6.72" LCD FHD+ · 120 Hz',
      rearCamera: '50 + 8 MP',
      frontCamera: '32 MP',
      processor: 'Dimensity 7060',
      battery: '5200 mAh',
      charging: '30 W',
      resistance: 'IP68 / IP69',
      aiExtras: 'Moto Secure, Smart Connect',
      accessories: 'Kit según vendedor'
    },
    priceCash: 1050,
    initialPayment: 150,
    weeklyPayment: 120,
    weeks: 12
  },
  {
    id: 'moto-g77-5g-256',
    brand: 'Motorola',
    model: 'Moto G77 5G',
    image: '/phones/moto-g77-5g.jpg',
    description: 'Elegante pantalla curva pOLED 1.5K a 120Hz, cámara de 108 MP, cámara selfie de 32 MP, chip Dimensity 6400 y Google Gemini integrado.',
    specifications: {
      ram: '8GB',
      storage: '256GB',
      network: '5G',
      screen: '6.78" pOLED 1.5K · 120 Hz',
      rearCamera: '108 + 8 MP',
      frontCamera: '32 MP',
      processor: 'Dimensity 6400',
      battery: '5200 mAh',
      charging: '30 W',
      resistance: 'IP64',
      aiExtras: 'Google Gemini, Moto Secure',
      accessories: 'Cargador + cable'
    },
    priceCash: 1400,
    initialPayment: 150,
    weeklyPayment: 167,
    weeks: 12
  },
  {
    id: 'moto-edge-50-fusion-256',
    brand: 'Motorola',
    model: 'Moto Edge 50 Fusión',
    image: '/phones/moto-edge-50-fusion.jpg',
    description: 'Diseño curvo en cuero vegano con pantalla pOLED a 144Hz, sensor Sony Lytia de 50 MP OIS, protección IP68 y carga TurboPower de 68W.',
    specifications: {
      ram: '8GB',
      storage: '256GB',
      network: '5G',
      screen: '6.7" pOLED FHD+ · 144 Hz',
      rearCamera: '50 OIS + 13 MP',
      frontCamera: '32 MP',
      processor: 'Snapdragon 7s Gen 2',
      battery: '5000 mAh',
      charging: '68 W',
      resistance: 'IP68',
      aiExtras: 'Moto Secure, Smart Connect',
      accessories: 'Kit según vendedor'
    },
    priceCash: 1450,
    initialPayment: 150,
    weeklyPayment: 173,
    weeks: 12
  },
  {
    id: 'moto-g86-power-256',
    brand: 'Motorola',
    model: 'Moto G86 Power',
    image: '/phones/moto-g86-power.jpg',
    description: 'Batería colosal de 6720 mAh para múltiples días de uso, pantalla AMOLED 1.5K, cámara 50 MP OIS y máxima protección IP68/IP69.',
    specifications: {
      ram: '8GB',
      storage: '256GB',
      network: '5G',
      screen: '6.67" AMOLED 1.5K · 120 Hz',
      rearCamera: '50 OIS + 8 MP',
      frontCamera: '32 MP',
      processor: 'Dimensity 7300',
      battery: '6720 mAh',
      charging: '30 W',
      resistance: 'IP68 / IP69',
      aiExtras: 'Moto Secure, RAM Boost',
      accessories: 'Kit según vendedor'
    },
    priceCash: 1500,
    initialPayment: 150,
    weeklyPayment: 180,
    weeks: 12
  },
  {
    id: 'moto-edge-70-fusion-256',
    brand: 'Motorola',
    model: 'Moto Edge 70 Fusión',
    image: '/phones/moto-edge-70-fusion.jpg',
    description: 'Superbatería de 7000 mAh con carga de 68W en un cuerpo curvo ultradelgado, pantalla a 144Hz, Snapdragon 7s Gen 3 y suite de Moto AI.',
    specifications: {
      ram: '8GB',
      storage: '256GB',
      network: '5G',
      screen: '6.78" AMOLED 1.5K · 144 Hz',
      rearCamera: '50 OIS + 13 MP',
      frontCamera: '32 MP',
      processor: 'Snapdragon 7s Gen 3',
      battery: '7000 mAh',
      charging: '68 W',
      resistance: 'IP68 / IP69',
      aiExtras: 'Moto AI, Smart Connect',
      accessories: 'Kit según vendedor'
    },
    priceCash: 1650,
    initialPayment: 200,
    weeklyPayment: 193,
    weeks: 12
  },
  {
    id: 'moto-edge-50-buds-256',
    brand: 'Motorola',
    model: 'Moto Edge 50 + Buds',
    image: '/phones/moto-edge-50-buds.jpg',
    description: 'Combo exclusivo con audífonos Moto Buds incluidos, triple cámara con telefoto dedicado, 12GB RAM, carga de 68W e inalámbrica de 15W.',
    specifications: {
      ram: '12GB',
      storage: '256GB',
      network: '5G',
      screen: '6.7" pOLED 1.5K · 120 Hz',
      rearCamera: '50 OIS + 13 + 10 MP Telefoto',
      frontCamera: '32 MP',
      processor: 'Snapdragon 7 Gen 1 AE',
      battery: '5000 mAh',
      charging: '68 W (15W inalámbrica)',
      resistance: 'IP68',
      aiExtras: 'Moto Secure, Smart Connect',
      accessories: 'Moto Buds (promo)'
    },
    priceCash: 1700,
    initialPayment: 200,
    weeklyPayment: 200,
    weeks: 12
  }
];

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      products: INITIAL_PRODUCTS,
      wishlist: [],
      addProduct: (product) =>
        set((state) => ({ products: [...state.products, product] })),
      removeProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),
      toggleWishlist: (product) =>
        set((state) => {
          const exists = state.wishlist.find((p) => p.id === product.id);
          return {
            wishlist: exists
              ? state.wishlist.filter((p) => p.id !== product.id)
              : [...state.wishlist, product],
          };
        }),
    }),
    {
      name: 'inversiones-jp-storage-v35', // Updated storage key to force refresh
    }
  )
);
