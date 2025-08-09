"use client";

import { useState } from "react";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertModal } from "@/components/modals/alert-modal";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { ChannelRegistrationModal } from "@/components/modals/channel-registration-modal";
import {
  MessageSquare,
  FileText,
  FolderOpen,
  TrendingUp,
  Plus,
  Hash,
  Users,
  Lock,
  Settings,
  Trash2,
} from "lucide-react";
import { useSlackControllerGetBotStats } from "@/lib/apis/chatbotAdminAPI";
import env from "@/constants/env";

interface Channel {
  id: string;
  name: string;
  type: "public" | "private" | "dm";
  description: string;
  isActive: boolean;
  messageCount: number;
  lastActivity: string;
}

export default function Dashboard() {
  const [channels, setChannels] = useState<Channel[]>([
    {
      id: "1",
      name: "general",
      type: "public",
      description: "일반적인 회사 공지사항",
      isActive: true,
      messageCount: 234,
      lastActivity: "2시간 전",
    },
    {
      id: "2",
      name: "dev-team",
      type: "private",
      description: "개발팀 전용 채널",
      isActive: true,
      messageCount: 156,
      lastActivity: "30분 전",
    },
    {
      id: "3",
      name: "onboarding-help",
      type: "public",
      description: "신입사원 온보딩 도움",
      isActive: false,
      messageCount: 89,
      lastActivity: "1일 전",
    },
  ]);

  // 모달 상태 관리
  const [alertModal, setAlertModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info" as "success" | "error" | "warning" | "info",
  });

  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
    variant: "default" as "default" | "destructive",
  });

  const [channelModal, setChannelModal] = useState(false);
  const { data: botStats } = useSlackControllerGetBotStats({
    channelId: env.NEXT_PUBLIC_API_CHANNEL_ID,
  });

  const stats = [
    {
      title: "총 메시지",
      value: "1,234",
      icon: MessageSquare,
      change: "+12%",
      changeType: "positive" as const,
    },
    {
      title: "문서 수",
      value: "89",
      icon: FileText,
      change: "+5%",
      changeType: "positive" as const,
    },
    {
      title: "카테고리",
      value: "12",
      icon: FolderOpen,
      change: "+2",
      changeType: "positive" as const,
    },
    {
      title: "이번 달 질문",
      value: "456",
      icon: TrendingUp,
      change: "+23%",
      changeType: "positive" as const,
    },
  ];

  const handleChannelRegistration = (channelData: any) => {
    const newChannel: Channel = {
      id: Date.now().toString(),
      name: channelData.name,
      type: channelData.type,
      description: channelData.description,
      isActive: channelData.isActive,
      messageCount: 0,
      lastActivity: "방금 전",
    };

    setChannels([...channels, newChannel]);
    setAlertModal({
      isOpen: true,
      title: "채널 등록 완료",
      message: `${channelData.name} 채널이 성공적으로 등록되었습니다.`,
      type: "success",
    });
  };

  const handleDeleteChannel = (channelId: string, channelName: string) => {
    setConfirmModal({
      isOpen: true,
      title: "채널 삭제",
      message: `정말로 "${channelName}" 채널을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`,
      variant: "destructive",
      onConfirm: () => {
        setChannels(channels.filter((channel) => channel.id !== channelId));
        setAlertModal({
          isOpen: true,
          title: "채널 삭제 완료",
          message: `${channelName} 채널이 삭제되었습니다.`,
          type: "success",
        });
      },
    });
  };

  const toggleChannelStatus = (channelId: string) => {
    const channel = channels.find((c) => c.id === channelId);
    if (!channel) return;

    const action = channel.isActive ? "비활성화" : "활성화";
    setConfirmModal({
      isOpen: true,
      title: `채널 ${action}`,
      message: `"${channel.name}" 채널을 ${action}하시겠습니까?`,
      variant: "default",
      onConfirm: () => {
        setChannels(
          channels.map((c) =>
            c.id === channelId ? { ...c, isActive: !c.isActive } : c
          )
        );
        setAlertModal({
          isOpen: true,
          title: `채널 ${action} 완료`,
          message: `${channel.name} 채널이 ${action}되었습니다.`,
          type: "success",
        });
      },
    });
  };

  const getChannelIcon = (type: string) => {
    switch (type) {
      case "private":
        return <Lock className="h-4 w-4" />;
      case "dm":
        return <Users className="h-4 w-4" />;
      default:
        return <Hash className="h-4 w-4" />;
    }
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">대시보드</h1>
          <p className="text-gray-600">온보딩 챗봇 관리 시스템</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-green-600 mt-1">
                  {stat.change} 지난 달 대비
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>최근 활동</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      새로운 문서가 업로드되었습니다
                    </p>
                    <p className="text-xs text-gray-500">2시간 전</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      카테고리가 수정되었습니다
                    </p>
                    <p className="text-xs text-gray-500">4시간 전</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      챗봇 메시지가 삭제되었습니다
                    </p>
                    <p className="text-xs text-gray-500">6시간 전</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>인기 질문</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">개발 환경 설정 방법</span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    45회
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">코드 리뷰 프로세스</span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    32회
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">배포 절차</span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    28회
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">회사 규정</span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    21회
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 채널 관리 섹션 */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>등록된 채널</CardTitle>
              <Button onClick={() => setChannelModal(true)}>
                <Plus className="h-4 w-4 mr-2" />
                채널 등록
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {channels.map((channel) => (
                <div
                  key={channel.id}
                  className="border rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getChannelIcon(channel.type)}
                      <span className="font-medium">{channel.name}</span>
                    </div>
                    <Badge variant={channel.isActive ? "default" : "secondary"}>
                      {channel.isActive ? "활성" : "비활성"}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{channel.description}</p>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{channel.messageCount}개 메시지</span>
                    <span>{channel.lastActivity}</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleChannelStatus(channel.id)}
                      className="flex-1"
                    >
                      <Settings className="h-3 w-3 mr-1" />
                      {channel.isActive ? "비활성화" : "활성화"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleDeleteChannel(channel.id, channel.name)
                      }
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 모달들 */}
        <AlertModal
          isOpen={alertModal.isOpen}
          onClose={() => setAlertModal({ ...alertModal, isOpen: false })}
          title={alertModal.title}
          message={alertModal.message}
          type={alertModal.type}
        />

        <ConfirmModal
          isOpen={confirmModal.isOpen}
          onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
          onConfirm={confirmModal.onConfirm}
          title={confirmModal.title}
          message={confirmModal.message}
          variant={confirmModal.variant}
        />

        <ChannelRegistrationModal
          isOpen={channelModal}
          onClose={() => setChannelModal(false)}
          onSubmit={handleChannelRegistration}
        />
      </div>
    </Layout>
  );
}
