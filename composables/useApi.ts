export const useApi = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase

  // Products/Medicines API
  const fetchPharmacies = async (params?: any) => {
    try {
      return await $fetch(`${baseURL}/pharmacies`, { params })
    } catch (error) {
      console.error('Error fetching pharmacies:', error)
      throw error
    }
  }

  const getNearbyPharmacies = async (lat: number, lon: number, radius: number = 5000) => {
    try {
      return await $fetch(`${baseURL}/pharmacies/nearby`, {
        params: { latitude: lat, longitude: lon, radius }
      })
    } catch (error) {
      console.error('Error fetching nearby pharmacies:', error)
      throw error
    }
  }

  const getPharmacyById = async (id: string) => {
    try {
      return await $fetch(`${baseURL}/pharmacies/${id}`)
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
