"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserTopTracks } from "@/actions/get-user-top-tracks";
import ArtistCards from "@/components/artist-cards";
import CardItemGrid from "@/components/card-item-grid";
import { Skeleton } from "@/components/ui/skeleton";
import type { Artist } from "@/types/types";

const SKELETON_KEYS = Array.from(
  { length: 15 },
  (_, i) => `top-artists-skeleton-${i}`
);

export default function TopArtists() {
  const { data: topArtists, isPending } = useQuery({
    queryKey: ["top_artists"],
    queryFn: () =>
      getUserTopTracks({
        limit: 15,
        type: "artists",
      }) as Promise<Artist[]>,
  });

  if (isPending) {
    return (
      <CardItemGrid>
        {SKELETON_KEYS.map((key) => (
          <div className="h-full rounded-lg bg-neutral-800 p-4" key={key}>
            <Skeleton className="aspect-square w-full rounded-full" />
            <Skeleton className="mt-5 h-5 w-3/4" />
            <Skeleton className="mt-1 h-4 w-1/2" />
          </div>
        ))}
      </CardItemGrid>
    );
  }

  return <ArtistCards artists={topArtists ?? []} />;
}
