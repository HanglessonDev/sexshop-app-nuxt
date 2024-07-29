import type { CategoryDTO } from '~/src/domain/dto/category.dto'
import type { Category } from '~/src/domain/entities/category.entity'
import type { CategoryGateway } from '~/src/domain/gateways/category.gateway'

export class ListCategoryUseCase {
  private constructor(private readonly categoryGateway: CategoryGateway) {}

  public static create(categoryGateway: CategoryGateway): ListCategoryUseCase {
    return new ListCategoryUseCase(categoryGateway)
  }

  public async execute(): Promise<CategoryDTO[]> {
    const categories = await this.categoryGateway.list()
    if (!categories) return []
    return this.presentOutput(categories)
  }

  private presentOutput(categories: Category[]): CategoryDTO[] {
    return categories.map((category) => {
      return {
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description,
        isActive: category.isActive,
        visibility: category.visibility,
        createdAt: new Date(category.createdAt),
        updatedAt: new Date(category.updatedAt),
        createdBy: category.createdBy,
        updatedBy: category.updatedBy,
      }
    })
  }
}
