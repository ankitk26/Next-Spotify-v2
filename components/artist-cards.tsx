import { Artist } from "@/types/types";
import CardItem from "./card-item";
import CardItemGrid from "./card-item-grid";

interface Props {
  artists: Artist[];
}

export default function ArtistCards({ artists }: Props) {
  return (
    <CardItemGrid>
      {artists?.map((artist) => (
        <CardItem
          key={artist.id}
          id={artist.id}
          heading={artist.name}
          images={artist.images}
          altTitle={artist.name}
          subheading="Artist"
          imageRounded
          type="artists"
        />
      ))}
    </CardItemGrid>
  );
}
