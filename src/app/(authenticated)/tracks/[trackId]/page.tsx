import PlayTrackButton from "@/components/PlayTrackButton";
import TrackRecommendations from "@/components/TrackRecommendations";
import { getTrackById } from "@/lib/actions";
import { fmtMSS } from "@/utils/clientUtils";
import { getAuthSession } from "@/utils/serverUtils";
import { Dot, Music } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

interface Props {
  params: {
    trackId: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const session = await getAuthSession();
  if (!session) {
    return {
      title: "Error in loading track data",
    };
  }
  const trackId = params.trackId;
  const track = await getTrackById(session, trackId);

  return {
    title: `Spotify - ${track.name}`,
  };
}

export default async function AlbumPage({ params }: Props) {
  const session = await getAuthSession();

  if (!session) {
    redirect("/login");
  }
  const trackId = params.trackId;
  const track = await getTrackById(session, trackId);

  return (
    <>
      <div className="flex items-end gap-6">
        <>
          {track.album.images && track.album.images.length > 0 ? (
            <Image
              src={track.album.images[0].url}
              alt={track.album.name}
              height={208}
              width={208}
              className="object-contain rounded-sm w-52 h-52"
              priority
            />
          ) : (
            <div className="w-full h-40">
              <Music size={160} className="w-full h-full bg-paper " />
            </div>
          )}
          <div className="flex flex-col gap-3">
            <h5 className="text-xs font-bold uppercase">Song</h5>
            <h2 className="text-5xl font-bold">{track.name}</h2>

            <div className="flex items-center text-sm">
              <Link
                href={`/artists/${track.artists[0].id}`}
                className="font-bold hover:underline"
              >
                {track.artists[0].name}
              </Link>
              <Dot />
              <Link
                href={`/albums/${track.album.id}`}
                className="hover:underline"
              >
                {track.album.name}
              </Link>
              <Dot />
              <span>{new Date(track.album.release_date).getFullYear()}</span>
              <Dot />
              <span>{fmtMSS(track.duration_ms)}</span>
            </div>
          </div>
        </>
      </div>

      <PlayTrackButton
        track={track}
        variant="filled"
        className="mt-8 text-4xl h-14 w-14"
      />

      <TrackRecommendations trackId={trackId} />
    </>
  );
}
