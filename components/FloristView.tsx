'use client';

import React, { useState } from 'react';
import { MOOD_CONFIG } from '../constants';
import { MoodType, DayEntry } from '../types';

interface FloristViewProps {
  entries: DayEntry[];
}

const COMMUNITY_BOUQUETS = [
  { id: 1, name: "Eleanor's Garden", blooms: [MoodType.HAPPY, MoodType.PEACEFUL, MoodType.JOYFUL], message: "A week of quiet sun." },
  { id: 2, name: "Saffron Lane", blooms: [MoodType.REFLECTIVE, MoodType.QUIET, MoodType.THOUGHTFUL], message: "Listening to the winter rain." },
  { id: 3, name: "Wildwood Studio", blooms: [MoodType.ENERGIZED, MoodType.INSPIRED, MoodType.EXCITED], message: "A season of new ideas!" },
  { id: 4, name: "The Quiet Meadow", blooms: [MoodType.CALM, MoodType.PEACEFUL, MoodType.CONTENT], message: "Finding rest in the small things." }
];

const FloristView: React.FC<FloristViewProps> = ({ entries }) => {
  const [selectedMonths, setSelectedMonths] = useState<number[]>([]);
  const [mixedBouquet, setMixedBouquet] = useState<DayEntry[] | null>(null);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const currentYear = new Date().getFullYear();

  const toggleMonth = (idx: number) => {
    if (selectedMonths.includes(idx)) {
      setSelectedMonths(selectedMonths.filter(m => m !== idx));
    } else {
      setSelectedMonths([...selectedMonths, idx]);
    }
  };

  const generateMix = () => {
    const mixed = entries.filter(e => {
      const d = new Date(e.date + 'T12:00:00');
      return selectedMonths.includes(d.getMonth()) && d.getFullYear() === currentYear;
    });
    setMixedBouquet(mixed.length > 0 ? mixed : null);
    if (mixed.length === 0) alert("No blooms found in those months to mix!");
  };

  return (
    <div className="py-10 md:py-20 space-y-24 md:space-y-40 float-up animate-in fade-in duration-700">
      {/* Header */}
      <div className="text-center space-y-6 md:space-y-10 px-6">
        <p className="text-[10px] md:text-[12px] font-black text-posy-purple/60 uppercase tracking-[0.6em] md:tracking-[0.8em]">THE VILLAGE FLORIST</p>
        <h2 className="text-5xl md:text-9xl font-serif text-posy-ink tracking-tighter leading-none">
          Shared <span className="italic opacity-50 text-posy-purple">Sanctuaries</span>
        </h2>
        <p className="max-w-2xl mx-auto text-posy-ink/55 font-serif text-xl md:text-2xl italic leading-relaxed">
          "A garden is meant to be shared. Here, we admire the quiet growth of our neighbors and leave seeds of kindness."
        </p>
      </div>

      {/* Seasonal Mixer Section */}
      <section className="bg-white rounded-[48px] md:rounded-[80px] p-10 md:p-24 shadow-2xl border border-posy-purple/5 space-y-12 md:space-y-20">
        <div className="text-center space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-posy-purple">Custom Arrangement</p>
          <h3 className="text-4xl md:text-6xl font-serif text-posy-ink">Generate a <span className="italic text-posy-purple opacity-60">Seasonal Mix</span></h3>
          <p className="text-posy-ink/55 font-serif italic text-lg">Select multiple months to see your heart's evolution as a single bouquet.</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {months.map((m, i) => (
              <button
                key={m}
                onClick={() => toggleMonth(i)}
                className={`px-6 py-3 rounded-full border-2 text-[10px] font-black uppercase tracking-widest transition-all
                  ${selectedMonths.includes(i) 
                    ? 'bg-posy-purple border-posy-purple text-white shadow-lg scale-105' 
                    : 'bg-white border-posy-purple/10 text-posy-ink/55 hover:border-posy-purple/40'}
                `}
              >
                {m}
              </button>
            ))}
          </div>

          <div className="flex justify-center">
            <button 
              onClick={generateMix}
              className="px-12 py-5 bg-posy-ink text-white rounded-full font-black uppercase tracking-[0.4em] text-[10px] shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              Generate Mix →
            </button>
          </div>
        </div>

        {mixedBouquet && (
          <div className="animate-in fade-in zoom-in-95 duration-700 relative aspect-video w-full max-w-5xl mx-auto bg-posy-bg/50 rounded-[40px] md:rounded-[64px] border-4 border-white shadow-inner flex items-center justify-center overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none"></div>
             <div className="relative flex flex-wrap justify-center gap-2 p-12">
               {mixedBouquet.slice(0, 30).map((entry, idx) => (
                 <div key={idx} className="w-16 h-16 md:w-32 md:h-32 sway" style={{ animationDelay: `${idx * 0.1}s` }}>
                   {MOOD_CONFIG[entry.mood].icon("w-full h-full")}
                 </div>
               ))}
             </div>
             <div className="absolute bottom-8 bg-white/90 backdrop-blur-md px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.4em] shadow-lg">
                Seasonal Composition ({selectedMonths.length} Months)
             </div>
          </div>
        )}
      </section>

      {/* Community Gallery */}
      <div className="space-y-12 md:space-y-20">
        <div className="px-6 space-y-2">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-posy-purple/60">Community Collection</p>
          <h3 className="text-3xl md:text-5xl font-serif text-posy-ink">Global <span className="italic opacity-40">Monthly Bouquets</span></h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 px-2 md:px-0">
          {COMMUNITY_BOUQUETS.map((garden) => (
            <div key={garden.id} className="bg-white rounded-[32px] md:rounded-[48px] p-10 md:p-12 shadow-xl border border-posy-purple/5 hover:border-posy-purple/20 transition-all group">
              <div className="flex flex-col gap-8">
                {/* Visual Cluster - Always Centered */}
                <div className="flex -space-x-8 md:-space-x-12 hover:space-x-1 transition-all duration-500 py-6 px-4 justify-center bg-posy-bg/30 rounded-[40px] shadow-inner">
                  {garden.blooms.map((mood, idx) => (
                    <div key={idx} className="w-20 h-20 md:w-32 md:h-32 drop-shadow-lg sway" style={{ animationDelay: `${idx * 0.3}s` }}>
                      {MOOD_CONFIG[mood].icon("w-full h-full")}
                    </div>
                  ))}
                </div>
                
                {/* Content - Vertical Stack to prevent clipping */}
                <div className="space-y-4 text-center">
                  <div className="space-y-1">
                    <p className="text-[8px] font-black uppercase text-posy-purple/40 tracking-[0.4em]">VILLAGE GARDEN</p>
                    <h3 className="text-3xl md:text-4xl font-serif text-posy-ink break-words">{garden.name}</h3>
                  </div>
                  <p className="text-posy-ink/60 font-serif italic text-lg leading-snug px-4">"{garden.message}"</p>
                  <div className="flex gap-6 justify-center pt-2">
                    <button className="text-[8px] font-black uppercase tracking-widest text-posy-ink/55 hover:text-posy-purple transition-colors">Gift a Seed</button>
                    <button className="text-[8px] font-black uppercase tracking-widest text-posy-ink/55 hover:text-posy-purple transition-colors">View Garden</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Future Ideation Section */}
      <section className="bg-posy-paper rounded-[48px] md:rounded-[80px] p-12 md:p-32 border-2 border-posy-purple/10 text-center space-y-16 md:space-y-24 shadow-sm">
        <div className="space-y-6">
          <h3 className="text-4xl md:text-8xl font-serif text-posy-ink tracking-tighter">A Blooming <br/><span className="italic text-posy-purple opacity-40">Connection</span></h3>
          <p className="text-posy-purple font-black uppercase tracking-[0.6em] text-[10px] md:text-xs">COMING SOON TO THE VILLAGE</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-left max-w-6xl mx-auto">
          <div className="space-y-6 p-10 md:p-12 rounded-[40px] bg-white border border-posy-purple/5 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 group">
            <div className="w-12 h-12 bg-posy-yellow/20 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">🏡</div>
            <h4 className="text-2xl md:text-3xl font-serif text-posy-ink">Local Florists</h4>
            <p className="text-lg text-posy-ink/50 font-serif italic leading-relaxed">Connect with friends and family to see their seasonal gardens in real-time.</p>
          </div>
          <div className="space-y-6 p-10 md:p-12 rounded-[40px] bg-white border border-posy-purple/5 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 group">
            <div className="w-12 h-12 bg-posy-salmon/20 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">🎁</div>
            <h4 className="text-2xl md:text-3xl font-serif text-posy-ink">Gift a Bouquet</h4>
            <p className="text-lg text-posy-ink/50 font-serif italic leading-relaxed">Send a custom collection of your best moments to someone needing a little sunshine.</p>
          </div>
          <div className="space-y-6 p-10 md:p-12 rounded-[40px] bg-white border border-posy-purple/5 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 group">
            <div className="w-12 h-12 bg-posy-mint/20 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">🌱</div>
            <h4 className="text-2xl md:text-3xl font-serif text-posy-ink">Seed Trading</h4>
            <p className="text-lg text-posy-ink/50 font-serif italic leading-relaxed">Exchange rare mood-seeds with the community to grow new varieties in your sanctuary.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FloristView;
