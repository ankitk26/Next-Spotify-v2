import { getLikedSongs } from "@/actions/get-liked-songs";
import TracksTable from "@/components/tracks-table";
import { auth } from "@/lib/auth";
import { Dot } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";

export const metadata = {
  title: "Spotify - Liked Songs",
  description: "Songs liked by you",
};

export default async function LikedTracksPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const likedTracks = await getLikedSongs();

  return (
    <>
      <div className="flex items-end gap-6">
        <Image
          src="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"
          alt="Liked Songs"
          height={208}
          width={208}
          priority
        />
        <div className="flex flex-col gap-3">
          <h5 className="text-sm font-bold">Playlist</h5>
          <h2 className="mt-2 text-6xl font-bold">Liked Songs</h2>

          <div className="flex items-center text-sm font-semibold">
            <span>{session?.user.name}</span>
            {likedTracks.total > 0 && (
              <>
                <Dot />
                <span>{likedTracks.total} songs</span>
              </>
            )}
          </div>
        </div>
      </div>

      {likedTracks.items && (
        <TracksTable
          tracks={likedTracks.items}
          showHeader
          showAlbum
          showCover
          showSubtitle
        />
      )}
    </>
  );
}
