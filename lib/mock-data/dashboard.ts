import type { DashboardData, DashboardStats, RecentActivity, PopularQuestion, Channel } from "../types/dashboard"

export const mockDashboardStats: DashboardStats = {
  totalMessages: 1234,
  totalDocuments: 89,
  totalCategories: 12,
  monthlyQuestions: 456,
  messageGrowth: "+12%",
  documentGrowth: "+5%",
  categoryGrowth: "+2",
  questionGrowth: "+23%",
}

export const mockRecentActivities: RecentActivity[] = [
  {
    id: "1",
    type: "document_upload",
    title: "새로운 문서가 업로드되었습니다",
    description: "개발환경_설정_가이드.md",
    userId: "user1",
    userName: "김개발",
    createdAt: "2025-01-09T12:30:00Z",
    updatedAt: "2025-01-09T12:30:00Z",
  },
  {
    id: "2",
    type: "category_update",
    title: "카테고리가 수정되었습니다",
    description: "개발 카테고리 설명 업데이트",
    userId: "user2",
    userName: "이관리",
    createdAt: "2025-01-09T10:15:00Z",
    updatedAt: "2025-01-09T10:15:00Z",
  },
  {
    id: "3",
    type: "message_delete",
    title: "챗봇 메시지가 삭제되었습니다",
    description: "부적절한 응답 메시지 삭제",
    userId: "user1",
    userName: "김개발",
    createdAt: "2025-01-09T08:45:00Z",
    updatedAt: "2025-01-09T08:45:00Z",
  },
  {
    id: "4",
    type: "channel_register",
    title: "새 채널이 등록되었습니다",
    description: "onboarding-help 채널",
    userId: "user3",
    userName: "박신입",
    createdAt: "2025-01-09T07:20:00Z",
    updatedAt: "2025-01-09T07:20:00Z",
  },
]

export const mockPopularQuestions: PopularQuestion[] = [
  {
    id: "1",
    question: "개발 환경 설정 방법",
    count: 45,
    category: "개발",
    trend: "up",
  },
  {
    id: "2",
    question: "코드 리뷰 프로세스",
    count: 32,
    category: "프로세스",
    trend: "stable",
  },
  {
    id: "3",
    question: "배포 절차",
    count: 28,
    category: "개발",
    trend: "up",
  },
  {
    id: "4",
    question: "회사 규정",
    count: 21,
    category: "인사",
    trend: "down",
  },
]

export const mockChannels: Channel[] = [
  {
    id: "1",
    name: "general",
    type: "public",
    description: "일반적인 회사 공지사항",
    webhookUrl: "https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX",
    isActive: true,
    messageCount: 234,
    lastActivity: "2시간 전",
    members: 45,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-09T14:30:00Z",
  },
  {
    id: "2",
    name: "dev-team",
    type: "private",
    description: "개발팀 전용 채널",
    webhookUrl: "https://hooks.slack.com/services/T00000000/B00000001/YYYYYYYYYYYYYYYYYYYYYYYY",
    isActive: true,
    messageCount: 156,
    lastActivity: "30분 전",
    members: 12,
    createdAt: "2025-01-02T00:00:00Z",
    updatedAt: "2025-01-09T15:30:00Z",
  },
  {
    id: "3",
    name: "onboarding-help",
    type: "public",
    description: "신입사원 온보딩 도움",
    webhookUrl: "https://hooks.slack.com/services/T00000000/B00000002/ZZZZZZZZZZZZZZZZZZZZZZZZ",
    isActive: false,
    messageCount: 89,
    lastActivity: "1일 전",
    members: 23,
    createdAt: "2025-01-03T00:00:00Z",
    updatedAt: "2025-01-08T16:00:00Z",
  },
]

export const mockDashboardData: DashboardData = {
  stats: mockDashboardStats,
  recentActivities: mockRecentActivities,
  popularQuestions: mockPopularQuestions,
  channels: mockChannels,
}
