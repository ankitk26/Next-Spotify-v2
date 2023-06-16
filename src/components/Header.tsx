"use client";

import { AuthSession } from "@/types/types";
import { ChevronLeft, ChevronRight, LogOut, User2 } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import CollectionTabs from "./CollectionTabs";
import SearchInput from "./SearchInput";

export default function Header() {
  const { data } = useSession();
  const session = data as AuthSession;
  const pathname = usePathname();
  const router = useRouter();

  const logout = () => {
    signOut({ callbackUrl: "http://localhost:3000/login" });
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full p-4 pl-10 bg-[#111011]">
      <div className="flex items-center gap-10 w-[32rem]">
        <div className="flex items-center gap-3">
          <button
            className="flex items-center p-1 bg-[#0B0B0A] rounded-full focus:outline-none"
            onClick={() => router.back()}
          >
            <ChevronLeft className="text-2xl text-gray" />
          </button>

          <button
            className="flex items-center p-1 bg-[#0B0B0A] rounded-full focus:outline-none"
            onClick={() => router.forward()}
          >
            <ChevronRight className="text-2xl text-gray" />
          </button>
        </div>

        {pathname.includes("/search") && <SearchInput />}

        {pathname.includes("/collection") &&
          pathname !== "/collection/tracks" && <CollectionTabs />}
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 py-2 pl-2 pr-4 bg-black rounded-full bg-opacity-70">
          {session?.user.image === undefined ? (
            <User2 className="bg-[#333333] p-1 rounded-full text-2xl" />
          ) : (
            <Image
              src={session?.user.picture as string}
              className="object-contain w-8 h-8 rounded-full"
              alt={session?.user?.name}
              height={32}
              width={32}
            />
          )}
          <span className="text-sm font-bold tracking-wide">
            {session?.user.name}
          </span>
        </div>

        <button
          className="flex items-center justify-center bg-black bg-opacity-70 rounded-full h-10 w-10 hover:bg-[#181818] focus:outline-none cursor-pointer"
          onClick={logout}
        >
          <LogOut />
        </button>
      </div>
    </header>
  );
}
