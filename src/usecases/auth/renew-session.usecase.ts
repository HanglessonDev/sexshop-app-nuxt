import type { SessionDTO } from '~/src/domain/dto/auth.dto'
import type { AuthGateway } from '~/src/domain/gateways/auth.gateway'

export class RenewSessionUseCase {
  private constructor(private readonly authGateway: AuthGateway) {}

  public static create(authGateway: AuthGateway) {
    return new RenewSessionUseCase(authGateway)
  }

  public async execute(): Promise<SessionDTO | null> {
    return await this.authGateway.renewSession()
  }
}
