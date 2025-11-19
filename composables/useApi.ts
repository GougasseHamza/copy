export const useApi = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase

  const fetchPharmacies = async (params?: any) => {
    try {
      return await $fetch(`${baseURL}/pharmacies`, { params })
    } catch (error) {
      console.error('Error fetching pharmacies:', error)
      throw error
    }
  }

  const getNearbyPharmacies = async (lat: number, lon: number, radius: number = 5) => {
    try {
      return await $fetch(`${baseURL}/pharmacies/nearby`, {
        params: { latitude: lat, longitude: lon, radius }
      })
    } catch (error) {
      console.error('Error fetching nearby pharmacies:', error)
      throw error
    }
  }

  const searchProducts = async (query: string) => {
    try {
      return await $fetch(`${baseURL}/products/search`, {
        params: { query }
      })
    } catch (error) {
      console.error('Error searching products:', error)
      throw error
    }
  }

  const getProductById = async (id: string) => {
    try {
      return await $fetch(`${baseURL}/products/${id}`)
    } catch (error) {
      console.error('Error fetching product:', error)
      throw error
    }
  }

  return {
    fetchPharmacies,
    getNearbyPharmacies,
    searchProducts,
    getProductById
  }
}
