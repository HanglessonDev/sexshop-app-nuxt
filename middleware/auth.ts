export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser()
  const userRole = user.value?.user_metadata.role

  // Definir as rotas protegidas para cada tipo de usuário
  const adminRoutes = ['/admin']
  const clientRoutes = ['/conta']

  // Verificar se o usuário está autenticado
  if (!user.value) {
    // Se o usuário não estiver autenticado e tentar acessar uma rota protegida, redirecionar para /login
    if (adminRoutes.includes(to.path) || clientRoutes.includes(to.path)) {
      return navigateTo('/login')
    }
  } else {
    // Se o usuário estiver autenticado, verificar seu papel
    if (adminRoutes.includes(to.path) && userRole !== 'admin') {
      // Se o usuário tentar acessar uma rota de administrador e não for um admin, redirecionar para /login ou outra página
      return navigateTo('/login')
    }

    if (clientRoutes.includes(to.path) && userRole !== 'client') {
      // Se o usuário tentar acessar uma rota de cliente e não for um client, redirecionar para /login ou outra página
      return navigateTo('/login')
    }
  }
})
