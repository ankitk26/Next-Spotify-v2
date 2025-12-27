"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type * as React from "react";
import { useState } from "react";
import { trpcClient } from "@/lib/trpc/client";
import { trpc } from "@/lib/trpc/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClientState] = useState(() => trpcClient);

  return (
    <trpc.Provider client={trpcClientState} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
