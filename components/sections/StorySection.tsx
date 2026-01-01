'use client';

import React from 'react';
import { CONFIG, MOCK_DATA } from '@/lib/data';

export default function StorySection() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 animate-fade-in">
      <div className="text-center mb-16">
        <h2 className={`font-serif text-3xl md:text-4xl ${CONFIG.THEME.text}`}>Our Love Journey</h2>
        <p className="text-stone-500 mt-2">บันทึกการเดินทางของหัวใจ</p>
      </div>

      <div className="relative border-l-2 border-stone-200 ml-4 md:ml-auto md:mr-auto md:w-full space-y-12 pb-12">
        {MOCK_DATA.stories.map((story, idx) => (
          <div key={story.id} className="relative pl-8 md:pl-0">
            {/* Dot */}
            <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white ${idx === MOCK_DATA.stories.length - 1 ? 'bg-rose-500 animate-pulse' : 'bg-stone-300'} md:left-1/2 md:-ml-2 shadow-sm`}></div>
            
            <div className={`md:flex items-start justify-between ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              {/* Date */}
              <div className={`mb-2 md:mb-0 md:w-5/12 ${idx % 2 === 0 ? 'md:text-left md:pl-8' : 'md:text-right md:pr-8'}`}>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${idx === MOCK_DATA.stories.length - 1 ? 'bg-rose-100 text-rose-600' : 'bg-stone-100 text-stone-500'}`}>
                  {story.date}
                </span>
              </div>
              
              {/* Content */}
              <div className={`bg-white p-6 rounded-2xl shadow-sm border border-stone-100 md:w-5/12 hover:shadow-md transition-shadow`}>
                <h3 className="font-serif text-xl font-medium mb-3 text-stone-800">{story.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{story.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}