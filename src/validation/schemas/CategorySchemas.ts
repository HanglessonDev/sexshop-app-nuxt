import { z } from 'zod'

export const nameSchema = z
  .string()
  .min(3, 'O Nome deve ter pelo menos 3 caracteres')
  .max(100, 'O Nome deve ter no maúximo 100 caracteres')
export const slugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug inválido')
export const descriptionSchema = z
  .string()
  .min(3, 'A Descrição deve ter pelo menos 3 caracteres')
  .max(255, 'A Descrição deve ter no maúximo 255 caracteres')
export const isActive = z.boolean().optional()
export const visibility = z.boolean().optional()
export const createdBy = z.string().uuid('Id do Usuário inválido')

export const CreateCategorySchema = z.object({
  name: nameSchema,
  slug: slugSchema,
  description: descriptionSchema,
  isActive: isActive.optional(),
  visibility: visibility.optional(),
  createdBy: createdBy,
})

export const UpdateCategorySchema = z.object({
  name: nameSchema.optional(),
  slug: slugSchema.optional(),
  description: descriptionSchema.optional(),
  isActive: isActive.optional(),
  visibility: visibility.optional(),
  updatedBy: createdBy,
})
