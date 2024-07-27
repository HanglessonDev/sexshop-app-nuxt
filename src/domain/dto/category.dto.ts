export interface CreateCategoryDTO {
  name: string
  slug: string
  description: string
  imageUrl: string | null
  parentId: string | null
  isActive: boolean
  visibility: boolean
  sortOrder: number
  metaTitle: string
  metaDescription: string
  createdBy: string
}

export interface UpdateCategoryDTO {
  name: string
  slug: string
  description: string
  imageUrl: string
  parentId: string
  isActive: boolean
  visibility: boolean
  sortOrder: number
  metaTitle: string
  metaDescription: string
  updatedBy: string
}

export interface CategoryDTO {
  id: number
  name: string
  slug: string
  description: string
  imageUrl: string
  parentId: string
  isActive: boolean
  visibility: boolean
  sortOrder: number
  metaTitle: string
  metaDescription: string
  createdAt: Date
  updatedAt: Date
  createdBy: string
  updatedBy: string
}
