'use client';

import React, { useState, useEffect, FormEvent } from 'react';
import { Heart, Calendar } from 'lucide-react'; // Import ไอคอนสำหรับหน้า Login เพิ่ม
import { CONFIG, UserAuth } from '@/lib/data';

// Components
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MusicPlayer from '@/components/MusicPlayer';

// Sections (เนื้อหาแต่ละหน้า)
import HomeSection from '@/components/sections/HomeSection';
import AboutSection from '@/components/sections/AboutSection';
import StorySection from '@/components/sections/StorySection';
import GallerySection from '@/components/sections/GallerySection';
import QuizSection from '@/components/sections/QuizSection';
import LetterSection from '@/components/sections/LetterSection';
import ContactSection from '@/components/sections/ContactSection';

// ---------------------------------------------
// 🔐 Login Page Component (ใส่ไว้ในไฟล์นี้เลย)
// ---------------------------------------------
interface LoginPageProps {
  onLogin: (user: UserAuth) => void;
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [date, setDate] = useState('');
  const [role, setRole] = useState('guest');
  const [error, setError] = useState('');

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    // ตรวจสอบรหัสผ่าน (วันครบรอบ)
    if (date.includes(CONFIG.ANNIVERSARY_PASS)) {
      onLogin({ role, isLoggedIn: true });
    } else {
      setError('รหัสวันครบรอบผิดนะ จำไม่ได้หรอ? น้อยใจนะ!');
    }
  };

  return (
    <div className={`min-h-screen ${CONFIG.THEME.bg} flex items-center justify-center p-4`}>
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-stone-100 text-center animate-fade-in-up">
        <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <Heart className={`w-8 h-8 ${CONFIG.THEME.accent} fill-current`} />
        </div>
        <h1 className="font-serif text-2xl text-stone-800 mb-2">Anniversary Page</h1>
        <p className="text-stone-500 text-sm mb-8">ใส่รหัสวันครบรอบของเราเพื่อเข้าสู่เว็บไซต์</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
             <Calendar className="absolute left-4 top-3.5 w-5 h-5 text-stone-400" />
             <input 
              type="text" 
              placeholder="DDMM (เช่น 1402)" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-200 text-stone-700"
            />
          </div>
          
          

          {error && <p className="text-red-400 text-xs">{error}</p>}

          <button 
            type="submit"
            className={`w-full ${CONFIG.THEME.primary} ${CONFIG.THEME.primaryHover} text-white font-medium py-3 rounded-xl shadow-md hover:shadow-lg transition-all mt-2`}
          >
            เปิดกล่องของขวัญ 🎁
          </button>
        </form>
      </div>
    </div>
  );
};

// ---------------------------------------------
// 🚀 Main App Component
// ---------------------------------------------
export default function App() {
  const [auth, setAuth] = useState<UserAuth>({ isLoggedIn: false, role: null });
  const [currentPage, setCurrentPage] = useState('home');

  // ตรวจสอบ Session (ถ้าอยากให้ล็อกอินใหม่ทุกครั้งที่รีเฟรช ให้ลบ useEffect นี้ออก)
  useEffect(() => {
    const session = localStorage.getItem('couple_auth_session');
    if (session) {
      setAuth(JSON.parse(session));
    }
  }, []);

  const handleLogin = (user: UserAuth) => {
    setAuth(user);
    localStorage.setItem('couple_auth_session', JSON.stringify(user));
  };

  const handleLogout = () => {
    setAuth({ isLoggedIn: false, role: null });
    localStorage.removeItem('couple_auth_session');
    setCurrentPage('home');
  };

  // 🔒 Login Guard
  if (!auth.isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // 🔀 Route Switcher
  const renderPage = () => {
    switch(currentPage) {
      case 'home': return <HomeSection setPage={setCurrentPage} />;
      case 'about': return <AboutSection />;
      case 'story': return <StorySection />;
      case 'gallery': return <GallerySection />;
      case 'quiz': return <QuizSection />;
      case 'letter': return <LetterSection />;
      case 'contact': return <ContactSection />;
      default: return <HomeSection setPage={setCurrentPage} />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${CONFIG.THEME.bg} font-sans selection:bg-rose-200 selection:text-rose-900`}>
      <Navbar activePage={currentPage} setPage={setCurrentPage} onLogout={handleLogout} />
      
      <main className="flex-grow">
        {renderPage()}
      </main>

      <MusicPlayer />
      <Footer />
      
      {/* CSS Utilities for Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-fade-in-down {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}