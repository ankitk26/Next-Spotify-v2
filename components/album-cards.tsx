import type { Album } from "../types/types";
import CardItem from "./card-item";
import CardItemGrid from "./card-item-grid";

interface Props {
  albums: Album[];
}

export default function AlbumCards({ albums }: Props) {
  return (
    <CardItemGrid>
      {albums?.map((album) => (
        <CardItem
          altTitle={album.name}
          heading={album.name}
          id={album.id}
          images={album.images}
          key={album.id}
          subheading={album.artists[0].name}
          type="albums"
        />
      ))}
    </CardItemGrid>
  );
}
