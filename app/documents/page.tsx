"use client"

import { useState } from "react"
import { Layout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Upload, FileText, Trash2, Download, Search } from "lucide-react"

interface Document {
  id: string
  name: string
  type: string
  category: string
  size: string
  uploadDate: string
  status: "processed" | "processing" | "error"
}

export default function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [documents] = useState<Document[]>([
    {
      id: "1",
      name: "개발환경_설정_가이드.md",
      type: "markdown",
      category: "개발",
      size: "2.3 MB",
      uploadDate: "2025-01-09",
      status: "processed",
    },
    {
      id: "2",
      name: "인사규정.pdf",
      type: "pdf",
      category: "인사",
      size: "1.8 MB",
      uploadDate: "2025-01-08",
      status: "processed",
    },
    {
      id: "3",
      name: "코드리뷰_프로세스.txt",
      type: "text",
      category: "프로세스",
      size: "0.5 MB",
      uploadDate: "2025-01-07",
      status: "processing",
    },
  ])

  const filteredDocuments = documents.filter((doc) => doc.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "processed":
        return <Badge className="bg-green-100 text-green-800">처리완료</Badge>
      case "processing":
        return <Badge className="bg-yellow-100 text-yellow-800">처리중</Badge>
      case "error":
        return <Badge className="bg-red-100 text-red-800">오류</Badge>
      default:
        return <Badge variant="secondary">알 수 없음</Badge>
    }
  }

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">문서 관리</h1>
              <p className="text-gray-600">챗봇이 학습할 문서를 업로드하고 관리합니다</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  문서 업로드
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>새 문서 업로드</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="file">파일 선택</Label>
                    <Input id="file" type="file" accept=".md,.txt,.pdf" />
                    <p className="text-xs text-gray-500 mt-1">지원 형식: Markdown (.md), Text (.txt), PDF (.pdf)</p>
                  </div>
                  <div>
                    <Label htmlFor="category">카테고리</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="카테고리를 선택하세요" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dev">개발</SelectItem>
                        <SelectItem value="hr">인사</SelectItem>
                        <SelectItem value="process">프로세스</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full">업로드</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>문서 목록</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="문서 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>파일명</TableHead>
                  <TableHead>타입</TableHead>
                  <TableHead>카테고리</TableHead>
                  <TableHead>크기</TableHead>
                  <TableHead>업로드일</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead>작업</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <span>{doc.name}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{doc.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{doc.category}</Badge>
                    </TableCell>
                    <TableCell>{doc.size}</TableCell>
                    <TableCell>{doc.uploadDate}</TableCell>
                    <TableCell>{getStatusBadge(doc.status)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
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
  )
}
