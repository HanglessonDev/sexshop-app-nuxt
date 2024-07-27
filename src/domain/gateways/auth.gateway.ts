import type { LoginDTO, RegisterDTO, SessinDTO } from '../dto/auth.dto'
import type { User } from '../entities/user.entity'

export interface AuthGateway {
  register(data: RegisterDTO): Promise<User>
  login(data: LoginDTO): Promise<SessinDTO | null>
  logout(): Promise<void>
}
