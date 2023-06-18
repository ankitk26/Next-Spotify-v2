import styles from "@/styles/Description.module.css";
import TracksTable from "@/components/TracksTable";
import { getPlaylistById } from "@/lib/actions";
import { getAuthSession } from "@/utils/serverUtils";
import parse from "html-react-parser";
import { Dot, Music } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";

interface Props {
  params: {
    playlistId: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const session = await getAuthSession();
  if (!session) {
    return {
      title: "Error in loading playlist data",
    };
  }
  const playlistId = params.playlistId;
  const playlist = await getPlaylistById(session, playlistId);
  return {
    title: `Spotify - ${playlist.name}`,
  };
}

export default async function PlaylistPage({ params }: Props) {
  const session = await getAuthSession();
  if (!session) {
    redirect("/login");
  }

  const playlistId = params.playlistId;
  const playlist = await getPlaylistById(session, playlistId);

  return (
    <>
      <div className="flex items-end gap-6">
        {playlist && (
          <>
            {playlist.images.length > 0 ? (
              <Image
                src={playlist.images[0].url}
                alt={playlist.name}
                height={240}
                width={240}
                className="object-contain rounded-sm w-60 h-60"
              />
            ) : (
              <div className="w-full h-40">
                <Music size={160} className="w-full h-full bg-paper " />
              </div>
            )}

            <div className="flex flex-col gap-3">
              <h5 className="text-xs font-bold uppercase">{playlist.type}</h5>
              <h2 className="text-6xl font-bold">{playlist.name}</h2>

              {playlist.description && (
                <p className={styles.description + " font-medium mt-3"}>
                  {parse(playlist.description)}
                </p>
              )}

              <div className="flex items-center text-sm font-semibold">
                <span>{playlist.owner?.display_name}</span>
                {playlist.followers.total > 0 && (
                  <>
                    <Dot />
                    <span>
                      {playlist.followers.total.toLocaleString()}{" "}
                      {playlist.followers.total > 1 ? "likes" : "like"}
                    </span>
                  </>
                )}
                {playlist.tracks.items.length > 0 && (
                  <>
                    <Dot />
                    <span>{playlist.tracks.total.toLocaleString()} songs</span>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="mt-5">
        <TracksTable
          tracks={playlist?.tracks.items
            .filter((item: any) => item.track !== null)
            .map((item: any) => item.track)}
          showAlbum
          showCover
          showHeader
          showSubtitle
        />
      </div>
    </>
  );
}
