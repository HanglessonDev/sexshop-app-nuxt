import type { UpdateCategoryDTO, UpdateCategoryOutputDTO } from '~/src/domain/dto/category.dto'
import type { Usecase } from '../usecases'
import type { CategoryGateway } from '~/src/domain/gateways/category.gateway'
import { UpdateCategorySchema } from '~/src/validation/schemas/CategorySchemas'
import { ZodValidator } from '~/src/validation/validators/ZodValidator'

/**
 * @class UpdateCategoryUseCase
 * @description Represents the use case for updating a category. It provides a clean and organized way to handle the logic of updating a category.
 * The use case validates the input data, updates the category using the provided gateway, and does not return any value.
 *
 * @property {CategoryGateway} categoryGateway - The gateway to interact with the category data.
 *
 * @example
 * // Creating an instance of the UpdateCategoryUseCase class
 * const categoryGateway = new CategoryGateway();
 * const useCase = UpdateCategoryUseCase.create(categoryGateway);
 *
 * // Executing the use case
 * const data = { categoryId: 1, name: 'Updated Category' };
 * await useCase.execute(data);
 *
 * @throws {Error} If there is an error during the execution of the use case.
 */
export class UpdateCategoryUseCase implements Usecase<UpdateCategoryDTO, UpdateCategoryOutputDTO> {
  /**
   * @constructor
   * @param {CategoryGateway} categoryGateway - The gateway to interact with the category data.
   */
  private constructor(private readonly categoryGateway: CategoryGateway) {}

  /**
   * @static
   * @method create
   * @description Static method to create an instance of the UpdateCategoryUseCase class.
   * @param {CategoryGateway} categoryGateway - The gateway to interact with the category data.
   * @returns {UpdateCategoryUseCase} A new instance of the UpdateCategoryUseCase class.
   */
  public static create(categoryGateway: CategoryGateway): UpdateCategoryUseCase {
    return new UpdateCategoryUseCase(categoryGateway)
  }

  /**
   * @async
   * @method execute
   * @description Executes the use case for updating a category. It validates the input data, updates the category using the provided gateway, and does not return any value.
   * @param {UpdateCategoryDTO} data - The data representing the category to be updated.
   * @returns {Promise<void>} A promise that resolves when the category is successfully updated.
   * @throws {Error} If there is an error during the execution of the use case.
   */
  public async execute(data: UpdateCategoryDTO): Promise<void> {
    try {
      const validData = ZodValidator.validate(UpdateCategorySchema, data)
      await this.categoryGateway.update(validData as UpdateCategoryDTO)
    } catch (err) {
      throw new Error((err as Error).message)
    }
  }
}
