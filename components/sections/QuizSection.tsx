'use client';

import React, { useState } from 'react';
import { Star, RefreshCw, Gift } from 'lucide-react';
import { CONFIG, MOCK_DATA } from '@/lib/data';
import RewardWheel from '@/components/RewardWheel';

export default function QuizSection() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showWheel, setShowWheel] = useState(false);

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
    setShowWheel(false);
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
          
          <div className="flex flex-col gap-4 justify-center items-center">
             {/* Show Wheel Button if Score is good (>50%) */}
             {score >= MOCK_DATA.quiz.length / 2 && (
               <button
                 onClick={() => setShowWheel(true)}
                 className={`${CONFIG.THEME.primary} text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 shadow-lg hover:scale-105 transition-all animate-bounce`}
               >
                 <Gift className="w-5 h-5" /> หมุนกงล้อรับรางวัล!
               </button>
             )}

            <button
              onClick={resetQuiz}
              className={`text-stone-500 hover:text-stone-700 flex items-center gap-2 text-sm mt-2`}
            >
              <RefreshCw className="w-4 h-4" /> เล่นอีกรอบ
            </button>
          </div>
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

      {showWheel && <RewardWheel onFinish={() => setShowWheel(false)} />}
    </div>
  );
}