import { Track } from "@/types/types";
import { Music } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CardItemGrid from "./CardItemGrid";
import PlayTrackButton from "./PlayTrackButton";

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
          <Link key={track.id} href={`/tracks/${track.id}`}>
            <div className="h-full p-4 transition duration-300 rounded-lg cursor-pointer group/item hover:bg-paper-400 bg-paper-500">
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
                    <Music className="w-full h-full bg-paper " />
                  </div>
                )}
                <PlayTrackButton
                  track={track}
                  variant="filled"
                  className="absolute invisible w-12 h-12 text-3xl shadow-lg bottom-2 right-2 group/btn group-hover/item:visible"
                />
              </div>
              <h3 className="mt-5 font-bold truncate">{track.name}</h3>
              <h6 className="mt-1 text-xs font-semibold truncate text-gray">
                {track.artists[0].name}
              </h6>
            </div>
          </Link>
        );
      })}
    </CardItemGrid>
  );
}
