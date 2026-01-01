'use client';

import React, { useState } from 'react';
import { Heart, Menu, X } from 'lucide-react';
import { CONFIG, MENU_ITEMS } from '@/lib/data';

interface NavbarProps {
  activePage: string;
  setPage: (page: string) => void;
  onLogout: () => void;
}

export default function Navbar({ activePage, setPage, onLogout }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-stone-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
         <button
  onClick={() => setPage('home')}
  className="flex items-center gap-2"
>
  <img
    src="https://res.cloudinary.com/dlepqo9ao/image/upload/v1767290777/next-upload/jhhbw4xt4evffzpf4t0h.jpg"
    alt="Anniversary Logo"
    className="w-12 h-12 rounded-full object-cover"
  />
</button>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-1">
            {MENU_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className={`px-3 py-2 rounded-full text-xs lg:text-sm font-medium transition-all duration-300
                  ${activePage === item.id 
                    ? `${CONFIG.THEME.primary} text-white shadow-md` 
                    : `text-stone-600 hover:bg-stone-100`
                  }`}
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={onLogout}
              className="ml-4 px-4 py-2 text-sm text-stone-400 hover:text-stone-600"
            >
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-stone-600">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-stone-100 animate-fade-in-down">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {MENU_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setPage(item.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium
                  ${activePage === item.id 
                    ? `${CONFIG.THEME.primary} text-white` 
                    : `text-stone-600 hover:bg-stone-50`
                  }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
            <button 
              onClick={onLogout}
              className="w-full text-left px-4 py-3 text-stone-400 text-sm border-t border-stone-100 mt-2"
            >
              Log out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}