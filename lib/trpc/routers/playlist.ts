import { z } from "zod";
import { router, publicProcedure } from "../init";
import type { Playlist, Track } from "@/types/types";

export const playlistRouter = router({
  byId: publicProcedure
    .input(z.object({ playlistId: z.string() }))
    .query(async ({ ctx, input }) => {
      if (!ctx.session) {
        throw new Error("Invalid request");
      }

      const data = await ctx.getRequestWrapper<Playlist>(
        `/playlists/${input.playlistId}`
      );

      if (!data) {
        return null;
      }

      const playlist = {
        ...data,
        tracks: data.tracks.items.map(
          (item: { added_at: string; track: Track }) => item.track
        ),
      };

      let currUrl = data.tracks.next;

      while (currUrl !== null) {
        const nextData = await ctx.getRequestWrapper<{
          items: { track: Track }[];
          next?: string;
        }>(currUrl as string);
        if (nextData) {
          playlist.tracks.push(
            ...nextData.items.map((item: { track: Track }) => item.track)
          );
        }
        currUrl = nextData?.next;
      }

      return playlist;
    }),
});

