import type { RegisterDTO, LoginDTO, SessinDTO } from '../domain/dto/auth.dto'
import type {
  SupabaseClient,
  User as SupabaseUser,
  Session as SupabaseSession,
} from '@supabase/supabase-js'
import type { User } from '../domain/entities/user.entity'
import type { AuthGateway } from '../domain/gateways/auth.gateway'

export class AuthGatewaySupabase implements AuthGateway {
  private constructor(private readonly supabase: SupabaseClient) {}

  public static create(supabase: SupabaseClient) {
    return new AuthGatewaySupabase(supabase)
  }
  private mapUser(supabaseUser: SupabaseUser): User {
    return {
      id: supabaseUser.id,
      email: supabaseUser.email ?? '',
      role: supabaseUser.user_metadata.role || 'user',
    }
  }

  private mapSession(supabaseSession: SupabaseSession, user: SupabaseUser): SessinDTO {
    return {
      accessToken: supabaseSession.access_token ?? '',
      refreshToken: supabaseSession.refresh_token ?? '',
      user: this.mapUser(user),
    }
  }
  public async register(data: RegisterDTO): Promise<User> {
    const { email, password, role } = data
    const { data: response, error } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role },
      },
    })

    if (error) throw error
    if (!response.user) throw new Error('User registration failed')

    return this.mapUser(response.user)
  }
  public async login(data: LoginDTO): Promise<SessinDTO | null> {
    const { email, password } = data

    const { data: response, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      throw error
    }
    if (!response.user || !response.session) throw new Error('User login failed')

    return this.mapSession(response.session, response.user)
  }
  public async logout(): Promise<void> {
    const { error } = await this.supabase.auth.signOut()
    if (error) throw error
  }
}
