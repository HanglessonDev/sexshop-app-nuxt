export interface Category {
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
