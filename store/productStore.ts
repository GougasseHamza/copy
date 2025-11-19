import { create } from 'zustand'
import type { Product } from '@/data/mockData'

interface ProductState {
  products: Product[]
  selectedProduct: Product | null
  loading: boolean
  error: string | null
  searchQuery: string
  fetchProducts: () => Promise<void>
  searchProducts: (query: string) => Promise<void>
  setSelectedProduct: (product: Product) => void
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
  searchQuery: '',

  fetchProducts: async () => {
    set({ loading: true, error: null })
    try {
      // TODO: Replace with actual API call
      const { mockProducts } = await import('@/data/mockData')
      set({ products: mockProducts, loading: false })
    } catch (err) {
      set({ error: 'Failed to fetch products', loading: false })
      console.error(err)
    }
  },

  searchProducts: async (query: string) => {
    set({ searchQuery: query })
    // TODO: Implement actual search
  },

  setSelectedProduct: (product: Product) => {
    set({ selectedProduct: product })
  }
}))
