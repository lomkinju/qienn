
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
    <div className="bg-gray-800 rounded-xl shadow-lg border border-pink-900/30 p-5 h-full flex flex-col relative overflow-hidden group">
      {/* Decorative bg */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/5 rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none"></div>

      <div className="flex justify-between items-start mb-4 z-10">
        <h2 className="text-xl font-bold text-pink-300 flex items-center gap-2">
          <MessageCircle size={20} /> 每日一句
        </h2>
        <span className="text-xs font-mono bg-pink-900/40 text-pink-200 px-2 py-0.5 rounded border border-pink-500/20">
            {phrase.category}
        </span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center z-10 my-2">
         <p className="text-3xl font-black text-white mb-2 tracking-wide font-sans">{phrase.japanese}</p>
         <p className="text-sm text-gray-400 font-mono mb-4">{phrase.romaji}</p>
         
         <div className="bg-gray-900/60 rounded-lg px-4 py-2 border border-gray-700">
             <p className="text-lg text-pink-200 font-bold">{phrase.meaning}</p>
         </div>
      </div>

      <div className="mt-4 flex justify-between items-center z-10 border-t border-gray-700/50 pt-3">
          <button className="text-gray-500 hover:text-pink-400 transition-colors" title="發音 (示意)">
              <Volume2 size={18} />
          </button>
          <button 
            onClick={nextPhrase}
            className="flex items-center gap-2 text-xs text-gray-400 hover:text-white bg-gray-700/50 hover:bg-gray-700 px-3 py-1.5 rounded-full transition-all active:scale-95"
          >
              <RefreshCw size={12} /> 下一句
          </button>
      </div>
    </div>
  );
};

export default JapanesePhraseCard;
