import { z } from "zod";
import type { Artist, Track } from "@/types/types";
import { publicProcedure, router } from "../init";

type ResponseData<T extends "artists" | "tracks"> = {
  items: T extends "artists" ? Artist[] : Track[];
};

export const userRouter = router({
  topTracks: publicProcedure
    .input(
      z.object({
        timeRange: z
          .enum(["long_term", "short_term", "medium_term"])
          .default("short_term"),
        limit: z.number().default(50),
      })
    )
    .query(async ({ ctx, input }) => {
      if (!ctx.session) {
        throw new Error("Invalid request");
      }
      const data = await ctx.getRequestWrapper<ResponseData<"tracks">>(
        `/me/top/tracks?time_range=${input.timeRange}&limit=${input.limit}`
      );
      return data?.items;
    }),

  topArtists: publicProcedure
    .input(
      z.object({
        timeRange: z
          .enum(["long_term", "short_term", "medium_term"])
          .default("short_term"),
        limit: z.number().default(50),
      })
    )
    .query(async ({ ctx, input }) => {
      if (!ctx.session) {
        throw new Error("Invalid request");
      }
      const data = await ctx.getRequestWrapper<ResponseData<"artists">>(
        `/me/top/artists?time_range=${input.timeRange}&limit=${input.limit}`
      );
      return data?.items;
    }),

  recentlyPlayed: publicProcedure
    .input(z.object({ limit: z.number().default(50) }))
    .query(async ({ ctx, input }) => {
      if (!ctx.session) {
        throw new Error("Invalid request");
      }
      const data = await ctx.getRequestWrapper<{ items: { track: Track }[] }>(
        `/me/player/recently-played?limit=${input.limit}`
      );
      return data?.items?.map((item: { track: Track }) => item.track) ?? [];
    }),

  timeCapsule: publicProcedure
    .input(z.object({ limit: z.number().default(10) }))
    .query(async ({ ctx, input }) => {
      if (!ctx.session) {
        throw new Error("Invalid request");
      }
      const data = await ctx.getRequestWrapper<ResponseData<"tracks">>(
        `/me/top/tracks?time_range=long_term&limit=${input.limit}`
      );
      return data?.items;
    }),
});
