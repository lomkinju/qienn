
import React, { useState, useRef } from 'react';
import { Disc, Utensils, Sparkles, Maximize2, Minimize2 } from 'lucide-react';

interface FoodRouletteProps {
  foodList: string[];
}

const WHEEL_COLORS = [
  '#ef4444', // red-500
  '#f97316', // orange-500
  '#eab308', // yellow-500
  '#84cc16', // lime-500
  '#22c55e', // green-500
  '#06b6d4', // cyan-500
  '#3b82f6', // blue-500
  '#6366f1', // indigo-500
  '#a855f7', // purple-500
  '#d946ef', // fuchsia-500
  '#f43f5e', // rose-500
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

    // 1. Pre-determine the winner
    const winningIndex = Math.floor(Math.random() * totalItems);
    const winningFood = foodList[winningIndex];

    // 2. Calculate the center angle of the winning item
    // Index 0 is at 0-sliceAngle. Center is 0.5 * sliceAngle.
    const itemCenterAngle = winningIndex * sliceAngle + sliceAngle / 2;

    // 3. Calculate rotation needed to bring this center to the top (0 degrees)
    // We want (itemCenterAngle + rotation) % 360 = 0
    // So rotation = -itemCenterAngle (or 360 - itemCenterAngle)
    const targetRotationBase = 360 - itemCenterAngle;

    // 4. Add random jitter to make it look natural (stay within 80% of the slice width)
    // Jitter is relative to the center of the slice
    const maxJitter = (sliceAngle * 0.8) / 2;
    const jitter = (Math.random() - 0.5) * 2 * maxJitter;
    const targetRotation = targetRotationBase + jitter;

    // 5. Calculate total rotation adding at least 5 full spins
    // Ensure we always rotate forward (positive direction)
    const extraSpins = 360 * 5;
    const currentRotationMod = rotation % 360;
    
    // Calculate how much we need to add to current rotation to reach target mod
    let diff = targetRotation - currentRotationMod;
    if (diff < 0) diff += 360;

    const finalRotation = rotation + extraSpins + diff;
    
    setRotation(finalRotation);

    // 6. Show result after animation
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
        <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6 flex items-center justify-center h-full text-gray-500">
            請先新增美食項目
        </div>
      )
  }

  // Define container classes based on state
  const containerClasses = isFullscreen 
    ? "fixed inset-0 z-[100] bg-gray-950/95 backdrop-blur-md flex flex-col items-center justify-center p-4 md:p-8 animate-in fade-in duration-200"
    : "bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-4 md:p-6 flex flex-col items-center justify-between h-full select-none overflow-hidden relative";

  // Define wheel size classes
  const wheelContainerClasses = isFullscreen
    ? "w-full max-w-[90vw] md:max-w-[600px] lg:max-w-[70vh] aspect-square"
    : "w-full max-w-[350px] aspect-square";

  return (
    <div className={containerClasses}>
      
      {/* Fullscreen Toggle Button */}
      <button 
        onClick={toggleFullscreen}
        className="absolute top-4 right-4 z-50 p-2 bg-gray-700/50 hover:bg-gray-600 text-gray-300 hover:text-white rounded-full transition-colors backdrop-blur-sm"
        title={isFullscreen ? "縮小" : "全螢幕"}
      >
        {isFullscreen ? <Minimize2 size={24} /> : <Maximize2 size={20} />}
      </button>

      {/* Header */}
      <div className="text-center mb-4 z-10 shrink-0">
        <h2 className={`font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500 flex items-center gap-2 justify-center ${isFullscreen ? 'text-3xl mb-2' : 'text-xl'}`}>
          <Disc className="text-orange-400" size={isFullscreen ? 32 : 24} /> 美食轉盤
        </h2>
        <p className={`text-gray-400 ${isFullscreen ? 'text-base' : 'text-xs'} mt-1`}>
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
            {/* The Big Pointer (Arrow) - Positioned relative to wheel wrapper */}
            <div className={`absolute -top-7 left-1/2 -translate-x-1/2 z-20 filter drop-shadow-xl pointer-events-none transition-transform duration-300 ${isFullscreen ? 'scale-125 -top-10' : ''}`}>
                {/* Arrow Head */}
                <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[40px] border-t-white transform"></div>
                {/* Center Dot inside Arrow */}
                <div className="absolute -top-[35px] left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-900 rounded-full"></div>
            </div>

            {/* Rotating Wheel */}
            <div 
                ref={wheelRef}
                className="w-full h-full rounded-full border-[6px] border-gray-700 relative shadow-2xl transition-transform duration-[3000ms] cubic-bezier(0.2, 0.8, 0.2, 1) bg-gray-800"
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
                    // Font size adjustments for Fullscreen
                    const fontSizeClass = isFullscreen ? 'text-sm md:text-lg pt-8 md:pt-12' : 'text-xs md:text-sm pt-3 md:pt-6';
                    
                    return (
                    <div
                        key={index}
                        className={`absolute top-0 left-1/2 h-1/2 -ml-[1px] w-[2px] origin-bottom ${fontSizeClass}`}
                        style={{ transform: `rotate(${angle}deg)` }}
                    >
                        <span 
                            className="absolute top-0 left-1/2 -translate-x-1/2 text-white font-bold whitespace-nowrap [writing-mode:vertical-rl] py-2"
                            style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.9)' }}
                        >
                        {food}
                        </span>
                    </div>
                    );
                })}
                
                {/* Center Cap */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[20%] h-[20%] bg-gray-800 rounded-full border-4 border-gray-600 flex items-center justify-center shadow-inner z-10 group">
                    <Utensils className={`w-1/2 h-1/2 text-gray-400 transition-colors ${!isSpinning && 'group-hover:text-white'}`} />
                </div>
            </div>
        </div>
      </div>

      {/* Controls & Result */}
      <div className={`text-center z-10 flex flex-col justify-center shrink-0 w-full ${isFullscreen ? 'h-32 max-w-sm scale-110' : 'h-24 max-w-xs'}`}>
        {winner ? (
          <div className="animate-in zoom-in duration-300">
            <p className="text-sm text-gray-400 mb-1">命運的選擇是...</p>
            <div className={`font-extrabold text-white flex items-center justify-center gap-2 bg-gray-900/50 p-3 rounded-xl border border-yellow-500/30 ${isFullscreen ? 'text-4xl' : 'text-3xl'}`}>
               <Sparkles className="text-yellow-400" />
               <span className="bg-gradient-to-r from-yellow-200 to-yellow-500 text-transparent bg-clip-text">
                  {winner}
               </span>
               <Sparkles className="text-yellow-400" />
            </div>
            <button 
                onClick={spinWheel}
                className="mt-3 text-xs text-gray-500 hover:text-white underline underline-offset-2 transition-colors"
            >
                不滿意？再轉一次
            </button>
          </div>
        ) : (
          <button
            onClick={spinWheel}
            disabled={isSpinning}
            className={`w-full py-4 rounded-xl font-bold text-white shadow-xl transition-all transform active:scale-95 text-lg ${
              isSpinning 
                ? 'bg-gray-700 cursor-not-allowed text-gray-400' 
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-indigo-500/20'
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
