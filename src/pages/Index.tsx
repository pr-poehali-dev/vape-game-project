import { useState, useEffect } from 'react';
import VaporEffect from '@/components/VaporEffect';

export default function Index() {
  const [showVapor, setShowVapor] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [showUltraText, setShowUltraText] = useState(false);
  const [intensity, setIntensity] = useState(0);
  
  // Максимальное время затяжки - 30 секунд
  const MAX_DRAG_TIME = 30;

  // Обработчик нажатия кнопки
  const handleStartDrag = () => {
    if (!isActive) {
      // Начинаем затяжку
      setIsActive(true);
      setShowUltraText(true);
      setTimer(0);
    } else {
      // Заканчиваем затяжку и показываем эффект пара
      setIsActive(false);
      
      // Рассчитываем интенсивность пара на основе времени затяжки
      // от 0 до 1, где 1 - максимальная интенсивность при 30 секундах
      const calcIntensity = Math.min(timer / MAX_DRAG_TIME, 1);
      setIntensity(calcIntensity);
      
      // Показываем эффект пара
      setShowVapor(true);
      
      // Скрываем эффект пара через некоторое время
      setTimeout(() => {
        setShowVapor(false);
      }, 2000 + calcIntensity * 2000); // Длительность эффекта зависит от интенсивности
    }
  };

  // Эффект для обновления таймера
  useEffect(() => {
    let interval: number | undefined;
    
    if (isActive) {
      interval = window.setInterval(() => {
        setTimer((prevTimer) => {
          // Останавливаем таймер на максимальном значении
          if (prevTimer >= MAX_DRAG_TIME) {
            clearInterval(interval);
            return MAX_DRAG_TIME;
          }
          return prevTimer + 0.1;
        });
      }, 100);
    } else if (!isActive && timer !== 0) {
      clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timer]);

  // Рассчитываем процент мощности
  const powerPercentage = Math.min(Math.round((timer / MAX_DRAG_TIME) * 100), 100);

  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-4 bg-gray-900">
      <div className="w-full text-center py-4">
        <h1 className="text-3xl font-bold gradient-text">ДРАГ 05 СМОКИНГ</h1>
      </div>

      {showUltraText && (
        <div className="fixed top-20 left-0 right-0 flex justify-center items-center gap-4 z-10">
          <span className="text-2xl ultra-text">УЛЬТРА ТЯГА</span>
          <div className="bg-gray-800 rounded-full px-4 py-1 text-white">
            <span>{timer.toFixed(1)}с</span>
            <span className="ml-2 text-green-400">{powerPercentage}%</span>
          </div>
        </div>
      )}

      <div className="flex-grow flex items-center justify-center">
        <button
          className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95"
          onPointerDown={handleStartDrag}
          onPointerUp={handleStartDrag}
          onPointerLeave={() => {
            if (isActive) {
              handleStartDrag();
            }
          }}
        >
          <div className="w-28 h-28 rounded-full bg-gray-900 flex items-center justify-center text-white text-xl font-bold">
            {isActive ? "СТОП" : "СТАРТ"}
          </div>
        </button>
      </div>

      <VaporEffect show={showVapor} intensity={intensity} />

      <div className="w-full text-center py-4 text-gray-400 text-sm">
        © 2025 ДРАГ 05 СМОКИНГ
      </div>
    </div>
  );
}
