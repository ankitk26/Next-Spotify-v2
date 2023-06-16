"use client";

import { Home, Search, Rows, Layers } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function SidebarLinksList() {
  const pathName = usePathname();
  const activeLink = "bg-paper-secondary text-white";
  const inactiveLink = "bg-transparent text-gray";

  return (
    <ul className="w-full mt-4">
      <Link href="/">
        <li
          className={`${
            pathName === "/" ? activeLink : inactiveLink
          } flex items-center gap-4 p-2 rounded`}
        >
          <Home size={24} />
          <span className="font-bold">Home</span>
        </li>
      </Link>

      <Link href="/search">
        <li
          className={`${
            pathName === "/search" ? activeLink : inactiveLink
          } flex items-center gap-4 p-2 rounded cursor-pointer  hover:text-white`}
        >
          <Search size={24} />

          <span className="font-bold">Search</span>
        </li>
      </Link>

      <Link href="/collection/playlists">
        <li
          className={`${
            pathName.includes("/collection") && !pathName.includes("tracks")
              ? activeLink
              : inactiveLink
          } flex items-center gap-4 p-2 rounded cursor-pointer  hover:text-white`}
        >
          <Layers size={24} />
          <span className="font-bold">Your Library</span>
        </li>
      </Link>

      <Link href="/collection/tracks">
        <li
          className={`${
            pathName === "/collection/tracks" ? "text-white" : "text-gray"
          } flex items-center mt-6 gap-3 p-2 text-sm rounded cursor-pointer  hover:text-white`}
        >
          <Image
            src="/images/liked_cover.jpeg"
            height={28}
            width={28}
            className="rounded"
            alt="Liked playlist cover"
          />
          <span className="font-bold">Liked songs</span>
        </li>
      </Link>
    </ul>
  );
}
