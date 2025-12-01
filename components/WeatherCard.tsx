
import React from 'react';
import { Cloud, CloudRain, Sun, CloudSnow, ThermometerSun } from 'lucide-react';

interface DailyWeather {
  date: string;
  day: string;
  tempHigh: number;
  tempLow: number;
  condition: 'Sunny' | 'Cloudy' | 'Rain' | 'Snow';
  precipChance: number;
}

const FORECAST: DailyWeather[] = [
  { date: '2/9', day: 'Mon', tempHigh: 11, tempLow: 3, condition: 'Sunny', precipChance: 0 },
  { date: '2/10', day: 'Tue', tempHigh: 10, tempLow: 4, condition: 'Cloudy', precipChance: 20 },
  { date: '2/11', day: 'Wed', tempHigh: 8, tempLow: 2, condition: 'Rain', precipChance: 80 },
  { date: '2/12', day: 'Thu', tempHigh: 12, tempLow: 4, condition: 'Sunny', precipChance: 10 },
  { date: '2/13', day: 'Fri', tempHigh: 9, tempLow: 3, condition: 'Cloudy', precipChance: 30 },
  { date: '2/14', day: 'Sat', tempHigh: 13, tempLow: 5, condition: 'Sunny', precipChance: 0 },
  { date: '2/15', day: 'Sun', tempHigh: 7, tempLow: 1, condition: 'Snow', precipChance: 60 },
  { date: '2/16', day: 'Mon', tempHigh: 10, tempLow: 3, condition: 'Sunny', precipChance: 10 },
];

const WeatherCard: React.FC = () => {
  const getIcon = (condition: string) => {
    switch (condition) {
      case 'Sunny': return <Sun className="text-orange-500" size={28} />;
      case 'Cloudy': return <Cloud className="text-slate-400" size={28} />;
      case 'Rain': return <CloudRain className="text-blue-500" size={28} />;
      case 'Snow': return <CloudSnow className="text-indigo-400" size={28} />;
      default: return <Sun className="text-yellow-500" size={28} />;
    }
  };

  const getBgGradient = (condition: string) => {
    switch (condition) {
      case 'Sunny': return 'from-orange-50 to-amber-50 border-orange-100';
      case 'Cloudy': return 'from-slate-50 to-gray-50 border-slate-200';
      case 'Rain': return 'from-blue-50 to-sky-50 border-blue-100';
      case 'Snow': return 'from-indigo-50 to-violet-50 border-indigo-100';
      default: return 'bg-white';
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden h-full">
      <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <ThermometerSun size={24} className="text-orange-500" /> 天氣預報 <span className="text-xs font-normal text-slate-400 bg-white px-2 py-1 rounded-full border border-slate-200 ml-2">預測</span>
        </h2>
        <span className="text-xs text-slate-500 font-medium">
            東京 • 2月
        </span>
      </div>
      
      <div className="p-6">
        <div className="flex overflow-x-auto pb-4 gap-3 no-scrollbar snap-x">
          {FORECAST.map((day, idx) => (
            <div 
                key={idx} 
                className={`snap-start min-w-[100px] flex-1 p-4 rounded-2xl border flex flex-col items-center justify-between gap-4 bg-gradient-to-b ${getBgGradient(day.condition)} shadow-sm hover:shadow-md transition-shadow`}
            >
                <div className="text-center">
                    <div className="text-sm font-bold text-slate-700">{day.day}</div>
                    <div className="text-xs text-slate-400">{day.date}</div>
                </div>
                
                <div className="my-1 transform hover:scale-110 transition-transform duration-300 filter drop-shadow-sm">
                    {getIcon(day.condition)}
                </div>

                <div className="text-center w-full">
                    <div className="text-lg font-bold text-slate-800 flex justify-center gap-1">
                        <span>{day.tempHigh}°</span>
                        <span className="text-slate-300 text-sm mt-1">/</span>
                        <span className="text-slate-400 text-sm mt-1">{day.tempLow}°</span>
                    </div>
                    {day.precipChance > 0 && (
                        <div className="text-[10px] text-blue-600 font-bold mt-1 bg-blue-100 rounded-full px-2 py-0.5 inline-block">
                            ☂ {day.precipChance}%
                        </div>
                    )}
                    {day.precipChance === 0 && (
                        <div className="text-[10px] text-slate-300 mt-1 px-2 py-0.5">
                             --
                        </div>
                    )}
                </div>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-slate-400 mt-2">
            *基於歷史平均氣溫推估，請於出發前一週確認實際預報。
        </p>
      </div>
    </div>
  );
};

export default WeatherCard;
