export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser()
  const protectedRoutes = ['/admin', '/conta']

  if (protectedRoutes.includes(to.path) && !user.value) {
    return navigateTo('/login')
  }
})
