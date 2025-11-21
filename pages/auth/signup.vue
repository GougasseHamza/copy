<template>
  <NuxtLayout name="default">
    <div class="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p class="mt-2 text-center text-sm text-gray-600">
            Or
            <NuxtLink to="/auth/login" class="font-medium text-primary hover:text-primary/80">
              sign in to existing account
            </NuxtLink>
          </p>
        </div>

        <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
          <div v-if="error" class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
            {{ error }}
          </div>

          <div v-if="success" class="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded">
            {{ success }}
          </div>

          <div class="space-y-4">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                id="name"
                v-model="name"
                name="name"
                type="text"
                required
                class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
              <input
                id="email"
                v-model="email"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700">Phone Number (Optional)</label>
              <input
                id="phone"
                v-model="phone"
                name="phone"
                type="tel"
                class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="+212 600 000 000"
              />
            </div>

            <div>
              <label for="pharmacyName" class="block text-sm font-medium text-gray-700">Pharmacy Name</label>
              <input
                id="pharmacyName"
                v-model="pharmacyName"
                name="pharmacyName"
                type="text"
                required
                class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Pharmacie Centrale"
              />
              <p class="mt-1 text-xs text-gray-500">
                Enter the name of the pharmacy you manage
              </p>
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                v-model="password"
                name="password"
                type="password"
                autocomplete="new-password"
                required
                class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                id="confirmPassword"
                v-model="confirmPassword"
                name="confirmPassword"
                type="password"
                autocomplete="new-password"
                required
                class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div class="flex items-center">
            <input
              id="terms"
              v-model="acceptTerms"
              name="terms"
              type="checkbox"
              required
              class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label for="terms" class="ml-2 block text-sm text-gray-900">
              I agree to the <a href="#" class="text-primary hover:text-primary/80">Terms and Conditions</a>
            </label>
          </div>

          <div>
            <button
              type="submit"
              :disabled="loading"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="loading">Creating account...</span>
              <span v-else>Sign up</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const { register } = useAuth()
const router = useRouter()

const name = ref('')
const email = ref('')
const phone = ref('')
const pharmacyName = ref('')
const password = ref('')
const confirmPassword = ref('')
const acceptTerms = ref(false)
const loading = ref(false)
const error = ref('')
const success = ref('')

const handleRegister = async () => {
  loading.value = true
  error.value = ''
  success.value = ''

  // Validation
  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match'
    loading.value = false
    return
  }

  if (password.value.length < 6) {
    error.value = 'Password must be at least 6 characters long'
    loading.value = false
    return
  }

  if (!acceptTerms.value) {
    error.value = 'You must accept the terms and conditions'
    loading.value = false
    return
  }

  try {
    const result = await register({
      email: email.value,
      password: password.value,
      name: name.value,
      phone: phone.value || undefined,
      pharmacyName: pharmacyName.value
    })

    if (result.success) {
      success.value = 'Account created successfully! Redirecting...'

      // Redirect to staff dashboard after 1 second
      setTimeout(() => {
        router.push('/staff')
      }, 1000)
    } else {
      error.value = result.message || 'Registration failed'
    }
  } catch (err: any) {
    error.value = err.message || 'An error occurred during registration'
  } finally {
    loading.value = false
  }
}
</script>
