import type { CategoryDTO, CreateCategoryDTO } from '~/src/domain/dto/category.dto'
import type { Category } from '~/src/domain/entities/category.entity'
import type { CategoryGateway } from '~/src/domain/gateways/category.gateway'
import { CreateCategorySchema } from '~/src/validation/schemas/CategorySchemas'
import { ZodValidator } from '~/src/validation/validators/ZodValidator'

export class SaveCategoryUseCase {
  private constructor(private readonly categoryGateway: CategoryGateway) {}

  public static create(categoryGateway: CategoryGateway): SaveCategoryUseCase {
    return new SaveCategoryUseCase(categoryGateway)
  }

  public async execute(data: CreateCategoryDTO): Promise<CategoryDTO> {
    try {
      const validData = ZodValidator.validate(CreateCategorySchema, data)
      const aCategory = await this.categoryGateway.save(validData as CreateCategoryDTO)
      return this.presentOutput(aCategory)
    } catch (err) {
      throw new Error((err as Error).message)
    }
  }

  private presentOutput(category: Category): CategoryDTO {
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
  }
}
