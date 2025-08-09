import type { BaseEntity } from "./common"

export interface Document extends BaseEntity {
  name: string
  originalName: string
  type: "markdown" | "pdf" | "text" | "docx"
  categoryId: string
  categoryName: string
  size: number
  sizeFormatted: string
  status: "processed" | "processing" | "error" | "pending"
  uploadedBy: string
  uploadedById: string
  filePath: string
  downloadUrl?: string
  content?: string
  extractedText?: string
  metadata?: DocumentMetadata
  tags: string[]
  isPublic: boolean
  downloadCount: number
}

export interface DocumentMetadata {
  pageCount?: number
  wordCount?: number
  language?: string
  encoding?: string
  author?: string
  title?: string
  subject?: string
}

export interface DocumentStats {
  totalDocuments: number
  processedDocuments: number
  processingDocuments: number
  errorDocuments: number
  totalSize: number
  totalSizeFormatted: string
}

export interface DocumentFilter {
  search?: string
  categoryId?: string
  type?: string
  status?: string
  uploadedBy?: string
  dateFrom?: string
  dateTo?: string
  tags?: string[]
}
