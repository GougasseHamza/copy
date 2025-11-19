export interface Pharmacy {
  id: string
  name: string
  address: string
  city: string
  phone: string
  latitude: number
  longitude: number
  isOpen: boolean
  nextOpenTime?: string
  rating: number
  reviewCount: number
  distance?: number
  image?: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  stock: number
  pharmacyId: string
  category: string
  image?: string
  uses?: string
  disclaimer?: string
}

export interface Review {
  id: string
  pharmacyId: string
  userName: string
  rating: number
  comment: string
  date: string
}

export const mockPharmacies: Pharmacy[] = [
  {
    id: '1',
    name: 'Pharmacie Centrale',
    address: '45 Boulevard Mohammed V',
    city: 'Casablanca',
    phone: '+212 522 123456',
    latitude: 33.5731,
    longitude: -7.5898,
    isOpen: true,
    rating: 4.5,
    reviewCount: 128,
    distance: 0.5,
    image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=400'
  },
  {
    id: '2',
    name: 'Pharmacie Al Amal',
    address: '12 Rue Allal Ben Abdellah',
    city: 'Casablanca',
    phone: '+212 522 234567',
    latitude: 33.5891,
    longitude: -7.6114,
    isOpen: true,
    rating: 4.7,
    reviewCount: 95,
    distance: 1.2,
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400'
  },
  {
    id: '3',
    name: 'Pharmacie de Nuit',
    address: '78 Avenue Hassan II',
    city: 'Casablanca',
    phone: '+212 522 345678',
    latitude: 33.5651,
    longitude: -7.6032,
    isOpen: false,
    nextOpenTime: '20:00',
    rating: 4.2,
    reviewCount: 64,
    distance: 2.1,
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400'
  },
  {
    id: '4',
    name: 'Pharmacie Atlas',
    address: '23 Rue de Fès',
    city: 'Casablanca',
    phone: '+212 522 456789',
    latitude: 33.5821,
    longitude: -7.6189,
    isOpen: true,
    rating: 4.6,
    reviewCount: 112,
    distance: 3.5,
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400'
  },
  {
    id: '5',
    name: 'Pharmacie Moderne',
    address: '56 Boulevard Zerktouni',
    city: 'Casablanca',
    phone: '+212 522 567890',
    latitude: 33.5771,
    longitude: -7.6321,
    isOpen: true,
    rating: 4.8,
    reviewCount: 156,
    distance: 4.2,
    image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=400'
  }
]

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Paracétamol 500mg',
    description: 'Antalgique et antipyrétique',
    price: 25,
    stock: 150,
    pharmacyId: '1',
    category: 'Antalgiques',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300',
    uses: 'Traitement de la douleur et de la fièvre',
    disclaimer: 'Ne pas dépasser la dose recommandée'
  },
  {
    id: '2',
    name: 'Ibuprofène 400mg',
    description: 'Anti-inflammatoire non stéroïdien',
    price: 35,
    stock: 80,
    pharmacyId: '1',
    category: 'Anti-inflammatoires',
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=300',
    uses: 'Douleur, inflammation et fièvre',
    disclaimer: 'À prendre pendant les repas'
  },
  {
    id: '3',
    name: 'Amoxicilline 1g',
    description: 'Antibiotique à large spectre',
    price: 120,
    stock: 45,
    pharmacyId: '1',
    category: 'Antibiotiques',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=300',
    uses: 'Infections bactériennes',
    disclaimer: 'Sur ordonnance uniquement. Terminer le traitement'
  },
  {
    id: '4',
    name: 'Vitamine C 1000mg',
    description: 'Complément vitaminique',
    price: 45,
    stock: 200,
    pharmacyId: '2',
    category: 'Vitamines',
    image: 'https://images.unsplash.com/photo-1550572017-4a2a0f4d3d50?w=300',
    uses: 'Renforcement du système immunitaire',
    disclaimer: 'Complément alimentaire'
  },
  {
    id: '5',
    name: 'Sirop contre la toux',
    description: 'Expectorant et antitussif',
    price: 65,
    stock: 60,
    pharmacyId: '2',
    category: 'Respiratoire',
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=300',
    uses: 'Toux grasse et sèche',
    disclaimer: 'Agiter avant utilisation'
  },
  {
    id: '6',
    name: 'Crème hydratante',
    description: 'Soin visage et corps',
    price: 85,
    stock: 95,
    pharmacyId: '3',
    category: 'Dermatologie',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300',
    uses: 'Hydratation quotidienne',
    disclaimer: 'Usage externe uniquement'
  },
  {
    id: '7',
    name: 'Aspirine 100mg',
    description: 'Antiagrégant plaquettaire',
    price: 30,
    stock: 120,
    pharmacyId: '4',
    category: 'Cardiovasculaire',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300',
    uses: 'Prévention cardiovasculaire',
    disclaimer: 'Sur avis médical'
  },
  {
    id: '8',
    name: 'Collyre yeux secs',
    description: 'Gouttes ophtalmiques',
    price: 55,
    stock: 70,
    pharmacyId: '4',
    category: 'Ophtalmologie',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=300',
    uses: 'Sécheresse oculaire',
    disclaimer: 'Ne pas toucher l\'œil avec l\'embout'
  }
]

export const mockReviews: Review[] = [
  {
    id: '1',
    pharmacyId: '1',
    userName: 'Ahmed M.',
    rating: 5,
    comment: 'Excellent service, personnel très professionnel et accueillant.',
    date: '2025-10-15'
  },
  {
    id: '2',
    pharmacyId: '1',
    userName: 'Fatima Z.',
    rating: 4,
    comment: 'Bonne pharmacie, bien située. Parfois un peu d\'attente.',
    date: '2025-10-12'
  },
  {
    id: '3',
    pharmacyId: '2',
    userName: 'Youssef K.',
    rating: 5,
    comment: 'Toujours bien conseillé, prix corrects.',
    date: '2025-10-10'
  }
]

export const mockCategories = [
  'Antalgiques',
  'Anti-inflammatoires',
  'Antibiotiques',
  'Vitamines',
  'Respiratoire',
  'Dermatologie',
  'Cardiovasculaire',
  'Ophtalmologie'
]
