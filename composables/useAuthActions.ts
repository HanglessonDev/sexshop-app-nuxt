import { AuthGatewaySupabase } from '~/src/data/auth.gateway.supabase'
import { LoginUseCase } from '~/src/usecases/auth/login.usecase'
import { LogoutUseCase } from '~/src/usecases/auth/logout.usecase'
import { RegisterUseCase } from '~/src/usecases/auth/register.usecase'
import { useAuthCookies } from './useAuthCookies'
import { useAuthState } from './useAuthState'
import type { LoginDTO, RegisterDTO } from '~/src/domain/dto/auth.dto'
import { RenewSessionUseCase } from '~/src/usecases/auth/renew-session.usecase'

export const useAuthActions = () => {
  const router = useRouter()
  const supabaseClient = useSupabaseClient()
  const authGateway = AuthGatewaySupabase.create(supabaseClient)
  const registerUseCase = RegisterUseCase.create(authGateway)
  const loginUseCase = LoginUseCase.create(authGateway)
  const logoutUseCase = LogoutUseCase.create(authGateway)
  const renewSessionUseCase = RenewSessionUseCase.create(authGateway)

  const { user, session, error } = useAuthState()
  const { loadSessionFromCookie, saveSessionToCookie, clearCookies } = useAuthCookies()

  loadSessionFromCookie(session, user)

  watchEffect(() => {
    saveSessionToCookie(session, user)
  })

  const isSessionExpired = () => {
    if (session.value && session.value.expiresAt) {
      return new Date().getTime() > session.value.expiresAt * 1000
    }
    return false
  }

  const renewSession = async () => {
    try {
      error.value = null
      const newSession = await renewSessionUseCase.execute()
      if (!newSession?.user) throw new Error('Session refresh failed')
      session.value = newSession
      user.value = session.value?.user ?? null
      saveSessionToCookie(session, user)
    } catch (err: any) {
      error.value = err.message
    }
  }

  if (isSessionExpired()) {
    renewSession()
  }

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
      user.value = session.value?.user ?? null

      if (user.value?.role === 'admin') {
        router.push('/admin')
      } else if (user.value?.role === 'client') {
        router.push('/conta')
      }
    } catch (err: any) {
      error.value = err.message
    }
  }

  const logout = async () => {
    try {
      error.value = null
      await logoutUseCase.execute()
      user.value = null
      session.value = null
      clearCookies()
      router.push('/login')
    } catch (err: any) {
      error.value = err.message
    }
  }

  setInterval(
    () => {
      if (isSessionExpired()) {
        renewSession()
      }
    },
    5 * 60 * 1000
  )

  return { register, login, logout }
}
