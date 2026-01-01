'use client';

import React from 'react';
import { Camera } from 'lucide-react';
import { CONFIG, MOCK_DATA } from '@/lib/data';

export default function GallerySection() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16 animate-fade-in">
      <div className="text-center mb-12">
        <h2 className={`font-serif text-3xl md:text-4xl ${CONFIG.THEME.text}`}>Best Memories</h2>
        <p className="text-stone-500 mt-2">ทุกรูปคือความทรงจำที่มีค่า</p>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {MOCK_DATA.gallery.map((photo) => (
          <div key={photo.id} className="break-inside-avoid bg-white p-3 rounded-xl shadow-sm border border-stone-100 hover:shadow-lg transition-all duration-300">
            <div className={`aspect-square w-full rounded-lg mb-3 ${photo.color} flex items-center justify-center`}>
              {/* Placeholder for real image */}
               <Camera className="w-8 h-8 text-stone-400 opacity-50" />
            </div>
            <p className="text-center font-serif text-stone-600 text-sm py-2">{photo.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
}