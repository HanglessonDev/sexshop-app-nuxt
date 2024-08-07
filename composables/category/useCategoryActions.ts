import { CategoryGatewaySupabase } from '~/src/data/category.gateway.supabase'
import type {
  CategoryDTO,
  CreateCategoryDTO,
  RemoveCategoryInputDTO,
  UpdateCategoryDTO,
} from '~/src/domain/dto/category.dto'
import type { Category } from '~/src/domain/entities/category.entity'
import { RemoveCategoryUseCase } from '~/src/usecases/category/remove.usecase'
import { ListCategoryUseCase } from '~/src/usecases/category/list.usecase'
import { SaveCategoryUseCase } from '~/src/usecases/category/save.usecase'
import { UpdateCategoryUseCase } from '~/src/usecases/category/update.usecase'

export const useCategoryActions = () => {
  const supabaseClient = useSupabaseClient()
  const categoryGateway = CategoryGatewaySupabase.create(supabaseClient)
  const saveCategoryUseCase = SaveCategoryUseCase.create(categoryGateway)
  const listCategoryUseCase = ListCategoryUseCase.create(categoryGateway)
  const updateCategoryUseCase = UpdateCategoryUseCase.create(categoryGateway)
  const removeCategoryUseCase = RemoveCategoryUseCase.create(categoryGateway)

  const save = async (data: CreateCategoryDTO): Promise<Category | null> => {
    try {
      return await saveCategoryUseCase.execute(data)
    } catch (err) {
      throw err instanceof Error ? err.message : 'Unknown error'
    }
  }

  const list = async (): Promise<CategoryDTO[]> => {
    try {
      return await listCategoryUseCase.execute()
    } catch (err) {
      throw err instanceof Error ? err.message : 'Unknown error'
    }
  }

  const update = async (data: UpdateCategoryDTO): Promise<void> => {
    try {
      return await updateCategoryUseCase.execute(data)
    } catch (err) {
      throw err instanceof Error ? err.message : 'Unknown error'
    }
  }

  const remove = async (data: RemoveCategoryInputDTO): Promise<void> => {
    try {
      return await removeCategoryUseCase.execute(data)
    } catch (err) {
      throw err instanceof Error ? err.message : 'Unknown error'
    }
  }

  return {
    save,
    list,
    update,
    remove,
  }
}
