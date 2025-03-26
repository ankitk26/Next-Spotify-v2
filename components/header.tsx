"use client";

import { authClient } from "@/lib/auth-client";
import { LogOut, User2 } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import SearchInput from "./search-input";
import Link from "next/link";

export default function Header() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const pathname = usePathname();
  if (pathname === "/login") {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between p-2 mx-4 rounded-lg">
      <div className="flex items-center gap-10">
        <Link href="/">
          <Image
            src="/images/spotify_logo.png"
            width={125}
            height={50}
            alt="Spotify logo"
            priority
          />
        </Link>
      </div>

      <div className="flex-1 flex justify-center">
        <SearchInput />
      </div>

      <div className="flex items-center gap-6">
        {isPending && <p>Loading...</p>}
        {!isPending && (
          <div className="flex items-center gap-3 py-2 pl-2 pr-4 rounded-full bg-neutral-900 bg-opacity-70">
            {session?.user.image ? (
              <Image
                src={session?.user.image as string}
                className="object-contain w-8 h-8 rounded-full"
                alt={session?.user?.name}
                height={32}
                width={32}
              />
            ) : (
              <User2 className="p-1 rounded-full bg-neutral-900" />
            )}
            <span className="text-sm font-bold tracking-wide">
              {session?.user.name}
            </span>
          </div>
        )}

        <button
          className="flex items-center justify-center bg-neutral-900 bg-opacity-70 rounded-full  hover:bg-neutral-800 focus:outline-none cursor-pointer p-3"
          onClick={async () => {
            await authClient.signOut();
            router.push("/login");
          }}
        >
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
