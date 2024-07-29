<script setup lang="ts">
  import { useForm } from 'vee-validate'
  import { toTypedSchema } from '@vee-validate/zod'
  import { slugify } from '#imports'
  import { CreateCategorySchema } from '~/src/validation/schemas/CategorySchemas'
  import { useCategoryActions } from '~/composables/category/useCategoryActions'
  import type { CreateCategoryDTO } from '~/src/domain/dto/category.dto'

  const { user } = useAuth()
  const { save } = useCategoryActions()
  const toast = useToast()
  if (!user.value) throw new Error('User not found')

  const emit = defineEmits(['submit', 'cancel'])

  const defaultValues = {
    name: '',
    slug: '',
    description: '',
    isActive: true,
    visibility: true,
    createdBy: user.value.id,
  }

  const useValidation = () => {
    const { errors, defineField, handleSubmit, resetForm } = useForm({
      validationSchema: toTypedSchema(CreateCategorySchema),
      initialValues: defaultValues,
    })

    const defineFormField = (fieldName: MaybeRefOrGetter) => {
      const [field, attrs] = defineField(fieldName, {
        validateOnInput: false,
        validateOnBlur: true,
      })
      return { field, attrs }
    }

    const { field: name, attrs: nameAttrs } = defineFormField('name')
    const { field: slug, attrs: slugAttrs } = defineFormField('slug')
    const { field: description, attrs: descriptionAttrs } = defineFormField('description')
    const { field: isActive, attrs: isActiveAttrs } = defineFormField('isActive')
    const { field: visibility, attrs: visibilityAttrs } = defineFormField('visibility')

    watch(name, (newName) => {
      slug.value = slugify(newName as string)
    })

    return {
      errors,
      handleSubmit,
      resetForm,
      name,
      nameAttrs,
      slug,
      slugAttrs,
      description,
      descriptionAttrs,
      isActive,
      isActiveAttrs,
      visibility,
      visibilityAttrs,
    }
  }

  const {
    errors,
    handleSubmit,
    resetForm,
    name,
    nameAttrs,
    slug,
    slugAttrs,
    description,
    descriptionAttrs,
    isActive,
    isActiveAttrs,
    visibility,
    visibilityAttrs,
  } = useValidation()

  const submitForm = handleSubmit(async (values) => {
    try {
      await save(values as CreateCategoryDTO)
      emit('submit')
      resetForm()
      toast.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Cadastrado com sucesso',
        life: 3000,
      })
    } catch (err) {
      toast.add({
        severity: 'error',
        summary: 'Erro ao cadastrar categoria',
        detail: (err as Error).message,
        life: 3000,
      })
    }
  })
</script>

<template>
  <form class="flex flex-col gap-4" @submit.prevent="submitForm">
    <div class="input-field">
      <InputText v-model="name" v-bind="nameAttrs" size="small" placeholder="Nome da categoria" />
      <small class="text-red-500">{{ errors.name }}</small>
    </div>
    <div class="input-field">
      <InputText v-model="slug" v-bind="slugAttrs" size="small" placeholder="Slug da categoria" />
      <small class="text-red-500">{{ errors.slug }}</small>
    </div>
    <div class="input-field">
      <Textarea
        v-model="description"
        v-bind="descriptionAttrs"
        auto-resize
        rows="2"
        size="small"
        placeholder="Descrição da categoria"
      />
      <small class="text-red-500">{{ errors.description }}</small>
    </div>

    <div class="flex gap-4">
      <ToggleButton
        v-bind="isActiveAttrs"
        v-model="isActive"
        on-label="Ativo"
        off-label="Inativo"
        on-icon="pi pi-check"
        off-icon="pi pi-times"
        class="toggle-button"
      />
      <ToggleButton
        v-model="visibility"
        v-bind="visibilityAttrs"
        on-label="Visível"
        off-label="Invisivel"
        on-icon="pi pi-eye"
        off-icon="pi pi-eye-slash"
        class="toggle-button"
      />
    </div>

    <div class="mt-4 flex gap-4">
      <Button
        outlined
        size="small"
        type="button"
        label="Cancelar"
        icon="pi pi-times"
        class="p-button-danger w-full"
        @click="emit('cancel')"
      />
      <Button
        size="small"
        type="submit"
        label="Cadastrar"
        icon="pi pi-check"
        class="p-button-success w-full"
      />
    </div>
  </form>
</template>

<style scoped>
  .input-field {
    @apply flex flex-col gap-1;
  }
  .toggle-button {
    @apply h-[35px] w-full;
  }
</style>
