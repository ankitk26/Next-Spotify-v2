import { router, publicProcedure } from "../init";
import type { Album, Artist, Playlist, Track } from "@/types/types";

type LikedSongs = {
  total: number;
  items: {
    track: Track;
  }[];
  next: string | null;
};

export const libraryRouter = router({
  likedSongs: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.session) {
      throw new Error("Invalid request");
    }

    const data = await ctx.getRequestWrapper<LikedSongs>("/me/tracks?limit=50");

    if (!data) {
      return {
        total: 0,
        items: [] as Track[],
      };
    }

    return {
      total: data.total,
      items: data.items.map((item: { track: Track }) => item.track),
    };
  }),

  playlists: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.session) {
      throw new Error("Invalid request");
    }
    const data = await ctx.getRequestWrapper<{ items: Playlist[] }>(
      "/me/playlists"
    );
    return data?.items;
  }),

  albums: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.session) {
      throw new Error("Invalid request");
    }
    const data = await ctx.getRequestWrapper<{ items: { album: Album }[] }>(
      "/me/albums?market=from_token&limit=50"
    );
    return data?.items;
  }),

  artists: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.session) {
      throw new Error("Invalid request");
    }
    const data = await ctx.getRequestWrapper<{ artists: { items: Artist[] } }>(
      "/me/following?type=artist&limit=50"
    );
    return data?.artists.items;
  }),
});

