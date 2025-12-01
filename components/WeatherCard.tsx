
import React from 'react';
import { Cloud, CloudRain, Sun, CloudSnow, CloudLightning, ThermometerSun } from 'lucide-react';

interface DailyWeather {
  date: string;
  day: string;
  tempHigh: number;
  tempLow: number;
  condition: 'Sunny' | 'Cloudy' | 'Rain' | 'Snow';
  precipChance: number;
}

// Mock Data based on Tokyo Feb averages (High ~10°C, Low ~2°C)
const FORECAST: DailyWeather[] = [
  { date: '2/9', day: 'Mon', tempHigh: 11, tempLow: 3, condition: 'Sunny', precipChance: 0 },
  { date: '2/10', day: 'Tue', tempHigh: 10, tempLow: 4, condition: 'Cloudy', precipChance: 20 },
  { date: '2/11', day: 'Wed', tempHigh: 8, tempLow: 2, condition: 'Rain', precipChance: 80 }, // Aligns with indoor itinerary (Sunshine City)
  { date: '2/12', day: 'Thu', tempHigh: 12, tempLow: 4, condition: 'Sunny', precipChance: 10 },
  { date: '2/13', day: 'Fri', tempHigh: 9, tempLow: 3, condition: 'Cloudy', precipChance: 30 },
  { date: '2/14', day: 'Sat', tempHigh: 13, tempLow: 5, condition: 'Sunny', precipChance: 0 },
  { date: '2/15', day: 'Sun', tempHigh: 7, tempLow: 1, condition: 'Snow', precipChance: 60 },
  { date: '2/16', day: 'Mon', tempHigh: 10, tempLow: 3, condition: 'Sunny', precipChance: 10 },
];

const WeatherCard: React.FC = () => {
  const getIcon = (condition: string) => {
    switch (condition) {
      case 'Sunny': return <Sun className="text-orange-400" size={24} />;
      case 'Cloudy': return <Cloud className="text-gray-400" size={24} />;
      case 'Rain': return <CloudRain className="text-blue-400" size={24} />;
      case 'Snow': return <CloudSnow className="text-indigo-200" size={24} />;
      default: return <Sun className="text-yellow-400" size={24} />;
    }
  };

  const getBgGradient = (condition: string) => {
    switch (condition) {
      case 'Sunny': return 'from-orange-500/10 to-yellow-500/5 border-orange-500/20';
      case 'Cloudy': return 'from-gray-600/10 to-slate-500/5 border-gray-500/20';
      case 'Rain': return 'from-blue-600/10 to-cyan-500/5 border-blue-500/20';
      case 'Snow': return 'from-indigo-300/10 to-white/5 border-indigo-200/20';
      default: return 'bg-gray-800';
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden">
      <div className="p-5 border-b border-gray-700 flex justify-between items-center bg-gray-900/50">
        <h2 className="text-xl font-bold text-sky-400 flex items-center gap-2">
          <ThermometerSun size={24} /> 天氣預報 (預測)
        </h2>
        <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded border border-gray-700">
            東京 • 2月
        </span>
      </div>
      
      <div className="p-5">
        <div className="flex overflow-x-auto pb-4 gap-4 no-scrollbar snap-x">
          {FORECAST.map((day, idx) => (
            <div 
                key={idx} 
                className={`snap-start min-w-[100px] flex-1 p-3 rounded-xl border flex flex-col items-center justify-between gap-3 bg-gradient-to-b ${getBgGradient(day.condition)}`}
            >
                <div className="text-center">
                    <div className="text-sm font-bold text-gray-200">{day.day}</div>
                    <div className="text-xs text-gray-400">{day.date}</div>
                </div>
                
                <div className="my-1 transform hover:scale-110 transition-transform duration-300">
                    {getIcon(day.condition)}
                </div>

                <div className="text-center w-full">
                    <div className="text-lg font-bold text-white flex justify-center gap-1">
                        <span>{day.tempHigh}°</span>
                        <span className="text-gray-500 text-sm mt-1">/</span>
                        <span className="text-gray-400 text-sm mt-1">{day.tempLow}°</span>
                    </div>
                    {day.precipChance > 0 && (
                        <div className="text-[10px] text-blue-300 mt-1 bg-blue-900/30 rounded-full px-2 py-0.5">
                            ☂ {day.precipChance}%
                        </div>
                    )}
                    {day.precipChance === 0 && (
                        <div className="text-[10px] text-orange-300/50 mt-1 px-2 py-0.5">
                             --
                        </div>
                    )}
                </div>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-gray-600 mt-[-10px]">
            *基於歷史平均氣溫推估，請於出發前一週確認實際預報。
        </p>
      </div>
    </div>
  );
};

export default WeatherCard;
