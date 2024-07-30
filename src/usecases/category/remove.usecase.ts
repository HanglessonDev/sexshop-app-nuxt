import type { RemoveCategoryOutputDTO, RemoveCategoryInputDTO } from '~/src/domain/dto/category.dto'
import type { CategoryGateway } from '~/src/domain/gateways/category.gateway'
import type { Usecase } from '../usecases'

export class RemoveCategoryUseCase
  implements Usecase<RemoveCategoryInputDTO, RemoveCategoryOutputDTO>
{
  private constructor(private readonly categoryGateway: CategoryGateway) {}

  static create(categoryGateway: CategoryGateway) {
    return new RemoveCategoryUseCase(categoryGateway)
  }

  async execute(data: RemoveCategoryInputDTO): Promise<RemoveCategoryOutputDTO> {
    try {
      await this.categoryGateway.remove(data)
    } catch (err) {
      throw new Error((err as Error).message)
    }
  }
}
