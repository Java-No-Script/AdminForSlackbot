import type { BaseEntity } from "./common";

export interface DashboardStats {
  totalMessages: number;
  totalDocuments: number;
  totalCategories: number;
  monthlyQuestions: number;
  messageGrowth: string;
  documentGrowth: string;
  categoryGrowth: string;
  questionGrowth: string;
}

export interface RecentActivity extends BaseEntity {
  type:
    | "document_upload"
    | "category_update"
    | "message_delete"
    | "channel_register"
    | "system_error";
  title: string;
  description?: string;
  userId?: string;
  userName?: string;
}

export interface PopularQuestion {
  id: string;
  question: string;
  count: number;
  category: string;
  trend: "up" | "down" | "stable";
}

export interface Channel extends BaseEntity {
  name: string;
  type: "public" | "private" | "dm";
  description: string;
  webhookUrl: string;
  isActive: boolean;
  messageCount: number;
  lastActivity: string;
  members?: number;
}

export interface DashboardData {
  stats: DashboardStats;
}
