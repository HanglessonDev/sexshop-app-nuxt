import { CategoryGatewaySupabase } from '~/src/data/category.gateway.supabase'
import type { CreateCategoryDTO } from '~/src/domain/dto/category.dto'
import type { Category } from '~/src/domain/entities/category.entity'
import { ListCategoryUseCase } from '~/src/usecases/category/list.usecase'
import { SaveCategoryUseCase } from '~/src/usecases/category/save.usecase'

export const useCategoryActions = () => {
  const supabaseClient = useSupabaseClient()
  const categoryGateway = CategoryGatewaySupabase.create(supabaseClient)
  const saveCategoryUseCase = SaveCategoryUseCase.create(categoryGateway)
  const listCategoryUseCase = ListCategoryUseCase.create(categoryGateway)

  const categories = ref<Category[] | null>(null)

  const save = async (data: CreateCategoryDTO) => {
    return await saveCategoryUseCase.execute(data)
  }

  const list = async () => {
    categories.value = await listCategoryUseCase.execute()
    return categories
  }

  return {
    save,
    list,
    categories,
  }
}
