'use client';

import React, { useState, useRef } from 'react';
import { Play, Pause } from 'lucide-react';
import { CONFIG } from '@/lib/data';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio ref={audioRef} loop src={CONFIG.MUSIC_URL} />
      <button
        onClick={togglePlay}
        className={`flex items-center gap-2 px-4 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 border border-white/50 backdrop-blur-sm
          ${isPlaying ? 'bg-rose-400 text-white animate-pulse' : 'bg-white text-stone-600'}`}
      >
        {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
        <span className="font-medium text-sm hidden md:inline">{isPlaying ? 'Our Song' : 'Play Music'}</span>
      </button>
    </div>
  );
}