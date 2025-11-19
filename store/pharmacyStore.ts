import { create } from 'zustand'
import type { Pharmacy } from '@/data/mockData'

interface PharmacyState {
  pharmacies: Pharmacy[]
  selectedPharmacy: Pharmacy | null
  loading: boolean
  error: string | null
  fetchPharmacies: () => Promise<void>
  setSelectedPharmacy: (pharmacy: Pharmacy) => void
}

export const usePharmacyStore = create<PharmacyState>((set) => ({
  pharmacies: [],
  selectedPharmacy: null,
  loading: false,
  error: null,

  fetchPharmacies: async () => {
    set({ loading: true, error: null })
    try {
      // TODO: Replace with actual API call
      const { mockPharmacies } = await import('@/data/mockData')
      set({ pharmacies: mockPharmacies, loading: false })
    } catch (err) {
      set({ error: 'Failed to fetch pharmacies', loading: false })
      console.error(err)
    }
  },

  setSelectedPharmacy: (pharmacy: Pharmacy) => {
    set({ selectedPharmacy: pharmacy })
  }
}))
