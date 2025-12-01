
import React, { useEffect, useState } from 'react';

const SakuraBackground: React.FC = () => {
  const [petals, setPetals] = useState<number[]>([]);

  useEffect(() => {
    // Generate a fixed number of petals on mount
    const petalCount = 15;
    const newPetals = Array.from({ length: petalCount }, (_, i) => i);
    setPetals(newPetals);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <style>{`
        @keyframes fall {
          0% {
            opacity: 0;
            top: -10%;
            transform: translateX(0) rotate(0deg);
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.4;
          }
          100% {
            opacity: 0;
            top: 110%;
            transform: translateX(100px) rotate(360deg);
          }
        }
        @keyframes sway {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(25px); }
        }
        .petal {
          position: absolute;
          /* Darker pink for visibility on light background */
          background: linear-gradient(to bottom right, #fbcfe8, #f472b6);
          border-radius: 150% 0 150% 0;
          opacity: 0;
          animation-name: fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          box-shadow: 1px 1px 2px rgba(0,0,0,0.05);
        }
      `}</style>
      {petals.map((i) => {
        // Randomize properties for each petal
        const left = Math.random() * 100 + '%';
        const animDuration = 10 + Math.random() * 15 + 's';
        const animDelay = Math.random() * 10 + 's';
        const size = 10 + Math.random() * 12 + 'px';

        return (
          <div
            key={i}
            className="petal"
            style={{
              left: left,
              width: size,
              height: size,
              animationDuration: animDuration,
              animationDelay: animDelay,
            }}
          />
        );
      })}
    </div>
  );
};

export default SakuraBackground;
