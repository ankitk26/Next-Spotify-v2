import { httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import { trpc } from "./react";

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "/api/trpc",
      transformer: superjson,
    }),
  ],
});
