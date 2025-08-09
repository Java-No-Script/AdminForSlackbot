"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface CategoryData {
  id: string
  name: string
  description: string
  documentCount: number
  color: string
}

interface CategoryPieChartProps {
  data: CategoryData[]
  title?: string
  description?: string
}

const COLORS = {
  blue: "hsl(217, 91%, 60%)",
  green: "hsl(142, 70%, 45%)",
  purple: "hsl(262, 83%, 58%)",
  red: "hsl(0, 84%, 60%)",
  orange: "hsl(25, 95%, 53%)",
  yellow: "hsl(48, 96%, 53%)",
  pink: "hsl(330, 81%, 60%)",
  indigo: "hsl(239, 84%, 67%)",
}

export function CategoryPieChart({ data, title = "카테고리별 문서 분포", description = "각 카테고리별 문서 개수를 시각적으로 표시합니다" }: CategoryPieChartProps) {
  // Transform data for recharts
  const chartData = data.map((category) => ({
    name: category.name,
    value: category.documentCount,
    fill: COLORS[category.color as keyof typeof COLORS] || COLORS.blue,
  }))

  // Create chart config
  const chartConfig: ChartConfig = data.reduce((config, category) => {
    config[category.name] = {
      label: category.name,
      color: COLORS[category.color as keyof typeof COLORS] || COLORS.blue,
    }
    return config
  }, {} as ChartConfig)

  const totalDocuments = data.reduce((sum, category) => sum + category.documentCount, 0)

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[350px]">
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={70}
              outerRadius={120}
              strokeWidth={2}
              paddingAngle={2}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="name" />}
              className="-translate-y-2 flex-wrap gap-4 [&>*]:basis-1/3 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            총 <span className="font-semibold text-foreground">{totalDocuments}</span>개의 스레드
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
