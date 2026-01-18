'use client';

import React, { useEffect, useState } from 'react';
import { DayEntry, MoodType } from '../types';
import { MOOD_CONFIG } from '../constants';

interface BouquetExportProps {
  entries: DayEntry[];
  onShareWithFlorist?: () => void;
}

const BouquetExport: React.FC<BouquetExportProps> = ({ entries, onShareWithFlorist }) => {
  const [mounted, setMounted] = useState(false);
  const now = new Date();
  const monthName = now.toLocaleString('default', { month: 'long' });
  const currentMonthEntries = entries.filter(e => {
    const d = new Date(e.date + 'T12:00:00');
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const moodCounts = currentMonthEntries.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const handleShare = () => {
    alert("✨ Weaving your " + monthName + " Posy into a shareable masterpiece...");
  };

  const handleShareDetails = () => {
    const details = Object.entries(moodCounts)
      .map(([mood]) => `${MOOD_CONFIG[mood as MoodType].flower}`)
      .join(', ');
    alert(`💐 Your ${monthName} Bouquet Composition:\n\n${details || 'No blooms yet.'}`);
  };

  return (
    <div className="py-12 md:py-24 space-y-12 md:space-y-32 float-up max-w-6xl mx-auto min-h-screen px-6">
      <div className="text-center space-y-8 md:space-y-12">
        <p className="text-[11px] md:text-[13px] font-black text-posy-purple uppercase tracking-[0.8em]">End of Month Collection</p>
        <h2 className="text-6xl md:text-9xl font-serif text-posy-ink tracking-tighter leading-none">
          Your {monthName} <span className="italic text-posy-purple">Bouquet</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 md:gap-24 items-start">
        {/* Artistic Bouquet Composition */}
        <div className="lg:col-span-3 relative aspect-[4/5] w-full bg-white dark:bg-posy-paper rounded-[80px] md:rounded-[140px] p-12 md:p-24 shadow-2xl overflow-hidden flex items-center justify-center border border-posy-purple/5 transition-all duration-1000">
          {currentMonthEntries.length === 0 ? (
            <div className="text-center space-y-10 px-10">
              <p className="text-posy-ink/50 italic text-3xl md:text-5xl font-serif leading-relaxed">"A quiet meadow waits for its first bloom."</p>
            </div>
          ) : (
            <div className="relative w-full h-full flex items-center justify-center">
              {currentMonthEntries.map((entry, i) => {
                const angle = (i / currentMonthEntries.length) * 360 + (Math.random() * 20);
                const isMobile = window.innerWidth < 768;
                const baseRadius = isMobile ? 8 : 14;
                const radius = (Math.random() * (isMobile ? 4 : 8)) + baseRadius; 
                const scale = (isMobile ? 0.5 : 0.9) + (Math.random() * 0.3);
                const rotation = (Math.random() * 40) - 20;
                
                return (
                  <div
                    key={`${entry.date}-${i}`}
                    className={`absolute transition-all duration-1000 ${mounted ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 translate-y-40'}`}
                    style={{
                      transform: `rotate(${angle}deg) translateY(-${radius}rem) rotate(-${angle}deg) rotate(${rotation}deg) scale(${scale})`,
                      transitionDelay: `${i * 100}ms`,
                      zIndex: Math.floor(radius)
                    }}
                  >
                    <div className="w-24 h-24 md:w-56 md:h-56 drop-shadow-2xl cursor-pointer sway" style={{ animationDelay: `${i * 0.2}s` }}>
                      {MOOD_CONFIG[entry.mood].icon("w-full h-full")}
                    </div>
                  </div>
                );
              })}
              
              <div className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 bg-white dark:bg-posy-paper/90 backdrop-blur-md px-10 md:px-16 py-4 md:py-6 rounded-full text-[11px] md:text-[14px] font-black uppercase tracking-[0.8em] shadow-2xl border-2 border-posy-purple/10 text-posy-purple z-[100] whitespace-nowrap">
                {monthName} COLLECTION
              </div>
            </div>
          )}
        </div>

        {/* Stats and Reflection */}
        <div className="lg:col-span-2 space-y-12 md:space-y-20 py-8">
          <div className="space-y-10">
            <p className="text-[11px] font-black uppercase tracking-[0.8em] text-posy-purple px-4">THE BLOOMS OF {monthName}</p>
            
            <div className="space-y-8 max-h-[400px] overflow-y-auto pr-6 scrollbar-hide">
              {Object.entries(moodCounts)
                .sort(([, a], [, b]) => (b as number) - (a as number))
                .map(([mood]) => (
                <div key={mood} className="flex items-center gap-8 group p-6 rounded-[48px] bg-white dark:bg-posy-paper posy-card border border-posy-purple/5 hover:border-posy-purple/20 transition-all shadow-sm">
                   <div className="w-16 h-16 md:w-24 md:h-24 transition-transform group-hover:scale-110">
                      {MOOD_CONFIG[mood as MoodType].icon("w-full h-full")}
                   </div>
                   <div className="flex-1 space-y-2">
                      <span className="text-2xl md:text-4xl font-serif text-posy-ink">{MOOD_CONFIG[mood as MoodType].flower}s</span>
                      <p className="text-[10px] font-black text-posy-ink/55 uppercase tracking-[0.6em]">{MOOD_CONFIG[mood as MoodType].label}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-12 md:p-16 bg-white dark:bg-posy-paper rounded-[64px] md:rounded-[90px] shadow-2xl border border-posy-purple/10 space-y-12 text-center">
             <div className="space-y-6">
                <p className="text-[10px] font-black text-posy-ink/50 uppercase tracking-[0.8em]">A MONTH IN REVIEW</p>
                <p className="text-3xl md:text-5xl font-serif text-posy-ink leading-tight italic opacity-90">
                  "Your heart has grown beautifully this season. Every moment was a unique gift."
                </p>
             </div>
             
             <div className="space-y-4 pt-6">
                <button 
                  onClick={handleShare}
                  className="w-full py-8 md:py-10 rounded-full bg-posy-purple text-white font-black tracking-[0.8em] uppercase text-xs shadow-2xl hover:bg-posy-ink transition-all transform hover:scale-[1.02] active:scale-95"
                >
                  Share Digital Posy
                </button>
                <div className="flex flex-col md:flex-row gap-4">
                  <button 
                    onClick={handleShareDetails}
                    className="flex-1 py-6 rounded-full border-2 border-posy-ink/5 text-[10px] font-black uppercase tracking-widest text-posy-ink/40 hover:bg-posy-bg transition-all"
                  >
                    Details
                  </button>
                  <button 
                    onClick={onShareWithFlorist}
                    className="flex-1 py-6 rounded-full border-2 border-posy-purple/10 text-[10px] font-black uppercase tracking-widest text-posy-purple hover:bg-posy-purple/5 transition-all"
                  >
                    To Florist
                  </button>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BouquetExport;
