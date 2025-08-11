import { Music } from "lucide-react";
import Image from "next/image";
import type { Track } from "@/types/types";
import CardItemGrid from "./card-item-grid";

type Props = {
  tracks: Track[];
};

export default function TrackCards({ tracks }: Props) {
  return (
    <CardItemGrid>
      {tracks?.map((track: Track) => {
        if (!track) {
          return null;
        }
        return (
          <div
            className="group/item h-full cursor-pointer rounded-lg bg-neutral-900 p-4 transition duration-300 hover:bg-neutral-950"
            key={track.id}
          >
            <div className="relative">
              {track.album.images.length > 0 ? (
                <Image
                  alt={track.name}
                  className="aspect-square w-full rounded-md object-cover"
                  height={160}
                  src={track.album.images[0].url}
                  width={160}
                />
              ) : (
                <div className="h-40 w-full">
                  <Music className="h-full w-full bg-neutral-800" />
                </div>
              )}
            </div>
            <h3 className="mt-5 truncate font-bold">{track.name}</h3>
            <h6 className="mt-1 truncate font-semibold text-neutral-500 text-xs">
              {track.artists[0].name}
            </h6>
          </div>
        );
      })}
    </CardItemGrid>
  );
}
