"use client";

import { Track } from "@/types/types";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface TrackProviderState {
  currentTrack: Track | null;
  setCurrentTrack: Dispatch<SetStateAction<Track | null>>;
  currentTrackAudio: HTMLAudioElement | null;
  isPlaying: boolean;
  play: () => Promise<void>;
  pause: () => void;
  togglePlay: () => Promise<void>;
  duration: number;
  currentTime: number;
  slider: number;
  setSlider: Dispatch<SetStateAction<number>>;
  drag: number;
  setDrag: Dispatch<SetStateAction<number>>;
}

const PlayerContext = createContext<TrackProviderState>({} as any);

interface Props {
  children: React.ReactNode;
}

export default function TrackPlayerProvider({ children }: Props) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [currentTrackAudio, setCurrentTrackAudio] =
    useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [slider, setSlider] = useState(1);
  const [drag, setDrag] = useState(0);

  useEffect(() => {
    if (!currentTrack) return;
    if (isPlaying) {
      pause();
      setCurrentTrackAudio(null);
    }
    const tempAudio = new Audio(currentTrack.preview_url);

    const setAudioData = () => {
      setDuration(tempAudio.duration);
      setCurrentTime(tempAudio.currentTime);
    };

    const setAudioTime = () => {
      const currTime = tempAudio.currentTime;
      setCurrentTime(currTime);
      setSlider(
        currTime
          ? Number(((currTime * 100) / tempAudio.duration).toFixed(1))
          : 0
      );
    };

    tempAudio.addEventListener("loadeddata", setAudioData);
    tempAudio.addEventListener("timeupdate", setAudioTime);
    tempAudio.preload = "none";

    setCurrentTrackAudio(tempAudio);

    return () => {
      pause();
      setCurrentTrackAudio(null);
    };
  }, [currentTrack]);

  useEffect(() => {
    const handlePlay = async () => {
      if (currentTrackAudio) {
        await play();
      }
    };
    handlePlay();
  }, [currentTrackAudio]);

  const togglePlay = async () => {
    if (isPlaying) pause();
    else await play();
  };

  const play = async () => {
    setIsPlaying(true);
    await currentTrackAudio?.play();
  };

  const pause = () => {
    setIsPlaying(false);
    currentTrackAudio?.pause();
  };

  useEffect(() => {
    if (currentTrackAudio && drag) {
      currentTrackAudio.currentTime = Math.round(
        (drag * currentTrackAudio.duration) / 100
      );
    }
  }, [drag]);

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        currentTrackAudio,
        setCurrentTrack,
        isPlaying,
        play,
        pause,
        togglePlay,
        duration,
        currentTime,
        slider,
        setSlider,
        drag,
        setDrag,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => useContext(PlayerContext);
