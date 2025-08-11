import { Album } from "lucide-react";
import Image from "next/image";
import { getUserTopTracks } from "@/actions/get-user-top-tracks";
import type { Track } from "@/types/types";

export default async function UserTopTracks() {
  const topTracks = (await getUserTopTracks({
    limit: 9,
    type: "tracks",
  })) as Track[];

  return (
    <div className="grid w-full grid-cols-12 gap-4">
      {topTracks?.map((track) => (
        <div
          className="group/item col-span-4 flex items-center justify-between truncate rounded-md bg-neutral-800 pr-4 hover:bg-neutral-700"
          key={track.id}
        >
          <div className="flex items-center gap-4">
            {track.album.images && track.album.images.length > 0 ? (
              <Image
                alt={track.name}
                className="aspect-square h-full rounded-tl-md rounded-bl-md object-cover"
                height={72}
                src={track.album.images[0].url}
                width={72}
              />
            ) : (
              <Album size={20} />
            )}
            <h3 className="truncate font-semibold">{track.name}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}
