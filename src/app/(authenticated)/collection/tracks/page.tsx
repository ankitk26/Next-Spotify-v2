import TracksTable from "@/components/TracksTable";
import { getUserLikedSongs } from "@/lib/actions";
import { getAuthSession } from "@/utils/serverUtils";
import { Dot } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Spotify - Liked Songs",
  description: "Songs liked by you",
};

export default async function LikedTracksPage() {
  const session = await getAuthSession();

  if (!session) {
    redirect("/login");
  }

  const likedTracks = await getUserLikedSongs(session);

  return (
    <>
      <div className="flex items-end gap-6">
        <Image
          src="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"
          alt="Liked Songs"
          height={208}
          width={208}
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

      <TracksTable
        tracks={likedTracks.items}
        showHeader
        showAlbum
        showCover
        showSubtitle
      />
    </>
  );
}
