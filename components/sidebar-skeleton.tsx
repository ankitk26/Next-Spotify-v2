"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/stores/app-store";

export default function SideBarSkeleton(
  { count }: { count?: number } = { count: 3 }
) {
  const library = useAppStore((store) => store.library);

  return (
    <div className="mt-4 flex flex-col items-stretch gap-3">
      {new Array(count).fill(null).map((_, i) => (
        <div
          className={cn(
            "flex cursor-pointer items-center gap-3 rounded-xl bg-neutral-900 p-2"
          )}
          key={`${i}_random_${library}`}
        >
          {/* Skeleton for Image */}
          <Skeleton
            className={cn(
              "size-12.5",
              library === "artists" ? "rounded-full" : "rounded-md"
            )}
          />

          <div className="flex w-full flex-col">
            {/* Skeleton for Title */}
            <Skeleton className="mb-2 h-4 w-3/4" />
            {/* Skeleton for Subtitle (Only for Albums and Playlists) */}
            {library !== "artists" && <Skeleton className="h-3 w-1/2" />}
          </div>
        </div>
      ))}
    </div>
  );
}
