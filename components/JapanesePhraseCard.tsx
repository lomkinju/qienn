
import React, { useState, useEffect } from 'react';
import { MessageCircle, RefreshCw, Volume2, Sparkles, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface Phrase {
  japanese: string;
  romaji: string;
  meaning: string;
  category: string;
  culturalNote?: string;
}

const JapanesePhraseCard: React.FC = () => {
  const [phrase, setPhrase] = useState<Phrase>({
    japanese: 'すみません',
    romaji: 'Sumimasen',
    meaning: '不好意思',
    category: '基礎'
  });
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const fetchAiPhrase = async () => {
    setLoading(true);
    try {
        const ai = new GoogleGenAI({ apiKey: (process.env as any).API_KEY });
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: "請隨機生成一句在日本旅遊時非常有用的日語對話。請以 JSON 格式返回，包含：japanese, romaji, meaning, category (如購物、餐廳、求助), 以及一小段 culturalNote (文化知識)。",
            config: {
                responseMimeType: "application/json",
            }
        });
        const data = JSON.parse(response.text);
        setPhrase(data);
    } catch (e) {
        console.error("AI Phrase failed", e);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchAiPhrase();
  }, []);

  const handlePlayAudio = () => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(phrase.japanese);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.8;
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-slate-100 dark:border-gray-800 p-6 h-full flex flex-col relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-pink-100 dark:bg-pink-900/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>

      <div className="flex justify-between items-start mb-4 z-10">
        <h2 className="text-xl font-bold text-slate-700 dark:text-white flex items-center gap-2">
          <MessageCircle size={20} className="text-pink-500" /> AI 每日日語
        </h2>
        <span className="text-xs font-mono bg-pink-50 dark:bg-pink-900/30 text-pink-500 px-2 py-0.5 rounded border border-pink-100 dark:border-pink-800">
            {phrase.category}
        </span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center z-10 my-4">
         {loading ? (
             <Loader2 className="animate-spin text-pink-500" size={32} />
         ) : (
            <>
                <p className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white mb-2 tracking-wide">{phrase.japanese}</p>
                <p className="text-sm text-slate-400 font-mono mb-5">{phrase.romaji}</p>
                <div className="bg-slate-50 dark:bg-gray-800 rounded-xl px-5 py-3 border border-slate-200 dark:border-gray-700 w-full mb-3">
                    <p className="text-lg text-indigo-600 dark:text-neon-blue font-bold">{phrase.meaning}</p>
                </div>
                {phrase.culturalNote && (
                    <div className="flex items-start gap-2 text-left bg-yellow-50 dark:bg-yellow-900/10 p-3 rounded-lg border border-yellow-100 dark:border-yellow-900/30">
                        <Sparkles size={14} className="text-yellow-600 shrink-0 mt-0.5" />
                        <p className="text-[10px] text-yellow-700 dark:text-yellow-400 leading-tight">{phrase.culturalNote}</p>
                    </div>
                )}
            </>
         )}
      </div>

      <div className="mt-4 flex justify-between items-center z-10 border-t border-slate-100 dark:border-gray-800 pt-4">
          <button 
            onClick={handlePlayAudio}
            className={`p-3 rounded-full transition-all ${isPlaying ? 'bg-pink-100 text-pink-500 animate-pulse' : 'bg-slate-100 dark:bg-gray-800 text-slate-400'}`} 
          >
              <Volume2 size={24} />
          </button>
          <button 
            onClick={fetchAiPhrase}
            disabled={loading}
            className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-gray-800 px-4 py-2 rounded-full hover:bg-slate-200 transition-all"
          >
              {loading ? <Loader2 className="animate-spin" size={14} /> : <RefreshCw size={14} />} 換一句
          </button>
      </div>
    </div>
  );
};

export default JapanesePhraseCard;
