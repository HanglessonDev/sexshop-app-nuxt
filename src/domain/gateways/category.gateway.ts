import type { CreateCategoryDTO, UpdateCategoryDTO } from '../dto/category.dto'
import type { Category } from '../entities/category.entity'

export interface CategoryGateway {
  save(data: CreateCategoryDTO): Promise<Category>
  update(category: UpdateCategoryDTO): Promise<void>
  // delete(id: string): Promise<void>
  list(): Promise<Category[] | null>
  // get(id: string): Promise<Category>
  // search(search: string): Promise<Category[]>
}
