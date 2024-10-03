"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type KitItem = {
  src: string;
  color: string;
}

type TeamKits = {
  name: string;
  shirts: KitItem[];
  shorts: KitItem[];
  socks: KitItem[];
}

const TEAMS: Record<string, TeamKits> = {
  'Inter': {
    name: 'Inter',
    shirts: [
      { src: "/images/kit/inter_shirt1.jpg", color: "blue-black" },
      { src: "/images/kit/inter_shirt2.jpg", color: "white" },
      { src: "/images/kit/inter_shirt3.jpg", color: "yellow" }
    ],
    shorts: [
      { src: "/images/kit/inter_short1.jpg", color: "black" },
      { src: "/images/kit/inter_short2.jpg", color: "white" },
      { src: "/images/kit/inter_short3.jpg", color: "yellow" },
      { src: "/images/kit/inter_short4.jpg", color: "yellow" },
      { src: "/images/kit/inter_short5.jpg", color: "yellow" }
    ],
    socks: [
      { src: "/images/kit/inter_socks1.jpg", color: "black" },
      { src: "/images/kit/inter_socks2.jpg", color: "white" },
      { src: "/images/kit/inter_socks3.jpg", color: "yellow" }
    ]
  },
  'Milan': {
    name: 'Milan',
    shirts: [
      { src: "/images/kit/milan_shirt1.jpg", color: "red-black" },
      { src: "/images/kit/milan_shirt2.jpg", color: "white" },
      { src: "/images/kit/milan_shirt3.jpg", color: "grey" }
    ],
    shorts: [
      { src: "/images/kit/milan_short4.jpg", color: "black" },
      { src: "/images/kit/milan_short2.jpg", color: "white" },
      { src: "/images/kit/milan_short3.jpg", color: "grey" },
      { src: "/images/kit/milan_shor1.jpg", color: "white" }
    ],
    socks: [
      { src: "/images/kit/milan_socks1.jpg", color: "white" },
      { src: "/images/kit/milan_socks2.jpg", color: "white" },
      { src: "/images/kit/milan_socks3.jpg", color: "grey" }
    ]
  },
  
  'Roma': {
    name: 'Roma',
    shirts: [
      { src: "/images/kit/roma_shirt1.jpg", color: "red-yellow" },
      { src: "/images/kit/roma_shirt2.jpg", color: "white" },
      { src: "/images/kit/roma_shirt3.jpg", color: "black" }
    ],
    shorts: [
      { src: "/images/kit/roma_short1.jpg", color: "red" },
      { src: "/images/kit/roma_short2.jpg", color: "white" },
      { src: "/images/kit/roma_short3.jpg", color: "black" }
    ],
    socks: [
      { src: "/images/kit/roma_socks1.jpg", color: "red" },
      { src: "/images/kit/roma_socks2.jpg", color: "white" },
      { src: "/images/kit/roma_socks3.jpg", color: "black" }
    ]
  }
  
};

type KitOptionProps = {
  item: KitItem;
  type: string;
  onPrev: () => void;
  onNext: () => void;
  size: 'large' | 'medium' | 'small';
}

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

type TeamSelectorProps = {
  side: 'home' | 'away';
  selectedTeam: string;
  onTeamChange: (team: string) => void;
}

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

type KitSelectorProps = {
  title: string;
  team: TeamKits;
  selectedKit: {shirt: number; shorts: number; socks: number};
  onKitChange: (type: 'shirt' | 'shorts' | 'socks', index: number) => void;
}

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

export default function SerieAKitSelector() {
  const [homeTeam, setHomeTeam] = useState('Inter');
  const [awayTeam, setAwayTeam] = useState('Milan');
  const [homeKit, setHomeKit] = useState({shirt: 0, shorts: 0, socks: 0});
  const [awayKit, setAwayKit] = useState({shirt: 0, shorts: 0, socks: 0});

  const chooseMatchKits = () => {
    // Home team gets priority for home kit
    setHomeKit({shirt: 0, shorts: 0, socks: 0});
    
    // Away team needs to avoid home team colors
    const homeColors = {
      shirt: TEAMS[homeTeam].shirts[0].color,
      shorts: TEAMS[homeTeam].shorts[0].color,
      socks: TEAMS[homeTeam].socks[0].color,
    };
    
    const newAwayKit = {
      shirt: TEAMS[awayTeam].shirts.findIndex(s => s.color !== homeColors.shirt),
      shorts: TEAMS[awayTeam].shorts.findIndex(s => s.color !== homeColors.shorts),
      socks: TEAMS[awayTeam].socks.findIndex(s => s.color !== homeColors.socks),
    };
    
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
}
