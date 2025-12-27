"use client";

import CardItemGrid from "@/components/card-item-grid";
import TrackCards from "@/components/track-cards";
import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/lib/trpc/react";

const SKELETON_KEYS = Array.from(
  { length: 10 },
  (_, i) => `recently-played-skeleton-${i}`
);

export default function RecentlyPlayed() {
  const { data: recentlyPlayed, isPending } =
    trpc.spotify.user.recentlyPlayed.useQuery({ limit: 10 });

  if (isPending) {
    return (
      <CardItemGrid>
        {SKELETON_KEYS.map((key) => (
          <div className="h-full rounded-lg bg-neutral-800 p-4" key={key}>
            <Skeleton className="aspect-square w-full rounded-md" />
            <Skeleton className="mt-5 h-5 w-3/4" />
            <Skeleton className="mt-1 h-4 w-1/2" />
          </div>
        ))}
      </CardItemGrid>
    );
  }

  if (!recentlyPlayed) {
    return null;
  }

  return <TrackCards tracks={recentlyPlayed} />;
}
