"use client";

import { Album, Artist, Playlist } from "@/types/types";
import { Layers } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import LibraryItemCard from "./LibraryItemCard";
import LibraryTypeTag from "./LibraryTypeTag";
import * as ScrollArea from "@radix-ui/react-scroll-area";

interface Props {
  playlists: Playlist[];
  artists: Artist[];
  albums: Album[];
  likedSongsCount: number;
}

export default function UserLibrary({
  playlists,
  likedSongsCount,
  albums,
  artists,
}: Props) {
  const pathname = usePathname();

  const [libraryType, setLibraryType] = useState(
    localStorage.getItem("libraryType") ?? "playlists"
  );
  console.log(libraryType);

  function handleLibraryType(newType: string) {
    setLibraryType(newType);
    localStorage.setItem("libraryType", newType);
  }

  return (
    <div className="flex flex-col items-stretch px-2 py-4 mt-2 overflow-scroll rounded-lg bg-paper-700">
      <div className="flex items-center gap-3 px-2 text-gray">
        <Layers size={20} />
        <span className="font-semibold">Your Library</span>
      </div>

      <div className="flex flex-wrap items-center gap-2 my-6 text-xs font-semibold">
        <LibraryTypeTag
          active={libraryType === "playlists"}
          onClick={() => handleLibraryType("playlists")}
        >
          Playlists
        </LibraryTypeTag>
        <LibraryTypeTag
          active={libraryType === "albums"}
          onClick={() => handleLibraryType("albums")}
        >
          Albums
        </LibraryTypeTag>
        <LibraryTypeTag
          active={libraryType === "artists"}
          onClick={() => handleLibraryType("artists")}
        >
          Artists
        </LibraryTypeTag>
      </div>

      <ul className="flex flex-col w-full pr-3 overflow-x-hidden overflow-y-scroll text-sm">
        {libraryType === "playlists" && (
          <>
            <Link
              href="/collection/tracks"
              className={`${
                pathname === "/collection/tracks" ? "bg-paper-400" : ""
              } flex items-center p-2 gap-3 rounded-md text-white cursor-pointer hover:bg-paper-600`}
            >
              <Image
                src="/images/liked_cover.jpeg"
                height={50}
                width={50}
                className="rounded-md"
                alt="Liked playlist cover"
              />

              <div className="truncate">
                <h6 className="w-full text-sm font-semibold truncate hover:text-white">
                  Liked Songs
                </h6>
                <span className="mt-1 text-xs font-medium text-gray">
                  {likedSongsCount} songs
                </span>
              </div>
            </Link>
            {playlists.map((playlist) => (
              <LibraryItemCard
                key={playlist.id}
                entity={playlist}
                type="playlists"
                subtitle={playlist.owner.display_name}
              />
            ))}
          </>
        )}

        {libraryType === "albums" &&
          albums.map((album) => (
            <LibraryItemCard
              key={album.id}
              entity={album}
              type="albums"
              subtitle={album.artists[0].name}
            />
          ))}

        {libraryType === "artists" &&
          artists.map((artist) => (
            <LibraryItemCard key={artist.id} entity={artist} type="artists" />
          ))}
      </ul>
    </div>
  );
}
