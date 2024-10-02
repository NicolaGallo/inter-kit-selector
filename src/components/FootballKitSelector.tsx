"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type KitOptionProps = {
  src: string;
  type: string;
  onPrev: () => void;
  onNext: () => void;
  size: 'large' | 'medium' | 'small';
}

const KitOption: React.FC<KitOptionProps> = ({ src, type, onPrev, onNext, size }) => {
  const sizeClasses = {
    large: 'w-32 h-32',
    medium: 'w-24 h-24',
    small: 'w-16 h-16'
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <Button variant="ghost" size="icon" onClick={onPrev} className="h-8 w-8">
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <div className="relative">
        <img src={src} alt={`Selected ${type}`} className={`${sizeClasses[size]} object-contain`} />
        <p className="text-sm text-gray-500 text-center mt-1 capitalize">{type}</p>
      </div>
      <Button variant="ghost" size="icon" onClick={onNext} className="h-8 w-8">
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default function FootballKitSelector() {
  const [selectedShirt, setSelectedShirt] = useState(0);
  const [selectedShorts, setSelectedShorts] = useState(0);
  const [selectedSocks, setSelectedSocks] = useState(0);

  const shirts = [
    "/images/kit/inter_shirt1.jpg",
    "/images/kit/inter_shirt2.jpg",
    "/images/kit/inter_shirt3.jpg"
  ];

  const shorts = [
    "/images/kit/inter_short1.jpg",
    "/images/kit/inter_short2.jpg",
    "/images/kit/inter_short3.jpg",
    "/images/kit/inter_short4.jpg",
    "/images/kit/inter_short5.jpg"
  ];

  const socks = [
    "/images/kit/inter_socks1.jpg",
    "/images/kit/inter_socks2.jpg",
    "/images/kit/inter_socks3.jpg"
  ];

  const changeSelection = (
    current: number,
    setCurrent: (value: number) => void,
    options: string[],
    increment: boolean
  ) => {
    const newIndex = increment
      ? (current + 1) % options.length
      : (current - 1 + options.length) % options.length;
    setCurrent(newIndex);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <h2 className="text-2xl font-bold">Inter Football Kit Selector</h2>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-6">
          <KitOption
            src={shirts[selectedShirt]}
            type="shirt"
            size="large"
            onPrev={() => changeSelection(selectedShirt, setSelectedShirt, shirts, false)}
            onNext={() => changeSelection(selectedShirt, setSelectedShirt, shirts, true)}
          />
          <KitOption
            src={shorts[selectedShorts]}
            type="shorts"
            size="medium"
            onPrev={() => changeSelection(selectedShorts, setSelectedShorts, shorts, false)}
            onNext={() => changeSelection(selectedShorts, setSelectedShorts, shorts, true)}
          />
          <KitOption
            src={socks[selectedSocks]}
            type="socks"
            size="small"
            onPrev={() => changeSelection(selectedSocks, setSelectedSocks, socks, false)}
            onNext={() => changeSelection(selectedSocks, setSelectedSocks, socks, true)}
          />
        </div>
      </CardContent>
    </Card>
  );
}
