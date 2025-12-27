import { z } from "zod";
import { router, publicProcedure } from "../init";
import type { Album, Artist, Track } from "@/types/types";

export const artistRouter = router({
  byId: publicProcedure
    .input(z.object({ artistId: z.string() }))
    .query(async ({ ctx, input }) => {
      if (!ctx.session) {
        throw new Error("Invalid request");
      }
      const data = await ctx.getRequestWrapper<Artist>(
        `/artists/${input.artistId}`
      );
      return data;
    }),

  albums: publicProcedure
    .input(z.object({ artistId: z.string() }))
    .query(async ({ ctx, input }) => {
      if (!ctx.session) {
        throw new Error("Invalid request");
      }
      const data = await ctx.getRequestWrapper<{ items: Album[] }>(
        `/artists/${input.artistId}/albums?include_groups=album`
      );
      return data?.items;
    }),

  topTracks: publicProcedure
    .input(z.object({ artistId: z.string() }))
    .query(async ({ ctx, input }) => {
      if (!ctx.session) {
        throw new Error("Invalid request");
      }
      const data = await ctx.getRequestWrapper<{ tracks: Track[] }>(
        `/artists/${input.artistId}/top-tracks?market=from_token`
      );
      return data?.tracks;
    }),

  singles: publicProcedure
    .input(z.object({ artistId: z.string() }))
    .query(async ({ ctx, input }) => {
      if (!ctx.session) {
        throw new Error("Invalid request");
      }
      const data = await ctx.getRequestWrapper<{ items: Album[] }>(
        `/artists/${input.artistId}/albums?include_groups=single`
      );
      return data?.items;
    }),

  appearsOn: publicProcedure
    .input(z.object({ artistId: z.string() }))
    .query(async ({ ctx, input }) => {
      if (!ctx.session) {
        throw new Error("Invalid request");
      }
      const data = await ctx.getRequestWrapper<{ items: Album[] }>(
        `/artists/${input.artistId}/albums?include_groups=appears_on`
      );
      return data?.items;
    }),

  compilation: publicProcedure
    .input(z.object({ artistId: z.string() }))
    .query(async ({ ctx, input }) => {
      if (!ctx.session) {
        throw new Error("Invalid request");
      }
      const data = await ctx.getRequestWrapper<{ items: Album[] }>(
        `/artists/${input.artistId}/albums?include_groups=compilation`
      );
      return data?.items;
    }),
});

