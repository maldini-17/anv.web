'use client';

import React from 'react';
import { Heart } from 'lucide-react';
import { CONFIG } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="bg-white py-8 border-t border-stone-100 mt-auto">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="flex justify-center gap-2 mb-4">
          <Heart className={`w-5 h-5 ${CONFIG.THEME.accent}`} />
        </div>
        <p className={`font-serif text-lg ${CONFIG.THEME.text}`}>Happy Anniversary My Love</p>
        <p className="text-stone-400 text-sm mt-2">Forever & Always</p>
      </div>
    </footer>
  );
}