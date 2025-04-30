import { useEffect, useState } from 'react';

interface VaporEffectProps {
  show: boolean;
  intensity: number; // Свойство для интенсивности пара (0-1)
}

const VaporEffect: React.FC<VaporEffectProps> = ({ show, intensity }) => {
  const [particles, setParticles] = useState<Array<{ id: number; left: string; delay: string; size: string }>>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      // Показываем изображение и частицы
      setVisible(true);
      
      // Вычисляем количество частиц в зависимости от интенсивности
      // От 10 до 50 частиц в зависимости от интенсивности
      const particleCount = Math.floor(10 + intensity * 40);
      
      // Создаем частицы пара
      const newParticles = Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        left: `${40 + Math.random() * 20}%`, // располагаем примерно посередине
        delay: `${Math.random() * 0.8}s`,
        size: `${10 + Math.random() * 30 + intensity * 15}px`, // Увеличиваем размер с интенсивностью
      }));
      
      setParticles(newParticles);
      
      // Скрываем эффект через 2-4 секунды в зависимости от интенсивности
      const displayTime = 2000 + intensity * 2000;
      const timer = setTimeout(() => {
        setVisible(false);
        setParticles([]);
      }, displayTime);
      
      return () => clearTimeout(timer);
    }
  }, [show, intensity]);

  if (!visible) return null;

  // Регулируем непрозрачность изображения в зависимости от интенсивности
  const opacity = 0.7 + (intensity * 0.3);
  
  // Регулируем масштаб облака пара в зависимости от интенсивности
  const scale = 1 + (intensity * 0.5);

  return (
    <div className="fixed top-1/2 left-0 right-0 h-72 overflow-hidden pointer-events-none z-50">
      <div className="relative h-full w-full">
        <img 
          src="https://cdn.poehali.dev/files/32e4a12f-2d6f-4bae-817e-6c86c62dd359.jpg" 
          alt="Изображение с паром" 
          className="absolute top-0 left-1/2 transform -translate-x-1/2 h-full"
          style={{ 
            opacity, 
            transform: `translateX(-50%) scale(${scale})`,
            transition: 'transform 0.3s ease-out'
          }}
        />
        
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="vapor-particle"
            style={{
              width: particle.size,
              height: particle.size,
              left: particle.left,
              top: '60%',
              animationDelay: particle.delay,
              // Увеличиваем скорость анимации с увеличением интенсивности
              animationDuration: `${3 - intensity}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default VaporEffect;
