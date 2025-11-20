interface LoginRequest {
  email: string
  password: string
}

interface RegisterRequest {
  email: string
  password: string
  name: string
  phone?: string
  role?: 'CUSTOMER' | 'STAFF' | 'ADMIN'
}

interface AuthResponse {
  id: string
  email: string
  name: string
  role: 'CUSTOMER' | 'STAFF' | 'ADMIN'
  token: string
}

interface User {
  id: string
  email: string
  name: string
  phone?: string
  role: 'CUSTOMER' | 'STAFF' | 'ADMIN'
  pharmacyId?: string
  createdAt: string
  updatedAt: string
}

export const useAuth = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase
  const router = useRouter()

  // Reactive state
  const token = useState<string | null>('auth-token', () => {
    if (process.client) {
      return localStorage.getItem('auth-token')
    }
    return null
  })

  const user = useState<User | null>('auth-user', () => {
    if (process.client) {
      const storedUser = localStorage.getItem('auth-user')
      return storedUser ? JSON.parse(storedUser) : null
    }
    return null
  })

  const isAuthenticated = computed(() => !!token.value)
  const isStaff = computed(() => user.value?.role === 'STAFF' || user.value?.role === 'ADMIN')
  const isAdmin = computed(() => user.value?.role === 'ADMIN')

  // Login
  const login = async (credentials: LoginRequest) => {
    try {
      const response: any = await $fetch(`${baseURL}/auth/login`, {
        method: 'POST',
        body: credentials
      })

      if (response.success && response.data) {
        const authData: AuthResponse = response.data
        token.value = authData.token
        user.value = {
          id: authData.id,
          email: authData.email,
          name: authData.name,
          role: authData.role,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }

        // Store in localStorage
        if (process.client) {
          localStorage.setItem('auth-token', authData.token)
          localStorage.setItem('auth-user', JSON.stringify(user.value))
        }

        return { success: true, data: authData }
      }

      return { success: false, message: response.message || 'Login failed' }
    } catch (error: any) {
      console.error('Login error:', error)
      return {
        success: false,
        message: error.data?.message || 'Login failed. Please check your credentials.'
      }
    }
  }

  // Register
  const register = async (data: RegisterRequest) => {
    try {
      const response: any = await $fetch(`${baseURL}/auth/register`, {
        method: 'POST',
        body: data
      })

      if (response.success && response.data) {
        const authData: AuthResponse = response.data
        token.value = authData.token
        user.value = {
          id: authData.id,
          email: authData.email,
          name: authData.name,
          role: authData.role,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }

        // Store in localStorage
        if (process.client) {
          localStorage.setItem('auth-token', authData.token)
          localStorage.setItem('auth-user', JSON.stringify(user.value))
        }

        return { success: true, data: authData }
      }

      return { success: false, message: response.message || 'Registration failed' }
    } catch (error: any) {
      console.error('Registration error:', error)
      return {
        success: false,
        message: error.data?.message || 'Registration failed. Please try again.'
      }
    }
  }

  // Logout
  const logout = async () => {
    try {
      await $fetch(`${baseURL}/auth/logout`, {
        method: 'POST',
        headers: token.value ? { Authorization: `Bearer ${token.value}` } : {}
      })
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Clear state regardless of API call success
      token.value = null
      user.value = null

      if (process.client) {
        localStorage.removeItem('auth-token')
        localStorage.removeItem('auth-user')
      }

      router.push('/auth/login')
    }
  }

  // Get user profile
  const fetchProfile = async () => {
    if (!token.value) return null

    try {
      const response: any = await $fetch(`${baseURL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      })

      if (response.success && response.data) {
        user.value = response.data
        if (process.client) {
          localStorage.setItem('auth-user', JSON.stringify(user.value))
        }
        return response.data
      }

      return null
    } catch (error) {
      console.error('Fetch profile error:', error)
      // Token might be invalid, logout
      await logout()
      return null
    }
  }

  // Verify token
  const verifyToken = async () => {
    if (!token.value) return false

    try {
      const response: any = await $fetch(`${baseURL}/auth/verify-token`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      })

      return response.success && response.data
    } catch (error) {
      console.error('Token verification error:', error)
      await logout()
      return false
    }
  }

  // Get auth headers for authenticated requests
  const getAuthHeaders = () => {
    return token.value ? { Authorization: `Bearer ${token.value}` } : {}
  }

  return {
    // State
    token: readonly(token),
    user: readonly(user),
    isAuthenticated,
    isStaff,
    isAdmin,

    // Methods
    login,
    register,
    logout,
    fetchProfile,
    verifyToken,
    getAuthHeaders
  }
}
