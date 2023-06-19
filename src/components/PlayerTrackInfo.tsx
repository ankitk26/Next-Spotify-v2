import { Music } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { RxHeartFilled } from "react-icons/rx";
import { Track } from "../types/types";

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
        <Music size={56} />
      )}
      <div className="max-w-full">
        <h4 className="text-sm font-semibold text-white truncate">
          {currentTrack?.name}
        </h4>
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
