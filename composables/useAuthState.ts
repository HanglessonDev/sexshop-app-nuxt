import type { Session } from '~/src/domain/entities/session.entity'
import type { User } from '~/src/domain/entities/user.entity'

export const useAuthState = () => {
  const user = ref<User | null>(null)
  const session = ref<Session | null>(null)
  const error = ref<string | null>(null)

  return { user, session, error, isLoggedIn: computed(() => !!user.value) }
}
