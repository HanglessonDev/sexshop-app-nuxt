import type {
  CreateCategoryDTO,
  RemoveCategoryInputDTO,
  UpdateCategoryDTO,
} from '../domain/dto/category.dto'
import type { Category } from '../domain/entities/category.entity'
import type { CategoryGateway } from '../domain/gateways/category.gateway'
import type { SupabaseClient } from '@supabase/supabase-js'

export class CategoryGatewaySupabase implements CategoryGateway {
  private constructor(private readonly supabase: SupabaseClient) {}

  public static create(supabase: SupabaseClient) {
    return new CategoryGatewaySupabase(supabase)
  }

  private mapCategory(supabaseCategory: any): Category {
    return {
      id: supabaseCategory.id,
      name: supabaseCategory.name,
      slug: supabaseCategory.slug,
      description: supabaseCategory.description,
      isActive: supabaseCategory.is_active,
      visibility: supabaseCategory.visibility,
      createdAt: supabaseCategory.created_at,
      createdBy: supabaseCategory.created_by,
      updatedAt: supabaseCategory.updated_at,
      updatedBy: supabaseCategory.updated_by,
    }
  }

  public async save(data: CreateCategoryDTO): Promise<Category> {
    const { name, slug, description, isActive, visibility, createdBy } = data

    const { data: response, error } = await this.supabase
      .from('categories')
      .insert({
        name,
        slug,
        description,
        is_active: isActive,
        visibility,
        created_by: createdBy,
      })
      .select()
      .single()

    if (error) throw error
    if (!response) throw new Error('Category creation failed')
    return this.mapCategory(response)
  }

  public async list(): Promise<Category[]> {
    const { data: response, error } = await this.supabase.from('categories').select()

    if (error) throw error
    if (!response) throw new Error('Category list failed')

    return response.map(this.mapCategory)
  }

  public async update(category: UpdateCategoryDTO): Promise<void> {
    const { id, name, slug, description, isActive, visibility, updatedBy } = category

    const { error } = await this.supabase
      .from('categories')
      .update({
        name,
        slug,
        description,
        is_active: isActive,
        visibility,
        updated_by: updatedBy,
      })
      .eq('id', id)
    if (error) throw error
  }

  public async remove(id: RemoveCategoryInputDTO): Promise<void> {
    const { error } = await this.supabase.from('categories').delete().eq('id', id)
    if (error) throw error
  }
}
