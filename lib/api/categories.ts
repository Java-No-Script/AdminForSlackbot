import type { ApiResponse } from "../types/common"
import type { Category, CategoryStats } from "../types/categories"
import { mockCategories, mockCategoryStats } from "../mock-data/categories"

export class CategoryService {
  static async getCategories(): Promise<ApiResponse<Category[]>> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    return {
      success: true,
      data: mockCategories,
    }
  }

  static async getCategoryStats(): Promise<ApiResponse<CategoryStats>> {
    await new Promise((resolve) => setTimeout(resolve, 200))

    return {
      success: true,
      data: mockCategoryStats,
    }
  }

  static async createCategory(
    categoryData: Omit<Category, "id" | "createdAt" | "updatedAt">,
  ): Promise<ApiResponse<Category>> {
    await new Promise((resolve) => setTimeout(resolve, 600))

    const newCategory: Category = {
      ...categoryData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    return {
      success: true,
      data: newCategory,
      message: "카테고리가 생성되었습니다.",
    }
  }

  static async updateCategory(categoryId: string, updates: Partial<Category>): Promise<ApiResponse<Category>> {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const category = mockCategories.find((c) => c.id === categoryId)
    if (!category) {
      return {
        success: false,
        data: {} as Category,
        error: "카테고리를 찾을 수 없습니다.",
      }
    }

    return {
      success: true,
      data: { ...category, ...updates, updatedAt: new Date().toISOString() },
      message: "카테고리가 업데이트되었습니다.",
    }
  }

  static async deleteCategory(categoryId: string): Promise<ApiResponse<void>> {
    await new Promise((resolve) => setTimeout(resolve, 400))

    return {
      success: true,
      data: undefined,
      message: "카테고리가 삭제되었습니다.",
    }
  }
}
