export default defineNuxtRouteMiddleware((to, from) => {
  // Skip on server
  if (process.server) return

  const token = localStorage.getItem('auth-token')

  // If no token and trying to access protected route, redirect to login
  if (!token && to.path.startsWith('/staff')) {
    return navigateTo('/auth/login')
  }

  // If has token and trying to access login/signup, redirect to staff
  if (token && (to.path === '/auth/login' || to.path === '/auth/signup')) {
    return navigateTo('/staff')
  }
})
