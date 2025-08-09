"use client";

import { useState } from "react";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Edit, Trash2, Eye } from "lucide-react";

interface Message {
  id: string;
  content: string;
  user: string;
  timestamp: string;
  category: string;
  status: "active" | "archived";
}

export default function MessagesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const messages: Message[] = [
    {
      id: "1",
      content: "개발 환경 설정은 어떻게 하나요?",
      user: "김개발",
      timestamp: "2025-01-09 14:30",
      category: "개발",
      status: "active",
    },
    {
      id: "2",
      content: "코드 리뷰 프로세스를 알려주세요",
      user: "이신입",
      timestamp: "2025-01-09 13:15",
      category: "프로세스",
      status: "active",
    },
    {
      id: "3",
      content: "회사 휴가 정책이 궁금합니다",
      user: "박사원",
      timestamp: "2025-01-09 11:45",
      category: "인사",
      status: "archived",
    },
  ];

  const filteredMessages = messages.filter(
    (message) =>
      message.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <CardTitle>메시지 목록</CardTitle>
              <div className="flex space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="메시지 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
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
                  <TableHead>카테고리</TableHead>
                  <TableHead>시간</TableHead>
                  <TableHead>작업</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMessages.map((message) => (
                  <TableRow key={message.id}>
                    <TableCell className="max-w-md">
                      <div className="truncate">{message.content}</div>
                    </TableCell>
                    <TableCell>{message.user}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{message.category}</Badge>
                    </TableCell>
                    <TableCell>{message.timestamp}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
