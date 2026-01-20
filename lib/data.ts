import { HelpCircle, Home, User, BookOpen, Image as ImageIcon, Mail, Gift } from 'lucide-react';

// --- Interfaces ---
export interface Message {
  id: number;
  date: string;
  from: string;
  message: string;
}

export interface UserAuth {
  isLoggedIn: boolean;
  role: string | null;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface Reward {
  id: number;
  label: string;
  color: string;
}

// --- Config ---
export const CONFIG = {
  ANNIVERSARY_PASS: "200965", // รหัสผ่าน (วันครบรอบ)
  START_DATE: "2022-09-20T00:00:00", // วันเริ่มคบกัน (YYYY-MM-DD)
  MUSIC_URL: "/bg.mp3", // ไฟล์เพลงใน public/
  THEME: {
    bg: "bg-[#fdfbf7]", // Cream
    text: "text-[#5d4037]", // Warm Brown
    primary: "bg-[#d48c93]", // Muted Pink
    primaryHover: "hover:bg-[#c0767d]",
    secondary: "bg-[#e8e4dc]", // Light Gray/Brown
    accent: "text-[#d48c93]"
  }
};

// --- Menu Items ---
export const MENU_ITEMS = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'about', label: 'About Us', icon: User },
  { id: 'story', label: 'Our Story', icon: BookOpen },
  { id: 'gallery', label: 'Gallery', icon: ImageIcon },
  { id: 'quiz', label: 'Quiz', icon: HelpCircle },
  { id: 'letter', label: 'Letter', icon: Mail },
  { id: 'contact', label: 'Wishes', icon: Gift }, 
];

// --- Mock Data ---
export const MOCK_DATA = {
  about: {
    his: {
      name: "เทพบุตรสุดหล่อ",
      desc: "ถ้าให้นิยามความหล่อ ผมคงเป็นรองเเค่ผมพ่อคนดียว",
      traits: ["หล่อ", "หล่อมาก", "รักแฟนมาก"],
      image: "/his-profile.jpg" // เปลี่ยนเป็น path ของรูปจริง
    },
    her: {
      name: "คุณนายมี่ขี้ร้อง ",
      desc: "พาไปเดทเเล้วต้องพาไปซื้อชาเย็นด้วยยย",
      traits: ["ยิ้มเก่ง", "ขี้วีน", "เอาเเต่ใจสุดๆ"],
      image: "/her-profile.jpg" // เปลี่ยนเป็น path ของรูปจริง
    }
  },
  stories: [
    {
      id: 1,
      date: "The Beginning",
      title: "เจอกันยังนะหรอ?555555555",
      content: "จากเหตุการณ์ใจทักในวันนั้น ทำให้เราทั้งคู่เดินทางมาถึงวันนี้5555555 ยังไงก็ขอบใจนะที่ยังเดินอยู่ข้างๆตลอดมา"
    },
    {
      id: 2,
      date: "Memorable Day",
      title: "สิ่งที่อยากบอก",
      content: "ขอบคุณที่ยังไม่ไปไหน ถึงปัญหาจะมากมายเเต่เรายังจับมือเเละเดินมาด้วยกันถึงวันนี้ 10% ที่เคยพูดไว้ก็หวังว่าจะเป็นจริงนะ"
    },
    {
      id: 3,
      date: "Happy Anniversary",
      title: "สุขสันต์วันครบรอบนะ",
      content: "ไม่เคยทำอะไรเเบบนี้ให้ไม่ได้โรเเมนติกมากเเต่ไม่เคยรักน้อยลงเลยนะ รักน้องมี่นะคะ"
    }
  ],
  gallery: [
    {
    id: 1,
    caption: "...",
    color: "bg-rose-100",
    image: "/78.jpg" // ใส่ path ของรูปที่อยู่ใน folder public ตรงนี้
  },
  {
    id: 2,
    caption: "...",
    color: "bg-rose-100",
    image: "/trip1.jpg" // ใส่ path ของรูปที่อยู่ใน folder public ตรงนี้
  },
  {
    id: 3,
    caption: "...",
    color: "bg-rose-100",
    image: "/trip1.jpg" // ใส่ path ของรูปที่อยู่ใน folder public ตรงนี้
  },
  ],
  quiz: [
    {
      id: 1,
      question: "ปีนี้เราคบกันมากี่ปีแล้ว?",
      options: ["1 ปี", "2 ปี", "3 ปี", "นานจนนับไม่ได้แล่ว"],
      correctIndex: 2 
    },
    {
      id: 2,
      question: "เจอกันครั้งเเรกที่ไหน?",
      options: ["ร้านซ่อมรถ", "สวนเปมฯ", "เซ็นทรัล", "ไม่เคยพบ"],
      correctIndex: 2
    },
    {
      id: 3,
      question: "สถานที่ที่เราไปเดทกันบ่อยที่สุด?",
      options: ["ห้างสรรพสินค้า", "คาเฟ่", "สวนสาธารณะ", "ทะเลหลังมอ"],
      correctIndex: 3
    },
    {
      id: 4,
      question: "เพลงประจำคู่ของเราคือเพลงอะไร?",
      options: ["ซูลูปาก้าปาตาเฮ", "Lover", "คู่ชีวิต", "จีบ"],
      correctIndex: 0
    },
    {
      id: 5,
      question: "รักเค้าไหม?",
      options: ["รักมาก", "รักที่สุด", "รักเท่าจักรวาล", "ถูกทุกข้อ"],
      correctIndex: 3
    }
  ] as QuizQuestion[],
  rewards: [
    { id: 1, label: "กอดฟรี 1 ที", color: "#FFD1DC" }, // Pastel Pink
    { id: 2, label: "พาไปกินหนม", color: "#E6E6FA" }, // Lavender
    { id: 3, label: "นวดไหล่ 10 นาที", color: "#FFFACD" }, // Lemon Chiffon
    { id: 4, label: "ตามใจ 1 วัน", color: "#D3F8E2" }, // Mint
    { id: 5, label: "ให้บังหอม10ที", color: "#FFCCCB" }, // Light Red
    { id: 6, label: "ขออะไรก็ได้ 1 อย่าง", color: "#E0FFFF" }, // Light Cyan
  ] as Reward[]
};