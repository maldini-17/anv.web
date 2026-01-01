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
      desc: "ขอบคุณที่ทนความดื้อของผมมาตลอดปีนะ สัญญาว่าจะเป็นเด็กดีขึ้น (มั้ง)",
      traits: ["ใจเย็น", "ชอบถ่ายรูป", "รักแฟนมาก"]
    },
    her: {
      name: "คุณนายมี่ขี้ร้อง ",
      desc: "ขอบคุณที่ทำให้โลกของผมสดใสเหมือนทานตะวันได้รับแสงอาทิตย์เสมอ",
      traits: ["ยิ้มเก่ง", "ชอบกินของหวาน", "น่ารักที่สุด"]
    }
  },
  stories: [
    {
      id: 1,
      date: "The Beginning",
      title: "วันแรกที่เราเจอกัน",
      content: "จากเหตุการณ์ใจทักในวันนั้น ทำให้เราทั้งคู่เดินทางมาถึงวันนี้5555555 ยังไงก็ขอบใจนะ"
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
      correctIndex: 0 
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
  ] as QuizQuestion[],
  rewards: [
    { id: 1, label: "กอดฟรี 1 ที", color: "#FFD1DC" }, // Pastel Pink
    { id: 2, label: "พาไปกินหนม", color: "#E6E6FA" }, // Lavender
    { id: 3, label: "นวดไหล่ 10 นาที", color: "#FFFACD" }, // Lemon Chiffon
    { id: 4, label: "ตามใจ 1 วัน", color: "#D3F8E2" }, // Mint
    { id: 5, label: "จุ๊บเหม่ง", color: "#FFCCCB" }, // Light Red
    { id: 6, label: "ขออะไรก็ได้ 1 อย่าง", color: "#E0FFFF" }, // Light Cyan
  ] as Reward[]
};