"use client";

import { usePathname } from "next/navigation";
import SideBar from "@/components/sidebar";

export default function MainContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  if (pathname === "/login") {
    return <div>{children}</div>;
  }

  return (
    <div className="mb-2 grid flex-1 grid-cols-10 gap-4 overflow-hidden p-4 pt-0">
      <SideBar />
      <div className="spotify-scrollbar col-span-8 flex flex-col overflow-auto rounded-lg bg-neutral-900">
        <main className="mx-8 my-4 mb-20">{children}</main>
      </div>
    </div>
  );
}
