"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type ColorCategory = 'dark'|'dark_blue' |'dark_red' | 'light' | 'vibrant';

type KitItem = {
  src: string;
  color: string;
  colorCategory: ColorCategory;
  isHome?: boolean;
  isAway?: boolean;
  isThird?: boolean;
}

type TeamKits = {
  name: string;
  shirts: KitItem[];
  shorts: KitItem[];
  socks: KitItem[];
}

type KitOptionProps = {
  item: KitItem;
  type: 'shirt' | 'shorts' | 'socks';
  onPrev: () => void;
  onNext: () => void;
  size: 'large' | 'medium' | 'small';
}

type TeamSelectorProps = {
  side: 'home' | 'away';
  selectedTeam: string;
  onTeamChange: (team: string) => void;
}

type KitSelectorProps = {
  title: string;
  team: TeamKits;
  selectedKit: {
    shirt: number;
    shorts: number;
    socks: number;
  };
  onKitChange: (type: 'shirt' | 'shorts' | 'socks', index: number) => void;
}

const TEAMS: Record<string, TeamKits> = {
  'Inter': {
    name: 'Inter',
    shirts: [
      { src: "/images/kit/inter_shirt1.jpg", color: "blue-black", colorCategory: 'dark_blue', isHome: true },
      { src: "/images/kit/inter_shirt2.jpg", color: "white", colorCategory: 'light', isAway: true },
      { src: "/images/kit/inter_shirt3.jpg", color: "yellow", colorCategory: 'vibrant', isThird: true }
    ],
    shorts: [
      { src: "/images/kit/inter_short1.jpg", color: "black", colorCategory: 'dark', isHome: true },
      { src: "/images/kit/inter_short2.jpg", color: "white", colorCategory: 'light', isAway: true },
      { src: "/images/kit/inter_short3.jpg", color: "black", colorCategory: 'dark', isThird: true },
      { src: "/images/kit/inter_short4.jpg", color: "blue", colorCategory: 'vibrant', isThird: true },
      { src: "/images/kit/inter_short5.jpg", color: "yellow", colorCategory: 'light', isThird: true }
    ],
    socks: [
      { src: "/images/kit/inter_socks1.jpg", color: "black", colorCategory: 'dark', isHome: true },
      { src: "/images/kit/inter_socks2.jpg", color: "white", colorCategory: 'light', isAway: true },
      { src: "/images/kit/inter_socks3.jpg", color: "yellow", colorCategory: 'vibrant', isThird: true }
    ]
  },
  'Milan': {
    name: 'Milan',
    shirts: [
      { src: "/images/kit/milan_shirt1.jpg", color: "red-black", colorCategory: 'dark_red', isHome: true },
      { src: "/images/kit/milan_shirt2.jpg", color: "white", colorCategory: 'light', isAway: true },
      { src: "/images/kit/milan_shirt3.jpg", color: "grey", colorCategory: 'light', isThird: true }
    ],
    shorts: [
      { src: "/images/kit/milan_short1.jpg", color: "white", colorCategory: 'light', isHome: true },
      { src: "/images/kit/milan_short2.jpg", color: "white", colorCategory: 'light', isAway: true },
      { src: "/images/kit/milan_short3.jpg", color: "grey", colorCategory: 'dark', isThird: true },
      { src: "/images/kit/milan_short4.jpg", color: "grey", colorCategory: 'dark', isThird: true }
    ],
    socks: [
      { src: "/images/kit/milan_socks1.jpg", color: "white", colorCategory: 'dark', isHome: true },
      { src: "/images/kit/milan_socks2.jpg", color: "white", colorCategory: 'light', isAway: true },
      { src: "/images/kit/milan_socks3.jpg", color: "grey", colorCategory: 'light', isThird: true }
    ]
  },
  'Roma': {
    name: 'Roma',
    shirts: [
      { src: "/images/kit/roma_shirt1.jpg", color: "red-yellow", colorCategory: 'vibrant', isHome: true },
      { src: "/images/kit/roma_shirt2.jpg", color: "white", colorCategory: 'light', isAway: true },
      { src: "/images/kit/roma_shirt3.jpg", color: "black", colorCategory: 'dark', isThird: true }
    ],
    shorts: [
      { src: "/images/kit/roma_short1.jpg", color: "red", colorCategory: 'vibrant', isHome: true },
      { src: "/images/kit/roma_short2.jpg", color: "white", colorCategory: 'light', isAway: true },
      { src: "/images/kit/roma_short3.jpg", color: "black", colorCategory: 'dark', isThird: true }
    ],
    socks: [
      { src: "/images/kit/roma_socks1.jpg", color: "red", colorCategory: 'vibrant', isHome: true },
      { src: "/images/kit/roma_socks2.jpg", color: "white", colorCategory: 'light', isAway: true },
      { src: "/images/kit/roma_socks3.jpg", color: "black", colorCategory: 'dark', isThird: true }
    ]
  }
};

const KitOption: React.FC<KitOptionProps> = ({ item, type, onPrev, onNext, size }) => {
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
        <img src={item.src} alt={`Selected ${type}`} className={`${sizeClasses[size]} object-contain`} />
        <p className="text-sm text-gray-500 text-center mt-1 capitalize">{type} - {item.color}</p>
      </div>
      <Button variant="ghost" size="icon" onClick={onNext} className="h-8 w-8">
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

const TeamSelector: React.FC<TeamSelectorProps> = ({ side, selectedTeam, onTeamChange }) => (
  <div className="mb-4">
    <Select value={selectedTeam} onValueChange={onTeamChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={`Select ${side} team`} />
      </SelectTrigger>
      <SelectContent>
        {Object.keys(TEAMS).map(team => (
          <SelectItem key={team} value={team}>{team}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

const KitSelector: React.FC<KitSelectorProps> = ({ title, team, selectedKit, onKitChange }) => (
  <div className="flex flex-col items-center">
    <h3 className="text-xl font-semibold mb-4">{title}</h3>
    <KitOption
      item={team.shirts[selectedKit.shirt]}
      type="shirt"
      size="large"
      onPrev={() => onKitChange('shirt', (selectedKit.shirt - 1 + team.shirts.length) % team.shirts.length)}
      onNext={() => onKitChange('shirt', (selectedKit.shirt + 1) % team.shirts.length)}
    />
    <KitOption
      item={team.shorts[selectedKit.shorts]}
      type="shorts"
      size="medium"
      onPrev={() => onKitChange('shorts', (selectedKit.shorts - 1 + team.shorts.length) % team.shorts.length)}
      onNext={() => onKitChange('shorts', (selectedKit.shorts + 1) % team.shorts.length)}
    />
    <KitOption
      item={team.socks[selectedKit.socks]}
      type="socks"
      size="small"
      onPrev={() => onKitChange('socks', (selectedKit.socks - 1 + team.socks.length) % team.socks.length)}
      onNext={() => onKitChange('socks', (selectedKit.socks + 1) % team.socks.length)}
    />
  </div>
);

const SerieAKitSelector: React.FC = () => {
  const [homeTeam, setHomeTeam] = useState('Inter');
  const [awayTeam, setAwayTeam] = useState('Milan');
  const [homeKit, setHomeKit] = useState({shirt: 0, shorts: 0, socks: 0});
  const [awayKit, setAwayKit] = useState({shirt: 0, shorts: 0, socks: 0});

  const areColorsCompatible = (item1: KitItem, item2: KitItem): boolean => {
    if (item1.color === item2.color || item1.colorCategory === item2.colorCategory) {
      return false;
    }
    return true;
  }

  const findBestAwayKit = (awayTeamKits: TeamKits, homeTeamKit: {
    shirt: KitItem,
    shorts: KitItem,
    socks: KitItem
  }) => {
    const preferredShirts = awayTeamKits.shirts.filter(shirt => shirt.isAway || shirt.isThird);
    const preferredShorts = awayTeamKits.shorts.filter(shorts => shorts.isAway || shorts.isThird);
    const preferredSocks = awayTeamKits.socks.filter(socks => socks.isAway || socks.isThird);

    const compatibleShirt = preferredShirts.find(shirt => 
      areColorsCompatible(shirt, homeTeamKit.shirt)
    ) || awayTeamKits.shirts.find(shirt => 
      areColorsCompatible(shirt, homeTeamKit.shirt)
    );

    const compatibleShorts = preferredShorts.find(shorts => 
      areColorsCompatible(shorts, homeTeamKit.shorts)
    ) || awayTeamKits.shorts.find(shorts => 
      areColorsCompatible(shorts, homeTeamKit.shorts)
    );

    const compatibleSocks = preferredSocks.find(socks => 
      areColorsCompatible(socks, homeTeamKit.socks)
    ) || awayTeamKits.socks.find(socks => 
      areColorsCompatible(socks, homeTeamKit.socks)
    );

    return {
      shirt: awayTeamKits.shirts.indexOf(compatibleShirt || awayTeamKits.shirts[1]),
      shorts: awayTeamKits.shorts.indexOf(compatibleShorts || awayTeamKits.shorts[1]),
      socks: awayTeamKits.socks.indexOf(compatibleSocks || awayTeamKits.socks[1])
    };
  };

  const chooseMatchKits = () => {
    const newHomeKit = {
      shirt: TEAMS[homeTeam].shirts[0],
      shorts: TEAMS[homeTeam].shorts[0],
      socks: TEAMS[homeTeam].socks[0]
    };
    setHomeKit({shirt: 0, shorts: 0, socks: 0});
    
    const newAwayKit = findBestAwayKit(TEAMS[awayTeam], newHomeKit);
    setAwayKit(newAwayKit);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <h2 className="text-2xl font-bold">Serie A Kit Selector</h2>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center gap-4 mb-4">
          <TeamSelector side="home" selectedTeam={homeTeam} onTeamChange={setHomeTeam} />
          <TeamSelector side="away" selectedTeam={awayTeam} onTeamChange={setAwayTeam} />
        </div>
        
        <Button onClick={chooseMatchKits} className="w-full mb-6">
          Scegli per il match
        </Button>
        
        <div className="flex justify-between gap-8">
          <KitSelector
            title="Home"
            team={TEAMS[homeTeam]}
            selectedKit={homeKit}
            onKitChange={(type, index) => setHomeKit({...homeKit, [type]: index})}
          />
          <KitSelector
            title="Away"
            team={TEAMS[awayTeam]}
            selectedKit={awayKit}
            onKitChange={(type, index) => setAwayKit({...awayKit, [type]: index})}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default SerieAKitSelector;
