"use client";

import { useQuery } from "@tanstack/react-query";
import { Album } from "lucide-react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { userTopTracksQuery } from "@/lib/queries";

const SKELETON_KEYS = Array.from({ length: 9 }, (_, i) => `skeleton-${i}`);

export default function UserTopTracks() {
  const { data: topTracks, isPending } = useQuery(userTopTracksQuery(9));

  if (isPending) {
    return (
      <div className="grid w-full grid-cols-12 gap-4">
        {SKELETON_KEYS.map((key) => (
          <div
            className="col-span-4 flex items-center gap-4 rounded-md bg-neutral-800 pr-4"
            key={key}
          >
            <Skeleton className="h-[72px] w-[72px] rounded-tl-md rounded-bl-md" />
            <Skeleton className="h-5 w-32" />
          </div>
        ))}
      </div>
    );
  }

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
