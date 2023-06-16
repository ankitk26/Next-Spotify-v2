import { Album } from "../types/types";
import CardItem from "./CardItem";
import CardItemGrid from "./CardItemGrid";

interface Props {
  albums: Album[];
}

export default function AlbumCards({ albums }: Props) {
  return (
    <CardItemGrid>
      {albums?.map((album) => (
        <CardItem
          key={album.id}
          id={album.id}
          heading={album.name}
          subheading={album.artists[0].name}
          altTitle={album.name}
          images={album.images}
          type="albums"
        />
      ))}
    </CardItemGrid>
  );
}
