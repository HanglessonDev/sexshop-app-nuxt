import type { CategoryDTO, CreateCategoryDTO } from '~/src/domain/dto/category.dto'
import type { Category } from '~/src/domain/entities/category.entity'
import type { CategoryGateway } from '~/src/domain/gateways/category.gateway'
import { CreateCategorySchema } from '~/src/validation/schemas/CategorySchemas'
import { ZodValidator } from '~/src/validation/validators/ZodValidator'

/**
 * @class SaveCategoryUseCase
 * @description Represents the use case for saving categories. It provides a clean and organized way to handle the logic of saving categories.
 * The use case validates the input data, saves the category using the provided gateway, and formats the output data into the desired DTO format.
 *
 * @property {CategoryGateway} categoryGateway - The gateway to interact with the category data.
 *
 * @example
 * // Creating an instance of the SaveCategoryUseCase class
 * const categoryGateway = new CategoryGateway();
 * const useCase = SaveCategoryUseCase.create(categoryGateway);
 *
 * // Executing the use case
 * const data = { name: 'Example Category' };
 * const savedCategory = await useCase.execute(data);
 *
 * @throws {Error} If there is an error during the execution of the use case.
 */
export class SaveCategoryUseCase {
  /**
   * @constructor
   * @param {CategoryGateway} categoryGateway - The gateway to interact with the category data.
   */
  private constructor(private readonly categoryGateway: CategoryGateway) {}

  /**
   * @static
   * @method create
   * @description Static method to create an instance of the SaveCategoryUseCase class.
   * @param {CategoryGateway} categoryGateway - The gateway to interact with the category data.
   * @returns {SaveCategoryUseCase} A new instance of the SaveCategoryUseCase class.
   */
  public static create(categoryGateway: CategoryGateway): SaveCategoryUseCase {
    return new SaveCategoryUseCase(categoryGateway)
  }

  /**
   * @method execute
   * @description Executes the use case by validating the input data, saving the category using the provided gateway, and formatting the output data into the desired DTO format.
   * @param {CreateCategoryDTO} data - The data representing the category to be saved.
   * @returns {Promise<CategoryDTO>} A promise that resolves to the saved category in the desired DTO format.
   * @throws {Error} If there is an error during the execution of the use case.
   */
  public async execute(data: CreateCategoryDTO): Promise<CategoryDTO> {
    try {
      const validData = ZodValidator.validate(CreateCategorySchema, data)
      const aCategory = await this.categoryGateway.save(validData as CreateCategoryDTO)
      return this.presentOutput(aCategory)
    } catch (err) {
      throw new Error((err as Error).message)
    }
  }

  /**
   * @private
   * @method presentOutput
   * @description Formats the output data into the desired DTO format.
   * @param {Category} category - The category entity to be formatted.
   * @returns {CategoryDTO} The formatted category in the desired DTO format.
   */
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
