
import React, { useState, useEffect } from 'react';
import { Plane, CalendarDays, Clock } from 'lucide-react';

const Header: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('2026-02-09T06:40:00'); // Departure time

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft(); // Initial call

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="relative mb-2 p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-xl shadow-indigo-200 overflow-hidden group">
      {/* Dynamic Background Effects */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/20 rounded-full blur-3xl pointer-events-none group-hover:bg-white/30 transition-colors duration-1000"></div>
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-yellow-300/20 rounded-full blur-3xl pointer-events-none group-hover:bg-yellow-300/30 transition-colors duration-1000"></div>
      
      <div className="relative z-10 text-center text-white">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-wider mb-4 drop-shadow-md animate-in fade-in slide-in-from-top-4 duration-700">
          🇯🇵 東京 8 天 7 夜之旅
        </h1>
        
        {/* Info Row */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 text-indigo-50 font-medium text-sm sm:text-base mb-6">
          <div className="flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full border border-white/20 backdrop-blur-sm">
            <CalendarDays size={18} />
            <span>2026/2/9 (一) - 2/16 (一)</span>
          </div>
          <div className="hidden sm:block text-white/50">•</div>
          <div className="flex items-center gap-2">
             <Plane size={18} />
             <span>吳奇恩與旅伴們</span>
          </div>
        </div>

        {/* Live Countdown */}
        <div className="inline-flex flex-wrap justify-center items-center gap-4 bg-white/90 backdrop-blur-md px-8 py-4 rounded-2xl shadow-lg text-slate-800">
            <div className="flex items-center gap-2 text-indigo-600 font-bold uppercase text-xs tracking-widest mr-2">
                <Clock size={16} className="animate-pulse" />
                <span>Countdown</span>
            </div>
            <div className="flex gap-4 font-mono">
                <div className="text-center">
                    <span className="block text-2xl sm:text-3xl font-bold text-slate-800 leading-none">{timeLeft.days}</span>
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Days</span>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-slate-300 leading-none">:</div>
                <div className="text-center">
                    <span className="block text-2xl sm:text-3xl font-bold text-slate-800 leading-none">{timeLeft.hours.toString().padStart(2, '0')}</span>
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Hrs</span>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-slate-300 leading-none">:</div>
                <div className="text-center">
                    <span className="block text-2xl sm:text-3xl font-bold text-slate-800 leading-none">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Mins</span>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-slate-300 leading-none hidden sm:block">:</div>
                <div className="text-center hidden sm:block">
                    <span className="block text-2xl sm:text-3xl font-bold text-indigo-600 leading-none w-10">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Secs</span>
                </div>
            </div>
        </div>

      </div>
    </header>
  );
};

export default Header;
