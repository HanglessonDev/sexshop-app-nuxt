import type { SessionDTO } from '~/src/domain/dto/auth.dto'
import type { User } from '~/src/domain/entities/user.entity'

export const useAuthCookies = () => {
  const sessionCookie = useCookie<SessionDTO | null>('session')
  const userCookie = useCookie<User | null>('user')

  const loadSessionFromCookie = (session: any, user: any) => {
    if (sessionCookie.value) {
      session.value = sessionCookie.value
      user.value = userCookie.value
    }
  }

  const saveSessionToCookie = (session: any, user: any) => {
    sessionCookie.value = session.value
    userCookie.value = user.value
  }

  const clearCookies = () => {
    sessionCookie.value = null
    userCookie.value = null
  }

  return { loadSessionFromCookie, saveSessionToCookie, clearCookies }
}
