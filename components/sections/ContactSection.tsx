'use client';

import React, { useState, useEffect, FormEvent } from 'react';
import { User } from 'lucide-react';
import { CONFIG, Message } from '@/lib/data';

export default function ContactSection() {
  const [formData, setFormData] = useState({ from: '', message: '' });
  const [savedMessages, setSavedMessages] = useState<Message[]>([]);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    const saved = localStorage.getItem('couple_messages');
    if (saved) setSavedMessages(JSON.parse(saved));
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.from || !formData.message) return;

    setStatus('submitting');
    
    setTimeout(() => {
      const newMessage: Message = { ...formData, id: Date.now(), date: new Date().toLocaleDateString() };
      const updatedMessages = [newMessage, ...savedMessages];
      
      setSavedMessages(updatedMessages);
      localStorage.setItem('couple_messages', JSON.stringify(updatedMessages));
      
      setFormData({ from: '', message: '' });
      setStatus('success');
      
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 animate-fade-in">
      <div className="text-center mb-10">
        <h2 className={`font-serif text-3xl ${CONFIG.THEME.text}`}>Anniversary Wishes</h2>
        <p className="text-stone-500 text-sm mt-2">พิมพ์คำอวยพรหรือสิ่งที่อยากบอกเก็บไว้ที่นี่</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 mb-10">
        <div className="mb-4">
          <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">From</label>
          <select 
            value={formData.from}
            onChange={(e) => setFormData({...formData, from: e.target.value})}
            className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 text-stone-700 focus:outline-none focus:ring-2 focus:ring-rose-200"
          >
            <option value="">-- เลือกผู้ส่ง --</option>
            <option value="Him">Him (เค้าเอง)</option>
            <option value="Her">Her (เธอเอง)</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Message</label>
          <textarea 
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 text-stone-700 focus:outline-none focus:ring-2 focus:ring-rose-200 h-32 resize-none"
            placeholder="ขอให้เรา..."
          ></textarea>
        </div>
        <button 
          disabled={status === 'submitting'}
          className={`w-full ${CONFIG.THEME.primary} text-white font-medium py-3 rounded-lg hover:shadow-lg transition-all 
            ${status === 'submitting' ? 'opacity-70 cursor-not-allowed' : CONFIG.THEME.primaryHover}`}
        >
          {status === 'submitting' ? 'Saving...' : status === 'success' ? 'Saved! 🎁' : 'Save Wish'}
        </button>
      </form>

      {/* Message History */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-stone-400 uppercase tracking-wider text-center mb-6">All Wishes</h3>
        {savedMessages.length === 0 ? (
          <p className="text-center text-stone-300 text-sm italic">ยังไม่มีคำอวยพร เขียนคนแรกเลย!</p>
        ) : (
          savedMessages.map((msg) => (
            <div key={msg.id} className="bg-white p-4 rounded-xl border border-stone-50 shadow-sm flex gap-4">
               <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${msg.from === 'Him' ? 'bg-blue-50 text-blue-400' : 'bg-pink-50 text-pink-400'}`}>
                 <User className="w-5 h-5" />
               </div>
               <div>
                 <div className="flex items-center gap-2 mb-1">
                   <span className="font-bold text-stone-700 text-sm">{msg.from}</span>
                   <span className="text-[10px] text-stone-400">{msg.date}</span>
                 </div>
                 <p className="text-stone-600 text-sm">{msg.message}</p>
               </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}