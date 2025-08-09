import type { BaseEntity } from "./common"

export interface CrawlJob extends BaseEntity {
  name: string
  startUrl: string
  urlPatterns: string[]
  status: "pending" | "running" | "completed" | "error" | "paused"
  followLinks: boolean
  respectRobots: boolean
  maxDepth: number
  maxPages: number
  delayMs: number
  lastRun?: string
  nextRun?: string
  pagesCollected: number
  totalPages?: number
  progress: number
  errorCount: number
  settings: CrawlSettings
}

export interface CrawlSettings {
  userAgent: string
  timeout: number
  retryCount: number
  excludePatterns: string[]
  includePatterns: string[]
  extractors: ContentExtractor[]
}

export interface ContentExtractor {
  name: string
  selector: string
  attribute?: string
  required: boolean
}

export interface CrawlResult extends BaseEntity {
  jobId: string
  url: string
  title: string
  content: string
  metadata: Record<string, any>
  status: "success" | "error"
  errorMessage?: string
  responseTime: number
  statusCode?: number
}

export interface CrawlStats {
  totalJobs: number
  runningJobs: number
  completedJobs: number
  errorJobs: number
  totalPages: number
  totalDataSize: number
}
