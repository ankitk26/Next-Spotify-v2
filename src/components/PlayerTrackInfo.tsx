import { RxHeartFilled } from "react-icons/rx";
import Image from "next/image";
import Link from "next/link";
import { Track } from "../types/types";
import { Music } from "lucide-react";

interface IProps {
  currentTrack: Track;
}

export default function PlayerTrackInfo({ currentTrack }: IProps) {
  return (
    <div className="flex items-center col-span-3 gap-3">
      {currentTrack.album ? (
        <Image
          src={currentTrack.album.images[0].url}
          alt={currentTrack.name}
          height={56}
          width={56}
          className="object-cover rounded-lg w-14 h-14 aspect-square"
        />
      ) : (
        <Music size={40} />
      )}
      <div className="max-w-full">
        <h4 className="text-sm font-semibold truncate">{currentTrack?.name}</h4>
        <Link
          href={`/artist/${currentTrack?.artists[0].id}`}
          className="text-xs text-gray"
        >
          {currentTrack?.artists[0].name}
        </Link>
      </div>
      <button>
        <RxHeartFilled className="text-xl text-primary" />
      </button>
    </div>
  );
}
