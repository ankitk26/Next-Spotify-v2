import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Track } from "../types/types";

interface IProps {
  currentTrack: Track;
}

export default function PlayerTrackInfo({ currentTrack }: IProps) {
  return (
    <div className="flex items-center col-span-3 gap-3">
      {currentTrack.album && (
        <Image
          src={currentTrack.album.images?.[0].url as string}
          alt={currentTrack.name}
          height={56}
          width={56}
          className="w-14 h-14"
        />
      )}
      <div className="max-w-full">
        <h4 className="text-sm truncate">{currentTrack?.name}</h4>
        <Link href={`/artist/${currentTrack?.artists[0].id}`}>
          <h5 className="text-xs text-gray">{currentTrack?.artists[0].name}</h5>
        </Link>
      </div>
      <button>
        <Heart size={16} fill="#1DB954" className="text-xl text-primary" />
      </button>
    </div>
  );
}
