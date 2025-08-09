"use client"

import { useState } from "react"
import { Layout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Settings, Bot, Database, Bell, Shield, Download, Upload, Trash2, Save, RefreshCw } from "lucide-react"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    // 챗봇 설정
    botName: "온보딩 도우미",
    defaultResponse: "죄송합니다. 해당 질문에 대한 답변을 찾을 수 없습니다. 관리자에게 문의해주세요.",
    responseDelay: "1000",
    maxResponseLength: "2000",
    enableTypingIndicator: true,
    enableAutoResponse: true,

    // 알림 설정
    emailNotifications: true,
    slackNotifications: true,
    newMessageAlert: true,
    errorAlert: true,
    dailyReport: false,

    // 시스템 설정
    logLevel: "info",
    maxLogSize: "100",
    backupFrequency: "daily",
    dataRetention: "90",

    // API 설정
    openaiApiKey: "sk-...",
    slackBotToken: "xoxb-...",
    webhookUrl: "https://hooks.slack.com/...",
  })

  const handleSave = () => {
    // 설정 저장 로직
    console.log("Settings saved:", settings)
  }

  const handleReset = () => {
    // 설정 초기화 로직
    console.log("Settings reset")
  }

  const handleExport = () => {
    // 설정 내보내기 로직
    const dataStr = JSON.stringify(settings, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = "chatbot-settings.json"
    link.click()
  }

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">설정</h1>
              <p className="text-gray-600">시스템 및 챗봇 설정을 관리합니다</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                설정 내보내기
              </Button>
              <Button variant="outline" onClick={handleReset}>
                <RefreshCw className="h-4 w-4 mr-2" />
                초기화
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                저장
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="bot" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="bot" className="flex items-center space-x-2">
              <Bot className="h-4 w-4" />
              <span>챗봇</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2">
              <Bell className="h-4 w-4" />
              <span>알림</span>
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>시스템</span>
            </TabsTrigger>
            <TabsTrigger value="api" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>API</span>
            </TabsTrigger>
            <TabsTrigger value="backup" className="flex items-center space-x-2">
              <Database className="h-4 w-4" />
              <span>백업</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bot" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>챗봇 기본 설정</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="botName">챗봇 이름</Label>
                    <Input
                      id="botName"
                      value={settings.botName}
                      onChange={(e) => setSettings({ ...settings, botName: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="responseDelay">응답 지연 시간 (ms)</Label>
                    <Input
                      id="responseDelay"
                      type="number"
                      value={settings.responseDelay}
                      onChange={(e) => setSettings({ ...settings, responseDelay: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="defaultResponse">기본 응답 메시지</Label>
                  <Textarea
                    id="defaultResponse"
                    value={settings.defaultResponse}
                    onChange={(e) => setSettings({ ...settings, defaultResponse: e.target.value })}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="maxResponseLength">최대 응답 길이 (글자)</Label>
                  <Input
                    id="maxResponseLength"
                    type="number"
                    value={settings.maxResponseLength}
                    onChange={(e) => setSettings({ ...settings, maxResponseLength: e.target.value })}
                  />
                </div>
                <Separator />
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>타이핑 표시기 활성화</Label>
                      <p className="text-sm text-gray-600">챗봇이 응답을 준비 중일 때 타이핑 표시</p>
                    </div>
                    <Switch
                      checked={settings.enableTypingIndicator}
                      onCheckedChange={(checked) => setSettings({ ...settings, enableTypingIndicator: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>자동 응답 활성화</Label>
                      <p className="text-sm text-gray-600">메시지 수신 시 자동으로 응답</p>
                    </div>
                    <Switch
                      checked={settings.enableAutoResponse}
                      onCheckedChange={(checked) => setSettings({ ...settings, enableAutoResponse: checked })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>알림 설정</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>이메일 알림</Label>
                      <p className="text-sm text-gray-600">중요한 이벤트를 이메일로 알림</p>
                    </div>
                    <Switch
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>슬랙 알림</Label>
                      <p className="text-sm text-gray-600">슬랙 채널로 알림 전송</p>
                    </div>
                    <Switch
                      checked={settings.slackNotifications}
                      onCheckedChange={(checked) => setSettings({ ...settings, slackNotifications: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>새 메시지 알림</Label>
                      <p className="text-sm text-gray-600">새로운 사용자 메시지 수신 시 알림</p>
                    </div>
                    <Switch
                      checked={settings.newMessageAlert}
                      onCheckedChange={(checked) => setSettings({ ...settings, newMessageAlert: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>오류 알림</Label>
                      <p className="text-sm text-gray-600">시스템 오류 발생 시 즉시 알림</p>
                    </div>
                    <Switch
                      checked={settings.errorAlert}
                      onCheckedChange={(checked) => setSettings({ ...settings, errorAlert: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>일일 리포트</Label>
                      <p className="text-sm text-gray-600">매일 사용 통계 리포트 전송</p>
                    </div>
                    <Switch
                      checked={settings.dailyReport}
                      onCheckedChange={(checked) => setSettings({ ...settings, dailyReport: checked })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>시스템 설정</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="logLevel">로그 레벨</Label>
                    <Select
                      value={settings.logLevel}
                      onValueChange={(value) => setSettings({ ...settings, logLevel: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="debug">Debug</SelectItem>
                        <SelectItem value="info">Info</SelectItem>
                        <SelectItem value="warn">Warning</SelectItem>
                        <SelectItem value="error">Error</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="maxLogSize">최대 로그 크기 (MB)</Label>
                    <Input
                      id="maxLogSize"
                      type="number"
                      value={settings.maxLogSize}
                      onChange={(e) => setSettings({ ...settings, maxLogSize: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="backupFrequency">백업 주기</Label>
                    <Select
                      value={settings.backupFrequency}
                      onValueChange={(value) => setSettings({ ...settings, backupFrequency: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">매시간</SelectItem>
                        <SelectItem value="daily">매일</SelectItem>
                        <SelectItem value="weekly">매주</SelectItem>
                        <SelectItem value="monthly">매월</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="dataRetention">데이터 보관 기간 (일)</Label>
                    <Input
                      id="dataRetention"
                      type="number"
                      value={settings.dataRetention}
                      onChange={(e) => setSettings({ ...settings, dataRetention: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>시스템 상태</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">정상</div>
                    <div className="text-sm text-gray-600">데이터베이스</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">연결됨</div>
                    <div className="text-sm text-gray-600">슬랙 API</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">제한됨</div>
                    <div className="text-sm text-gray-600">OpenAI API</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">85%</div>
                    <div className="text-sm text-gray-600">디스크 사용량</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="api" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>API 키 관리</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="openaiApiKey">OpenAI API 키</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="openaiApiKey"
                      type="password"
                      value={settings.openaiApiKey}
                      onChange={(e) => setSettings({ ...settings, openaiApiKey: e.target.value })}
                    />
                    <Button variant="outline" size="sm">
                      테스트
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="slackBotToken">슬랙 봇 토큰</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="slackBotToken"
                      type="password"
                      value={settings.slackBotToken}
                      onChange={(e) => setSettings({ ...settings, slackBotToken: e.target.value })}
                    />
                    <Button variant="outline" size="sm">
                      테스트
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="webhookUrl">웹훅 URL</Label>
                  <Input
                    id="webhookUrl"
                    value={settings.webhookUrl}
                    onChange={(e) => setSettings({ ...settings, webhookUrl: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>API 사용량</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>OpenAI API 호출</span>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">1,234 / 10,000</Badge>
                      <span className="text-sm text-gray-600">이번 달</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>슬랙 API 호출</span>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">567 / 무제한</Badge>
                      <span className="text-sm text-gray-600">이번 달</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="backup" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>백업 및 복원</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <h3 className="font-medium">데이터 백업</h3>
                    <Button className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      전체 데이터 백업
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      설정만 백업
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-medium">데이터 복원</h3>
                    <div>
                      <Input type="file" accept=".json,.zip" />
                    </div>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Upload className="h-4 w-4 mr-2" />
                      백업 파일 복원
                    </Button>
                  </div>
                </div>
                <Separator />
                <div>
                  <h3 className="font-medium mb-4">최근 백업</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 border rounded">
                      <div>
                        <div className="font-medium">전체 백업</div>
                        <div className="text-sm text-gray-600">2025-01-09 14:30</div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded">
                      <div>
                        <div className="font-medium">설정 백업</div>
                        <div className="text-sm text-gray-600">2025-01-09 12:00</div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}
