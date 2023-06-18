"use client";

import { usePlayer } from "@/providers/TrackPlayerProvider";
import { Track } from "@/types/types";
import { MdPlayArrow } from "react-icons/md";

interface Props {
  variant: "large" | "small";
  track: Track;
}

export default function PlayTrackButton({ variant, track }: Props) {
  const { setCurrentTrack } = usePlayer();

  const smallButtonStyle = "flex items-center col-span-1 text-white";
  const largeButtonStyle =
    "flex items-center justify-center mt-8 rounded-full w-14 h-14 bg-primary";

  const playTrack = (track: Track) => {
    if (track.preview_url) {
      setCurrentTrack(track);
    }
  };

  return (
    <button
      className={variant === "large" ? largeButtonStyle : smallButtonStyle}
      onClick={() => playTrack(track)}
      disabled={track.preview_url === null}
    >
      <MdPlayArrow
        className={
          variant === "large"
            ? "text-4xl text-paper-700"
            : "flex items-center text-2xl text-white"
        }
      />
    </button>
  );
}
