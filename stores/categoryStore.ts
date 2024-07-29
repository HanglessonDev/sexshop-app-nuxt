import { useCategoryActions } from '~/composables/category/useCategoryActions'
import type { CreateCategoryDTO } from '~/src/domain/dto/category.dto'
import type { Category } from '~/src/domain/entities/category.entity'

export const useCategoryStore = defineStore(
  'categoryStory',
  () => {
    const { save: saveCategory, list } = useCategoryActions()

    const categories = ref<Category[] | null>(null)
    const loading = ref<boolean>(false)
    const error = ref<string | null>(null)

    const save = async (data: CreateCategoryDTO) => {
      loading.value = true
      error.value = null
      try {
        await saveCategory(data)
        fecthCategories()
      } catch (err) {
        error.value = err instanceof Error ? err.message : 'Unknown error'
      } finally {
        loading.value = false
      }
    }

    const fecthCategories = async () => {
      loading.value = true
      error.value = null
      try {
        categories.value = await list()
      } catch (err) {
        error.value = err instanceof Error ? err.message : 'Unknown error'
        categories.value = []
      } finally {
        loading.value = false
      }
    }

    const subscribeToRealtimeCategories = () => {
      const client = useSupabaseClient()
      const channel = client
        .channel('public:categories')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'categories' }, () => {
          fecthCategories()
        })
        .subscribe()

      const unsubscribe = () => {
        client.removeChannel(channel)
      }

      return unsubscribe
    }

    return {
      categories,
      loading,
      error,
      save,
      fecthCategories,
      subscribeToRealtimeCategories,
    }
  },
  {
    persist: {
      key: 'categoryStore',
      storage: sessionStorage,
    },
  }
)
