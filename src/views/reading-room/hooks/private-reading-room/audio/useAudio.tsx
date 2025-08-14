// hooks/useAudio.ts
import { useRef, useEffect, useState } from 'react';

interface UseAudioOptions {
  volume?: number;
  loop?: boolean;
  autoPlay?: boolean;
}

const useAudio = (url: string, options: UseAudioOptions = {}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fullUrl = `${import.meta.env.VITE_API_BASE_URL}${url}`.replace(
    /([^:]\/)\/+/g,
    '$1',
  );
  console.log(fullUrl);

  useEffect(() => {
    if (url) {
      audioRef.current = new Audio(url);
      audioRef.current.loop = options.loop ?? true;
      audioRef.current.volume = options.volume ?? 0.5;

      const audio = audioRef.current;

      const handleLoadStart = () => setIsLoading(true);
      const handleCanPlay = () => setIsLoading(false);
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      const handleEnded = () => setIsPlaying(false);

      audio.addEventListener('loadstart', handleLoadStart);
      audio.addEventListener('canplay', handleCanPlay);
      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);
      audio.addEventListener('ended', handleEnded);

      return () => {
        audio.removeEventListener('loadstart', handleLoadStart);
        audio.removeEventListener('canplay', handleCanPlay);
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
        audio.removeEventListener('ended', handleEnded);
        audio.pause();
        audioRef.current = null;
      };
    }
  }, [url, options.loop, options.volume]);

  const play = async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play();
      } catch (error) {
        console.error('Audio play failed:', error);
      }
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const setVolume = (volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, volume));
    }
  };

  return {
    play,
    pause,
    togglePlay,
    setVolume,
    isPlaying,
    isLoading,
  };
};

export default useAudio;
