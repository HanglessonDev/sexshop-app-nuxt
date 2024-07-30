<script setup lang="ts">
  import Column from 'primevue/column'

  const categoryStore = useCategoryStore()
  const confirm = useConfirm()

  onMounted(async () => {
    categoryStore.fecthCategories()
    const unsubscribe = categoryStore.subscribeToRealtimeCategories()

    onUnmounted(() => {
      unsubscribe()
    })
  })

  const requireRemoveConfirm = (data: number) => {
    confirm.require({
      group: 'headless',
      message: 'Deseja remover esta categoria?',
      header: 'Confirmação',
      icon: 'pi pi-question-circle',
      acceptClass: 'p-button-danger',
      accept: () => {
        emit('remove', data)
      },
    })
  }

  const getSeverity = (value: boolean) => {
    switch (value) {
      case true:
        return 'success'
      case false:
        return 'danger'
    }
  }
  const emit = defineEmits(['cadastro', 'edit', 'remove'])
</script>

<template>
  <div>
    <DataTable size="small" :value="categoryStore.categories" table-style="min-width: 50rem">
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-2">
          <span class="text-xl font-bold">Categorias</span>
          <Button icon="pi pi-plus" size="small" label="Cadastrar" @click="emit('cadastro')" />
        </div>
      </template>
      <Column field="id" header="ID">
        <template #body="slotProps">
          <Tag class="w-12 text-sm" icon="pi pi-hashtag" :value="slotProps.data.id" />
        </template>
      </Column>
      <Column field="name" header="Name"></Column>
      <Column field="description" header="Descrição"></Column>
      <Column header="Status">
        <template #body="slotProps">
          <Tag
            class="w-20 text-sm uppercase"
            :value="slotProps.data.isActive ? 'Ativo' : 'Inativo'"
            :severity="getSeverity(slotProps.data.isActive)"
          />
        </template>
      </Column>
      <Column header="Visibilidade">
        <template #body="slotProps">
          <Tag
            class="w-20 text-sm uppercase"
            :value="slotProps.data.visibility ? 'Visível' : 'Invisivel'"
            :severity="getSeverity(slotProps.data.visibility)"
          />
        </template>
      </Column>
      <Column header="Ações">
        <template #body="slotProps">
          <Button
            icon="pi pi-pencil"
            class="mr-2"
            size="small"
            @click="emit('edit', slotProps.data)"
          />
          <Button
            icon="pi pi-trash"
            class="p-button-danger"
            size="small"
            @click="requireRemoveConfirm(slotProps.data.id)"
          />
        </template>
      </Column>
      <template #footer>
        {{ categoryStore.categories ? categoryStore.categories.length : 0 }} categorias no
        total.</template
      >
    </DataTable>
    <ConfirmDialog group="headless">
      <template #container="{ message, acceptCallback, rejectCallback }">
        <div class="bg-surface-0 dark:bg-surface-900 flex flex-col items-center rounded p-8">
          <div
            class="text-primary-contrast -mt-20 inline-flex h-24 w-24 items-center justify-center rounded-full bg-red-500"
          >
            <i class="pi pi-question text-5xl"></i>
          </div>
          <span class="mb-2 mt-6 block text-2xl font-bold">{{ message.header }}</span>
          <p class="mb-0">{{ message.message }}</p>
          <div class="mt-6 flex items-center gap-2">
            <Button label="Cancelar" outlined @click="rejectCallback"></Button>
            <Button severity="danger" label="Remover" @click="acceptCallback"></Button>
          </div>
        </div>
      </template>
    </ConfirmDialog>
  </div>
</template>

<style scoped></style>
