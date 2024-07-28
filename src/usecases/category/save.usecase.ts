import type { CreateCategoryDTO } from '~/src/domain/dto/category.dto'
import type { Category } from '~/src/domain/entities/category.entity'
import type { CategoryGateway } from '~/src/domain/gateways/category.gateway'
import { CreateCategorySchema } from '~/src/validation/schemas/CategorySchemas'
import { ZodValidator } from '~/src/validation/validators/ZodValidator'

export class SaveCategoryUseCase {
  private constructor(private readonly categoryGateway: CategoryGateway) {}

  public static create(categoryGateway: CategoryGateway): SaveCategoryUseCase {
    return new SaveCategoryUseCase(categoryGateway)
  }

  public async execute(data: CreateCategoryDTO): Promise<Category> {
    try {
      const validData = ZodValidator.validate(CreateCategorySchema, data)
      return this.categoryGateway.save(validData as CreateCategoryDTO)
    } catch (err) {
      throw new Error((err as Error).message)
    }
  }
}
