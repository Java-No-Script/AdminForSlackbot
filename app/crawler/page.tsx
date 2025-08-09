"use client"

import { useState } from "react"
import { Layout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Play, Pause, Settings, Globe } from "lucide-react"

export default function CrawlerPage() {
  const [isRunning, setIsRunning] = useState(false)
  const [progress, setProgress] = useState(0)

  const crawlJobs = [
    {
      id: "1",
      name: "회사 위키 페이지",
      url: "https://wiki.company.com",
      status: "completed",
      lastRun: "2025-01-09 10:30",
      pagesCollected: 45,
    },
    {
      id: "2",
      name: "개발 문서 사이트",
      url: "https://docs.company.com",
      status: "running",
      lastRun: "2025-01-09 14:00",
      pagesCollected: 23,
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">완료</Badge>
      case "running":
        return <Badge className="bg-blue-100 text-blue-800">실행중</Badge>
      case "error":
        return <Badge className="bg-red-100 text-red-800">오류</Badge>
      default:
        return <Badge variant="secondary">대기</Badge>
    }
  }

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">데이터 수집</h1>
          <p className="text-gray-600">웹페이지를 순회하며 자동으로 데이터를 수집합니다</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>새 수집 작업 설정</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="jobName">작업 이름</Label>
                <Input id="jobName" placeholder="예: 회사 위키 수집" />
              </div>
              <div>
                <Label htmlFor="startUrl">시작 URL</Label>
                <Input id="startUrl" placeholder="https://example.com" />
              </div>
              <div>
                <Label htmlFor="urlPatterns">URL 패턴 (선택사항)</Label>
                <Textarea id="urlPatterns" placeholder="수집할 페이지의 URL 패턴을 한 줄씩 입력하세요" rows={3} />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="followLinks" />
                <Label htmlFor="followLinks">링크 자동 추적</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="respectRobots" defaultChecked />
                <Label htmlFor="respectRobots">robots.txt 준수</Label>
              </div>
              <Button className="w-full">
                <Play className="h-4 w-4 mr-2" />
                수집 시작
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>실시간 진행 상황</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">현재 작업</span>
                <Badge className="bg-blue-100 text-blue-800">개발 문서 사이트</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>진행률</span>
                  <span>23/50 페이지</span>
                </div>
                <Progress value={46} className="w-full" />
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>수집된 페이지:</span>
                  <span>23개</span>
                </div>
                <div className="flex justify-between">
                  <span>처리된 데이터:</span>
                  <span>1.2 MB</span>
                </div>
                <div className="flex justify-between">
                  <span>예상 완료 시간:</span>
                  <span>15분</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Pause className="h-4 w-4 mr-2" />
                  일시정지
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  설정
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>수집 작업 목록</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {crawlJobs.map((job) => (
                <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Globe className="h-8 w-8 text-gray-400" />
                    <div>
                      <h3 className="font-medium">{job.name}</h3>
                      <p className="text-sm text-gray-600">{job.url}</p>
                      <p className="text-xs text-gray-500">
                        마지막 실행: {job.lastRun} | 수집된 페이지: {job.pagesCollected}개
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {getStatusBadge(job.status)}
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Play className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
