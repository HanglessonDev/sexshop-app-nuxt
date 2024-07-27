import type { RegisterDTO } from '~/src/domain/dto/auth.dto'
import type { User } from '~/src/domain/entities/user.entity'
import type { AuthGateway } from '~/src/domain/gateways/auth.gateway'

export class RegisterUseCase {
  private constructor(private readonly authGateway: AuthGateway) {}

  public static create(authGateway: AuthGateway) {
    return new RegisterUseCase(authGateway)
  }

  public async execute(data: RegisterDTO): Promise<User> {
    return await this.authGateway.register(data)
  }
}
