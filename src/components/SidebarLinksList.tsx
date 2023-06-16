"use client";

import { Home, Layers, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SidebarLinkItem from "./SidebarLinkItem";

export default function SidebarLinksList() {
  const pathname = usePathname();

  return (
    <ul className="w-full mt-4">
      <SidebarLinkItem
        path="/"
        activeCondition={pathname === "/"}
        icon={<Home size={20} />}
        label="Home"
      />
      <SidebarLinkItem
        path="/search"
        activeCondition={pathname === "/search"}
        icon={<Search size={20} />}
        label="Search"
      />
      <SidebarLinkItem
        path="/collection/playlists"
        activeCondition={
          pathname.includes("/collection") && !pathname.includes("tracks")
        }
        icon={<Layers size={20} />}
        label="Your Library"
      />

      <Link href="/collection/tracks">
        <li
          className={`${
            pathname === "/collection/tracks" ? "text-white" : "text-gray"
          } flex items-center mt-6 gap-4 p-2 rounded cursor-pointer  hover:text-white`}
        >
          <Image
            src="/images/liked_cover.jpeg"
            height={30}
            width={30}
            className="rounded"
            alt="Liked playlist cover"
          />
          <span className="font-semibold">Liked songs</span>
        </li>
      </Link>
    </ul>
  );
}
