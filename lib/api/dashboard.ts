import type { ApiResponse } from "../types/common"
import type { DashboardData } from "../types/dashboard"
import { mockDashboardData } from "../mock-data/dashboard"

export class DashboardService {
  static async getDashboardData(): Promise<ApiResponse<DashboardData>> {
    // 실제 API 호출 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 500))

    return {
      success: true,
      data: mockDashboardData,
      message: "대시보드 데이터를 성공적으로 가져왔습니다.",
    }
  }

  static async registerChannel(channelData: {
    name: string
    type: string
    description: string
    webhookUrl: string
    isActive: boolean
  }): Promise<ApiResponse<{ id: string }>> {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
      success: true,
      data: { id: Date.now().toString() },
      message: "채널이 성공적으로 등록되었습니다.",
    }
  }

  static async updateChannelStatus(channelId: string, isActive: boolean): Promise<ApiResponse<void>> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    return {
      success: true,
      data: undefined,
      message: `채널이 ${isActive ? "활성화" : "비활성화"}되었습니다.`,
    }
  }

  static async deleteChannel(channelId: string): Promise<ApiResponse<void>> {
    await new Promise((resolve) => setTimeout(resolve, 500))

    return {
      success: true,
      data: undefined,
      message: "채널이 삭제되었습니다.",
    }
  }
}
