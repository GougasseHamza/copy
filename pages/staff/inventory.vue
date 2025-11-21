<template>
  <NuxtLayout name="default">
    <div class="container-custom py-8">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-4xl font-bold text-gray-900">Inventory Management</h1>
          <p class="mt-2 text-gray-600">Manage product availability for {{ user?.pharmacyName }}</p>
        </div>
        <NuxtLink
          to="/staff"
          class="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
        >
          ← Back to Dashboard
        </NuxtLink>
      </div>

      <!-- Search Bar -->
      <div class="mb-6">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search products by name..."
            class="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            @input="handleSearch"
          />
          <svg
            class="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-6">
        <div class="flex items-center justify-between">
          <span>{{ error }}</span>
          <button
            @click="retryFetch"
            class="ml-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
          >
            Retry
          </button>
        </div>
      </div>

      <!-- Success Message -->
      <div v-if="successMessage" class="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded mb-6">
        {{ successMessage }}
      </div>

      <!-- Products Table -->
      <div v-else-if="displayProducts.length > 0" class="bg-white rounded-lg shadow overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product Name
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="product in displayProducts" :key="product.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ product.name }}</div>
                  <div v-if="product.description" class="text-xs text-gray-500 truncate max-w-xs">
                    {{ product.description }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm text-gray-900">{{ product.category || 'N/A' }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm text-gray-900">{{ formatPrice(product.price) }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    v-if="getInventoryStatus(product.id)"
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    :class="getInventoryStatus(product.id).available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                  >
                    {{ getInventoryStatus(product.id).available ? 'Available' : 'Not Available' }}
                  </span>
                  <span v-else class="text-sm text-gray-500">Not in inventory</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    v-if="getInventoryStatus(product.id)"
                    @click="toggleAvailability(product.id)"
                    :disabled="updatingProducts.has(product.id)"
                    class="text-primary hover:text-primary/80 font-medium disabled:opacity-50"
                  >
                    {{ updatingProducts.has(product.id) ? 'Updating...' : 'Toggle' }}
                  </button>
                  <button
                    v-else
                    @click="addToInventory(product.id)"
                    :disabled="updatingProducts.has(product.id)"
                    class="text-green-600 hover:text-green-700 font-medium disabled:opacity-50"
                  >
                    {{ updatingProducts.has(product.id) ? 'Adding...' : 'Add to Inventory' }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No products found</h3>
        <p class="mt-1 text-sm text-gray-500">Try adjusting your search query.</p>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const { user, getAuthHeaders } = useAuth()
const config = useRuntimeConfig()

const searchQuery = ref('')
const loading = ref(true)
const error = ref('')
const successMessage = ref('')
const products = ref<any[]>([])
const inventory = ref<any[]>([])
const updatingProducts = ref(new Set<string>())

// Filtered products based on search
const displayProducts = computed(() => {
  if (!searchQuery.value) return products.value
  const query = searchQuery.value.toLowerCase()
  return products.value.filter(p =>
    p.name?.toLowerCase().includes(query) ||
    p.description?.toLowerCase().includes(query)
  )
})

onMounted(async () => {
  await Promise.all([fetchProducts(), fetchInventory()])
})

const fetchProducts = async () => {
  loading.value = true
  error.value = ''

  try {
    const response: any = await $fetch(`${config.public.apiBase}/staff/products`, {
      headers: getAuthHeaders()
    })

    if (response.success) {
      products.value = response.data || []
    } else {
      error.value = response.message || 'Failed to load products'
    }
  } catch (err: any) {
    console.error('Products fetch error:', err)

    // Provide helpful error message based on error type
    if (!err.status) {
      error.value = 'Cannot connect to backend server. Please ensure the Spring Boot backend is running on port 8080.'
    } else if (err.status === 401 || err.status === 403) {
      error.value = 'Authentication failed. Please try logging in again.'
    } else {
      error.value = err.data?.message || 'Failed to load products'
    }
  } finally {
    loading.value = false
  }
}

const fetchInventory = async () => {
  try {
    const response: any = await $fetch(`${config.public.apiBase}/staff/inventory`, {
      headers: getAuthHeaders()
    })

    if (response.success) {
      inventory.value = response.data || []
    }
  } catch (err: any) {
    console.error('Inventory fetch error:', err)
  }
}

const getInventoryStatus = (productId: string) => {
  return inventory.value.find(item => item.productId === productId)
}

const toggleAvailability = async (productId: string) => {
  const currentStatus = getInventoryStatus(productId)
  if (!currentStatus) return

  updatingProducts.value.add(productId)
  error.value = ''
  successMessage.value = ''

  try {
    const response: any = await $fetch(`${config.public.apiBase}/staff/editproduct`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: {
        productId,
        available: !currentStatus.available
      }
    })

    if (response.success) {
      // Update local inventory
      const index = inventory.value.findIndex(item => item.productId === productId)
      if (index !== -1) {
        inventory.value[index] = response.data
      }
      successMessage.value = `Product ${!currentStatus.available ? 'marked as available' : 'marked as unavailable'}`
      setTimeout(() => successMessage.value = '', 3000)
    } else {
      error.value = response.message || 'Failed to update product'
    }
  } catch (err: any) {
    console.error('Toggle error:', err)
    error.value = err.data?.message || 'Failed to update product'
  } finally {
    updatingProducts.value.delete(productId)
  }
}

const addToInventory = async (productId: string) => {
  updatingProducts.value.add(productId)
  error.value = ''
  successMessage.value = ''

  try {
    const response: any = await $fetch(`${config.public.apiBase}/staff/addproduct`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: { productId }
    })

    if (response.success) {
      // Add to local inventory
      inventory.value.push(response.data)
      successMessage.value = 'Product added to inventory (available)'
      setTimeout(() => successMessage.value = '', 3000)
    } else {
      error.value = response.message || 'Failed to add product'
    }
  } catch (err: any) {
    console.error('Add product error:', err)
    error.value = err.data?.message || 'Failed to add product'
  } finally {
    updatingProducts.value.delete(productId)
  }
}

const retryFetch = async () => {
  await Promise.all([fetchProducts(), fetchInventory()])
}

const handleSearch = () => {
  // Search is handled by computed property
}

const formatPrice = (price: number | undefined) => {
  if (!price) return 'N/A'
  return `${price.toFixed(2)} MAD`
}
</script>
