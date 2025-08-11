import type { Playlist } from "@/types/types";
import CardItem from "./card-item";
import CardItemGrid from "./card-item-grid";

export default function PlaylistCards({
  playlists,
}: {
  playlists: Playlist[];
}) {
  return (
    <CardItemGrid>
      {playlists?.map((playlist) => {
        if (!playlist) {
          return null;
        }

        return (
          <CardItem
            altTitle={playlist.name}
            heading={playlist.name}
            id={playlist.id}
            images={playlist.images}
            key={playlist.id}
            subheading={playlist.description}
            type="playlists"
          />
        );
      })}
    </CardItemGrid>
  );
}
