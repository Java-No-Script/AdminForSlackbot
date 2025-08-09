"use client"

import { useState } from "react"
import { Layout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Edit, Trash2 } from "lucide-react"

interface Category {
  id: string
  name: string
  description: string
  documentCount: number
  color: string
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: "1",
      name: "개발",
      description: "개발 관련 문서 및 가이드",
      documentCount: 25,
      color: "blue",
    },
    {
      id: "2",
      name: "인사",
      description: "인사 정책 및 복리후생",
      documentCount: 12,
      color: "green",
    },
    {
      id: "3",
      name: "프로세스",
      description: "업무 프로세스 및 절차",
      documentCount: 18,
      color: "purple",
    },
  ])

  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    color: "blue",
  })

  const handleAddCategory = () => {
    if (newCategory.name.trim()) {
      const category: Category = {
        id: Date.now().toString(),
        name: newCategory.name,
        description: newCategory.description,
        documentCount: 0,
        color: newCategory.color,
      }
      setCategories([...categories, category])
      setNewCategory({ name: "", description: "", color: "blue" })
    }
  }

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter((cat) => cat.id !== id))
  }

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">카테고리 관리</h1>
              <p className="text-gray-600">문서를 분류할 카테고리를 관리합니다</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  카테고리 추가
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>새 카테고리 추가</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">카테고리 이름</Label>
                    <Input
                      id="name"
                      value={newCategory.name}
                      onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                      placeholder="카테고리 이름을 입력하세요"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">설명</Label>
                    <Textarea
                      id="description"
                      value={newCategory.description}
                      onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                      placeholder="카테고리 설명을 입력하세요"
                    />
                  </div>
                  <Button onClick={handleAddCategory} className="w-full">
                    추가하기
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card key={category.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <Badge className={`bg-${category.color}-100 text-${category.color}-800`}>{category.name}</Badge>
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-2">{category.description}</p>
                  </div>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteCategory(category.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{category.documentCount}</div>
                <p className="text-sm text-gray-600">개의 문서</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  )
}
