"use client";

import { Home, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarLinksList() {
  const pathname = usePathname();

  const activeLink = "bg-paper-400 text-white";
  const inactiveLink = "bg-transparent text-gray";
  const linkStyle =
    "flex items-center gap-4 p-2 rounded-md cursor-pointer  hover:text-white";

  return (
    <ul className="flex flex-col items-stretch w-full gap-2 mt-4">
      <Link href="/">
        <li
          className={`${linkStyle} ${
            pathname === "/" ? activeLink : inactiveLink
          }`}
        >
          <Home size={20} />
          <span className="font-semibold">Home</span>
        </li>
      </Link>

      <Link href="/search">
        <li
          className={`${linkStyle} ${
            pathname === "/search" ? activeLink : inactiveLink
          }`}
        >
          <Search size={20} />
          <span className="font-semibold">Search</span>
        </li>
      </Link>
    </ul>
  );
}
