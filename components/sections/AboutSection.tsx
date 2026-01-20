'use client';

import React from 'react';
import Image from 'next/image';
import { CONFIG, MOCK_DATA } from '@/lib/data';

export default function AboutSection() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 animate-fade-in">
      <div className="text-center mb-16">
        <h2 className={`font-serif text-3xl md:text-4xl ${CONFIG.THEME.text}`}>Couple Profile</h2>
        <p className="text-stone-500 mt-4">น่ารักเเค่10วันต่อเดือน</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 md:gap-20">
        {/* His Side */}
        <div className="text-center md:text-right">
          <div className="w-32 h-32 md:w-40 md:h-40 bg-blue-50 rounded-full mx-auto md:ml-auto md:mr-0 mb-6 flex items-center justify-center border-4 border-white shadow-lg overflow-hidden">
            {MOCK_DATA.about.his.image ? (
              <Image 
                src="/78.jpg"
                alt={MOCK_DATA.about.his.name}
                width={160}
                height={160}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-4xl">👨‍💻</span>
            )}
          </div>
          <h3 className={`text-2xl font-serif mb-2 ${CONFIG.THEME.text}`}>{MOCK_DATA.about.his.name}</h3>
          <p className="text-stone-500 leading-relaxed mb-4">{MOCK_DATA.about.his.desc}</p>
          <div className="flex flex-wrap justify-center md:justify-end gap-2">
            {MOCK_DATA.about.his.traits.map(t => (
              <span key={t} className="text-xs px-3 py-1 bg-stone-100 text-stone-600 rounded-full">{t}</span>
            ))}
          </div>
        </div>

        {/* Her Side */}
        <div className="text-center md:text-left">
          <div className="w-32 h-32 md:w-40 md:h-40 bg-pink-50 rounded-full mx-auto md:mr-auto md:ml-0 mb-6 flex items-center justify-center border-4 border-white shadow-lg overflow-hidden">
            {MOCK_DATA.about.her.image ? (
              <Image 
                src="/8.jpg"
                alt={MOCK_DATA.about.her.name}
                width={160}
                height={160}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-4xl">👩‍🎨</span>
            )}
          </div>
          <h3 className={`text-2xl font-serif mb-2 ${CONFIG.THEME.text}`}>{MOCK_DATA.about.her.name}</h3>
          <p className="text-stone-500 leading-relaxed mb-4">{MOCK_DATA.about.her.desc}</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            {MOCK_DATA.about.her.traits.map(t => (
              <span key={t} className="text-xs px-3 py-1 bg-stone-100 text-stone-600 rounded-full">{t}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-20 p-8 bg-white rounded-2xl shadow-sm text-center border border-stone-100">
        <h4 className="font-serif text-xl mb-4 text-stone-700">คำสัญญาในวันครบรอบ</h4>
        <p className="text-stone-500 max-w-2xl mx-auto italic">
          "รักเหมือนเดิม เพิ่มคือ รักนะคะ อิอิ"
        </p>
      </div>
    </div>
  );
}