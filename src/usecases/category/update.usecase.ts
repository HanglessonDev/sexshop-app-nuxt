import type { UpdateCategoryDTO, UpdateCategoryOutputDTO } from '~/src/domain/dto/category.dto'
import type { Usecase } from '../usecases'
import type { CategoryGateway } from '~/src/domain/gateways/category.gateway'
import { UpdateCategorySchema } from '~/src/validation/schemas/CategorySchemas'
import { ZodValidator } from '~/src/validation/validators/ZodValidator'

export class UpdateCategoryUseCase implements Usecase<UpdateCategoryDTO, UpdateCategoryOutputDTO> {
  private constructor(private readonly categoryGateway: CategoryGateway) {}

  public static create(categoryGateway: CategoryGateway): UpdateCategoryUseCase {
    return new UpdateCategoryUseCase(categoryGateway)
  }

  async execute(data: UpdateCategoryDTO): Promise<UpdateCategoryOutputDTO> {
    try {
      const validData = ZodValidator.validate(UpdateCategorySchema, data)
      await this.categoryGateway.update(validData as UpdateCategoryDTO)
    } catch (err) {
      throw new Error((err as Error).message)
    }
  }
}
