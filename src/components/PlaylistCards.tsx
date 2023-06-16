import { Playlist } from "@/types/types";
import CardItem from "./CardItem";
import CardItemGrid from "./CardItemGrid";

interface Props {
  playlists: Playlist[];
}

export default function PlaylistCards({ playlists }: Props) {
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
