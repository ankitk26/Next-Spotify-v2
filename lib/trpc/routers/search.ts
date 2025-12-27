import { z } from "zod";
import { router, publicProcedure } from "../init";
import type { Album, Artist, Playlist, Track } from "@/types/types";

type SearchResults = {
  tracks: {
    items: Track[];
  };
  artists: {
    items: Artist[];
  };
  albums: {
    items: Album[];
  };
  playlists: {
    items: Playlist[] | null[];
  };
};

export const searchRouter = router({
  items: publicProcedure
    .input(
      z.object({
        type: z.enum(["artist", "album", "track", "playlist", "all"]),
        query: z.string(),
        limit: z.number().default(5),
      })
    )
    .query(async ({ ctx, input }) => {
      if (!ctx.session) {
        throw new Error("Invalid request");
      }

      let searchType: string;
      if (input.type === "all") {
        searchType = "album,artist,track,playlist";
      } else {
        searchType = input.type;
      }

      const data = await ctx.getRequestWrapper<SearchResults>(
        `/search?q=${input.query}&market=from_token&type=${searchType}&limit=${input.limit}`
      );

      return {
        tracks: data?.tracks?.items,
        artists: data?.artists?.items,
        albums: data?.albums?.items,
        playlists: data?.playlists?.items,
      };
    }),
});

