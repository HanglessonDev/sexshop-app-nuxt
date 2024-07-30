import type {
  CreateCategoryDTO,
  RemoveCategoryInputDTO,
  UpdateCategoryDTO,
} from '../dto/category.dto'
import type { Category } from '../entities/category.entity'

export interface CategoryGateway {
  save(data: CreateCategoryDTO): Promise<Category>
  update(category: UpdateCategoryDTO): Promise<void>
  remove(id: RemoveCategoryInputDTO): Promise<void>
  list(): Promise<Category[] | null>
  // get(id: string): Promise<Category>
  // search(search: string): Promise<Category[]>
}
