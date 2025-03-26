import { Playlist } from "@/types/types";
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
            key={playlist.id}
            id={playlist.id}
            heading={playlist.name}
            subheading={playlist.description}
            altTitle={playlist.name}
            images={playlist.images}
            type="playlists"
          />
        );
      })}
    </CardItemGrid>
  );
}
