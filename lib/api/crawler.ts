import type { ApiResponse } from "../types/common"
import type { CrawlJob, CrawlStats, CrawlResult } from "../types/crawler"
import { mockCrawlJobs, mockCrawlStats, mockCrawlResults } from "../mock-data/crawler"

export class CrawlerService {
  static async getCrawlJobs(): Promise<ApiResponse<CrawlJob[]>> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    return {
      success: true,
      data: mockCrawlJobs,
    }
  }

  static async getCrawlStats(): Promise<ApiResponse<CrawlStats>> {
    await new Promise((resolve) => setTimeout(resolve, 200))

    return {
      success: true,
      data: mockCrawlStats,
    }
  }

  static async createCrawlJob(
    jobData: Omit<CrawlJob, "id" | "createdAt" | "updatedAt" | "status" | "progress" | "pagesCollected" | "errorCount">,
  ): Promise<ApiResponse<CrawlJob>> {
    await new Promise((resolve) => setTimeout(resolve, 800))

    const newJob: CrawlJob = {
      ...jobData,
      id: Date.now().toString(),
      status: "pending",
      progress: 0,
      pagesCollected: 0,
      errorCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    return {
      success: true,
      data: newJob,
      message: "크롤링 작업이 생성되었습니다.",
    }
  }

  static async startCrawlJob(jobId: string): Promise<ApiResponse<void>> {
    await new Promise((resolve) => setTimeout(resolve, 500))

    return {
      success: true,
      data: undefined,
      message: "크롤링 작업이 시작되었습니다.",
    }
  }

  static async pauseCrawlJob(jobId: string): Promise<ApiResponse<void>> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    return {
      success: true,
      data: undefined,
      message: "크롤링 작업이 일시정지되었습니다.",
    }
  }

  static async deleteCrawlJob(jobId: string): Promise<ApiResponse<void>> {
    await new Promise((resolve) => setTimeout(resolve, 400))

    return {
      success: true,
      data: undefined,
      message: "크롤링 작업이 삭제되었습니다.",
    }
  }

  static async getCrawlResults(jobId: string): Promise<ApiResponse<CrawlResult[]>> {
    await new Promise((resolve) => setTimeout(resolve, 400))

    const results = mockCrawlResults.filter((result) => result.jobId === jobId)

    return {
      success: true,
      data: results,
    }
  }
}
