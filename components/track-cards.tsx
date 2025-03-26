import { Track } from "@/types/types";
import { Music } from "lucide-react";
import Image from "next/image";
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
            key={track.id}
            className="h-full p-4 transition duration-300 rounded-lg cursor-pointer group/item hover:bg-neutral-950 bg-neutral-900"
          >
            <div className="relative">
              {track.album.images.length > 0 ? (
                <Image
                  src={track.album.images[0].url}
                  alt={track.name}
                  height={160}
                  width={160}
                  className="object-cover w-full rounded-md aspect-square"
                />
              ) : (
                <div className="w-full h-40">
                  <Music className="w-full h-full bg-neutral-800" />
                </div>
              )}
            </div>
            <h3 className="mt-5 font-bold truncate">{track.name}</h3>
            <h6 className="mt-1 text-xs font-semibold truncate text-neutral-500">
              {track.artists[0].name}
            </h6>
          </div>
        );
      })}
    </CardItemGrid>
  );
}
