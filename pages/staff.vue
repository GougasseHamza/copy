<template>
  <NuxtLayout name="default">
    <div class="container-custom py-8">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-4xl font-bold text-gray-900">Staff Dashboard</h1>
          <p class="mt-2 text-gray-600">
            Welcome back, <span class="font-medium">{{ user?.name }}</span>
          </p>
        </div>
        <button
          @click="handleLogout"
          class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-6">
        {{ error }}
      </div>

      <!-- Dashboard Content -->
      <div v-else-if="dashboardData" class="space-y-6">
        <!-- Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Total Pharmacies -->
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-blue-500 rounded-md p-3">
                <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Total Pharmacies
                  </dt>
                  <dd class="text-2xl font-semibold text-gray-900">
                    {{ dashboardData.totalPharmacies || 0 }}
                  </dd>
                </dl>
              </div>
            </div>
          </div>

          <!-- Total Products -->
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-green-500 rounded-md p-3">
                <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Total Products
                  </dt>
                  <dd class="text-2xl font-semibold text-gray-900">
                    {{ dashboardData.totalProducts || 0 }}
                  </dd>
                </dl>
              </div>
            </div>
          </div>

          <!-- User Role -->
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-purple-500 rounded-md p-3">
                <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Role
                  </dt>
                  <dd class="text-2xl font-semibold text-gray-900">
                    {{ dashboardData.userRole }}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <!-- My Pharmacy -->
        <div v-if="dashboardData.myPharmacy" class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-4">My Pharmacy</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-gray-500">Name</p>
              <p class="text-lg font-medium text-gray-900">{{ dashboardData.myPharmacy.name }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Address</p>
              <p class="text-lg font-medium text-gray-900">{{ dashboardData.myPharmacy.address }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Phone</p>
              <p class="text-lg font-medium text-gray-900">{{ dashboardData.myPharmacy.phone }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">On-Duty Status</p>
              <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                :class="dashboardData.myPharmacy.onDuty ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'"
              >
                {{ dashboardData.myPharmacy.onDuty ? 'On Duty' : 'Off Duty' }}
              </span>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <NuxtLink
              to="/staff/inventory"
              class="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <svg class="h-5 w-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Manage Inventory
            </NuxtLink>
            <NuxtLink
              to="/pharmacies"
              class="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <svg class="h-5 w-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              View Pharmacies
            </NuxtLink>
            <NuxtLink
              to="/products"
              class="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <svg class="h-5 w-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              View Products
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const { user, isAuthenticated, isStaff, logout, getAuthHeaders } = useAuth()
const config = useRuntimeConfig()
const router = useRouter()

const loading = ref(true)
const error = ref('')
const dashboardData = ref<any>(null)

// Protect route - redirect if not authenticated or not staff
onMounted(async () => {
  if (!isAuthenticated.value) {
    router.push('/auth/login')
    return
  }

  if (!isStaff.value) {
    error.value = 'Access denied. This page is only for staff members.'
    loading.value = false
    return
  }

  await fetchDashboard()
})

const fetchDashboard = async () => {
  loading.value = true
  error.value = ''

  try {
    const response: any = await $fetch(`${config.public.apiBase}/staff/dashboard`, {
      headers: getAuthHeaders()
    })

    if (response.success) {
      dashboardData.value = response.data
    } else {
      error.value = response.message || 'Failed to load dashboard'
    }
  } catch (err: any) {
    console.error('Dashboard fetch error:', err)
    error.value = err.data?.message || 'Failed to load dashboard data'

    // If unauthorized, redirect to login
    if (err.status === 401 || err.status === 403) {
      await logout()
    }
  } finally {
    loading.value = false
  }
}

const handleLogout = async () => {
  await logout()
}
</script>
