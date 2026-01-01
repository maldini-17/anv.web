'use client';

import React, { useState } from 'react';
import { X, Gift } from 'lucide-react';
import { MOCK_DATA, CONFIG, Reward } from '@/lib/data';

export default function RewardWheel({ onFinish }: { onFinish: () => void }) {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<Reward | null>(null);
  const [rotation, setRotation] = useState(0);

  const rewards = MOCK_DATA.rewards;
  const numSegments = rewards.length;
  const segmentAngle = 360 / numSegments;

  const spin = () => {
    if (spinning || result) return;

    setSpinning(true);
    const randomSpin = 1800 + Math.random() * 360; 
    setRotation(rotation + randomSpin);

    setTimeout(() => {
      setSpinning(false);
      const picked = rewards[Math.floor(Math.random() * rewards.length)]; 
      setResult(picked);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full text-center relative shadow-2xl overflow-hidden">
        <button 
          onClick={onFinish}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-600"
        >
          <X className="w-6 h-6" />
        </button>

        {!result ? (
          <>
            <h3 className="font-serif text-2xl text-stone-800 mb-6">🎁 หมุนวงล้อรับรางวัล!</h3>
            <div className="relative w-64 h-64 mx-auto mb-8">
              {/* Pointer */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 text-rose-500">
                <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[20px] border-t-rose-500"></div>
              </div>
              
              {/* Wheel */}
              <div 
                className="w-full h-full rounded-full border-4 border-white shadow-lg transition-transform duration-[3000ms] ease-out relative overflow-hidden"
                style={{ 
                  transform: `rotate(${rotation}deg)`,
                  background: `conic-gradient(
                    ${rewards.map((r, i) => `${r.color} ${i * (100/numSegments)}% ${(i+1) * (100/numSegments)}%`).join(', ')}
                  )`
                }}
              >
                {/* Lines separating segments */}
                {rewards.map((_, i) => (
                  <div 
                    key={i} 
                    className="absolute w-full h-[1px] bg-white/50 top-1/2 left-0 origin-center"
                    style={{ transform: `rotate(${i * segmentAngle}deg)` }}
                  />
                ))}
              </div>

              {/* Center Button */}
              <button
                onClick={spin}
                disabled={spinning}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center font-bold text-rose-500 hover:scale-105 transition-transform z-10 border-4 border-rose-100"
              >
                {spinning ? '...' : 'SPIN'}
              </button>
            </div>
            <p className="text-stone-400 text-sm">ลุ้นของขวัญพิเศษจากเค้าเอง!</p>
          </>
        ) : (
          <div className="py-8 animate-fade-in-up">
            <div className="w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Gift className="w-12 h-12 text-rose-500" />
            </div>
            <h3 className="text-xl text-stone-500 mb-2">ยินดีด้วย! คุณได้รับ</h3>
            <div className="text-3xl font-serif font-bold text-rose-500 mb-8 px-4 py-2 border-2 border-rose-100 rounded-xl inline-block">
              {result.label}
            </div>
            <button
              onClick={onFinish}
              className={`${CONFIG.THEME.primary} text-white px-8 py-3 rounded-full font-medium hover:opacity-90 transition-all shadow-lg`}
            >
              รับรางวัลเลย ❤️
            </button>
          </div>
        )}
      </div>
    </div>
  );
}