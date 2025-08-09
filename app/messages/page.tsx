"use client";

import { Layout } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

import {
  getSlackControllerGetBotMessagesQueryKey,
  useSlackControllerDeleteMessageByParams,
  useSlackControllerGetBotMessages,
  useSlackControllerUpdateMessage
} from "@/lib/apis/chatbotAdminAPI";
import type { BotMessagesResponse } from "@/lib/apis/model";
import { useQueryClient } from "@tanstack/react-query";
import { Check, Edit, ExternalLink, Search, Trash2, X } from "lucide-react";
import React, { useMemo, useState, useEffect } from "react";
import { toast } from "sonner";

interface SlackMessage {
  ts: string;
  text: string;
  channel: string;
  user: string;
  type: string;
  subtype?: string;
  bot_id?: string;
  app_id?: string;
  permalink: string;
  created_at: string;
  blocks?: any[];
}

const MESSAGES_PER_PAGE = 10;

export default function MessagesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingMessage, setEditingMessage] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  
  const queryClient = useQueryClient();
  const queryParams = { channelId: "C099M8GTU4S" };
  const queryKey = getSlackControllerGetBotMessagesQueryKey(queryParams);

  // API로 슬랙 메시지 가져오기
  const {
    data: messagesResponse,
    isLoading,
    error,
    refetch,
  } = useSlackControllerGetBotMessages(queryParams);

  // 메시지 업데이트 API
  const updateMessageMutation = useSlackControllerUpdateMessage({
    mutation: {
      onMutate: async (variables) => {
        // 진행 중인 refetch 취소
        await queryClient.cancelQueries({ queryKey });

        // 이전 데이터 백업
        const previousData = queryClient.getQueryData(queryKey);

        // Optimistic update
        queryClient.setQueryData(queryKey, (old: any) => {
          if (!old?.data?.messages) return old;
          
          const oldData = old.data as BotMessagesResponse;
          const updatedMessages = oldData.messages.map((msg: any) => 
            msg.ts === variables.data.timestamp 
              ? { ...msg, text: variables.data.text }
              : msg
          );
          
          return {
            ...old,
            data: {
              ...oldData,
              messages: updatedMessages
            }
          };
        });

        return { previousData };
      },
      onSuccess: () => {
        setEditingMessage(null);
        setEditText("");
        // 서버에서 최신 데이터를 가져와 캐시 업데이트
        queryClient.invalidateQueries({ queryKey });
      },
      onError: (error, variables, context) => {
        // 에러 발생 시 이전 데이터로 롤백
        if (context?.previousData) {
          queryClient.setQueryData(queryKey, context.previousData);
        }
        console.error("메시지 업데이트 실패:", error);
      },
    },
  });

  // 메시지 삭제 API
  const deleteMessageMutation = useSlackControllerDeleteMessageByParams({
    mutation: {
      onMutate: async (variables) => {
        // 진행 중인 refetch 취소
        await queryClient.cancelQueries({ queryKey });

        // 이전 데이터 백업
        const previousData = queryClient.getQueryData(queryKey);

        // Optimistic update - 메시지 삭제
        queryClient.setQueryData(queryKey, (old: any) => {
          if (!old?.data?.messages) return old;
          
          const oldData = old.data as BotMessagesResponse;
          const filteredMessages = oldData.messages.filter(
            (msg: any) => msg.ts !== variables.timestamp
          );
          
          return {
            ...old,
            data: {
              ...oldData,
              messages: filteredMessages,
              stats: {
                ...oldData.stats,
                totalMessages: Math.max(0, ((oldData.stats as any)?.totalMessages || 0) - 1)
              }
            }
          };
        });

        return { previousData };
      },
      onSuccess: () => {
        // 서버에서 최신 데이터를 가져와 캐시 업데이트
        queryClient.invalidateQueries({ queryKey });
      },
      onError: (error, variables, context) => {
        // 에러 발생 시 이전 데이터로 롤백
        if (context?.previousData) {
          queryClient.setQueryData(queryKey, context.previousData);
        }
        console.error("메시지 삭제 실패:", error);
      },
    },
  });

  
  const apiResponse = messagesResponse?.data as BotMessagesResponse | undefined;
  const messages: SlackMessage[] = (apiResponse?.messages || []) as unknown as SlackMessage[];

  // 테스트용 토스트 - 페이지 로드 시 토스트가 작동하는지 확인
  useEffect(() => {
    console.log("Messages page loaded, testing toast...");
  }, []);

  // 검색 필터링
  const filteredMessages = useMemo(() => {
    if (!searchTerm) return messages;

    return messages.filter(
      (message: SlackMessage) =>
        (message.text || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (message.user || "").toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [messages, searchTerm]);

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredMessages.length / MESSAGES_PER_PAGE);
  const startIndex = (currentPage - 1) * MESSAGES_PER_PAGE;
  const endIndex = startIndex + MESSAGES_PER_PAGE;
  const currentMessages = filteredMessages.slice(startIndex, endIndex);

  // 현재 페이지에 메시지가 없고 이전 페이지가 있는 경우 이전 페이지로 이동
  React.useEffect(() => {
    if (currentMessages.length === 0 && currentPage > 1 && totalPages > 0) {
      setCurrentPage(Math.min(currentPage - 1, totalPages));
    }
  }, [currentMessages.length, currentPage, totalPages]);

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 메시지 타입 분류 함수
  const getMessageType = (message: SlackMessage) => {
    if (message.subtype === "bot_add") return "봇 추가";
    if (message.subtype === "bot_remove") return "봇 제거";
    if (message.subtype === "channel_join") return "채널 입장";
    if (message.bot_id) return "봇 메시지";
    return "일반 메시지";
  };

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // 편집 시작 핸들러
  const handleEditStart = (message: SlackMessage) => {
    setEditingMessage(message.ts);
    setEditText(message.text);
  };

  // 편집 취소 핸들러
  const handleEditCancel = () => {
    setEditingMessage(null);
    setEditText("");
  };

  // 편집 저장 핸들러
  const handleEditSave = (message: SlackMessage) => {
    if (editText.trim() === "") {
      toast.error("메시지 내용을 입력해주세요.");
      return;
    }

    updateMessageMutation.mutate({
      data: {
        channelId: message.channel,
        timestamp: message.ts,
        text: editText.trim(),
      },
    });
  };

  // 메시지 삭제 핸들러
  const handleDelete = (message: SlackMessage) => {
    if (confirm("정말로 이 메시지를 삭제하시겠습니까?")) {
      toast.info("메시지를 삭제하는 중...");
      deleteMessageMutation.mutate({
        channelId: message.channel,
        timestamp: message.ts,
      });
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">챗봇 메시지 관리</h1>
            <p className="text-gray-600">
              슬랙 챗봇이 주고받은 메시지를 관리합니다
            </p>
          </div>
          <Card>
            <CardContent className="p-8">
              <div className="flex justify-center items-center">
                <div className="text-lg">메시지를 불러오는 중...</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">챗봇 메시지 관리</h1>
            <p className="text-gray-600">
              슬랙 챗봇이 주고받은 메시지를 관리합니다
            </p>
          </div>
          <Card>
            <CardContent className="p-8">
              <div className="flex flex-col justify-center items-center space-y-4">
                <div className="text-lg text-red-600">
                  메시지를 불러오는 중 오류가 발생했습니다.
                </div>
                <Button 
                  onClick={() => queryClient.invalidateQueries({ queryKey })} 
                  variant="outline"
                >
                  다시 시도
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">챗봇 메시지 관리</h1>
          <p className="text-gray-600">
            슬랙 챗봇이 주고받은 메시지를 관리합니다
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>
                메시지 목록 ({filteredMessages.length}개)
              </CardTitle>
              <div className="flex space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="메시지 검색..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1); // 검색 시 첫 페이지로 이동
                    }}
                    className="pl-10 w-64"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>내용</TableHead>
                  <TableHead>사용자</TableHead>
                  <TableHead>유형</TableHead>
                  <TableHead>시간</TableHead>
                  <TableHead>작업</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentMessages.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      {searchTerm
                        ? "검색 결과가 없습니다."
                        : "메시지가 없습니다."}
                    </TableCell>
                  </TableRow>
                ) : (
                  currentMessages.map((message: SlackMessage) => {
                    const isEditing = editingMessage === message.ts;
                    const canEdit = !message.bot_id || message.user === "U099G5CQAQK"; // 봇 메시지는 특정 사용자만 편집 가능

                    return (
                      <TableRow key={message.ts}>
                        <TableCell className="max-w-md">
                          {isEditing ? (
                            <div className="space-y-2">
                              <Textarea
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                className="min-h-[60px] resize-none"
                                placeholder="메시지 내용을 입력하세요..."
                              />
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  onClick={() => handleEditSave(message)}
                                  disabled={updateMessageMutation.isPending}
                                  className="h-8"
                                >
                                  <Check className="h-3 w-3 mr-1" />
                                  {updateMessageMutation.isPending ? "저장 중..." : "저장"}
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={handleEditCancel}
                                  disabled={updateMessageMutation.isPending}
                                  className="h-8"
                                >
                                  <X className="h-3 w-3 mr-1" />
                                  취소
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="truncate" title={message.text}>
                              {message.text}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>{message.user}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">
                            {getMessageType(message)}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatDate(message.created_at)}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => window.open(message.permalink, "_blank")}
                              title="슬랙에서 보기"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                            {canEdit && !isEditing && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditStart(message)}
                                title="수정"
                                disabled={editingMessage !== null}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            )}
                            {canEdit && !isEditing && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete(message)}
                                title="삭제"
                                disabled={deleteMessageMutation.isPending || editingMessage !== null}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>

            {/* 페이지네이션 */}
            {totalPages > 1 && (
              <div className="mt-6">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                        className={
                          currentPage === 1
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                      />
                    </PaginationItem>

                    {/* 페이지 번호 표시 */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                      // 현재 페이지 주변만 표시하는 로직
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 2 && page <= currentPage + 2)
                      ) {
                        return (
                          <PaginationItem key={page}>
                            <PaginationLink
                              onClick={() => handlePageChange(page)}
                              isActive={currentPage === page}
                              className="cursor-pointer"
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      }

                      // 생략 표시
                      if (
                        page === currentPage - 3 ||
                        page === currentPage + 3
                      ) {
                        return (
                          <PaginationItem key={page}>
                            <PaginationEllipsis />
                          </PaginationItem>
                        );
                      }

                      return null;
                    })}

                    <PaginationItem>
                      <PaginationNext
                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                        className={
                          currentPage === totalPages
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>

                {/* 페이지 정보 표시 */}
                <div className="text-sm text-gray-600 text-center mt-4">
                  {startIndex + 1}-{Math.min(endIndex, filteredMessages.length)} of{" "}
                  {filteredMessages.length} 메시지 (페이지 {currentPage} / {totalPages})
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
