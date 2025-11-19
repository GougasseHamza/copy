const baseURL = process.env.API_BASE_URL || 'http://localhost:8080/api'

export const useApi = () => {
  const fetchPharmacies = async (params?: any) => {
    try {
      const queryString = params ? '?' + new URLSearchParams(params).toString() : ''
      const response = await fetch(`${baseURL}/pharmacies${queryString}`)
      if (!response.ok) throw new Error('Failed to fetch pharmacies')
      return await response.json()
    } catch (error) {
      console.error('Error fetching pharmacies:', error)
      throw error
    }
  }

  const getNearbyPharmacies = async (lat: number, lon: number, radius: number = 5) => {
    try {
      const params = new URLSearchParams({
        latitude: lat.toString(),
        longitude: lon.toString(),
        radius: radius.toString()
      })
      const response = await fetch(`${baseURL}/pharmacies/nearby?${params}`)
      if (!response.ok) throw new Error('Failed to fetch nearby pharmacies')
      return await response.json()
    } catch (error) {
      console.error('Error fetching nearby pharmacies:', error)
      throw error
    }
  }

  const searchProducts = async (query: string) => {
    try {
      const params = new URLSearchParams({ query })
      const response = await fetch(`${baseURL}/products/search?${params}`)
      if (!response.ok) throw new Error('Failed to search products')
      return await response.json()
    } catch (error) {
      console.error('Error searching products:', error)
      throw error
    }
  }

  const getProductById = async (id: string) => {
    try {
      const response = await fetch(`${baseURL}/products/${id}`)
      if (!response.ok) throw new Error('Failed to fetch product')
      return await response.json()
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
