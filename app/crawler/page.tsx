"use client";

import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Play, ExternalLink, Clock, Database } from "lucide-react";
import { useState, useMemo } from "react";
import { useCrawlingControllerGetCrawledThreads } from "@/lib/apis/chatbotAdminAPI";
import type { CrawlingControllerGetCrawledThreads200HistoryItem } from "@/lib/apis/model";

const ITEMS_PER_PAGE = 10;

export default function CrawlerPage() {
  const [startUrl, setStartUrl] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch crawled threads data
  const { data: crawledData, isLoading, error } = useCrawlingControllerGetCrawledThreads();

  const handleStartCrawling = () => {
    // TODO: 크롤링 로직 구현
    console.log("크롤링 시작:", startUrl);
  };

  // Calculate pagination
  const totalItems = crawledData?.data?.total || 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  
  // Get paginated data
  const paginatedData = useMemo(() => {
    if (!crawledData?.data?.history) return [];
    
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return crawledData.data.history.slice(startIndex, endIndex);
  }, [crawledData?.data?.history, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">데이터 수집</h1>
          <p className="text-gray-600">
            웹페이지를 순회하며 자동으로 데이터를 수집합니다
          </p>
        </div>

        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>크롤링 설정</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="startUrl">시작 URL</Label>
                <Input
                  className="mt-2"
                  id="startUrl"
                  placeholder="https://example.com"
                  value={startUrl}
                  onChange={(e) => setStartUrl(e.target.value)}
                />
              </div>
              <Button 
                className="w-full" 
                onClick={handleStartCrawling}
                disabled={!startUrl}
              >
                <Play className="h-4 w-4 mr-2" />
                수집 시작
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              수집 결과
              {totalItems > 0 && (
                <span className="text-sm font-normal text-gray-500">
                  (총 {totalItems}개)
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8 text-gray-500">
                데이터를 불러오는 중...
              </div>
            ) : error ? (
              <div className="text-center py-8 text-red-500">
                데이터를 불러오는데 실패했습니다
              </div>
            ) : totalItems === 0 ? (
              <div className="text-center py-8 text-gray-500">
                수집된 데이터가 없습니다
              </div>
            ) : (
              <div className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>콘텐츠</TableHead>
                      <TableHead className="w-32">청크 수</TableHead>
                      <TableHead className="w-40">생성일시</TableHead>
                      <TableHead className="w-24">링크</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedData.map((item: CrawlingControllerGetCrawledThreads200HistoryItem, index: number) => (
                      <TableRow key={`${currentPage}-${index}`}>
                        <TableCell>
                          <div className="max-w-md truncate">
                            {item.content || "내용 없음"}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Database className="h-4 w-4 text-gray-400" />
                            <span>{item.count || 0}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span>{formatDate(item.createdAt)}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {item.link ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              asChild
                            >
                              <a 
                                href={item.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-1"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </Button>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {totalPages > 1 && (
                  <div className="flex justify-center mt-6">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious 
                            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                            className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                          />
                        </PaginationItem>
                        
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              onClick={() => handlePageChange(page)}
                              isActive={currentPage === page}
                              className="cursor-pointer"
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        
                        <PaginationItem>
                          <PaginationNext 
                            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                            className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}

                <div className="text-center text-sm text-gray-500 mt-4">
                  페이지 {currentPage} / {totalPages} (총 {totalItems}개 항목)
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
