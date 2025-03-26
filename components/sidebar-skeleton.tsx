"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/stores/sidebar-store";

export default function SideBarSkeleton(
  { count }: { count?: number } = { count: 3 }
) {
  const library = useSidebarStore((store) => store.library);

  return (
    <div className="flex flex-col items-stretch gap-3 mt-4">
      {...Array(count).map((i) => (
        <div
          className={cn(
            "flex items-center p-2 gap-3 rounded-xl cursor-pointer bg-neutral-900"
          )}
          key={i + "_random_" + library}
        >
          {/* Skeleton for Image */}
          <Skeleton
            className={cn(
              "h-[50px] w-[50px]",
              library === "artists" ? "rounded-full" : "rounded-md"
            )}
          />

          <div className="flex flex-col w-full">
            {/* Skeleton for Title */}
            <Skeleton className="h-4 w-3/4 mb-2" />
            {/* Skeleton for Subtitle (Only for Albums and Playlists) */}
            {library !== "artists" && <Skeleton className="h-3 w-1/2" />}
          </div>
        </div>
      ))}
    </div>
  );
}
