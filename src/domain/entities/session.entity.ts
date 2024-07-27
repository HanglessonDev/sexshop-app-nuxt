import type { User } from './user.entity'

export interface Session {
  accessToken: string
  refreshToken: string
  expiresAt: number
  expiresIn: number
  user: User
}
