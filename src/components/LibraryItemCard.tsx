"use client";

import { Album, Artist, Playlist } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface LibraryItemCardProps {
  type: "artists" | "playlists" | "albums";
  entity: Album | Artist | Playlist;
  subtitle?: string;
}

export default function LibraryItemCard({
  type,
  entity,
  subtitle,
}: LibraryItemCardProps) {
  const pathname = usePathname();

  const href = `/${type}/${entity.id}`;

  return (
    <Link
      href={href}
      className={`${
        pathname === href ? "bg-paper-400" : ""
      } flex items-center p-2 gap-3 rounded-md text-white cursor-pointer  hover:bg-paper-600`}
    >
      <Image
        src={entity.images[0].url}
        alt={entity.name}
        height={50}
        width={50}
        className={`${
          type === "artists" ? "rounded-full" : "rounded-md"
        } aspect-square object-cover`}
      />

      <div className="truncate">
        <h6 className="w-full text-sm font-semibold truncate hover:text-white">
          {entity.name}
        </h6>
        {type !== "artists" && (
          <span className="mt-1 text-xs font-medium text-gray">{subtitle}</span>
        )}
      </div>
    </Link>
  );
}
