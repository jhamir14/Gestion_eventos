import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  brand: string;
  model: string;
  image: string;
  specifications: {
    ram: string;
    storage: string;
  };
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
  {
    id: 'iphone-13-128',
    brand: 'Apple',
    model: 'iPhone 13 128GB',
    image: 'https://coolboxpe.vtexassets.com/arquivos/ids/366438-800-800?v=638738754268200000&width=800&height=800&aspect=true',
    specifications: { ram: '4GB', storage: '128GB' },
    priceCash: 1800,
    initialPayment: 200,
    weeklyPayment: 150,
    weeks: 23
  },
  {
    id: 'iphone-14-128',
    brand: 'Apple',
    model: 'iPhone 14 128GB',
    image: 'https://promart.vteximg.com.br/arquivos/ids/9480088-700-700/imageUrl_1.jpg?v=638962778529230000',
    specifications: { ram: '6GB', storage: '128GB' },
    priceCash: 2000,
    initialPayment: 200,
    weeklyPayment: 150,
    weeks: 25
  },
  {
    id: 'iphone-15-128',
    brand: 'Apple',
    model: 'iPhone 15 128GB',
    image: 'https://coolboxpe.vtexassets.com/arquivos/ids/498754/iPhone-15-128GB-6GB_2.jpg?v=638975178440230000',
    specifications: { ram: '6GB', storage: '128GB' },
    priceCash: 2200,
    initialPayment: 200,
    weeklyPayment: 150,
    weeks: 27
  },
  {
    id: 'iphone-16-128',
    brand: 'Apple',
    model: 'iPhone 16 128GB',
    image: 'https://coolboxpe.vtexassets.com/arquivos/ids/412964-800-800?v=638727206727630000&width=800&height=800&aspect=true',
    specifications: { ram: '8GB', storage: '128GB' },
    priceCash: 2900,
    initialPayment: 200,
    weeklyPayment: 150,
    weeks: 30
  },
  {
    id: 'iphone-17-256',
    brand: 'Apple',
    model: 'iPhone 17 256GB eSIM',
    image: 'https://coolboxpe.vtexassets.com/arquivos/ids/508046-800-800?v=639011535657570000&width=800&height=800&aspect=true', // Placeholder for 17
    specifications: { ram: '8GB', storage: '256GB' },
    priceCash: 3600,
    initialPayment: 200,
    weeklyPayment: 150,
    weeks: 37
  },
  {
    id: 'iphone-17-promax',
    brand: 'Apple',
    model: 'iPhone 17 Pro Max 256GB (Chip)',
    image: 'https://coolboxpe.vtexassets.com/arquivos/ids/512334/Iphone-17-pro-max-deep-blue-conChip.jpg?v=639023810900630000', // Placeholder for 17PM
    specifications: { ram: '12GB', storage: '256GB' },
    priceCash: 5600,
    initialPayment: 200,
    weeklyPayment: 150,
    weeks: 50
  },
  {
    id: 'samsung-a26-128',
    brand: 'Samsung',
    model: 'Galaxy A26 5G 8/128GB',
    image: 'https://tse4.mm.bing.net/th/id/OIP.hXMH3UAvHS69I-n5u9Cj0wHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',
    specifications: { ram: '8GB', storage: '128GB' },
    priceCash: 800,
    initialPayment: 150,
    weeklyPayment: 130,
    weeks: 8
  },
  {
    id: 'samsung-a26-256',
    brand: 'Samsung',
    model: 'Galaxy A26 5G 8/256GB',
    image: 'https://oechsle.vteximg.com.br/arquivos/ids/21714228/imageUrl_1.jpg?v=638884171572500000',
    specifications: { ram: '8GB', storage: '256GB' },
    priceCash: 900,
    initialPayment: 150,
    weeklyPayment: 140,
    weeks: 8
  },
  {
    id: 'samsung-a36-256',
    brand: 'Samsung',
    model: 'Galaxy A36 5G 8/256GB',
    image: 'https://coolboxpe.vtexassets.com/arquivos/ids/459619/Galaxy-A36-256gb-8gb-negro_1.jpg?v=638848328176330000',
    specifications: { ram: '8GB', storage: '256GB' },
    priceCash: 1150,
    initialPayment: 150,
    weeklyPayment: 130,
    weeks: 10
  },
  {
    id: 'samsung-a56-256-8gb',
    brand: 'Samsung',
    model: 'Galaxy A56 5G 8/256GB',
    image: 'https://oechsle.vteximg.com.br/arquivos/ids/21679749/imageUrl_1.jpg?v=638879852166800000',
    specifications: { ram: '8GB', storage: '256GB' },
    priceCash: 1300,
    initialPayment: 150,
    weeklyPayment: 130,
    weeks: 12
  },
  {
    id: 'samsung-a56-256-12gb',
    brand: 'Samsung',
    model: 'Galaxy A56 5G 12/256GB',
    image: 'https://oechsle.vteximg.com.br/arquivos/ids/21679768/imageUrl_1.jpg?v=638879852169800000',
    specifications: { ram: '12GB', storage: '256GB' },
    priceCash: 1500,
    initialPayment: 150,
    weeklyPayment: 130,
    weeks: 14
  },
  {
    id: 'samsung-s24-256',
    brand: 'Samsung',
    model: 'Galaxy S24 5G 12/256GB',
    image: 'https://coolboxpe.vtexassets.com/arquivos/ids/459411/Galaxy-S24-Ultra-negro-256-12_1.jpg?v=638847609126930000',
    specifications: { ram: '12GB', storage: '256GB' },
    priceCash: 2900,
    initialPayment: 200,
    weeklyPayment: 150,
    weeks: 30
  },
  {
    id: 'samsung-s25-ultra-256',
    brand: 'Samsung',
    model: 'Galaxy S25 Ultra 12/256GB',
    image: 'https://oechsle.vteximg.com.br/arquivos/ids/21333296-1000-1000/imageUrl_1.jpg?v=638853067939770000',
    specifications: { ram: '12GB', storage: '256GB' },
    priceCash: 3350,
    initialPayment: 200,
    weeklyPayment: 150,
    weeks: 34
  },
  {
    id: 'samsung-s25-ultra-512',
    brand: 'Samsung',
    model: 'Galaxy S25 Ultra 12/512GB',
    image: 'https://coolboxpe.vtexassets.com/arquivos/ids/494539/s25-ultra-512gb-12gb-Titanium-black_0.jpg?v=638962425906470000',
    specifications: { ram: '12GB', storage: '512GB' },
    priceCash: 3550,
    initialPayment: 200,
    weeklyPayment: 150,
    weeks: 36
  },
  {
    id: 'xiaomi-redmi-14c-256',
    brand: 'Xiaomi',
    model: 'Redmi 14C 8+8/256GB',
    image: 'https://www.lacuracao.pe/media/catalog/product/1/4/14cgreen_2_2.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700',
    specifications: { ram: '16GB (8+8)', storage: '256GB' },
    priceCash: 400,
    initialPayment: 100,
    weeklyPayment: 120,
    weeks: 4
  },
  {
    id: 'xiaomi-redmi-15c-256',
    brand: 'Xiaomi',
    model: 'Redmi 15C 4+4/256GB',
    image: 'https://coolboxpe.vtexassets.com/arquivos/ids/510189/celular-xiaomi-redmi-15c-256gb-4gb-69pulgadas-negro-67515.jpg?v=639015858670700000',
    specifications: { ram: '8GB (4+4)', storage: '256GB' },
    priceCash: 500,
    initialPayment: 150,
    weeklyPayment: 120,
    weeks: 6
  },
  {
    id: 'xiaomi-note-14-256',
    brand: 'Xiaomi',
    model: 'Redmi Note 14 8/256GB',
    image: 'https://plazavea.vteximg.com.br/arquivos/ids/30557858-418-418/20467852.jpg',
    specifications: { ram: '8GB', storage: '256GB' },
    priceCash: 700,
    initialPayment: 150,
    weeklyPayment: 140,
    weeks: 8
  },
  {
    id: 'xiaomi-note-14-pro-256',
    brand: 'Xiaomi',
    model: 'Redmi Note 14 Pro 5G 8/256GB',
    image: 'https://plazavea.vteximg.com.br/arquivos/ids/30557896-465-465/20467859.jpg',
    specifications: { ram: '8GB', storage: '256GB' },
    priceCash: 1100,
    initialPayment: 200,
    weeklyPayment: 150,
    weeks: 13
  },
  {
    id: 'xiaomi-note-14-pro-plus-256',
    brand: 'Xiaomi',
    model: 'Redmi Note 14 Pro+ 5G 8/256GB',
    image: 'https://plazavea.vteximg.com.br/arquivos/ids/30557848-465-465/20467860.jpg',
    specifications: { ram: '8GB', storage: '256GB' },
    priceCash: 1300,
    initialPayment: 200,
    weeklyPayment: 150,
    weeks: 18
  },
  {
    id: 'xiaomi-note-14-pro-plus-512',
    brand: 'Xiaomi',
    model: 'Redmi Note 14 Pro+ 5G 12/512GB',
    image: 'https://oechsle.vteximg.com.br/arquivos/ids/22209820-1000-1000/imageUrl_1.jpg?v=638939470801770000',
    specifications: { ram: '12GB', storage: '512GB' },
    priceCash: 1550,
    initialPayment: 200,
    weeklyPayment: 150,
    weeks: 22
  },
  {
    id: 'honor-x6c-256',
    brand: 'Honor',
    model: 'Honor X6C 8/256GB',
    image: 'https://www.infiniti.com.pe/web/image/product.template/11857/image_1024?unique=f706129',
    specifications: { ram: '8GB', storage: '256GB' },
    priceCash: 500,
    initialPayment: 150,
    weeklyPayment: 120,
    weeks: 4
  },
  {
    id: 'honor-x8c-256',
    brand: 'Honor',
    model: 'Honor X8C 8/256GB',
    image: 'https://media.falabella.com/falabellaPE/143214398_01/w=800,h=800,fit=pad',
    specifications: { ram: '8GB', storage: '256GB' },
    priceCash: 800,
    initialPayment: 150,
    weeklyPayment: 130,
    weeks: 8
  },
  {
    id: 'honor-x7d-256',
    brand: 'Honor',
    model: 'Honor X7D 8/256GB',
    image: 'https://oechsle.vteximg.com.br/arquivos/ids/23430428-1000-1000/imageUrl_1.jpg?v=639010728878100000',
    specifications: { ram: '8GB', storage: '256GB' },
    priceCash: 750,
    initialPayment: 150,
    weeklyPayment: 120,
    weeks: 8
  },
  {
    id: 'honor-400-lite-256-8gb',
    brand: 'Honor',
    model: 'Honor 400 Lite 8/256GB',
    image: 'https://media.falabella.com/falabellaPE/147834863_01/w=1500,h=1500,fit=pad',
    specifications: { ram: '8GB', storage: '256GB' },
    priceCash: 1000,
    initialPayment: 200,
    weeklyPayment: 140,
    weeks: 10
  },
  {
    id: 'honor-400-lite-512-8gb',
    brand: 'Honor',
    model: 'Honor 400 Lite 8/512GB',
    image: 'https://novoxperu.com/cdn/shop/files/HONOR400LITE_2.jpg?v=1753123976&width=300',
    specifications: { ram: '8GB', storage: '512GB' },
    priceCash: 1100,
    initialPayment: 200,
    weeklyPayment: 150,
    weeks: 12
  },
  {
    id: 'honor-magic-7-lite-256',
    brand: 'Honor',
    model: 'Honor Magic 7 Lite 8/256GB',
    image: 'https://media.falabella.com/falabellaPE/20980691_1/w=800,h=800,fit=pad',
    specifications: { ram: '8GB', storage: '256GB' },
    priceCash: 1250,
    initialPayment: 200,
    weeklyPayment: 150,
    weeks: 14
  },
  {
    id: 'honor-magic-7-lite-512',
    brand: 'Honor',
    model: 'Honor Magic 7 Lite 8/512GB',
    image: 'https://media.falabella.com/falabellaPE/20980691_1/w=800,h=800,fit=pad?v=2', // Using same image as 256GB due to invalid URL provided
    specifications: { ram: '8GB', storage: '512GB' },
    priceCash: 1400,
    initialPayment: 200,
    weeklyPayment: 150,
    weeks: 16
  },
  {
    id: 'honor-400-lite-5g-256',
    brand: 'Honor',
    model: 'Honor 400 Lite 5G 12/256GB',
    image: 'https://media.falabella.com/falabellaPE/147255419_01/w=1500,h=1500,fit=pad',
    specifications: { ram: '12GB', storage: '256GB' },
    priceCash: 1000,
    initialPayment: 200,
    weeklyPayment: 140,
    weeks: 10
  },
  {
    id: 'honor-400-5g-512',
    brand: 'Honor',
    model: 'Honor 400 5G 12/512GB',
    image: 'https://plazavea.vteximg.com.br/arquivos/ids/31873037-465-465/20505431.jpg',
    specifications: { ram: '12GB', storage: '512GB' },
    priceCash: 1500,
    initialPayment: 200,
    weeklyPayment: 150,
    weeks: 18
  },
  {
    id: 'zte-v60',
    brand: 'ZTE',
    model: 'ZTE V60',
    image: 'https://media.falabella.com/falabellaPE/146281309_01/w=1500,h=1500,fit=pad',
    specifications: { ram: 'N/A', storage: 'N/A' },
    priceCash: 550,
    initialPayment: 150,
    weeklyPayment: 140,
    weeks: 4
  },
  {
    id: 'zte-v70-max',
    brand: 'ZTE',
    model: 'ZTE V70 Max',
    image: 'https://plazavea.vteximg.com.br/arquivos/ids/30794267-418-418/20469026-1.jpg',
    specifications: { ram: 'N/A', storage: 'N/A' },
    priceCash: 750,
    initialPayment: 150,
    weeklyPayment: 140,
    weeks: 6
  },
  {
    id: 'nubia-neo-2',
    brand: 'ZTE',
    model: 'Nubia Neo 2',
    image: 'https://carsaperupoc.vtexassets.com/arquivos/ids/162330/20426016-5.jpg?v=638682357458100000',
    specifications: { ram: '8GB', storage: '256GB' },
    priceCash: 850,
    initialPayment: 150,
    weeklyPayment: 140,
    weeks: 7
  },
  {
    id: 'nubia-neo-3',
    brand: 'ZTE',
    model: 'Nubia Neo 3 + Pack',
    image: 'https://media.falabella.com/tottusPE/43548727_1/w=800,h=800,fit=pad',
    specifications: { ram: '8GB', storage: '256GB' },
    priceCash: 700,
    initialPayment: 150,
    weeklyPayment: 130,
    weeks: 6
  },
  {
    id: 'nubia-neo-3-gt',
    brand: 'ZTE',
    model: 'Nubia Neo 3 GT + Pack',
    image: 'https://media.falabella.com/tottusPE/43548728_1/w=1500,h=1500,fit=pad',
    specifications: { ram: '8GB', storage: '256GB' },
    priceCash: 950,
    initialPayment: 200,
    weeklyPayment: 150,
    weeks: 10
  },
  {
    id: 'focus-2-ultra',
    brand: 'ZTE',
    model: 'Focus 2 Ultra',
    image: 'https://estilospe.vtexassets.com/arquivos/ids/3540725/SKU.jpg?v=638906135551330000',
    specifications: { ram: 'N/A', storage: 'N/A' },
    priceCash: 1100,
    initialPayment: 20,
    weeklyPayment: 150,
    weeks: 12
  },
  {
    id: 'moto-g15-256',
    brand: 'Motorola',
    model: 'Moto G15 4/256GB',
    image: 'https://coolboxpe.vtexassets.com/arquivos/ids/508755/celular-motorola-moto-g15-4g-256gb-4gb-ram-gris-motog15gris.jpg?v=639014169534230000',
    specifications: { ram: '4GB', storage: '256GB' },
    priceCash: 550,
    initialPayment: 150,
    weeklyPayment: 130,
    weeks: 4
  },
  {
    id: 'moto-g15-512',
    brand: 'Motorola',
    model: 'Moto G15 4/512GB',
    image: 'https://plazavea.vteximg.com.br/arquivos/ids/32618203-450-450/20502065.jpg?v=638962488197600000',
    specifications: { ram: '4GB', storage: '512GB' },
    priceCash: 600,
    initialPayment: 150,
    weeklyPayment: 130,
    weeks: 5
  },
  {
    id: 'moto-g56-256',
    brand: 'Motorola',
    model: 'Moto G56 5G 8/256GB',
    image: 'https://coolboxpe.vtexassets.com/arquivos/ids/507659/celular-motorola-g56-67-8gb-256gb-50mp-azul-marino-motog56azulm.jpg?v=639010910905300000',
    specifications: { ram: '8GB', storage: '256GB' },
    priceCash: 800,
    initialPayment: 200,
    weeklyPayment: 150,
    weeks: 6
  },
  {
    id: 'moto-g50-fusion-256',
    brand: 'Motorola',
    model: 'Moto G50 Fusion 5G 8/256GB',
    image: 'https://media.falabella.com/falabellaPE/139626695_01/w=800,h=800,fit=pad',
    specifications: { ram: '8GB', storage: '256GB' },
    priceCash: 900,
    initialPayment: 200,
    weeklyPayment: 150,
    weeks: 8
  },
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
      name: 'inversiones-jp-storage-v23', // Changed name to force refresh local storage
    }
  )
);
