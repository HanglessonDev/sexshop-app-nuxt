import type { CategoryDTO } from '~/src/domain/dto/category.dto'
import type { Category } from '~/src/domain/entities/category.entity'
import type { CategoryGateway } from '~/src/domain/gateways/category.gateway'

/**
 * @class ListCategoryUseCase
 * @description This class represents the use case for listing categories.
 * It provides a clean and organized way to handle the logic of listing categories.
 * The use case interacts with the category gateway to retrieve the categories from the data source.
 * It then formats the categories into the desired DTO format and returns the result.
 *
 * @property {CategoryGateway} categoryGateway - The gateway to interact with the category data.
 *
 * @example
 * // Creating an instance of the ListCategoryUseCase class
 * const categoryGateway = new CategoryGateway();
 * const useCase = ListCategoryUseCase.create(categoryGateway);
 *
 * // Executing the use case
 * const categories = await useCase.execute();
 *
 * // Example categories DTO
 * const exampleCategories: CategoryDTO[] = [
 *   { id: 1, name: 'Category 1', createdAt: new Date(), updatedAt: new Date() },
 *   { id: 2, name: 'Category 2', createdAt: new Date(), updatedAt: new Date() },
 * ];
 *
 * @returns {Promise<CategoryDTO[]>} A promise that resolves to an array of category DTOs.
 */
export class ListCategoryUseCase {
  /**
   * @constructor
   * @param {CategoryGateway} categoryGateway - The gateway to interact with the category data.
   */
  private constructor(private readonly categoryGateway: CategoryGateway) {}

  /**
   * @static
   * @method create
   * @description Static method to create an instance of the ListCategoryUseCase class.
   * @param {CategoryGateway} categoryGateway - The gateway to interact with the category data.
   * @returns {ListCategoryUseCase} A new instance of the ListCategoryUseCase class.
   */
  public static create(categoryGateway: CategoryGateway): ListCategoryUseCase {
    return new ListCategoryUseCase(categoryGateway)
  }

  /**
   * @async
   * @method execute
   * @description Executes the use case for listing categories. It retrieves the categories from the category gateway, formats them into the desired DTO format, and returns the result.
   * @returns {Promise<CategoryDTO[]>} A promise that resolves to an array of category DTOs.
   */
  public async execute(): Promise<CategoryDTO[]> {
    const categories = await this.categoryGateway.list()
    if (!categories) return []
    return this.presentOutput(categories)
  }

  /**
   * @private
   * @method presentOutput
   * @description Formats the provided categories into the desired DTO format.
   * @param {Category[]} categories - The categories to be formatted.
   * @returns {CategoryDTO[]} The formatted categories in the desired DTO format.
   */
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
