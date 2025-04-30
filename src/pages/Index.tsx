import { useState, useEffect, useRef } from 'react';
import VapeSelector from '@/components/VapeSelector';
import VapeDisplay from '@/components/VapeDisplay';
import VaporEffect from '@/components/VaporEffect';

const Index = () => {
  const [selectedVape, setSelectedVape] = useState({
    id: 1,
    image: 'https://cdn.poehali.dev/files/97a0a71e-1209-4057-b844-b41b02bc700a.jpg',
    name: 'Voopoo Drag X'
  });
  
  const [isPressing, setIsPressing] = useState(false);
  const [pressTime, setPressTime] = useState(0);
  const [showVapor, setShowVapor] = useState(false);
  const [vaporIntensity, setVaporIntensity] = useState(0);
  
  const pressTimerRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  
  const MAX_INTENSITY_TIME = 30; // 30 секунд для максимальной интенсивности
  
  // Обработка нажатия кнопки
  const handleButtonPress = () => {
    setIsPressing(true);
    setShowVapor(false);
    startTimeRef.current = Date.now();
    
    // Запускаем таймер
    const updateTimer = () => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      setPressTime(elapsed);
      animationFrameRef.current = requestAnimationFrame(updateTimer);
    };
    
    animationFrameRef.current = requestAnimationFrame(updateTimer);
  };
  
  // Обработка отпускания кнопки
  const handleButtonRelease = () => {
    if (isPressing) {
      setIsPressing(false);
      
      // Вычисляем интенсивность пара на основе времени нажатия
      // Ограничиваем максимальным временем (30 секунд)
      const intensity = Math.min(pressTime / MAX_INTENSITY_TIME, 1);
      setVaporIntensity(intensity);
      setShowVapor(true);
      
      // Очищаем анимационный фрейм
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      
      // Сбрасываем таймер через некоторое время
      pressTimerRef.current = window.setTimeout(() => {
        setPressTime(0);
      }, 5000);
    }
  };
  
  // Очистка таймеров при размонтировании
  useEffect(() => {
    return () => {
      if (pressTimerRef.current) {
        clearTimeout(pressTimerRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden">
      {/* Цветной градиентный фон */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-secondary/80"
        style={{ 
          backgroundImage: `radial-gradient(circle at 30% 20%, rgba(14, 165, 233, 0.15), transparent 40%), 
                           radial-gradient(circle at 70% 60%, rgba(217, 70, 239, 0.1), transparent 30%)` 
        }}
      />
      
      {/* Заголовок */}
      <div className="absolute top-5 left-0 right-0 text-center">
        <h1 className="text-2xl font-bold text-primary">ДРАГ 05 СМОКИНГ</h1>
        <p className="text-sm text-muted-foreground">Выбери вейп и сделай затяжку</p>
      </div>
      
      {/* Надпись УЛЬТРА ТЯГА при нажатии */}
      {isPressing && (
        <div className="absolute top-20 left-0 right-0 text-center z-10">
          <div className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-primary animate-pulse">
            УЛЬТРА ТЯГА
          </div>
          <div className="text-xl font-bold text-primary">
            {pressTime.toFixed(1)} сек 
            {pressTime > 0 && (
              <span className="ml-2 text-sm text-muted-foreground">
                {Math.floor((pressTime / MAX_INTENSITY_TIME) * 100)}% мощности
              </span>
            )}
          </div>
        </div>
      )}
      
      {/* Отображение выбранного вейпа */}
      <VapeDisplay 
        vapeImage={selectedVape.image}
        onButtonPress={handleButtonPress}
        onButtonRelease={handleButtonRelease}
        isPressing={isPressing}
        pressTime={pressTime}
      />
      
      {/* Эффект пара */}
      <VaporEffect show={showVapor} intensity={vaporIntensity} />
      
      {/* Селектор вейпов */}
      <VapeSelector 
        onSelectVape={setSelectedVape}
        selectedVapeId={selectedVape.id}
      />
    </div>
  );
};

export default Index;
