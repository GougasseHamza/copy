import { defineStore } from 'pinia'
import type { Product } from '~/data/mockData'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [] as Product[],
    selectedProduct: null as Product | null,
    loading: false,
    error: null as string | null,
    searchQuery: ''
  }),

  actions: {
    async fetchProducts() {
      this.loading = true
      this.error = null
      try {
        // TODO: Replace with actual API call
        const { mockProducts } = await import('~/data/mockData')
        this.products = mockProducts
      } catch (err) {
        this.error = 'Failed to fetch products'
        console.error(err)
      } finally {
        this.loading = false
      }
    },

    async searchProducts(query: string) {
      this.searchQuery = query
      // TODO: Implement actual search
    },

    setSelectedProduct(product: Product) {
      this.selectedProduct = product
    }
  }
})
