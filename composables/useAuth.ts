import { AuthGatewaySupabase } from '~/src/data/auth.gateway.supabase'
import type { LoginDTO, RegisterDTO } from '~/src/domain/dto/auth.dto'
import type { Session } from '~/src/domain/entities/session.entity'
import type { User } from '~/src/domain/entities/user.entity'
import { LoginUseCase } from '~/src/usecases/auth/login.usecase'
import { LogoutUseCase } from '~/src/usecases/auth/logout.usecase'
import { RegisterUseCase } from '~/src/usecases/auth/register.usecase'
export const useAuth = () => {
  const router = useRouter()
  const supabase = useSupabaseClient()
  const authGateway = AuthGatewaySupabase.create(supabase)

  const registerUseCase = RegisterUseCase.create(authGateway)
  const loginUseCase = LoginUseCase.create(authGateway)
  const logoutUseCase = LogoutUseCase.create(authGateway)

  const user = ref<User | null>(null)
  const session = ref<Session | null>(null)
  const error = ref<string | null>(null)

  const register = async (data: RegisterDTO) => {
    try {
      error.value = null
      user.value = await registerUseCase.execute(data)
      router.push('/login')
    } catch (err: any) {
      error.value = err.message
    }
  }

  const login = async (data: LoginDTO) => {
    try {
      error.value = null
      session.value = await loginUseCase.execute(data)

      if (!session.value?.user) throw new Error('User login failed')
      await handleUserRole(session.value?.user)
    } catch (err: any) {
      error.value = err.message
    }
  }

  const logout = async () => {
    try {
      error.value = null
      await logoutUseCase.execute()
      router.push('/login')
    } catch (err: any) {
      error.value = err.message
    }
  }

  const handleUserRole = async (user: User) => {
    if (user.role === 'admin') {
      router.push('/admin')
    } else if (user.role === 'client') {
      router.push('/conta')
    }
  }

  return {
    user,
    session,
    error,
    register,
    login,
    logout,
  }
}
