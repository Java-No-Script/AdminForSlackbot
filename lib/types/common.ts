// 공통 API 응답 타입
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  message?: string
}

// 공통 엔티티 타입
export interface BaseEntity {
  id: string
  createdAt: string
  updatedAt: string
}

// 필터 및 정렬 타입
export interface FilterOptions {
  search?: string
  category?: string
  status?: string
  dateFrom?: string
  dateTo?: string
}

export interface SortOptions {
  field: string
  direction: "asc" | "desc"
}

export interface PaginationOptions {
  page: number
  limit: number
}
