
import React, { useState, useEffect } from 'react';
import { Cloud, CloudRain, Sun, CloudSnow, ThermometerSun, Loader2, ExternalLink, RefreshCw } from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";

interface DailyWeather {
  date: string;
  day: string;
  tempHigh: number;
  tempLow: number;
  condition: string;
  precipChance: number;
}

const WeatherCard: React.FC = () => {
  const [forecast, setForecast] = useState<DailyWeather[]>([]);
  const [sources, setSources] = useState<{title: string, uri: string}[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRealWeather = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: (process.env as any).API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "請搜尋並提供東京接下來 7 天的天氣預報。請以 JSON 格式返回，包含：日期(如2/9)、星期、最高溫、最低溫、天氣狀況(Sunny, Cloudy, Rain, Snow)、降雨機率。",
        config: {
          tools: [{googleSearch: {}}],
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              forecast: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    date: { type: Type.STRING },
                    day: { type: Type.STRING },
                    tempHigh: { type: Type.NUMBER },
                    tempLow: { type: Type.NUMBER },
                    condition: { type: Type.STRING },
                    precipChance: { type: Type.NUMBER }
                  }
                }
              }
            }
          }
        },
      });

      let text = response.text || '{"forecast": []}';
      
      // Safety: Handle cases where model might return JSON wrapped in markdown even with responseMimeType
      if (text.includes('```')) {
        const parts = text.split('```');
        const jsonPart = parts.find(p => p.trim().startsWith('json') || p.trim().startsWith('{'));
        if (jsonPart) {
            text = jsonPart.replace(/^json/, '').trim();
        } else {
            text = parts[1].trim();
        }
      }

      const data = JSON.parse(text);
      setForecast(data.forecast || []);
      
      // Extract grounding sources
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const links = chunks
        .filter((c: any) => c.web)
        .map((c: any) => ({ title: c.web.title, uri: c.web.uri }));
      setSources(links);
    } catch (error) {
      console.error("Failed to fetch weather", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRealWeather();
  }, []);

  const getIcon = (condition: string | undefined) => {
    // Fix: Safely handle undefined/null with default empty string before calling toLowerCase
    const c = (condition || '').toLowerCase();
    if (c.includes('sun') || c.includes('clear')) return <Sun className="text-orange-500" size={28} />;
    if (c.includes('cloud')) return <Cloud className="text-slate-400" size={28} />;
    if (c.includes('rain') || c.includes('shower')) return <CloudRain className="text-blue-500" size={28} />;
    if (c.includes('snow')) return <CloudSnow className="text-indigo-400" size={28} />;
    return <Sun className="text-yellow-500" size={28} />;
  };

  const getBgGradient = (condition: string | undefined) => {
    // Fix: Safely handle undefined/null with default empty string before calling toLowerCase
    const c = (condition || '').toLowerCase();
    if (c.includes('sun') || c.includes('clear')) return 'from-orange-50 to-amber-50 border-orange-100 dark:from-orange-950/20 dark:to-amber-950/20';
    if (c.includes('cloud')) return 'from-slate-50 to-gray-50 border-slate-200 dark:from-slate-900/50 dark:to-gray-900/50';
    if (c.includes('rain')) return 'from-blue-50 to-sky-50 border-blue-100 dark:from-blue-950/20 dark:to-sky-950/20';
    if (c.includes('snow')) return 'from-indigo-50 to-violet-50 border-indigo-100 dark:from-indigo-950/20 dark:to-violet-950/20';
    return 'bg-white dark:bg-gray-900';
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-gray-800 overflow-hidden h-full flex flex-col">
      <div className="p-5 border-b border-slate-100 dark:border-gray-800 flex justify-between items-center bg-slate-50/50 dark:bg-gray-800/50">
        <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <ThermometerSun size={24} className="text-orange-500" /> 東京實時天氣
          {loading && <Loader2 className="animate-spin text-indigo-500" size={16} />}
        </h2>
        <button onClick={fetchRealWeather} className="p-2 hover:bg-white dark:hover:bg-gray-700 rounded-full transition-colors">
            <RefreshCw size={16} className={`text-slate-400 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>
      
      <div className="p-6 flex-1">
        {loading && forecast.length === 0 ? (
            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                {[1,2,3,4,5].map(i => (
                    <div key={i} className="min-w-[100px] h-32 bg-slate-100 dark:bg-gray-800 animate-pulse rounded-2xl"></div>
                ))}
            </div>
        ) : (
            <div className="flex overflow-x-auto pb-4 gap-3 no-scrollbar snap-x">
            {forecast.map((day, idx) => (
                <div 
                    key={idx} 
                    className={`snap-start min-w-[100px] flex-1 p-4 rounded-2xl border flex flex-col items-center justify-between gap-4 bg-gradient-to-b ${getBgGradient(day.condition)} shadow-sm hover:shadow-md transition-shadow`}
                >
                    <div className="text-center">
                        <div className="text-sm font-bold text-slate-700 dark:text-slate-200">{day.day}</div>
                        <div className="text-xs text-slate-400">{day.date}</div>
                    </div>
                    
                    <div className="my-1 transform hover:scale-110 transition-transform duration-300">
                        {getIcon(day.condition)}
                    </div>

                    <div className="text-center w-full">
                        <div className="text-lg font-bold text-slate-800 dark:text-white flex justify-center gap-1">
                            <span>{day.tempHigh}°</span>
                            <span className="text-slate-300 text-sm mt-1">/</span>
                            <span className="text-slate-400 text-sm mt-1">{day.tempLow}°</span>
                        </div>
                        {day.precipChance > 0 && (
                            <div className="text-[10px] text-blue-600 dark:text-blue-400 font-bold mt-1 bg-blue-100 dark:bg-blue-900/40 rounded-full px-2 py-0.5 inline-block">
                                ☂ {day.precipChance}%
                            </div>
                        )}
                    </div>
                </div>
            ))}
            </div>
        )}
        
        {sources.length > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-50 dark:border-gray-800">
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-2">數據來源</p>
                <div className="flex flex-wrap gap-2">
                    {sources.slice(0, 2).map((s, i) => (
                        <a key={i} href={s.uri} target="_blank" className="text-[10px] flex items-center gap-1 text-indigo-500 hover:underline">
                            <ExternalLink size={10} /> {s.title}
                        </a>
                    ))}
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default WeatherCard;
