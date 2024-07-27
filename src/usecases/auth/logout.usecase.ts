import type { AuthGateway } from '~/src/domain/gateways/auth.gateway'

export class LogoutUseCase {
  private constructor(private readonly authGateway: AuthGateway) {}

  public static create(authGateway: AuthGateway) {
    return new LogoutUseCase(authGateway)
  }

  public async execute(): Promise<void> {
    await this.authGateway.logout()
  }
}
