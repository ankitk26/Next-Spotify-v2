"use client";

import SideBar from "@/components/sidebar";
import { usePathname } from "next/navigation";

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
    <div className="grid flex-1 grid-cols-10 p-4 mb-2 pt-0 gap-4 overflow-hidden">
      <SideBar />
      <div className="flex flex-col col-span-8 overflow-auto spotify-scrollbar rounded-lg bg-neutral-900">
        <main className="mx-8 my-4 mb-20">{children}</main>
      </div>
    </div>
  );
}
