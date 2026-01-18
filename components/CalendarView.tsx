'use client';

import React from 'react';
import { DayEntry, MoodType } from '../types';
import { MOOD_CONFIG } from '../constants';

const toDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

interface CalendarViewProps {
  entries: DayEntry[];
  onSelectEntry: (entry: DayEntry) => void;
  onDayClick: (day: number) => void;
  onViewBouquet: () => void;
  externalDate?: Date;
  onDateChange: (date: Date) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ 
  entries, 
  onDayClick,
  onViewBouquet, 
  externalDate,
  onDateChange 
}) => {
  const currentDate = externalDate || new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  const daysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
  const firstDayOfMonth = (y: number, m: number) => new Date(y, m, 1).getDay();

  const prevMonth = () => onDateChange(new Date(year, month - 1, 1));
  const nextMonth = () => onDateChange(new Date(year, month + 1, 1));

  const totalDays = daysInMonth(year, month);
  const offset = firstDayOfMonth(year, month);

  const getEntryForDay = (day: number) => {
    const dayDate = new Date(year, month, day);
    const dayKey = toDateKey(dayDate);
    return entries.find(e => e.date === dayKey);
  };

  const currentMonthEntries = entries.filter(e => {
    const d = new Date(e.date + 'T12:00:00');
    return d.getMonth() === month && d.getFullYear() === year;
  });

  const monthMoodCounts = currentMonthEntries.reduce((acc, e) => {
    acc[e.mood] = (acc[e.mood] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="py-4 md:py-8 float-up space-y-20 md:space-y-32 px-4 md:px-0">
      <section>
        <div className="flex justify-between items-center mb-10 md:mb-20">
          <button onClick={prevMonth} className="p-4 text-posy-ink/50 hover:text-posy-purple transition-all">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <div className="text-center">
             <h2 className="text-5xl md:text-8xl font-serif text-posy-ink tracking-tight mb-2 leading-none font-light">
              {monthName}
             </h2>
             <p className="text-[10px] font-medium text-posy-ink/50 uppercase tracking-[0.6em]">{year}</p>
          </div>
          <button onClick={nextMonth} className="p-4 text-posy-ink/50 hover:text-posy-purple transition-all">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

        <div className="grid grid-cols-7 gap-3 md:gap-6 mb-8">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
            <div key={`${d}-${i}`} className="text-center text-[10px] font-medium text-posy-ink/50 uppercase tracking-[0.4em]">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-3 md:gap-6 px-1">
          {Array.from({ length: offset }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square opacity-10" />
          ))}
          {Array.from({ length: totalDays }).map((_, i) => {
            const day = i + 1;
            const entry = getEntryForDay(day);
            const isToday = new Date().getDate() === day && new Date().getMonth() === month && new Date().getFullYear() === year;

            return (
              <div key={day} className="relative aspect-square">
                <button
                  onClick={() => onDayClick(day)}
                  className={`w-full h-full flex items-center justify-center relative transition-all duration-500
                    ${entry ? 'bloom-button' : 'recessed-button'}
                    ${isToday && !entry ? 'ring-2 ring-posy-purple/40 ring-offset-2' : ''}
                  `}
                >
                  {entry ? (
                    <div className="w-[85%] h-[85%] sway">
                      {MOOD_CONFIG[entry.mood].icon("w-full h-full")}
                    </div>
                  ) : (
                    <span className="text-lg md:text-2xl font-serif text-posy-ink/50 font-light group-hover:text-posy-purple transition-colors">
                      {day}
                    </span>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <section className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="posy-card p-10 md:p-16 space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-posy-bg pb-12">
            <div className="space-y-4 text-center md:text-left">
              <p className="text-[10px] font-medium text-posy-purple/40 uppercase tracking-[0.6em]">MONTHLY BLOOMS</p>
              <h3 className="text-4xl md:text-6xl font-serif text-posy-ink leading-tight font-light">
                Your {monthName} <br/>
                <span className="italic opacity-30 text-posy-purple">Bouquet</span>
              </h3>
            </div>
            <button 
              onClick={onViewBouquet}
              className="px-10 py-5 bg-posy-bg dark:bg-posy-paper rounded-full hover:bg-posy-purple/10 transition-colors group flex items-center gap-6 border border-posy-ink/5"
            >
              <span className="text-[10px] font-medium uppercase tracking-widest text-posy-purple">View Bouquet</span>
              <svg className="w-6 h-6 text-posy-purple group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14 5l7 7-7 7" /></svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <p className="text-[9px] font-medium uppercase tracking-widest text-posy-ink/50">Flora Snapshot</p>
              <div className="space-y-5">
                {Object.entries(monthMoodCounts).length === 0 ? (
                  <p className="italic text-posy-ink/50 font-serif text-2xl font-light">A quiet garden waits...</p>
                ) : (
                  Object.entries(monthMoodCounts).sort(([, a], [, b]) => (b as number) - (a as number)).slice(0, 3).map(([mood]) => (
                    <div key={mood} className="flex items-center gap-6 group">
                      <div className="w-12 h-12 group-hover:scale-110 transition-transform">
                        {MOOD_CONFIG[mood as MoodType].icon("w-full h-full")}
                      </div>
                      <span className="font-serif text-2xl text-posy-ink/70 font-light">{MOOD_CONFIG[mood as MoodType].flower}s</span>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className="bg-posy-bg/20 dark:bg-posy-paper rounded-[32px] p-12 flex items-center justify-center italic text-2xl font-serif text-posy-ink/40 leading-relaxed text-center border border-posy-ink/[0.01] shadow-inner font-light">
              {currentMonthEntries.length > 0 ? (
                `“Each season of your heart holds a unique beauty. Nurture it with patience.“`
              ) : (
                "The earth remembers your heart even when it's quiet."
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CalendarView;
