
import React, { useState, useRef } from 'react';
import { Disc, Utensils, Sparkles, Maximize2, Minimize2 } from 'lucide-react';

interface FoodRouletteProps {
  foodList: string[];
}

const WHEEL_COLORS = [
  '#f87171', // red-400
  '#fb923c', // orange-400
  '#facc15', // yellow-400
  '#a3e635', // lime-400
  '#4ade80', // green-400
  '#22d3ee', // cyan-400
  '#60a5fa', // blue-400
  '#818cf8', // indigo-400
  '#c084fc', // purple-400
  '#e879f9', // fuchsia-400
  '#fb7185', // rose-400
];

const FoodRoulette: React.FC<FoodRouletteProps> = ({ foodList }) => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);

  const totalItems = foodList.length;
  const sliceAngle = 360 / totalItems;

  const spinWheel = () => {
    if (isSpinning || totalItems === 0) return;

    setIsSpinning(true);
    setWinner(null);

    const winningIndex = Math.floor(Math.random() * totalItems);
    const winningFood = foodList[winningIndex];
    const itemCenterAngle = winningIndex * sliceAngle + sliceAngle / 2;
    const targetRotationBase = 360 - itemCenterAngle;
    const maxJitter = (sliceAngle * 0.8) / 2;
    const jitter = (Math.random() - 0.5) * 2 * maxJitter;
    const targetRotation = targetRotationBase + jitter;
    const extraSpins = 360 * 5;
    const currentRotationMod = rotation % 360;
    
    let diff = targetRotation - currentRotationMod;
    if (diff < 0) diff += 360;

    const finalRotation = rotation + extraSpins + diff;
    
    setRotation(finalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setWinner(winningFood);
    }, 3000); 
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (totalItems === 0) {
      return (
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 flex items-center justify-center h-full text-slate-400 font-medium">
            請先新增美食項目
        </div>
      )
  }

  // Define container classes based on state
  const containerClasses = isFullscreen 
    ? "fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-md flex flex-col items-center justify-center p-4 md:p-8 animate-in fade-in duration-200"
    : "bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-4 md:p-6 flex flex-col items-center justify-between h-full select-none overflow-hidden relative";

  // Define wheel size classes
  const wheelContainerClasses = isFullscreen
    ? "w-full max-w-[90vw] md:max-w-[600px] lg:max-w-[70vh] aspect-square"
    : "w-full max-w-[350px] aspect-square";

  return (
    <div className={containerClasses}>
      
      {/* Fullscreen Toggle Button */}
      <button 
        onClick={toggleFullscreen}
        className="absolute top-4 right-4 z-50 p-2 bg-white/80 hover:bg-white text-slate-500 hover:text-slate-800 rounded-full transition-colors backdrop-blur-sm shadow-sm"
        title={isFullscreen ? "縮小" : "全螢幕"}
      >
        {isFullscreen ? <Minimize2 size={24} /> : <Maximize2 size={20} />}
      </button>

      {/* Header */}
      <div className="text-center mb-4 z-10 shrink-0">
        <h2 className={`font-bold text-slate-800 flex items-center gap-2 justify-center ${isFullscreen ? 'text-3xl mb-2 text-white drop-shadow-md' : 'text-xl'}`}>
          <Disc className={isFullscreen ? "text-white" : "text-orange-500"} size={isFullscreen ? 32 : 24} /> 美食轉盤
        </h2>
        <p className={`${isFullscreen ? 'text-white/80 text-base' : 'text-slate-400 text-xs'} mt-1`}>
            今天吃什麼？轉一下就知道！
        </p>
      </div>

      {/* Wheel Section - Flex Grow to take available space */}
      <div className="flex-1 w-full flex items-center justify-center min-h-[300px] p-4">
        
        {/* Wheel Wrapper (Pointer is now strictly relative to THIS container) */}
        <div 
            className={`relative transition-all duration-500 ${wheelContainerClasses} ${isSpinning ? '' : 'cursor-pointer hover:scale-105 active:scale-95'}`}
            onClick={spinWheel}
        >
            {/* The Big Pointer (Arrow) */}
            <div className={`absolute -top-7 left-1/2 -translate-x-1/2 z-20 filter drop-shadow-xl pointer-events-none transition-transform duration-300 ${isFullscreen ? 'scale-125 -top-10' : ''}`}>
                <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[40px] border-t-slate-800 transform"></div>
                <div className="absolute -top-[35px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full"></div>
            </div>

            {/* Rotating Wheel */}
            <div 
                ref={wheelRef}
                className="w-full h-full rounded-full border-[8px] border-white relative shadow-2xl transition-transform duration-[3000ms] cubic-bezier(0.2, 0.8, 0.2, 1) bg-white"
                style={{ 
                    transform: `rotate(${rotation}deg)`,
                    background: `conic-gradient(
                    ${foodList.map((_, i) => `${WHEEL_COLORS[i % WHEEL_COLORS.length]} ${i * sliceAngle}deg ${(i + 1) * sliceAngle}deg`).join(', ')}
                    )`
                }}
            >
                {/* Segments Text */}
                {foodList.map((food, index) => {
                    const angle = index * sliceAngle + sliceAngle / 2;
                    const fontSizeClass = isFullscreen ? 'text-sm md:text-lg pt-8 md:pt-12' : 'text-xs md:text-sm pt-3 md:pt-6';
                    
                    return (
                    <div
                        key={index}
                        className={`absolute top-0 left-1/2 h-1/2 -ml-[1px] w-[2px] origin-bottom ${fontSizeClass}`}
                        style={{ transform: `rotate(${angle}deg)` }}
                    >
                        <span 
                            className="absolute top-0 left-1/2 -translate-x-1/2 text-white font-bold whitespace-nowrap [writing-mode:vertical-rl] py-2 drop-shadow-md"
                        >
                        {food}
                        </span>
                    </div>
                    );
                })}
                
                {/* Center Cap */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[20%] h-[20%] bg-white rounded-full border-4 border-slate-100 flex items-center justify-center shadow-inner z-10 group">
                    <Utensils className={`w-1/2 h-1/2 text-slate-300 transition-colors ${!isSpinning && 'group-hover:text-orange-500'}`} />
                </div>
            </div>
        </div>
      </div>

      {/* Controls & Result */}
      <div className={`text-center z-10 flex flex-col justify-center shrink-0 w-full ${isFullscreen ? 'h-32 max-w-sm scale-110' : 'h-24 max-w-xs'}`}>
        {winner ? (
          <div className="animate-in zoom-in duration-300">
            <p className={`text-sm mb-1 ${isFullscreen ? 'text-white/80' : 'text-slate-400'}`}>命運的選擇是...</p>
            <div className={`font-extrabold flex items-center justify-center gap-2 p-3 rounded-xl border ${isFullscreen ? 'bg-white/90 text-slate-900 border-white' : 'bg-slate-50 text-slate-800 border-slate-200'} ${isFullscreen ? 'text-4xl' : 'text-3xl'}`}>
               <Sparkles className="text-yellow-500" />
               <span className="bg-gradient-to-r from-orange-400 to-pink-500 text-transparent bg-clip-text">
                  {winner}
               </span>
               <Sparkles className="text-yellow-500" />
            </div>
            <button 
                onClick={spinWheel}
                className={`mt-3 text-xs hover:text-white underline underline-offset-2 transition-colors ${isFullscreen ? 'text-white/70' : 'text-slate-400 hover:text-slate-600'}`}
            >
                不滿意？再轉一次
            </button>
          </div>
        ) : (
          <button
            onClick={spinWheel}
            disabled={isSpinning}
            className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all transform active:scale-95 text-lg ${
              isSpinning 
                ? 'bg-slate-300 cursor-not-allowed text-slate-500' 
                : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 shadow-indigo-200'
            }`}
          >
            {isSpinning ? '命運轉動中...' : '開始轉動！'}
          </button>
        )}
      </div>
    </div>
  );
};

export default FoodRoulette;
