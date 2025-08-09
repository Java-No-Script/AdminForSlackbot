import type { BaseEntity } from "./common"

export interface Category extends BaseEntity {
  name: string
  description: string
  color: string
  documentCount: number
  messageCount: number
  isActive: boolean
  parentId?: string
  order: number
  keywords: string[]
}

export interface CategoryStats {
  totalCategories: number
  activeCategories: number
  totalDocuments: number
  totalMessages: number
}
