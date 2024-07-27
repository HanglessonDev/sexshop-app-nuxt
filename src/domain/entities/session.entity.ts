import type { User } from './user.entity'

export interface Session {
  accessToken: string
  refreshToken: string
  user: User
}
