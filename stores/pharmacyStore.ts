import { defineStore } from 'pinia'
import type { Pharmacy } from '~/data/mockData'

export const usePharmacyStore = defineStore('pharmacy', {
  state: () => ({
    pharmacies: [] as Pharmacy[],
    selectedPharmacy: null as Pharmacy | null,
    loading: false,
    error: null as string | null
  }),

  actions: {
    async fetchPharmacies() {
      this.loading = true
      this.error = null
      try {
        // TODO: Replace with actual API call
        const { mockPharmacies } = await import('~/data/mockData')
        this.pharmacies = mockPharmacies
      } catch (err) {
        this.error = 'Failed to fetch pharmacies'
        console.error(err)
      } finally {
        this.loading = false
      }
    },

    setSelectedPharmacy(pharmacy: Pharmacy) {
      this.selectedPharmacy = pharmacy
    }
  }
})
