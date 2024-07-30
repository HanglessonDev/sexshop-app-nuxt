<script setup lang="ts">
  import { useCategoryActions } from '~/composables/category/useCategoryActions'
  import type { RemoveCategoryInputDTO } from '~/src/domain/dto/category.dto'

  definePageMeta({
    middleware: ['auth'],
    layout: 'admin-layout',
  })

  const { user } = useAuth()
  const { remove } = useCategoryActions()
  const toast = useToast()
  const openDialogForm = ref(false)
  const updateMode = ref(false)
  const defaultCategoryValue = ref()

  const dialogTitle = computed(() => {
    return updateMode.value ? 'Editar Categoria' : 'Cadastrar Categoria'
  })

  const handleRegisterClick = () => {
    defaultCategoryValue.value = undefined
    updateMode.value = false
    openDialogForm.value = true
  }

  const handleEditClick = (item: any) => {
    item.updatedBy = user.value?.id
    defaultCategoryValue.value = item
    updateMode.value = true
    openDialogForm.value = true
  }

  const handleRemoveClick = async (data: RemoveCategoryInputDTO) => {
    try {
      await remove(data)
      toast.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Operação realizada com sucesso',
        life: 3000,
      })
    } catch (err) {
      toast.add({
        severity: 'error',
        summary: 'Erro ao remover a categoria',
        detail: (err as Error).message,
        life: 3000,
      })
    }
  }
</script>

<template>
  <div class="container mx-auto flex py-4">
    <CategoryListTable
      class="w-full"
      @cadastro="handleRegisterClick"
      @edit="handleEditClick"
      @remove="handleRemoveClick"
    />
    <Dialog
      v-model:visible="openDialogForm"
      modal
      :draggable="false"
      position="right"
      header="Header"
      class="w-[25vw]"
      :breakpoints="{ '1199px': '40vw', '575px': '90vw' }"
    >
      <template #header>
        <h3 class="text-center text-2xl">{{ dialogTitle }}</h3>
      </template>
      <CategoryUpdateForm
        v-if="updateMode"
        :category="defaultCategoryValue"
        @cancel="openDialogForm = false"
        @submit="openDialogForm = false"
      />
      <CategoryRegisterForm
        v-else
        @submit="openDialogForm = false"
        @cancel="openDialogForm = false"
      />
    </Dialog>
  </div>
</template>

<style scoped>
  .card {
    @apply border border-gray-300/50;
    &__title {
      @apply mb-4 text-center text-2xl font-bold;
    }

    &__form {
      @apply flex flex-col gap-2;
    }

    &__form-group {
      @apply flex flex-col gap-0;
    }

    &__form-group-help {
      @apply invisible text-xs text-red-500;
    }

    &__status-options {
      @apply mb-4 flex justify-around;

      .select-button {
        @apply flex h-[35px];
      }
    }

    .toggle-button {
      @apply h-[35px] w-36;
    }
  }
</style>
