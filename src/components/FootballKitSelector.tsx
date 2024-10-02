"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';



const KitOption: React.FC<{ src: string; isSelected: boolean; onClick: () => void }> = ({ src, isSelected, onClick }) => (
  <div
    className={`border-2 ${isSelected ? 'border-blue-500' : 'border-gray-200'} 
    rounded-lg p-2 cursor-pointer hover:border-blue-300 transition-all`}
    onClick={onClick}
  >
    <img src={src} alt="Kit option" className="w-24 h-24 object-contain" />
  </div>
);

export default function FootballKitSelector() {
  const [selectedShirt, setSelectedShirt] = useState(0);
  const [selectedShorts, setSelectedShorts] = useState(0);
  const [selectedSocks, setSelectedSocks] = useState(0);

  const shirts = [
    "/images/kit/inter_shirt1.png", // Blue/black striped shirt
    "/images/kit/inter_shirt2.png", // White shirt
    "/images/kit/inter_shirt3.png"  // Yellow with black design shirt
  ];

  const shorts = [
    "/images/kit/inter_short1.png", // Black shorts with blue stripe
    "/images/kit/inter_short2.png", // Black shorts with yellow stripe
    "/images/kit/inter_short3.png"
  ];

  const socks = [
    "/images/kit/inter_socks1.png", // Blue socks
    "/images/kit/inter_socks2.png", // White socks
    "/images/kit/inter_socks3.png" // Yellow socks
  ];

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <h2 className="text-2xl font-bold">Inter Football Kit Selector</h2>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="shirt" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="shirt">Shirt</TabsTrigger>
            <TabsTrigger value="shorts">Shorts</TabsTrigger>
            <TabsTrigger value="socks">Socks</TabsTrigger>
          </TabsList>
          
          <TabsContent value="shirt" className="mt-4">
            <div className="flex justify-center gap-4">
              {shirts.map((src, index) => (
                <KitOption
                  key={index}
                  src={src}
                  isSelected={selectedShirt === index}
                  onClick={() => setSelectedShirt(index)}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="shorts" className="mt-4">
            <div className="flex justify-center gap-4">
              {shorts.map((src, index) => (
                <KitOption
                  key={index}
                  src={src}
                  isSelected={selectedShorts === index}
                  onClick={() => setSelectedShorts(index)}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="socks" className="mt-4">
            <div className="flex justify-center gap-4">
              {socks.map((src, index) => (
                <KitOption
                  key={index}
                  src={src}
                  isSelected={selectedSocks === index}
                  onClick={() => setSelectedSocks(index)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center">
          <h3 className="text-lg font-semibold mb-4">Your Selected Kit</h3>
          <div className="flex flex-col items-center gap-4">
            <img src={shirts[selectedShirt]} alt="Selected shirt" className="w-32 h-32 object-contain" />
            <img src={shorts[selectedShorts]} alt="Selected shorts" className="w-24 h-24 object-contain" />
            <img src={socks[selectedSocks]} alt="Selected socks" className="w-16 h-16 object-contain" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
