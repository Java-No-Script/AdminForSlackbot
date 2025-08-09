"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, MessageSquare, FolderOpen, FileText, Settings, Bot } from "lucide-react"

const navigation = [
  { name: "대시보드", href: "/", icon: LayoutDashboard },
  { name: "챗봇 메시지", href: "/messages", icon: MessageSquare },
  { name: "카테고리 관리", href: "/categories", icon: FolderOpen },
  { name: "문서 관리", href: "/documents", icon: FileText },
  { name: "데이터 수집", href: "/crawler", icon: Bot },
  { name: "설정", href: "/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col bg-gray-50 border-r">
      <div className="flex h-16 items-center px-6 border-b">
        <Bot className="h-8 w-8 text-blue-600" />
        <span className="ml-2 text-xl font-semibold">챗봇 어드민</span>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                isActive ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
