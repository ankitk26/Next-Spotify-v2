import type { Artist } from "@/types/types";
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
          altTitle={artist.name}
          heading={artist.name}
          id={artist.id}
          imageRounded
          images={artist.images}
          key={artist.id}
          subheading="Artist"
          type="artists"
        />
      ))}
    </CardItemGrid>
  );
}
