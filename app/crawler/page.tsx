"use client";

import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Play } from "lucide-react";
import { useState } from "react";

export default function CrawlerPage() {
  const [startUrl, setStartUrl] = useState("");

  const handleStartCrawling = () => {
    // TODO: 크롤링 로직 구현
    console.log("크롤링 시작:", startUrl);
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
            <CardTitle>수집 결과</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              수집된 데이터가 없습니다
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
