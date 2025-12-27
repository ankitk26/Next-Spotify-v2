import { router } from "../init";
import { albumRouter } from "./album";
import { artistRouter } from "./artist";
import { libraryRouter } from "./library";
import { playlistRouter } from "./playlist";
import { searchRouter } from "./search";
import { userRouter } from "./user";

export const appRouter = router({
  spotify: router({
    artist: artistRouter,
    search: searchRouter,
    user: userRouter,
    library: libraryRouter,
    album: albumRouter,
    playlist: playlistRouter,
  }),
});

export type AppRouter = typeof appRouter;

