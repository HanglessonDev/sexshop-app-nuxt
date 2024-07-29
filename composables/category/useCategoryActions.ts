import { CategoryGatewaySupabase } from '~/src/data/category.gateway.supabase'
import type { CategoryDTO, CreateCategoryDTO } from '~/src/domain/dto/category.dto'
import type { Category } from '~/src/domain/entities/category.entity'
import { ListCategoryUseCase } from '~/src/usecases/category/list.usecase'
import { SaveCategoryUseCase } from '~/src/usecases/category/save.usecase'

export const useCategoryActions = () => {
  const supabaseClient = useSupabaseClient()
  const categoryGateway = CategoryGatewaySupabase.create(supabaseClient)
  const saveCategoryUseCase = SaveCategoryUseCase.create(categoryGateway)
  const listCategoryUseCase = ListCategoryUseCase.create(categoryGateway)

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

  return {
    save,
    list,
  }
}
