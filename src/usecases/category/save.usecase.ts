import type { CreateCategoryDTO } from '~/src/domain/dto/category.dto'
import type { Category } from '~/src/domain/entities/category.entity'
import type { CategoryGateway } from '~/src/domain/gateways/category.gateway'

export class SaveCategoryUseCase {
  private constructor(private readonly categoryGateway: CategoryGateway) {}

  public static create(categoryGateway: CategoryGateway): SaveCategoryUseCase {
    return new SaveCategoryUseCase(categoryGateway)
  }

  public async execute(data: CreateCategoryDTO): Promise<Category> {
    return this.categoryGateway.save(data)
  }
}
