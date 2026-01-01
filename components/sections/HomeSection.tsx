'use client';

import React, { useState, useEffect } from 'react';
import { Clock, Mail, HelpCircle } from 'lucide-react';
import { CONFIG } from '@/lib/data';

interface HomeSectionProps {
  setPage: (page: string) => void;
}

export default function HomeSection({ setPage }: HomeSectionProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const start = new Date(CONFIG.START_DATE).getTime();
      const now = new Date().getTime();
      const difference = now - start;

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="animate-fade-in">
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <span className={`inline-block px-4 py-1.5 rounded-full text-xs tracking-widest uppercase mb-6 bg-white border border-stone-200 ${CONFIG.THEME.text}`}>
            🎉 Happy Anniversary 🎉
          </span>
          <h1 className={`font-serif text-4xl md:text-6xl lg:text-7xl font-medium leading-tight mb-8 ${CONFIG.THEME.text}`}>
            สุขสันต์วันครบรอบนะ<br/>
            <span className={`${CONFIG.THEME.accent}`}>ที่รักของเค้า</span>
          </h1>

          <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-stone-100 shadow-sm mb-10 max-w-2xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-200 via-rose-400 to-rose-200"></div>
            <div className="flex items-center justify-center gap-2 mb-4 text-stone-500 text-sm uppercase tracking-wider">
              <Clock className="w-4 h-4" />
              <span>We have been together for</span>
            </div>
            <div className="grid grid-cols-4 gap-4 md:gap-8 divide-x divide-stone-200/50">
              <div className="text-center">
                <span className={`block text-2xl md:text-4xl font-bold ${CONFIG.THEME.text}`}>{timeLeft.days}</span>
                <span className="text-xs text-stone-400 uppercase">Days</span>
              </div>
              <div className="text-center pl-4">
                <span className={`block text-2xl md:text-4xl font-bold ${CONFIG.THEME.text}`}>{timeLeft.hours}</span>
                <span className="text-xs text-stone-400 uppercase">Hrs</span>
              </div>
              <div className="text-center pl-4">
                <span className={`block text-2xl md:text-4xl font-bold ${CONFIG.THEME.text}`}>{timeLeft.minutes}</span>
                <span className="text-xs text-stone-400 uppercase">Mins</span>
              </div>
              <div className="text-center pl-4">
                <span className={`block text-2xl md:text-4xl font-bold ${CONFIG.THEME.text}`}>{timeLeft.seconds}</span>
                <span className="text-xs text-stone-400 uppercase">Secs</span>
              </div>
            </div>
          </div>

          <p className="text-lg md:text-xl text-stone-500 mb-10 font-light max-w-2xl mx-auto leading-relaxed">
            ขอบคุณที่อยู่ข้างกันมาตลอด ขอบคุณสำหรับทุกรอยยิ้มและทุกความทรงจำดีๆ <br/>
            ปีนี้และปีต่อๆ ไป ก็ขอให้เราจับมือกันแน่นๆ แบบนี้ตลอดไปนะ
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setPage('story')}
              className={`${CONFIG.THEME.primary} ${CONFIG.THEME.primaryHover} text-white px-8 py-4 rounded-full font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-1`}
            >
              ดูเส้นทางรักของเรา
            </button>
            <button
              onClick={() => setPage('letter')}
              className={`bg-white text-stone-600 border border-stone-200 hover:bg-stone-50 px-8 py-4 rounded-full font-medium transition-all shadow-sm hover:shadow-md hover:-translate-y-1 flex items-center justify-center gap-2`}
            >
              <Mail className="w-4 h-4" />
              อ่านจดหมาย
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}