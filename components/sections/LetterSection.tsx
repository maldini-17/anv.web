'use client';

import React from 'react';

export default function LetterSection() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 animate-fade-in">
      <div className="bg-white p-8 md:p-16 rounded-lg shadow-sm border border-stone-100 relative">
        {/* Tape Effect */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-yellow-100/80 rotate-1 shadow-sm backdrop-blur-sm"></div>

        <div className="text-center mb-8">
          <h2 className="font-serif text-2xl text-stone-800">Happy Anniversary</h2>
          <span className="text-xs text-stone-400 uppercase tracking-widest mt-2 block">จากใจถึงใจ</span>
        </div>

        <article className="prose prose-stone font-serif mx-auto leading-loose text-stone-600">
          <p className="indent-8">
            สุขสันต์วันครบรอบนะคนเก่งของบัง
          </p>
          <p>
            อยากพูดให้ซึ้งเเบบคนอื่นหรอกนะเเต่ติดตรงที่ติดเล่น555555 
          </p>
          <p>
            ปีนี้อาจจะมีเรื่องราวมากมายเกิดขึ้น ทั้งดีและร้าย แต่ก็ยังดีมีน้องอยู่ข้างๆ ทุกอย่างมันเลยผ่านมาได้
            อยู่ฉลองวันครบรอบด้วยกันไปนานๆ นะ
          </p>
          <p>
             รักน้องมี่ที่สุดในโลกเลย
          </p>
        </article>

        <div className="mt-12 text-right">
           <p className="font-serif italic text-stone-500">To Nazmi,</p>
           <p className="font-bold text-stone-700 mt-1">บังนี่ ❤️</p>
        </div>
      </div>
    </div>
  );
}