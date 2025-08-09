"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider, MutationCache } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        mutationCache: new MutationCache({
          onSuccess: (data, variables, context, mutation) => {
            // 모든 mutation 성공 시 토스트 표시
            console.log("Global mutation success:", { data, variables, mutationKey: mutation.options.mutationKey });
            toast.success("성공적으로 완료되었습니다.");
          },
          onError: (error: unknown, variables, context, mutation) => {
            // 에러가 500일 때는 토스트를 표시하지 않음
            console.log("Global mutation error:", error, { mutationKey: mutation.options.mutationKey });
            const isInternalServerError = (error as AxiosError)?.response?.status === 500;
            
            if (!isInternalServerError) {
              toast.error("작업 중 오류가 발생했습니다.");
            }
          },
        }),
        defaultOptions: {
          queries: {
            retry: 1,
            refetchOnWindowFocus: false,
            staleTime: 5 * 60 * 1000,
          },
          mutations: { 
            retry: 0,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
