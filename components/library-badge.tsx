"use client";

import { cn } from "@/lib/utils";
import { useAppStore } from "@/stores/app-store";
import type { SidebarLibrary } from "@/types/types";

export default function LibraryBadge({ type }: { type: SidebarLibrary }) {
  const library = useAppStore((store) => store.library);
  const setSidebarLibrary = useAppStore((store) => store.setSidebarLibrary);

  return (
    <button
      className={cn(
        "cursor-pointer rounded-full px-3 py-2 transition-colors",
        type === library
          ? "bg-white text-neutral-900"
          : "bg-neutral-800 text-white hover:bg-neutral-600"
      )}
      onClick={() => setSidebarLibrary(type)}
      type="button"
    >
      {type[0].toUpperCase().concat(type.substring(1))}
    </button>
  );
}
