export const paintings = [
  {
    id: 1,
    title: "Quiet Horizon",
    artist: "Aurelia Studio",
    category: "Abstract",
    price: 1250000,
    image:
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=700&q=70",
    description: "Lukisan abstrak dengan warna hangat dan komposisi yang tenang.",
  },
  {
    id: 2,
    title: "Blue Reverie",
    artist: "Elena Morris",
    category: "Abstract",
    price: 1850000,
    image:
      "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=700&q=70",
    description: "Eksplorasi warna dan bentuk untuk ruang modern.",
  },
  {
    id: 3,
    title: "Golden Stillness",
    artist: "Arthur Lane",
    category: "Landscape",
    price: 2100000,
    image:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=700&q=70",
    description: "Karya bernuansa klasik yang menghadirkan suasana hangat.",
  },
  {
    id: 4,
    title: "Earth & Form",
    artist: "Nadia Atelier",
    category: "Modern",
    price: 950000,
    image:
      "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=700&q=70",
    description: "Perpaduan bentuk dan warna natural dalam gaya kontemporer.",
  },
  {
    id: 5,
    title: "Morning in Bloom",
    artist: "Clara West",
    category: "Landscape",
    price: 1450000,
    image:
      "https://images.unsplash.com/photo-1577083288073-40892c0860a4?auto=format&fit=crop&w=700&q=70",
    description: "Lukisan dekoratif dengan nuansa lembut dan menyegarkan.",
  },
  {
    id: 6,
    title: "The Golden Muse",
    artist: "Studio Maison",
    category: "Modern",
    price: 1650000,
    image:
      "https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?auto=format&fit=crop&w=700&q=70",
    description: "Karya pilihan untuk melengkapi interior yang elegan.",
  },
];

export function formatPrice(price) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
}