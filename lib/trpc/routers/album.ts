import { z } from "zod";
import { router, publicProcedure } from "../init";
import type { Album } from "@/types/types";

export const albumRouter = router({
  byId: publicProcedure
    .input(z.object({ albumId: z.string() }))
    .query(async ({ ctx, input }) => {
      if (!ctx.session) {
        throw new Error("Invalid request");
      }
      const data = await ctx.getRequestWrapper<Album>(
        `/albums/${input.albumId}`
      );
      return data;
    }),
});

