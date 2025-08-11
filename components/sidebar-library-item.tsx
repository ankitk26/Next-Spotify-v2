"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { SidebarLibrary } from "@/stores/sidebar-store";
import type { Album, Artist, Playlist } from "@/types/types";

interface Props {
  type: SidebarLibrary;
  entity: Album | Artist | Playlist;
  subtitle?: string;
}

export default function SidebarLibraryItem({ type, entity, subtitle }: Props) {
  const pathname = usePathname();

  const href = `/${type}/${entity.id}`;

  return (
    <Link
      className={cn(
        "flex cursor-pointer items-center gap-3 rounded-md p-2 text-white hover:bg-neutral-800",
        pathname === href ? "bg-neutral-800" : ""
      )}
      href={href}
    >
      <Image
        alt={entity.name}
        className={cn(
          "aspect-square object-cover",
          type === "artists" ? "rounded-full" : "rounded-md"
        )}
        height={50}
        src={entity.images[0].url}
        width={50}
      />

      <div className="truncate">
        <h6 className="w-full truncate font-semibold text-sm hover:text-white">
          {entity.name}
        </h6>
        {type !== "artists" && (
          <span className="mt-1 font-medium text-neutral-500 text-xs">
            {subtitle}
          </span>
        )}
      </div>
    </Link>
  );
}
