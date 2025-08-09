"use client";

import { useState } from "react";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Settings,
  Bot,
  Database,
  Bell,
  Shield,
  Download,
  Upload,
  Trash2,
  Save,
  RefreshCw,
} from "lucide-react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    // 챗봇 설정
    botName: "온보딩 도우미",
    defaultResponse:
      "죄송합니다. 해당 질문에 대한 답변을 찾을 수 없습니다. 관리자에게 문의해주세요.",
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
  });

  const handleSave = () => {
    // 설정 저장 로직
    console.log("Settings saved:", settings);
  };

  const handleReset = () => {
    // 설정 초기화 로직
    console.log("Settings reset");
  };

  const handleExport = () => {
    // 설정 내보내기 로직
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "chatbot-settings.json";
    link.click();
  };

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
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="bot" className="flex items-center space-x-2">
              <Bot className="h-4 w-4" />
              <span>챗봇</span>
            </TabsTrigger>
            <TabsTrigger value="api" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>API</span>
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
                      className="mt-2"
                      id="botName"
                      value={settings.botName}
                      onChange={(e) =>
                        setSettings({ ...settings, botName: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="responseDelay">응답 지연 시간 (ms)</Label>
                    <Input
                      className="mt-2"
                      id="responseDelay"
                      type="number"
                      value={settings.responseDelay}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          responseDelay: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="defaultResponse">기본 응답 메시지</Label>
                  <Textarea
                    className="mt-2"
                    id="defaultResponse"
                    value={settings.defaultResponse}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        defaultResponse: e.target.value,
                      })
                    }
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="maxResponseLength">
                    최대 응답 길이 (글자)
                  </Label>
                  <Input
                    className="mt-2"
                    id="maxResponseLength"
                    type="number"
                    value={settings.maxResponseLength}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        maxResponseLength: e.target.value,
                      })
                    }
                  />
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
                      className="mt-2"
                      id="openaiApiKey"
                      type="password"
                      value={settings.openaiApiKey}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          openaiApiKey: e.target.value,
                        })
                      }
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
                      className="mt-2"
                      id="slackBotToken"
                      type="password"
                      value={settings.slackBotToken}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          slackBotToken: e.target.value,
                        })
                      }
                    />
                    <Button variant="outline" size="sm">
                      테스트
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="webhookUrl">웹훅 URL</Label>
                  <Input
                    className="mt-2"
                    id="webhookUrl"
                    value={settings.webhookUrl}
                    onChange={(e) =>
                      setSettings({ ...settings, webhookUrl: e.target.value })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
