
import React, { useState } from 'react';
import { MessageCircle, RefreshCw, Volume2, VolumeX } from 'lucide-react';

interface Phrase {
  japanese: string;
  romaji: string;
  meaning: string;
  category: string;
}

const PHRASES: Phrase[] = [
  // 基礎禮貌
  { japanese: 'すみません', romaji: 'Sumimasen', meaning: '不好意思 / 請問...', category: '基礎' },
  { japanese: 'ありがとうございます', romaji: 'Arigatou gozaimasu', meaning: '謝謝您', category: '基礎' },
  { japanese: 'おはようございます', romaji: 'Ohayou gozaimasu', meaning: '早安', category: '基礎' },
  { japanese: '大丈夫です', romaji: 'Daijoubu desu', meaning: '沒關係 / 不需要 (婉拒時)', category: '基礎' },

  // 購物
  { japanese: 'これをお願いします', romaji: 'Kore o onegaishimasu', meaning: '我要這個 (點餐/購物)', category: '購物' },
  { japanese: 'いくらですか？', romaji: 'Ikura desu ka?', meaning: '請問多少錢？', category: '購物' },
  { japanese: '免税できますか？', romaji: 'Menzei dekimasu ka?', meaning: '可以退稅嗎？', category: '購物' },
  { japanese: '袋は要りません', romaji: 'Fukuro wa irimasen', meaning: '不用袋子', category: '購物' },

  // 餐廳
  { japanese: 'お会計をお願いします', romaji: 'Okaikei o onegaishimasu', meaning: '麻煩結帳', category: '餐廳' },
  { japanese: 'おすすめは何ですか？', romaji: 'Osusume wa nan desu ka?', meaning: '有什麼推薦的嗎？', category: '餐廳' },
  { japanese: 'お水をください', romaji: 'Omizu o kudasai', meaning: '請給我水', category: '餐廳' },
  { japanese: '英語のメニューはありますか？', romaji: 'Eigo no menyū wa arimasu ka?', meaning: '有英文菜單嗎？', category: '餐廳' },

  // 便利商店
  { japanese: '温めてください', romaji: 'Atatamete kudasai', meaning: '請幫我微波加熱', category: '超商' },
  { japanese: 'お箸をつけてください', romaji: 'Ohashi o tsukete kudasai', meaning: '請給我筷子', category: '超商' },

  // 交通與問路
  { japanese: 'トイレはどこですか？', romaji: 'Toire wa doko desu ka?', meaning: '請問廁所在哪裡？', category: '問路' },
  { japanese: '駅はどこですか？', romaji: 'Eki wa doko desu ka?', meaning: '請問車站在哪裡？', category: '問路' },
  { japanese: 'この電車は新宿に行きますか？', romaji: 'Kono densha wa Shinjuku ni ikimasu ka?', meaning: '這班車去新宿嗎？', category: '交通' },

  // 其他
  { japanese: 'クレジットカードは使えますか？', romaji: 'Kurejitto kādo wa tsukaemasu ka?', meaning: '可以使用信用卡嗎？', category: '付款' },
  { japanese: '写真を撮ってもいいですか？', romaji: 'Shashin o totte mo ii desu ka?', meaning: '可以拍照嗎？', category: '觀光' },
  { japanese: 'Wi-Fiはありますか？', romaji: 'Wi-Fi wa arimasu ka?', meaning: '有 Wi-Fi 嗎？', category: '網路' },
];

const JapanesePhraseCard: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const phrase = PHRASES[currentIndex];

  const nextPhrase = () => {
    // Stop audio if switching
    if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
    }
    // Randomize or Sequential? Let's do sequential for learning, or random for fun.
    // Sequential ensures you see them all. Random is fun. Let's do Random.
    let nextIndex;
    do {
        nextIndex = Math.floor(Math.random() * PHRASES.length);
    } while (nextIndex === currentIndex); // Avoid repeating the same one immediately

    setCurrentIndex(nextIndex);
  };

  const handlePlayAudio = () => {
    if (!('speechSynthesis' in window)) {
        alert('您的瀏覽器不支援語音播放功能');
        return;
    }

    // Cancel any current speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(phrase.japanese);
    utterance.lang = 'ja-JP'; // Set language to Japanese
    utterance.rate = 0.8; // Slightly slower for learning
    utterance.pitch = 1;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

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
         <p className="text-2xl sm:text-3xl font-black text-slate-800 mb-2 tracking-wide font-sans">{phrase.japanese}</p>
         <p className="text-sm text-slate-400 font-mono mb-5">{phrase.romaji}</p>
         
         <div className="bg-slate-50 rounded-xl px-5 py-3 border border-slate-200 w-full transition-all hover:bg-slate-100">
             <p className="text-lg text-indigo-600 font-bold">{phrase.meaning}</p>
         </div>
      </div>

      <div className="mt-4 flex justify-between items-center z-10 border-t border-slate-100 pt-4">
          <button 
            onClick={handlePlayAudio}
            disabled={isPlaying}
            className={`transition-all p-3 rounded-full flex items-center justify-center ${
                isPlaying 
                ? 'bg-pink-100 text-pink-500 shadow-inner scale-95' 
                : 'bg-white hover:bg-pink-50 text-slate-400 hover:text-pink-500 shadow-sm border border-slate-100 hover:scale-105'
            }`} 
            title="播放發音"
          >
              <Volume2 size={24} className={isPlaying ? 'animate-pulse' : ''} />
          </button>
          
          <button 
            onClick={nextPhrase}
            className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-full transition-all active:scale-95"
          >
              <RefreshCw size={14} /> 換一句
          </button>
      </div>
    </div>
  );
};

export default JapanesePhraseCard;
