import type React from "react";
import type { Metadata } from "next";
import "@/styles/globals.css";
import { pretendard } from "@/styles/fonts/pretendard";

export const metadata: Metadata = {
  title: "온보딩 챗봇 어드민",
  description: "온보딩 챗봇 관리 시스템",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`${pretendard.className}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
