
import React, { useState } from 'react';
import { Sparkles, Dices, Loader2, Trophy } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface TokyoGachaProps {
    currentTheme: string;
}

const TokyoGacha: React.FC<TokyoGachaProps> = ({ currentTheme }) => {
    const [mission, setMission] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const pullGacha = async () => {
        setLoading(true);
        try {
            const ai = new GoogleGenAI({ apiKey: (process.env as any).API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: `你是一位幽默的東京旅遊導遊。現在我們的主題是「${currentTheme}」。
                請幫我生成一個有趣的「秘密任務」或「挑戰」，字數在 30 字以內。
                挑戰內容要包含：地點相關性、一點點搞怪、以及拍照或互動建議。
                例如：在雷門前找到穿紅色衣服的人並在心中默念三遍壽喜燒。`,
                config: { temperature: 0.9 }
            });
            setMission(response.text || "找到自動販賣機買一瓶從未見過的飲料！");
        } catch (error) {
            console.error("Gacha failed", error);
            setMission("在便利商店買一個季節限定口味的飯糰！");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-white/20 transition-all"></div>
            
            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                    <Dices className="text-yellow-400 animate-bounce" size={24} />
                    <h2 className="font-black text-xl tracking-tight">東京 AI 扭蛋任務</h2>
                </div>

                {mission ? (
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 animate-in zoom-in-95 duration-300">
                        <div className="flex items-center gap-2 text-yellow-300 mb-2">
                            <Trophy size={16} />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Secret Mission</span>
                        </div>
                        <p className="text-sm font-medium leading-relaxed">{mission}</p>
                        <button 
                            onClick={() => setMission(null)}
                            className="mt-4 text-[10px] font-bold text-white/60 hover:text-white underline underline-offset-4"
                        >
                            重新抽取
                        </button>
                    </div>
                ) : (
                    <div className="text-center py-4">
                        <p className="text-xs text-indigo-100 mb-6">根據今日主題「{currentTheme}」<br/>由 AI 生成一個專屬挑戰任務！</p>
                        <button 
                            onClick={pullGacha}
                            disabled={loading}
                            className="w-full bg-white text-indigo-600 font-bold py-3 rounded-xl shadow-lg hover:bg-yellow-400 hover:text-indigo-900 transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : <><Sparkles size={18} /> 抽取任務</>}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TokyoGacha;
