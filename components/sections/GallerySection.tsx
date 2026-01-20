'use client';

import React from 'react';
import { Heart } from 'lucide-react';

const MEMORIES = [
  { 
    id: 1, 
    caption: "เดตแรกของเราที่คาเฟ่", 
    role: "First Date", 
    img: "/78.jpg" 
  },
  { 
    id: 2, 
    caption: "ทริปทะเลแสนสนุก", 
    role: "Trip", 
    img: "/mu.jpg" 
  },
  { 
    id: 3, 
    caption: "เซอร์ไพรส์วันเกิด", 
    role: "Birthday", 
    img: "/1.jpg" 
  },
  { 
    id: 4, 
    caption: "ดินเนอร์ใต้แสงเทียน", 
    role: "Dinner", 
    img: "/3.jpg" 
  },
  { 
    id: 5, 
    caption: "รูปคู่ใบแรก", 
    role: "First Photo", 
    img: "/6.jpg" 
  },
  { 
    id: 6, 
    caption: "รอยยิ้มหวานๆ", 
    role: "Smile", 
    img: "/11.jpg" 
  },
  { 
    id: 7, 
    caption: "รอยยิ้มหวานๆ", 
    role: "Smile", 
    img: "14.jpg" 
  },
  { 
    id: 8, 
    caption: "รอยยิ้มหวานๆ", 
    role: "Smile", 
    img: "/15.jpg" 
  },
  { 
    id: 9, 
    caption: "รอยยิ้มหวานๆ", 
    role: "Smile", 
    img: "/46.jpg" 
  },
  { 
    id: 10, 
    caption: "รอยยิ้มหวานๆ", 
    role: "Smile", 
    img: "/9.jpg" 
  },
  { 
    id: 11, 
    caption: "รอยยิ้มหวานๆ", 
    role: "Smile", 
    img: "/12.jpg" 
  },
  { 
    id: 12, 
    caption: "รอยยิ้มหวานๆ", 
    role: "Smile", 
    img: "/51.jpg" 
  },
  { 
    id: 13, 
    caption: "รอยยิ้มหวานๆ", 
    role: "Smile", 
    img: "/8.jpg" 
  },
];

export default function GallerySection() {
  return (
    <section className="min-h-screen w-full flex items-center justify-center py-20 px-4 bg-stone-50 font-sans">
      <div className="container mx-auto max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-12 space-y-2">
          <h2 className="text-4xl md:text-5xl font-bold text-stone-800 tracking-tight">
            Best Memories
          </h2>
          <p className="text-stone-500 text-lg">
            น่ารักนิเวลาไม่ขี้วีน
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          
          {MEMORIES.map((item) => (
            <div 
              key={item.id} 
              // group: ตัวแปรสำคัญ! บอกให้ลูกๆ รู้ว่า "ถ้าแม่โดน hover ลูกต้องขยับนะ"
              className="group relative h-[450px] rounded-[30px] overflow-hidden shadow-xl cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >

              {/* --- Layer 1: รูปภาพ --- */}
              {/* ใช้ <img> ธรรมดา แต่ใส่ object-cover เพื่อให้เต็มกรอบ */}
              <img 
                src={item.img} 
                alt={item.role}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              
              {/* Overlay Gradient บางๆ ด้านล่าง เพื่อให้รูปดูมีมิติ */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60 group-hover:opacity-0 transition-opacity duration-300" />


              {/* --- Layer 2: เนื้อหา (โผล่มาเมื่อ Hover) --- */}
              <div className="absolute inset-0 bg-stone-900/90 backdrop-blur-[2px] flex flex-col items-center justify-center p-8 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
                
                {/* Role (ขยับขึ้นเล็กน้อยเมื่อโผล่มา) */}
                <span className="text-amber-400 text-xs font-bold tracking-[0.2em] uppercase mb-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  {item.role}
                </span>

                {/* Caption */}
                <h3 className="text-2xl font-bold text-white mb-6 leading-relaxed translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                  "{item.caption}"
                </h3>

                {/* Heart Icon */}
                <div className="bg-white/10 p-3 rounded-full backdrop-blur-md translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150 hover:bg-white/20">
                   <Heart className="w-8 h-8 text-rose-400 fill-rose-400 animate-pulse" />
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}