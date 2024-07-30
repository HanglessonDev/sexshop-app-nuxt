import type {
  CreateCategoryDTO,
  RemoveCategoryInputDTO,
  UpdateCategoryDTO,
} from '../dto/category.dto'
import type { Category } from '../entities/category.entity'

/**
 * @interface CategoryGateway
 * @description Represents the contract for interacting with the category data. It provides a clean and organized way to handle the data layer of the category domain.
 *
 * @property {save(data: CreateCategoryDTO): Promise<Category>} save - Saves a new category using the provided data.
 * @property {update(category: UpdateCategoryDTO): Promise<void>} update - Updates an existing category using the provided data.
 * @property {remove(id: RemoveCategoryInputDTO): Promise<void>} remove - Removes a category by its ID.
 * @property {list(): Promise<Category[] | null>} list - Retrieves a list of all categories.
 *
 * @example
 * // Implementing the CategoryGateway interface
 * class CategoryGatewayImpl implements CategoryGateway {
 *   async save(data: CreateCategoryDTO): Promise<Category> {
 *     // Implement the logic to save a new category
 *   }
 *
 *   async update(category: UpdateCategoryDTO): Promise<void> {
 *     // Implement the logic to update an existing category
 *   }
 *
 *   async remove(id: RemoveCategoryInputDTO): Promise<void> {
 *     // Implement the logic to remove a category by its ID
 *   }
 *
 *   async list(): Promise<Category[] | null> {
 *     // Implement the logic to retrieve a list of all categories
 *   }
 * }
 *
 * // Creating an instance of the CategoryGateway interface
 * const categoryGateway = new CategoryGatewayImpl();
 *
 * // Saving a new category
 * const data = { name: 'Example Category' };
 * const savedCategory = await categoryGateway.save(data);
 *
 * // Updating an existing category
 * const categoryId = 1;
 * const updatedData = { name: 'Updated Category' };
 * await categoryGateway.update({ id: categoryId, ...updatedData });
 *
 * // Removing a category
 * const categoryIdToRemove = 2;
 * await categoryGateway.remove({ id: categoryIdToRemove });
 *
 * // Retrieving a list of all categories
 * const categories = await categoryGateway.list();
 *
 * @throws {Error} If there is an error during the execution of any of the methods.
 */
export interface CategoryGateway {
  save(data: CreateCategoryDTO): Promise<Category>
  update(category: UpdateCategoryDTO): Promise<void>
  remove(id: RemoveCategoryInputDTO): Promise<void>
  list(): Promise<Category[] | null>
}
