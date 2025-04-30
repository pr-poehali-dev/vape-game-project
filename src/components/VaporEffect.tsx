import { useEffect, useState } from 'react';

interface VaporEffectProps {
  show: boolean;
}

const VaporEffect: React.FC<VaporEffectProps> = ({ show }) => {
  const [particles, setParticles] = useState<Array<{ id: number; left: string; delay: string; size: string }>>([]);

  useEffect(() => {
    if (show) {
      // Создаем частицы пара
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: `${40 + Math.random() * 20}%`, // располагаем примерно посередине
        delay: `${Math.random() * 0.8}s`,
        size: `${10 + Math.random() * 30}px`,
      }));
      
      setParticles(newParticles);
      
      // Очищаем частицы после анимации
      const timer = setTimeout(() => {
        setParticles([]);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed top-1/2 left-0 right-0 h-72 overflow-hidden pointer-events-none">
      <div className="relative h-full w-full">
        <img 
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=464&auto=format&fit=crop" 
          alt="Силуэт" 
          className="absolute top-0 left-1/2 transform -translate-x-1/2 h-full opacity-90"
        />
        
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="vapor-particle animate-vapor"
            style={{
              width: particle.size,
              height: particle.size,
              left: particle.left,
              top: '60%',
              animationDelay: particle.delay,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default VaporEffect;
