import { useState, useRef, useEffect } from 'react';

interface VapeDisplayProps {
  vapeImage: string;
  onButtonPress: () => void;
  onButtonRelease: () => void;
  isPressing: boolean;
  pressTime: number;
}

const VapeDisplay: React.FC<VapeDisplayProps> = ({ 
  vapeImage, 
  onButtonPress, 
  onButtonRelease,
  isPressing,
  pressTime
}) => {
  const handleMouseDown = () => {
    onButtonPress();
  };

  const handleMouseUp = () => {
    onButtonRelease();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    onButtonPress();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    onButtonRelease();
  };

  return (
    <div className="flex flex-col items-center justify-center relative">
      <div className="relative cursor-pointer">
        <img 
          src={vapeImage} 
          alt="Вейп" 
          className="h-[70vh] object-contain select-none"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onContextMenu={(e) => e.preventDefault()}
        />
        
        {/* Кнопка (визуальный индикатор) */}
        <div 
          className={`absolute right-4 top-1/3 w-10 h-10 rounded-full 
            transition-colors duration-300 border-2 
            ${isPressing ? 'bg-primary animate-pulse' : 'bg-secondary/50 border-white/20'}`}
        />
      </div>
    </div>
  );
};

export default VapeDisplay;
