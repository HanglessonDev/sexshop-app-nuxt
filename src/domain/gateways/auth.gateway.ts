import type { LoginDTO, RegisterDTO, SessionDTO } from '../dto/auth.dto'
import type { User } from '../entities/user.entity'

export interface AuthGateway {
  register(data: RegisterDTO): Promise<User>
  login(data: LoginDTO): Promise<SessionDTO | null>
  renewSession(): Promise<SessionDTO | null>
  logout(): Promise<void>
}
