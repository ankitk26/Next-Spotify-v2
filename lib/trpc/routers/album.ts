import { z } from "zod";
import type { Album } from "@/types/types";
import { publicProcedure, router } from "../init";

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
      if (!data) {
        throw new Error("Album not found");
      }
      return data;
    }),
});
