"use client";

import { usePlayer } from "@/providers/TrackPlayerProvider";
import { fmtMSS } from "@/utils/clientUtils";
import * as Progress from "@radix-ui/react-progress";
import { Repeat2, Shuffle, SkipBack, SkipForward } from "lucide-react";
import { MdPause, MdPlayArrow } from "react-icons/md";

export default function MainControllers() {
  const {
    isPlaying,
    setSlider,
    setDrag,
    togglePlay,
    duration,
    currentTime,
    slider,
  } = usePlayer();

  return (
    <div className="flex flex-col items-center justify-center col-span-7 gap-3">
      <div className="flex items-center gap-5">
        <button>
          <Shuffle size={16} className="text-gray" />
        </button>
        <button>
          <SkipBack size={18} className="text-xl text-gray" />
        </button>
        <button
          onClick={togglePlay}
          className="flex items-center justify-center w-8 h-8 p-0 text-black bg-white rounded-full focus:outline-none"
        >
          {isPlaying ? (
            <MdPause className="text-2xl text-paper-700" />
          ) : (
            <MdPlayArrow className="text-2xl text-paper-700" />
          )}
        </button>
        <button>
          <SkipForward size={18} className="text-gray" />
        </button>
        <button>
          <Repeat2 size={16} className="text-gray" />
        </button>
      </div>

      <div className="flex items-center justify-center w-full gap-2">
        <span className="text-xs text-gray">
          {currentTime ? fmtMSS(currentTime * 1000) : "0:00"}
        </span>
        <Progress.Root
          className="relative w-1/2 h-1 overflow-hidden rounded-full bg-gray-dark"
          style={{ transform: "translateZ(0)" }}
          value={slider}
        >
          <Progress.Indicator
            className="bg-white w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
            style={{ transform: `translateX(-${100 - slider}%)` }}
          />
        </Progress.Root>
        {/* <input
          type="range"
          className={styles.player}
          value={slider}
          onChange={(e) => {
            setSlider(parseInt(e.target.value));
            setDrag(parseInt(e.target.value));
          }}
        /> */}
        <span className="text-xs text-gray">
          {duration ? fmtMSS(duration * 1000) : "0:00"}
        </span>
      </div>
    </div>
  );
}
