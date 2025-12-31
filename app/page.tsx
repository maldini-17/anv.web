'use client';

import React, { useState, useEffect, FormEvent, useRef } from 'react';
import { Heart, Menu, X, Camera, Mail, Calendar, User, Send, BookOpen, Home, Image as ImageIcon, HelpCircle, Star, RefreshCw, Music, Play, Pause, Clock, Gift } from 'lucide-react';

// ==========================================
// 🛠 TYPES & CONFIG
// ==========================================

interface Message {
  id: number;
  date: string;
  from: string;
  message: string;
}

interface UserAuth {
  isLoggedIn: boolean;
  role: string | null;
}

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
}

const CONFIG = {
  ANNIVERSARY_PASS: "1402", // รหัสผ่าน (วันครบรอบ)
  START_DATE: "2023-02-14T00:00:00", // วันเริ่มคบกัน (YYYY-MM-DD) แก้เป็นวันจริงของคุณได้เลย
  MUSIC_URL: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3",
  THEME: {
    bg: "bg-[#fdfbf7]", // Cream
    text: "text-[#5d4037]", // Warm Brown
    primary: "bg-[#d48c93]", // Muted Pink
    primaryHover: "hover:bg-[#c0767d]",
    secondary: "bg-[#e8e4dc]", // Light Gray/Brown
    accent: "text-[#d48c93]"
  }
};

const MOCK_DATA = {
  about: {
    his: {
      name: "คุณพระจันทร์ (He)",
      desc: "ขอบคุณที่ทนความดื้อของผมมาตลอดปีนะ สัญญาว่าจะเป็นเด็กดีขึ้น (มั้ง)",
      traits: ["ใจเย็น", "ชอบถ่ายรูป", "รักแฟนมาก"]
    },
    her: {
      name: "คุณทานตะวัน (She)",
      desc: "ขอบคุณที่ทำให้โลกของผมสดใสเหมือนทานตะวันได้รับแสงอาทิตย์เสมอ",
      traits: ["ยิ้มเก่ง", "ชอบกินของหวาน", "น่ารักที่สุด"]
    }
  },
  stories: [
    {
      id: 1,
      date: "The Beginning",
      title: "วันแรกที่เราเจอกัน",
      content: "จำได้ไหมว่าวันนั้นเราเขินกันขนาดไหน? จากคนแปลกหน้ากลายมาเป็นคนรู้ใจ ขอบคุณพรหมลิขิตนะ"
    },
    {
      id: 2,
      date: "Memorable Day",
      title: "วันที่เราผ่านเรื่องยากๆ มาด้วยกัน",
      content: "ไม่ว่าจะมีปัญหากี่ครั้ง ขอบคุณที่เราไม่เคยปล่อยมือกันเลย การมีคุณอยู่ข้างๆ คือของขวัญที่ดีที่สุด"
    },
    {
      id: 3,
      date: "Happy Anniversary",
      title: "สุขสันต์วันครบรอบนะ",
      content: "วันนี้เป็นอีกหมุดหมายสำคัญของการเดินทางของเรา ขอบคุณที่รักกันนะ อยู่ฉลองด้วยกันไปจนแก่เลยนะ"
    }
  ],
  gallery: [
    { id: 1, caption: "เดทแรกที่เขินๆ หน่อย", color: "bg-rose-100" },
    { id: 2, caption: "ทริปนี้สนุกมากเลยเนอะ", color: "bg-blue-100" },
    { id: 3, caption: "รูปคู่ที่เราชอบที่สุด", color: "bg-orange-100" },
    { id: 4, caption: "เซอร์ไพรส์วันเกิดปีที่แล้ว", color: "bg-purple-100" },
    { id: 5, caption: "ดินเนอร์มื้อพิเศษ", color: "bg-green-100" },
    { id: 6, caption: "รอยยิ้มของคุณคือความสุขของผม", color: "bg-yellow-100" }
  ],
  quiz: [
    {
      id: 1,
      question: "ปีนี้เราคบกันมากี่ปีแล้ว?",
      options: ["1 ปี", "2 ปี", "3 ปี", "นานจนนับไม่ได้แล่ว"],
      correctIndex: 0 // แก้ให้ตรงความจริง
    },
    {
      id: 2,
      question: "ของขวัญชิ้นแรกที่ให้กันคืออะไร?",
      options: ["ดอกไม้", "นาฬิกา", "ตุ๊กตา", "เสื้อคู่"],
      correctIndex: 2
    },
    {
      id: 3,
      question: "สถานที่ที่เราไปเดทกันบ่อยที่สุด?",
      options: ["ห้างสรรพสินค้า", "คาเฟ่", "สวนสาธารณะ", "ร้านหมูกระทะ"],
      correctIndex: 3
    },
    {
      id: 4,
      question: "เพลงประจำคู่ของเราคือเพลงอะไร?",
      options: ["Perfect", "Lover", "คู่ชีวิต", "จีบ"],
      correctIndex: 0
    },
    {
      id: 5,
      question: "รักเค้าไหม?",
      options: ["รักมาก", "รักที่สุด", "รักเท่าจักรวาล", "ถูกทุกข้อ"],
      correctIndex: 3
    }
  ] as QuizQuestion[]
};

// ==========================================
// 🧩 COMPONENTS
// ==========================================

interface NavbarProps {
  activePage: string;
  setPage: (page: string) => void;
  onLogout: () => void;
}

const Navbar = ({ activePage, setPage, onLogout }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About Us', icon: User },
    { id: 'story', label: 'Our Story', icon: BookOpen },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
    { id: 'quiz', label: 'Quiz', icon: HelpCircle },
    { id: 'letter', label: 'Letter', icon: Mail },
    { id: 'contact', label: 'Wishes', icon: Gift }, // Changed label to Wishes
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-stone-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button 
            onClick={() => setPage('home')}
            className={`font-serif text-xl font-bold flex items-center gap-2 ${CONFIG.THEME.text}`}
          >
            <Heart className={`w-6 h-6 ${CONFIG.THEME.accent} fill-current`} />
            <span>Anniversary ❤️</span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-1">
            {menuItems.map((item) => (
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
            {menuItems.map((item) => (
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
};

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio ref={audioRef} loop src={CONFIG.MUSIC_URL} />
      <button
        onClick={togglePlay}
        className={`flex items-center gap-2 px-4 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 border border-white/50 backdrop-blur-sm
          ${isPlaying ? 'bg-rose-400 text-white animate-pulse' : 'bg-white text-stone-600'}`}
      >
        {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
        <span className="font-medium text-sm hidden md:inline">{isPlaying ? 'Our Song' : 'Play Music'}</span>
      </button>
    </div>
  );
};

const Footer = () => (
  <footer className="bg-white py-8 border-t border-stone-100 mt-auto">
    <div className="max-w-6xl mx-auto px-4 text-center">
      <div className="flex justify-center gap-2 mb-4">
        <Heart className={`w-5 h-5 ${CONFIG.THEME.accent}`} />
      </div>
      <p className={`font-serif text-lg ${CONFIG.THEME.text}`}>Happy Anniversary My Love</p>
      <p className="text-stone-400 text-sm mt-2">Forever & Always</p>
    </div>
  </footer>
);

// ==========================================
// 📄 PAGES
// ==========================================

interface PageProps {
  setPage: (page: string) => void;
}

const HomePage = ({ setPage }: PageProps) => {
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
      {/* Hero Section */}
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

          {/* ⏱ Timer Counter */}
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
};

const AboutPage = () => (
  <div className="max-w-4xl mx-auto px-4 py-16 animate-fade-in">
    <div className="text-center mb-16">
      <h2 className={`font-serif text-3xl md:text-4xl ${CONFIG.THEME.text}`}>Couple Profile</h2>
      <p className="text-stone-500 mt-4">คู่รักธรรมดา ที่ความรักไม่ธรรมดา</p>
    </div>

    <div className="grid md:grid-cols-2 gap-12 md:gap-20">
      {/* His Side */}
      <div className="text-center md:text-right">
        <div className="w-32 h-32 md:w-40 md:h-40 bg-blue-50 rounded-full mx-auto md:ml-auto md:mr-0 mb-6 flex items-center justify-center border-4 border-white shadow-lg">
          <span className="text-4xl">👨‍💻</span>
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
        <div className="w-32 h-32 md:w-40 md:h-40 bg-pink-50 rounded-full mx-auto md:mr-auto md:ml-0 mb-6 flex items-center justify-center border-4 border-white shadow-lg">
          <span className="text-4xl">👩‍🎨</span>
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
        "ไม่สัญญาว่าจะรักเท่าฟ้า แต่สัญญาว่าจะรักเท่าเดิม และจะรักให้ดีขึ้นในทุกๆ วันที่ตื่นมาเจอหน้ากัน"
      </p>
    </div>
  </div>
);

const StoryPage = () => (
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

const GalleryPage = () => (
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

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswerClick = (index: number) => {
    if (isAnswered) return;
    
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === MOCK_DATA.quiz[currentQuestion].correctIndex) {
      setScore(score + 1);
    }

    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < MOCK_DATA.quiz.length) {
        setCurrentQuestion(nextQuestion);
        setSelectedOption(null);
        setIsAnswered(false);
      } else {
        setShowScore(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-16 animate-fade-in">
      <div className="text-center mb-10">
        <h2 className={`font-serif text-3xl ${CONFIG.THEME.text} mb-2`}>Anniversary Quiz</h2>
        <p className="text-stone-500 text-sm">ทดสอบความใส่ใจในวันครบรอบ</p>
      </div>

      {showScore ? (
        <div className="bg-white p-8 rounded-3xl shadow-lg border border-stone-100 text-center animate-fade-in-up">
          <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Star className="w-10 h-10 text-yellow-500 fill-current" />
          </div>
          <h3 className="font-serif text-2xl text-stone-800 mb-2">
            คะแนน: {score} / {MOCK_DATA.quiz.length}
          </h3>
          <p className="text-stone-500 mb-8">
            {score === MOCK_DATA.quiz.length ? "สุดยอดแฟนพันธุ์แท้! รักนะจุ๊บๆ ❤️" : 
             score >= MOCK_DATA.quiz.length / 2 ? "เก่งมาก! ขอบคุณที่ใส่ใจกันนะ" : 
             "ไม่เป็นไรนะ เดี๋ยวเค้าเล่าให้ฟังใหม่ รักเหมือนเดิม! 💕"}
          </p>
          <button
            onClick={resetQuiz}
            className={`${CONFIG.THEME.primary} text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 mx-auto hover:opacity-90 transition-all`}
          >
            <RefreshCw className="w-4 h-4" /> เล่นอีกรอบ
          </button>
        </div>
      ) : (
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-stone-100">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
              Question {currentQuestion + 1}/{MOCK_DATA.quiz.length}
            </span>
            <span className="text-xs font-bold text-rose-400 bg-rose-50 px-2 py-1 rounded-lg">
              Score: {score}
            </span>
          </div>

          <h3 className="font-serif text-xl text-stone-800 mb-8 leading-relaxed">
            {MOCK_DATA.quiz[currentQuestion].question}
          </h3>

          <div className="space-y-3">
            {MOCK_DATA.quiz[currentQuestion].options.map((option, index) => {
              let buttonStyle = "border-stone-200 hover:bg-stone-50 text-stone-600";
              if (isAnswered) {
                if (index === MOCK_DATA.quiz[currentQuestion].correctIndex) {
                  buttonStyle = "bg-green-100 border-green-200 text-green-700";
                } else if (index === selectedOption) {
                  buttonStyle = "bg-red-100 border-red-200 text-red-700";
                } else {
                  buttonStyle = "opacity-50 border-stone-100";
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(index)}
                  disabled={isAnswered}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-300 font-medium ${buttonStyle}`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const LetterPage = () => (
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
          สุขสันต์วันครบรอบนะคนเก่ง,
        </p>
        <p>
          เผลอแป๊บเดียวเราก็เดินทางมาถึงวันนี้แล้วนะ ขอบคุณสำหรับทุกวันที่ผ่านมา ขอบคุณที่อดทนกับความงี่เง่าของเค้า ขอบคุณที่คอยซัพพอร์ตกันในวันที่เหนื่อย 
          และขอบคุณที่เป็นความสบายใจให้กันเสมอ
        </p>
        <p>
          ปีนี้อาจจะมีเรื่องราวมากมายเกิดขึ้น ทั้งดีและร้าย แต่เพราะมีเธออยู่ข้างๆ ทุกอย่างมันเลยผ่านไปได้ด้วยดี 
          เค้าสัญญาว่าจะพยายามเป็นแฟนที่ดีขึ้น จะบ่นให้น้อยลง (จะพยายามนะ 555) และจะรักเธอให้มากกว่าเดิม
        </p>
        <p>
          อยู่ฉลองวันครบรอบด้วยกันแบบนี้ไปทุกปีเลยนะ รักเธอที่สุดในโลกเลย
        </p>
      </article>

      <div className="mt-12 text-right">
         <p className="font-serif italic text-stone-500">Love You always,</p>
         <p className="font-bold text-stone-700 mt-1">Me ❤️</p>
      </div>
    </div>
  </div>
);

const ContactPage = () => {
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
};

interface LoginPageProps {
  onLogin: (user: UserAuth) => void;
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [date, setDate] = useState('');
  const [role, setRole] = useState('guest');
  const [error, setError] = useState('');

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
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
          
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setRole('him')}
              className={`p-3 rounded-xl border transition-all ${role === 'him' ? 'border-rose-400 bg-rose-50 text-rose-700' : 'border-stone-200 text-stone-500 hover:bg-stone-50'}`}
            >
              Him
            </button>
            <button
              type="button"
              onClick={() => setRole('her')}
              className={`p-3 rounded-xl border transition-all ${role === 'her' ? 'border-rose-400 bg-rose-50 text-rose-700' : 'border-stone-200 text-stone-500 hover:bg-stone-50'}`}
            >
              Her
            </button>
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

// ==========================================
// 🚀 MAIN APP LAYOUT
// ==========================================

export default function App() {
  const [auth, setAuth] = useState<UserAuth>({ isLoggedIn: false, role: null });
  const [currentPage, setCurrentPage] = useState('home');

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

  if (!auth.isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch(currentPage) {
      case 'home': return <HomePage setPage={setCurrentPage} />;
      case 'about': return <AboutPage />;
      case 'story': return <StoryPage />;
      case 'gallery': return <GalleryPage />;
      case 'quiz': return <QuizPage />;
      case 'letter': return <LetterPage />;
      case 'contact': return <ContactPage />;
      default: return <HomePage setPage={setCurrentPage} />;
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