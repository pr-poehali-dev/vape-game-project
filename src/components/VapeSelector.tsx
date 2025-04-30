import { useState } from 'react';

type VapeItem = {
  id: number;
  image: string;
  name: string;
};

const vapes: VapeItem[] = [
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
    name: 'Voopoo Drag 2' 
  },
  { 
    id: 5, 
    image: 'https://cdn.poehali.dev/files/6759708c-eabd-47ef-b47c-5f65fa7fc68c.jpg', 
    name: 'Voopoo Drag Mini' 
  }
];

interface VapeSelectorProps {
  onSelectVape: (vape: VapeItem) => void;
  selectedVapeId: number | null;
}

const VapeSelector: React.FC<VapeSelectorProps> = ({ onSelectVape, selectedVapeId }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-secondary p-4 rounded-t-2xl">
      <div className="flex overflow-x-auto gap-4 pb-2">
        {vapes.map((vape) => (
          <div 
            key={vape.id} 
            className={`flex-shrink-0 cursor-pointer transition-all duration-300 ${
              selectedVapeId === vape.id 
                ? 'scale-110 border-2 border-primary' 
                : 'border border-muted hover:border-primary/50'
            }`}
            onClick={() => onSelectVape(vape)}
          >
            <img 
              src={vape.image} 
              alt={vape.name} 
              className="w-20 h-32 object-contain rounded-lg bg-black/40"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VapeSelector;
