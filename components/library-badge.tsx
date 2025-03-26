"use client";

import { cn } from "@/lib/utils";
import {
  SidebarLibrary,
  updateSidebarLibrary,
  useSidebarStore,
} from "@/stores/sidebar-store";

export default function LibraryBadge({ type }: { type: SidebarLibrary }) {
  const library = useSidebarStore((store) => store.library);

  return (
    <button
      className={cn(
        "py-2 px-3 transition-colors cursor-pointer rounded-full",
        type === library
          ? "bg-white text-neutral-900"
          : "bg-neutral-800 hover:bg-neutral-600 text-white"
      )}
      onClick={() => updateSidebarLibrary(type)}
    >
      {type[0].toUpperCase().concat(type.substring(1))}
    </button>
  );
}
