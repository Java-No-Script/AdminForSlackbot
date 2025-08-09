import type { ApiResponse, PaginatedResponse, FilterOptions, PaginationOptions } from "../types/common"
import type { ChatMessage, MessageStats } from "../types/messages"
import { mockMessages, mockMessageStats } from "../mock-data/messages"

export class MessageService {
  static async getMessages(
    pagination: PaginationOptions,
    filters?: FilterOptions,
  ): Promise<PaginatedResponse<ChatMessage>> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    let filteredMessages = [...mockMessages]

    // 필터 적용
    if (filters?.search) {
      filteredMessages = filteredMessages.filter((msg) =>
        msg.content.toLowerCase().includes(filters.search!.toLowerCase()),
      )
    }

    if (filters?.category) {
      filteredMessages = filteredMessages.filter((msg) => msg.category === filters.category)
    }

    // 페이지네이션 적용
    const startIndex = (pagination.page - 1) * pagination.limit
    const endIndex = startIndex + pagination.limit
    const paginatedMessages = filteredMessages.slice(startIndex, endIndex)

    return {
      success: true,
      data: paginatedMessages,
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        total: filteredMessages.length,
        totalPages: Math.ceil(filteredMessages.length / pagination.limit),
      },
    }
  }

  static async getMessageStats(): Promise<ApiResponse<MessageStats>> {
    await new Promise((resolve) => setTimeout(resolve, 200))

    return {
      success: true,
      data: mockMessageStats,
    }
  }

  static async updateMessage(messageId: string, updates: Partial<ChatMessage>): Promise<ApiResponse<ChatMessage>> {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const message = mockMessages.find((m) => m.id === messageId)
    if (!message) {
      return {
        success: false,
        data: {} as ChatMessage,
        error: "메시지를 찾을 수 없습니다.",
      }
    }

    return {
      success: true,
      data: { ...message, ...updates },
      message: "메시지가 업데이트되었습니다.",
    }
  }

  static async deleteMessage(messageId: string): Promise<ApiResponse<void>> {
    await new Promise((resolve) => setTimeout(resolve, 400))

    return {
      success: true,
      data: undefined,
      message: "메시지가 삭제되었습니다.",
    }
  }
}
