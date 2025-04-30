import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Vape {
  id: number;
  image: string;
  name: string;
}

interface VapeSelectorProps {
  onSelectVape: (vape: Vape) => void;
  selectedVapeId: number;
}

const VapeSelector: React.FC<VapeSelectorProps> = ({ onSelectVape, selectedVapeId }) => {
  // Примеры вейпов
  const vapes: Vape[] = [
    {
      id: 1,
      image: 'https://cdn.poehali.dev/files/97a0a71e-1209-4057-b844-b41b02bc700a.jpg',
      name: 'Voopoo Drag X'
    },
    {
      id: 2,
      image: 'https://cdn.poehali.dev/files/ab5d81cc-4611-4637-844a-529e52aa688d.jpg',
      name: 'Voopoo Drag S'
    },
    {
      id: 3,
      image: 'https://cdn.poehali.dev/files/a788c225-d575-487f-9a72-152dfede5d78.jpg',
      name: 'Drag 3'
    },
    {
      id: 4,
      image: 'https://cdn.poehali.dev/files/b70a7a28-bc54-43f4-85e8-3a9e3b9f5026.jpg',
      name: 'Voopoo Resin'
    },
    {
      id: 5,
      image: 'https://cdn.poehali.dev/files/6759708c-eabd-47ef-b47c-5f65fa7fc68c.jpg',
      name: 'Voopoo Resin Pro'
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-black/80 backdrop-blur-md">
      <h2 className="text-center text-primary mb-2 text-xl font-bold">Выбери устройство</h2>
      
      <div className="flex overflow-x-auto gap-4 pb-2 px-2 scrollbar-hide">
        {vapes.map((vape) => (
          <div 
            key={vape.id}
            className={`flex-shrink-0 cursor-pointer transition-all duration-300 p-2 rounded-lg 
              ${selectedVapeId === vape.id 
                ? 'bg-primary/25 shadow-lg shadow-primary/40' 
                : 'bg-black/40 hover:bg-black/60'}`}
            onClick={() => onSelectVape(vape)}
          >
            <div className="relative">
              <img 
                src={vape.image} 
                alt={vape.name} 
                className="h-24 object-contain"
              />
              {selectedVapeId === vape.id && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-white">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
              )}
            </div>
            <p className="text-center text-xs mt-1 text-white/80">{vape.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VapeSelector;
