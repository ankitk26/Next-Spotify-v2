import { getUserTopTracks } from "@/actions/get-user-top-tracks";
import { Track } from "@/types/types";
import { Album } from "lucide-react";
import Image from "next/image";

export default async function UserTopTracks() {
  const topTracks = (await getUserTopTracks({
    limit: 9,
    type: "tracks",
  })) as Track[];

  return (
    <div className="grid w-full grid-cols-12 gap-4">
      {topTracks &&
        topTracks.map((track) => (
          <div
            key={track.id}
            className="flex items-center justify-between col-span-4 pr-4 truncate rounded-md group/item bg-neutral-800 hover:bg-neutral-700"
          >
            <div className="flex items-center gap-4">
              {track.album.images && track.album.images.length > 0 ? (
                <Image
                  src={track.album.images[0].url}
                  alt={track.name}
                  width={72}
                  height={72}
                  className="object-cover h-full rounded-tl-md rounded-bl-md aspect-square"
                />
              ) : (
                <Album size={20} />
              )}
              <h3 className="font-semibold truncate">{track.name}</h3>
            </div>
          </div>
        ))}
    </div>
  );
}
