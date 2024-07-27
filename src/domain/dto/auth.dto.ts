import type { User } from '../entities/user.entity'

export interface RegisterDTO {
  email: string
  password: string
  role: string
}

export interface LoginDTO {
  email: string
  password: string
}

export interface SessionDTO {
  accessToken: string
  refreshToken: string
  expiresAt: number
  expiresIn: number
  user: User
}
