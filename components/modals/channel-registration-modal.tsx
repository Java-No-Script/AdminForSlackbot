"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Hash, Users, Lock } from "lucide-react"

interface ChannelRegistrationModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (channelData: ChannelData) => void
}

interface ChannelData {
  name: string
  type: "public" | "private" | "dm"
  description: string
  webhookUrl: string
  isActive: boolean
}

export function ChannelRegistrationModal({ isOpen, onClose, onSubmit }: ChannelRegistrationModalProps) {
  const [formData, setFormData] = useState<ChannelData>({
    name: "",
    type: "public",
    description: "",
    webhookUrl: "",
    isActive: true,
  })

  const [errors, setErrors] = useState<Partial<ChannelData>>({})

  const validateForm = () => {
    const newErrors: Partial<ChannelData> = {}

    if (!formData.name.trim()) {
      newErrors.name = "채널명을 입력해주세요"
    }

    if (!formData.webhookUrl.trim()) {
      newErrors.webhookUrl = "웹훅 URL을 입력해주세요"
    } else if (!formData.webhookUrl.startsWith("https://hooks.slack.com/")) {
      newErrors.webhookUrl = "올바른 슬랙 웹훅 URL을 입력해주세요"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData)
      setFormData({
        name: "",
        type: "public",
        description: "",
        webhookUrl: "",
        isActive: true,
      })
      setErrors({})
      onClose()
    }
  }

  const getChannelIcon = () => {
    switch (formData.type) {
      case "private":
        return <Lock className="h-4 w-4" />
      case "dm":
        return <Users className="h-4 w-4" />
      default:
        return <Hash className="h-4 w-4" />
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>새 채널 등록</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="channelName">채널명 *</Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">{getChannelIcon()}</div>
                <Input
                  id="channelName"
                  placeholder="예: general, random"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="pl-10"
                />
              </div>
              {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
            </div>
            <div>
              <Label htmlFor="channelType">채널 타입</Label>
              <Select
                value={formData.type}
                onValueChange={(value: "public" | "private" | "dm") => setFormData({ ...formData, type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">
                    <div className="flex items-center space-x-2">
                      <Hash className="h-4 w-4" />
                      <span>공개 채널</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="private">
                    <div className="flex items-center space-x-2">
                      <Lock className="h-4 w-4" />
                      <span>비공개 채널</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="dm">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4" />
                      <span>다이렉트 메시지</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">설명</Label>
            <Textarea
              id="description"
              placeholder="채널에 대한 간단한 설명을 입력하세요"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="webhookUrl">슬랙 웹훅 URL *</Label>
            <Input
              id="webhookUrl"
              placeholder="https://hooks.slack.com/services/..."
              value={formData.webhookUrl}
              onChange={(e) => setFormData({ ...formData, webhookUrl: e.target.value })}
            />
            {errors.webhookUrl && <p className="text-xs text-red-600 mt-1">{errors.webhookUrl}</p>}
            <p className="text-xs text-gray-500 mt-1">슬랙 워크스페이스에서 생성한 웹훅 URL을 입력하세요</p>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <Label>채널 활성화</Label>
              <p className="text-xs text-gray-600">등록 후 즉시 챗봇이 응답하도록 설정</p>
            </div>
            <Badge variant={formData.isActive ? "default" : "secondary"}>{formData.isActive ? "활성" : "비활성"}</Badge>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            취소
          </Button>
          <Button onClick={handleSubmit}>등록하기</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
