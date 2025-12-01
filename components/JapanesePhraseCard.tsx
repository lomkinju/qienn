
import React, { useState } from 'react';
import { MessageCircle, RefreshCw, Volume2 } from 'lucide-react';

interface Phrase {
  japanese: string;
  romaji: string;
  meaning: string;
  category: string;
}

const PHRASES: Phrase[] = [
  { japanese: 'すみません', romaji: 'Sumimasen', meaning: '不好意思 / 請問...', category: '基礎' },
  { japanese: 'これをお願いします', romaji: 'Kore o onegaishimasu', meaning: '我要這個 (點餐/購物)', category: '購物' },
  { japanese: 'トイレはどこですか？', romaji: 'Toire wa doko desu ka?', meaning: '請問廁所在哪裡？', category: '問路' },
  { japanese: '免税できますか？', romaji: 'Menzei dekimasu ka?', meaning: '可以退稅嗎？', category: '購物' },
  { japanese: 'お会計をお願いします', romaji: 'Okaikei o onegaishimasu', meaning: '麻煩結帳', category: '餐廳' },
  { japanese: 'おすすめは何ですか？', romaji: 'Osusume wa nan desu ka?', meaning: '有什麼推薦的嗎？', category: '餐廳' },
  { japanese: 'クレジットカードは使えますか？', romaji: 'Kurejitto kādo wa tsukaemasu ka?', meaning: '可以使用信用卡嗎？', category: '付款' },
  { japanese: '写真を撮ってもいいですか？', romaji: 'Shashin o totte mo ii desu ka?', meaning: '可以拍照嗎？', category: '觀光' },
];

const JapanesePhraseCard: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const nextPhrase = () => {
    setIsFlipped(false);
    setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % PHRASES.length);
    }, 200);
  };

  const phrase = PHRASES[currentIndex];

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 h-full flex flex-col relative overflow-hidden group">
      {/* Decorative bg */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-pink-100 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none opacity-60"></div>

      <div className="flex justify-between items-start mb-4 z-10">
        <h2 className="text-xl font-bold text-slate-700 flex items-center gap-2">
          <MessageCircle size={20} className="text-pink-500" /> 每日一句
        </h2>
        <span className="text-xs font-mono bg-pink-50 text-pink-500 px-2 py-0.5 rounded border border-pink-100">
            {phrase.category}
        </span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center z-10 my-4">
         <p className="text-3xl font-black text-slate-800 mb-2 tracking-wide font-sans">{phrase.japanese}</p>
         <p className="text-sm text-slate-400 font-mono mb-5">{phrase.romaji}</p>
         
         <div className="bg-slate-50 rounded-xl px-5 py-3 border border-slate-200 w-full">
             <p className="text-lg text-indigo-600 font-bold">{phrase.meaning}</p>
         </div>
      </div>

      <div className="mt-4 flex justify-between items-center z-10 border-t border-slate-100 pt-4">
          <button className="text-slate-400 hover:text-pink-500 transition-colors bg-white hover:bg-pink-50 p-2 rounded-full" title="發音 (示意)">
              <Volume2 size={20} />
          </button>
          <button 
            onClick={nextPhrase}
            className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-full transition-all active:scale-95"
          >
              <RefreshCw size={14} /> 下一句
          </button>
      </div>
    </div>
  );
};

export default JapanesePhraseCard;
