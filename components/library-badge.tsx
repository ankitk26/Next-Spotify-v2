"use client";

import { cn } from "@/lib/utils";
import {
  type SidebarLibrary,
  updateSidebarLibrary,
  useSidebarStore,
} from "@/stores/sidebar-store";

export default function LibraryBadge({ type }: { type: SidebarLibrary }) {
  const library = useSidebarStore((store) => store.library);

  return (
    <button
      className={cn(
        "cursor-pointer rounded-full px-3 py-2 transition-colors",
        type === library
          ? "bg-white text-neutral-900"
          : "bg-neutral-800 text-white hover:bg-neutral-600"
      )}
      onClick={() => updateSidebarLibrary(type)}
      type="button"
    >
      {type[0].toUpperCase().concat(type.substring(1))}
    </button>
  );
}
