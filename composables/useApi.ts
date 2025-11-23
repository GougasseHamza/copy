export const useApi = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase

  // Helper function to transform pharmacy data from backend format to frontend format
  const transformPharmacy = (pharmacy: any) => {
    if (!pharmacy) return pharmacy

    // Flatten location object to root level
    return {
      ...pharmacy,
      latitude: pharmacy.location?.latitude,
      longitude: pharmacy.location?.longitude,
      image: pharmacy.imageUrl, // Also map imageUrl to image for compatibility
    }
  }

  const transformPharmacies = (response: any) => {
    if (!response) return response

    // Handle ApiResponse wrapper
    if (response.data && Array.isArray(response.data)) {
      return {
        ...response,
        data: response.data.map(transformPharmacy)
      }
    }

    // Handle direct array response
    if (Array.isArray(response)) {
      return response.map(transformPharmacy)
    }

    return response
  }

  // Products/Medicines API
  const fetchPharmacies = async (params?: any) => {
    try {
      const response = await $fetch(`${baseURL}/pharmacies`, { params })
      return transformPharmacies(response)
    } catch (error) {
      console.error('Error fetching pharmacies:', error)
      throw error
    }
  }

  const getNearbyPharmacies = async (lat: number, lon: number, radius: number = 5000) => {
    try {
      const response = await $fetch(`${baseURL}/pharmacies/nearby`, {
        params: { latitude: lat, longitude: lon, radius }
      })
      return transformPharmacies(response)
    } catch (error) {
      console.error('Error fetching nearby pharmacies:', error)
      throw error
    }
  }

  const getPharmacyById = async (id: string) => {
    try {
      const response = await $fetch(`${baseURL}/pharmacies/${id}`)
      return transformPharmacy(response)
    } catch (error) {
      console.error('Error fetching pharmacy:', error)
      throw error
    }
  }

  const getPharmacyInventory = async (id: string) => {
    try {
      return await $fetch(`${baseURL}/pharmacies/${id}/inventory`)
    } catch (error) {
      console.error('Error fetching inventory:', error)
      throw error
    }
  }

  const searchProducts = async (query: string, limit: number = 20) => {
    try {
      return await $fetch(`${baseURL}/products/search`, {
        params: { query, limit }
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

  const checkProductAvailability = async (
    id: string,
    latitude?: number,
    longitude?: number
  ) => {
    try {
      return await $fetch(`${baseURL}/products/${id}/availability`, {
        params: { latitude, longitude }
      })
    } catch (error) {
      console.error('Error checking availability:', error)
      throw error
    }
  }

  // AI Assistant via n8n webhook
  const askAIAssistant = async (message: string, context?: any) => {
    try {
      const webhookURL = config.public.n8nWebhookUrl

      if (!webhookURL) {
        throw new Error('n8n webhook URL not configured')
      }

      const response = await $fetch(webhookURL, {
        method: 'POST',
        body: {
          message,
          context,
          timestamp: new Date().toISOString()
        }
      })

      return response
    } catch (error) {
      console.error('Error calling AI assistant:', error)
      throw error
    }
  }

  return {
    // Pharmacies
    fetchPharmacies,
    getNearbyPharmacies,
    getPharmacyById,
    getPharmacyInventory,

    // Products
    searchProducts,
    getProductById,
    checkProductAvailability,

    // AI Assistant
    askAIAssistant
  }
}
