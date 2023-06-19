"use client";

import { useStore } from "@/providers/zustand";
import { Track } from "@/types/types";
import { MdPlayArrow } from "react-icons/md";

interface Props {
  variant?: "simple" | "filled";
  track: Track;
  className?: string;
}

export default function PlayTrackButton({
  variant = "simple",
  track,
  className,
}: Props) {
  const { setCurrentTrack } = useStore();

  const simpleButtonStyle = "flex items-center col-span-1 text-white";
  const filledButtonStyle =
    "flex items-center justify-center rounded-full bg-primary";

  return (
    <button
      className={`${
        variant === "filled" ? filledButtonStyle : simpleButtonStyle
      } ${className} ${!track.preview_url && "cursor-not-allowed"}`}
      onClick={(e) => {
        e.preventDefault();
        if (track.preview_url) {
          setCurrentTrack(track);
        }
      }}
      disabled={track.preview_url === null}
    >
      <MdPlayArrow
        className={
          variant === "filled"
            ? "text-paper-700"
            : "flex items-center text-white"
        }
      />
    </button>
  );
}
