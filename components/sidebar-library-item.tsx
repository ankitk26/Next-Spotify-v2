"use client";

import { cn } from "@/lib/utils";
import { SidebarLibrary } from "@/stores/sidebar-store";
import { Album, Artist, Playlist } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
      href={href}
      className={cn(
        "flex items-center p-2 gap-3 rounded-md text-white cursor-pointer  hover:bg-neutral-800",
        pathname === href ? "bg-neutral-800" : ""
      )}
    >
      <Image
        src={entity.images[0].url}
        alt={entity.name}
        height={50}
        width={50}
        className={cn(
          "aspect-square object-cover",
          type === "artists" ? "rounded-full" : "rounded-md"
        )}
      />

      <div className="truncate">
        <h6 className="w-full text-sm font-semibold truncate hover:text-white">
          {entity.name}
        </h6>
        {type !== "artists" && (
          <span className="mt-1 text-xs font-medium text-neutral-500">
            {subtitle}
          </span>
        )}
      </div>
    </Link>
  );
}
