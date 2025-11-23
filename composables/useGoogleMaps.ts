interface GoogleMapsOptions {
  apiKey: string
}

export const useGoogleMaps = () => {
  const config = useRuntimeConfig()
  const isLoaded = ref(false)
  const isLoading = ref(false)

  const loadGoogleMaps = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Check if API key exists
      const apiKey = config.public.googleMapsApiKey
      console.log('Google Maps API Key:', apiKey ? `${apiKey.substring(0, 10)}...` : 'MISSING')

      if (!apiKey) {
        reject(new Error('Google Maps API key is missing. Please add GOOGLE_MAPS_API_KEY to your .env file'))
        return
      }

      // If already loaded, resolve immediately
      if (window.google && window.google.maps) {
        console.log('Google Maps already loaded')
        isLoaded.value = true
        resolve()
        return
      }

      // If already loading, wait for it
      if (isLoading.value) {
        console.log('Google Maps is already loading, waiting...')
        const checkInterval = setInterval(() => {
          if (window.google && window.google.maps) {
            clearInterval(checkInterval)
            isLoaded.value = true
            resolve()
          }
        }, 100)
        return
      }

      isLoading.value = true
      console.log('Loading Google Maps script...')

      // Create script element
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry`
      script.async = true
      script.defer = true

      script.onload = () => {
        console.log('Google Maps script loaded successfully')
        isLoaded.value = true
        isLoading.value = false
        resolve()
      }

      script.onerror = (error) => {
        console.error('Google Maps script failed to load:', error)
        isLoading.value = false
        reject(new Error('Failed to load Google Maps. Check your API key and billing settings.'))
      }

      document.head.appendChild(script)
    })
  }

  const calculateDistance = (
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number
  ): number => {
    if (!window.google || !window.google.maps) return 0

    const from = new google.maps.LatLng(lat1, lng1)
    const to = new google.maps.LatLng(lat2, lng2)

    // Returns distance in meters
    return google.maps.geometry.spherical.computeDistanceBetween(from, to)
  }

  const formatDistance = (meters: number): string => {
    if (meters < 1000) {
      return `${Math.round(meters)} m`
    }
    return `${(meters / 1000).toFixed(1)} km`
  }

  return {
    isLoaded,
    isLoading,
    loadGoogleMaps,
    calculateDistance,
    formatDistance
  }
}
