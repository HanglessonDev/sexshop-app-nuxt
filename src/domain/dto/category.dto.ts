export interface CreateCategoryDTO {
  name: string
  slug: string
  description: string
  isActive: boolean
  visibility: boolean
  createdBy: string
}

export interface UpdateCategoryDTO {
  name: string
  slug: string
  description: string
  isActive: boolean
  visibility: boolean
  updatedBy: string
}

export interface CategoryDTO {
  id: number
  name: string
  slug: string
  description: string
  isActive: boolean
  visibility: boolean
  createdAt: Date
  updatedAt: Date
  createdBy: string
  updatedBy: string
}
