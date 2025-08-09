import type { BaseEntity } from "./common"

export interface ChatMessage extends BaseEntity {
  content: string
  user: string
  userId: string
  channelId: string
  channelName: string
  category: string
  status: "active" | "archived" | "deleted"
  botResponse?: string
  responseTime?: number
  sentiment?: "positive" | "negative" | "neutral"
  tags?: string[]
  isResolved: boolean
}

export interface MessageStats {
  totalMessages: number
  activeMessages: number
  archivedMessages: number
  averageResponseTime: number
  satisfactionRate: number
}

export interface MessageFilter {
  search?: string
  category?: string
  status?: "active" | "archived" | "deleted"
  channelId?: string
  userId?: string
  dateFrom?: string
  dateTo?: string
  sentiment?: "positive" | "negative" | "neutral"
}
