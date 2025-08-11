"use client";

import { LogOut, User2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import SearchInput from "./search-input";

export default function Header() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const pathname = usePathname();
  if (pathname === "/login") {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 mx-4 flex items-center justify-between rounded-lg p-2">
      <div className="flex items-center gap-10">
        <Link href="/">
          <Image
            alt="Spotify logo"
            height={50}
            priority
            src="https://res.cloudinary.com/drnu1myuq/image/upload/v1754937393/spotify_logo_xmxgc6.png"
            width={125}
          />
        </Link>
      </div>

      <div className="flex flex-1 justify-center">
        <SearchInput />
      </div>

      <div className="flex items-center gap-6">
        {isPending && <p>Loading...</p>}
        {!isPending && (
          <div className="flex items-center gap-3 rounded-full bg-neutral-900 bg-opacity-70 py-2 pr-4 pl-2">
            {session?.user.image ? (
              <Image
                alt={session?.user?.name}
                className="h-8 w-8 rounded-full object-contain"
                height={32}
                src={session?.user.image as string}
                width={32}
              />
            ) : (
              <User2 className="rounded-full bg-neutral-900 p-1" />
            )}
            <span className="font-bold text-sm tracking-wide">
              {session?.user.name}
            </span>
          </div>
        )}

        <button
          className="flex cursor-pointer items-center justify-center rounded-full bg-neutral-900 bg-opacity-70 p-3 hover:bg-neutral-800 focus:outline-none"
          onClick={async () => {
            await authClient.signOut();
            router.push("/login");
          }}
          type="button"
        >
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
