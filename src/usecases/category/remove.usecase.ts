import type { RemoveCategoryOutputDTO, RemoveCategoryInputDTO } from '~/src/domain/dto/category.dto'
import type { CategoryGateway } from '~/src/domain/gateways/category.gateway'
import type { Usecase } from '../usecases'

/**
 * @class RemoveCategoryUseCase
 * @description Represents the use case for removing categories. It provides a clean and organized way to handle the logic of removing categories.
 * The use case interacts with the category gateway to remove the specified category.
 *
 * @property {CategoryGateway} categoryGateway - The gateway to interact with the category data.
 *
 * @example
 * // Creating an instance of the RemoveCategoryUseCase class
 * const categoryGateway = new CategoryGateway();
 * const useCase = RemoveCategoryUseCase.create(categoryGateway);
 *
 * // Executing the use case
 * const data = { categoryId: 1 };
 * await useCase.execute(data);
 *
 * @throws {Error} If an error occurs during the removal process.
 */
export class RemoveCategoryUseCase
  implements Usecase<RemoveCategoryInputDTO, RemoveCategoryOutputDTO>
{
  /**
   * @constructor
   * @param {CategoryGateway} categoryGateway - The gateway to interact with the category data.
   */
  private constructor(private readonly categoryGateway: CategoryGateway) {}

  /**
   * @static
   * @method create
   * @description Static method to create an instance of the RemoveCategoryUseCase class.
   * @param {CategoryGateway} categoryGateway - The gateway to interact with the category data.
   * @returns {RemoveCategoryUseCase} A new instance of the RemoveCategoryUseCase class.
   */
  public static create(categoryGateway: CategoryGateway) {
    return new RemoveCategoryUseCase(categoryGateway)
  }

  /**
   * @method execute
   * @description Executes the use case by removing the category.
   * @param {RemoveCategoryInputDTO} data - The input data containing the category ID to be removed.
   * @returns {Promise<RemoveCategoryOutputDTO>} A promise that resolves to the output data with the result of the removal.
   * @throws {Error} If an error occurs during the removal process.
   */
  async execute(data: RemoveCategoryInputDTO): Promise<RemoveCategoryOutputDTO> {
    try {
      await this.categoryGateway.remove(data)
    } catch (err) {
      throw new Error((err as Error).message)
    }
  }
}
