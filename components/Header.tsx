
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
    <header className="relative mb-8 p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-950 to-gray-900 border-b-4 border-indigo-500 shadow-2xl overflow-hidden group">
      {/* Dynamic Background Effects */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-500/20 transition-colors duration-1000"></div>
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-500/20 transition-colors duration-1000"></div>
      
      <div className="relative z-10 text-center">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-purple-200 to-white tracking-wider mb-4 drop-shadow-sm animate-in fade-in slide-in-from-top-4 duration-700">
          🇯🇵 東京 8 天 7 夜之旅
        </h1>
        
        {/* Info Row */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 text-indigo-300 font-light text-sm sm:text-base mb-6">
          <div className="flex items-center gap-2 bg-indigo-900/30 px-3 py-1 rounded-full border border-indigo-500/20">
            <CalendarDays size={16} />
            <span>2026/2/9 (一) - 2/16 (一)</span>
          </div>
          <div className="hidden sm:block text-indigo-500">•</div>
          <div className="flex items-center gap-2">
             <Plane size={16} />
             <span>吳奇恩與旅伴們</span>
          </div>
        </div>

        {/* Live Countdown */}
        <div className="inline-flex flex-wrap justify-center items-center gap-4 bg-gray-900/60 backdrop-blur-sm px-6 py-3 rounded-2xl border border-gray-700/50 shadow-inner">
            <div className="flex items-center gap-2 text-indigo-400 font-bold uppercase text-xs tracking-widest mr-2">
                <Clock size={16} className="animate-pulse" />
                <span>Countdown</span>
            </div>
            <div className="flex gap-4 font-mono">
                <div className="text-center">
                    <span className="block text-2xl sm:text-3xl font-bold text-white leading-none">{timeLeft.days}</span>
                    <span className="text-[10px] text-gray-500 uppercase">Days</span>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-600 leading-none">:</div>
                <div className="text-center">
                    <span className="block text-2xl sm:text-3xl font-bold text-white leading-none">{timeLeft.hours.toString().padStart(2, '0')}</span>
                    <span className="text-[10px] text-gray-500 uppercase">Hrs</span>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-600 leading-none">:</div>
                <div className="text-center">
                    <span className="block text-2xl sm:text-3xl font-bold text-white leading-none">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                    <span className="text-[10px] text-gray-500 uppercase">Mins</span>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-600 leading-none hidden sm:block">:</div>
                <div className="text-center hidden sm:block">
                    <span className="block text-2xl sm:text-3xl font-bold text-indigo-400 leading-none w-10">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                    <span className="text-[10px] text-gray-500 uppercase">Secs</span>
                </div>
            </div>
        </div>

      </div>
    </header>
  );
};

export default Header;
