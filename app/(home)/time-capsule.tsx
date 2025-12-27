"use client";

import { useQuery } from "@tanstack/react-query";
import CardItemGrid from "@/components/card-item-grid";
import TrackCards from "@/components/track-cards";
import { Skeleton } from "@/components/ui/skeleton";
import { timeCapsuleQuery } from "@/lib/queries";

const SKELETON_KEYS = Array.from(
  { length: 10 },
  (_, i) => `time-capsule-skeleton-${i}`
);

export default function TimeCapsule() {
  const { data: allTimeTopTracks, isPending } = useQuery(timeCapsuleQuery());

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

  return <TrackCards tracks={allTimeTopTracks ?? []} />;
}
