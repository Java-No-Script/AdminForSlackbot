import type { ApiResponse, PaginatedResponse, PaginationOptions } from "../types/common"
import type { Document, DocumentStats, DocumentFilter } from "../types/documents"
import { mockDocuments, mockDocumentStats } from "../mock-data/documents"

export class DocumentService {
  static async getDocuments(
    pagination: PaginationOptions,
    filters?: DocumentFilter,
  ): Promise<PaginatedResponse<Document>> {
    await new Promise((resolve) => setTimeout(resolve, 400))

    let filteredDocuments = [...mockDocuments]

    // 필터 적용
    if (filters?.search) {
      filteredDocuments = filteredDocuments.filter((doc) =>
        doc.name.toLowerCase().includes(filters.search!.toLowerCase()),
      )
    }

    if (filters?.categoryId) {
      filteredDocuments = filteredDocuments.filter((doc) => doc.categoryId === filters.categoryId)
    }

    if (filters?.status) {
      filteredDocuments = filteredDocuments.filter((doc) => doc.status === filters.status)
    }

    // 페이지네이션 적용
    const startIndex = (pagination.page - 1) * pagination.limit
    const endIndex = startIndex + pagination.limit
    const paginatedDocuments = filteredDocuments.slice(startIndex, endIndex)

    return {
      success: true,
      data: paginatedDocuments,
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        total: filteredDocuments.length,
        totalPages: Math.ceil(filteredDocuments.length / pagination.limit),
      },
    }
  }

  static async getDocumentStats(): Promise<ApiResponse<DocumentStats>> {
    await new Promise((resolve) => setTimeout(resolve, 200))

    return {
      success: true,
      data: mockDocumentStats,
    }
  }

  static async uploadDocument(file: File, categoryId: string): Promise<ApiResponse<Document>> {
    await new Promise((resolve) => setTimeout(resolve, 2000)) // 업로드 시뮬레이션

    const newDocument: Document = {
      id: Date.now().toString(),
      name: file.name,
      originalName: file.name,
      type: file.name.endsWith(".pdf") ? "pdf" : file.name.endsWith(".md") ? "markdown" : "text",
      categoryId,
      categoryName: "개발", // 실제로는 categoryId로 조회
      size: file.size,
      sizeFormatted: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      status: "processing",
      uploadedBy: "현재 사용자",
      uploadedById: "current-user",
      filePath: `/uploads/${Date.now()}-${file.name}`,
      tags: [],
      isPublic: true,
      downloadCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    return {
      success: true,
      data: newDocument,
      message: "문서가 업로드되었습니다.",
    }
  }

  static async deleteDocument(documentId: string): Promise<ApiResponse<void>> {
    await new Promise((resolve) => setTimeout(resolve, 500))

    return {
      success: true,
      data: undefined,
      message: "문서가 삭제되었습니다.",
    }
  }

  static async downloadDocument(documentId: string): Promise<ApiResponse<{ url: string }>> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    return {
      success: true,
      data: { url: `/api/documents/${documentId}/download` },
    }
  }
}
