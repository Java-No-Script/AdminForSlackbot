import type React from "react";
import type { Metadata } from "next";
import "@/styles/globals.css";
import { pretendard } from "@/styles/fonts/pretendard";
import { QueryProvider } from "@/components/query-provider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "김과장박대리",
  description: "김과장박대리 관리 시스템",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ko"
      className={`${pretendard.className}`}
      suppressHydrationWarning
    >
      <body>
        <QueryProvider>{children}</QueryProvider>
        <Toaster
          richColors
          position="top-right"
          expand={false}
          visibleToasts={5}
          duration={4000}
        />
      </body>
    </html>
  );
}
