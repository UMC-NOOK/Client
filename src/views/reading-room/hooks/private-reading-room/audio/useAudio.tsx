// hooks/useAudio.ts
import { useEffect, useRef, useState } from 'react';

interface UseAudioReturn {
  isPlaying: boolean;
  isLoaded: boolean;
  volume: number;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  setVolume: (volume: number) => void;
}

const useAudio = (src: string | null): UseAudioReturn => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [volume, setVolumeState] = useState<number>(0.5);

  useEffect(() => {
    if (src) {
      audioRef.current = new Audio(src);
      audioRef.current.loop = true;
      audioRef.current.volume = volume;

      const audio = audioRef.current;

      const handleLoadedData = (): void => setIsLoaded(true);
      const handleEnded = (): void => setIsPlaying(false);

      audio.addEventListener('loadeddata', handleLoadedData);
      audio.addEventListener('ended', handleEnded);

      return () => {
        audio.removeEventListener('loadeddata', handleLoadedData);
        audio.removeEventListener('ended', handleEnded);
        audio.pause();
        audio.currentTime = 0;
      };
    }
  }, [src, volume]);

  const play = (): void => {
    if (audioRef.current && isLoaded) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((error: Error) => console.error('Audio play failed:', error));
    }
  };

  const pause = (): void => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggle = (): void => {
    isPlaying ? pause() : play();
  };

  const setVolume = (newVolume: number): void => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolumeState(clampedVolume);

    if (audioRef.current) {
      audioRef.current.volume = clampedVolume;
    }
  };

  return {
    isPlaying,
    isLoaded,
    volume,
    play,
    pause,
    toggle,
    setVolume,
  };
};

export default useAudio;
