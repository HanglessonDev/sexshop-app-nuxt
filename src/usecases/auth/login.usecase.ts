import type { LoginDTO, SessinDTO } from '~/src/domain/dto/auth.dto'
import type { AuthGateway } from '~/src/domain/gateways/auth.gateway'

export class LoginUseCase {
  private constructor(private readonly authGateway: AuthGateway) {}

  public static create(authGateway: AuthGateway) {
    return new LoginUseCase(authGateway)
  }

  public async execute(data: LoginDTO): Promise<SessinDTO | null> {
    return await this.authGateway.login(data)
  }
}
