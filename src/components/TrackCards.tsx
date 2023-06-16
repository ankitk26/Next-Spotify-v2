import { Track } from "@/types/types";
import CardItemGrid from "./CardItemGrid";
import CardItem from "./CardItem";

interface Props {
  tracks: Track[];
}

export default function TrackCards({ tracks }: Props) {
  return (
    <CardItemGrid>
      {tracks?.map((track: Track) => {
        if (!track) {
          return null;
        }
        return (
          <CardItem
            key={track.id}
            id={track.id}
            heading={track.name}
            subheading={track.album.name}
            altTitle={track.name}
            images={track.album.images}
            type="tracks"
          />
        );
      })}
    </CardItemGrid>
  );
}
