'use client';

import React, { useState } from 'react';
import { DayEntry, MoodType, getGrowthStage } from '../types';
import { MOOD_CONFIG } from '../constants';

interface GardenProps {
  entries: DayEntry[];
  currentYear: number;
  onSelectDay: (entry: DayEntry) => void;
}

const Garden: React.FC<GardenProps> = ({ entries, currentYear, onSelectDay }) => {
  const [selectedMoodGroup, setSelectedMoodGroup] = useState<MoodType | null>(null);

  const yearEntries = entries.filter(e => {
    const d = new Date(e.date + 'T12:00:00');
    return d.getFullYear() === currentYear;
  });
  
  const moodFrequency = yearEntries.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const moodGroups = Object.keys(moodFrequency) as MoodType[];

  const resilienceQuotes: Record<string, string> = {
    [MoodType.SAD]: "Blue blooms are evidence of a heart that feels deeply. You are brave.",
    [MoodType.ANXIOUS]: "Even in heavy winds, these roots hold fast. You are strong and safe.",
    [MoodType.OVERWHELMED]: "Every petal here is a victory of your gentle spirit. You are doing enough.",
    [MoodType.TIRED]: "Quiet growth happens in the rest. You are beautifully human and deserving of peace.",
    [MoodType.LONELY]: "Each bloom here is a companion to your journey. You are seen and loved."
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center overflow-x-hidden float-up">
      <div className="text-center mt-12 md:mt-24 mb-16 md:mb-32 space-y-6 z-10 px-6">
        <h2 className="text-6xl md:text-9xl font-serif text-posy-ink tracking-tighter leading-none">Your {currentYear} Garden</h2>
        <p className="text-[11px] md:text-[14px] font-black text-posy-ink/55 uppercase tracking-[0.8em]">A living landscape of your heart</p>
      </div>

      <div className="relative w-full flex-1 flex flex-wrap justify-center items-end gap-x-12 md:gap-x-32 gap-y-20 md:gap-y-40 px-6 md:px-20 pb-64 min-h-[500px]">
        {moodGroups.length === 0 ? (
          <div className="text-center py-48 opacity-20">
            <p className="font-serif text-4xl md:text-7xl italic text-posy-ink px-12 leading-tight">"The garden is waiting for your first bloom."</p>
          </div>
        ) : (
          moodGroups.map((mood, i) => {
            const count = moodFrequency[mood];
            const stage = getGrowthStage(count);
            const config = MOOD_CONFIG[mood];

            return (
              <div 
                key={mood} 
                className="relative group flex flex-col items-center"
                style={{ 
                  zIndex: selectedMoodGroup === mood ? 1000 : 20 + i,
                  transform: `translateY(${Math.sin(i * 2) * 30}px)` 
                }}
              >
                <button
                  onClick={() => setSelectedMoodGroup(selectedMoodGroup === mood ? null : mood)}
                  className="relative transition-all duration-1000 hover:scale-110 active:scale-95 sway"
                  style={{ animationDelay: `${i * 0.4}s` }}
                >
                  <div className={`
                    ${stage === 'tree' ? 'w-56 h-56 md:w-80 md:h-80' : stage === 'bush' ? 'w-40 h-40 md:w-60 md:h-60' : 'w-28 h-28 md:w-40 md:h-40'}
                    drop-shadow-2xl transition-all
                  `}>
                    {config.icon("w-full h-full")}
                  </div>
                </button>

                {selectedMoodGroup === mood && (
                  <div className="fixed md:absolute inset-x-6 md:inset-x-auto bottom-24 md:top-full md:mt-12 bg-white dark:bg-posy-paper p-10 md:p-14 rounded-[56px] md:rounded-[72px] shadow-2xl border-4 border-posy-ink/5 w-auto md:w-[480px] z-[2000] animate-in fade-in zoom-in-95 slide-in-from-top-6 duration-400">
                    <div className="mb-10 space-y-4 text-center md:text-left">
                      <p className="text-[12px] md:text-[14px] font-black text-posy-purple uppercase tracking-[0.6em]">{config.label}</p>
                      <h4 className="text-4xl md:text-6xl font-serif text-posy-ink leading-tight">{config.flower} {stage === 'tree' ? 'Grove' : stage === 'bush' ? 'Bush' : 'Sprout'}</h4>
                    </div>
                    
                    {resilienceQuotes[mood] && (
                      <p className="text-xl md:text-2xl italic text-posy-purple font-medium leading-relaxed mb-10 border-l-8 border-posy-purple/30 pl-8 py-4 bg-posy-purple/5 rounded-r-[32px]">
                        "{resilienceQuotes[mood]}"
                      </p>
                    )}

                    <div className="space-y-4 max-h-72 md:max-h-[400px] overflow-y-auto pr-4 scrollbar-hide">
                      <p className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.6em] text-posy-ink/50 mb-6 border-b border-posy-ink/5 pb-4">Reflections</p>
                      {yearEntries.filter(e => e.mood === mood).map(entry => (
                        <button
                          key={entry.date}
                          onClick={() => onSelectDay(entry)}
                          className="w-full text-left px-10 py-6 rounded-[32px] bg-posy-bg dark:bg-posy-paper border border-posy-ink/5 hover:border-posy-purple/30 transition-all flex justify-between items-center group/date shadow-sm hover:shadow-md"
                        >
                          <span className="text-2xl font-serif">
                            {new Date(entry.date + 'T12:00:00').toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}
                          </span>
                          <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 group-hover/date:opacity-100 transition-opacity">Open →</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Garden;
