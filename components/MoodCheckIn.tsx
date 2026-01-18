'use client';

import React, { useState, useRef, useMemo } from 'react';
import { MoodType, DayEntry, UserSettings, UserGoal } from '../types';
import { MOOD_CONFIG } from '../constants';
import { getAffirmation } from '../vercelapi';

interface MoodCheckInProps {
  onSave: (entry: DayEntry) => void;
  onCancel: () => void;
  targetDate?: Date;
  userSettings: UserSettings;
  onUpdateSettings?: (settings: UserSettings) => void;
}

const toDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const SUGGESTED_ICONS = ['✨', '📖', '🧘', '🍵', '🛌', '🚶', '✍️', '🎹', '🎨', '🧼', '🌱', '🍎'];

const MoodCheckIn: React.FC<MoodCheckInProps> = ({ onSave, onCancel, targetDate, userSettings, onUpdateSettings }) => {
  const [step, setStep] = useState<'emotion' | 'writing' | 'planting'>('emotion');
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [note, setNote] = useState('');
  const [media, setMedia] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'image' | 'video' | undefined>();
  const [affirmation, setAffirmation] = useState<string | null>(null);
  const [activeGoals, setActiveGoals] = useState<Record<string, boolean>>({});
  
  // Custom Ritual Modal state
  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [newGoalLabel, setNewGoalLabel] = useState('');
  const [newGoalIcon, setNewGoalIcon] = useState('✨');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const moodList = Object.keys(MOOD_CONFIG) as MoodType[];

  // Memoize enabled goals to ensure custom ones show up immediately when onUpdateSettings is called
  const enabledGoals = useMemo(() => {
    return userSettings.goals.filter(g => g.enabled);
  }, [userSettings.goals]);

  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
    setStep('writing');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isVideo = file.type.startsWith('video/');
      setMediaType(isVideo ? 'video' : 'image');
      const reader = new FileReader();
      reader.onloadend = () => {
        setMedia(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleGoal = (id: string) => {
    setActiveGoals(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddGoal = () => {
    if (newGoalLabel.trim() && onUpdateSettings) {
      const id = 'custom-' + Date.now();
      const newGoal: UserGoal = {
        id,
        label: newGoalLabel.trim(),
        enabled: true,
        icon: newGoalIcon
      };
      
      // Update global state immediately
      onUpdateSettings({ 
        ...userSettings, 
        goals: [...userSettings.goals, newGoal] 
      });
      
      // Mark as active for this current entry
      setActiveGoals(prev => ({ ...prev, [id]: true }));
      
      // Cleanup UI state
      setIsAddingGoal(false);
      setNewGoalLabel('');
      setNewGoalIcon('✨');
    }
  };

  const handlePlant = async () => {
    if (!selectedMood) return;
    setStep('planting');
    const genAffirmation = await getAffirmation(selectedMood, note);
    setAffirmation(genAffirmation);
  };

  const handleFinish = () => {
    if (!selectedMood || !affirmation) return;
    const finalDate = targetDate || new Date();
    onSave({
      date: toDateKey(finalDate),
      mood: selectedMood,
      note,
      affirmation,
      media: media || undefined,
      mediaType,
      goals: activeGoals
    });
  };

  if (step === 'planting') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6 md:px-12 float-up duration-200">
        <div className="relative mb-6 group">
           <div className={`w-48 h-48 md:w-64 md:h-64 mx-auto relative transition-all duration-300 ${affirmation ? 'scale-100' : 'bloom'}`}>
              <div className="absolute inset-0 bg-posy-purple/10 rounded-full blur-3xl scale-150 animate-pulse"></div>
              {MOOD_CONFIG[selectedMood!].icon("w-full h-full drop-shadow-2xl sway")}
           </div>
           
           <div className="mt-6 space-y-2">
             <h2 className="text-3xl md:text-4xl font-serif text-posy-ink tracking-tight font-light">
               {affirmation ? "The Garden Whispers" : "Placing in soil..."}
             </h2>
             {!affirmation && <p className="text-base md:text-lg font-sans italic text-posy-ink/55">"Nurturing your moment..."</p>}
           </div>
        </div>
        
        {affirmation && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-6 md:space-y-8 flex flex-col items-center">
            <p className="text-xl md:text-2xl font-serif text-posy-purple max-w-xl leading-relaxed px-4 md:px-8 italic font-light">
              "{affirmation}"
            </p>
            <button
              onClick={handleFinish}
              className="px-10 md:px-14 py-4 md:py-5 rounded-full bg-posy-purple text-white font-medium tracking-[0.4em] uppercase text-[10px] shadow-lg hover:bg-posy-ink transition-all transform hover:scale-[1.05] active:scale-95"
            >
              Continue to Garden
            </button>
          </div>
        )}
      </div>
    );
  }

  if (step === 'writing') {
    const config = MOOD_CONFIG[selectedMood!];

    return (
      <div className="py-4 md:py-6 max-w-2xl mx-auto space-y-8 md:space-y-10 float-up px-4 md:px-6 duration-200">
        <div className="flex flex-col items-center relative">
           <button 
             onClick={() => setStep('emotion')}
             className="md:absolute left-0 top-1/2 md:-translate-y-1/2 text-[10px] font-medium uppercase tracking-[0.3em] text-posy-ink/55 hover:text-posy-purple transition-colors flex items-center gap-2"
           >
             ← Change Emotion
           </button>
           <div className="w-24 h-24 md:w-32 md:h-32 mb-4 mt-8 md:mt-0 sway">
              {config.icon("w-full h-full drop-shadow-lg")}
           </div>
           <div className="text-center space-y-1">
             <h2 className="text-3xl md:text-5xl font-serif text-posy-ink leading-tight font-light italic">Your {config.flower}</h2>
             <p className="text-[10px] uppercase font-bold tracking-[0.4em] text-posy-purple/40">{config.label}</p>
           </div>
        </div>

        <div className="space-y-10">
          <div className="space-y-6">
            <textarea
              autoFocus
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Reflect on your day..."
              className="w-full h-32 md:h-40 bg-white rounded-[32px] p-8 focus:ring-8 focus:ring-posy-purple/5 outline-none resize-none text-xl font-sans italic font-light border border-posy-purple/5 shadow-sm"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center px-2">
              <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-posy-ink/50">Daily Nurture</p>
              {onUpdateSettings && (
                <button 
                  onClick={() => setIsAddingGoal(true)}
                  className="text-[9px] font-bold uppercase tracking-widest text-posy-purple hover:opacity-60 transition-opacity flex items-center gap-2"
                >
                  <span className="text-lg">+</span> Custom Option
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {enabledGoals.length > 0 ? enabledGoals.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => toggleGoal(goal.id)}
                  className={`flex items-center gap-4 p-5 rounded-[20px] border transition-all text-left
                    ${activeGoals[goal.id] 
                      ? 'bg-posy-purple/10 border-posy-purple/20 shadow-inner scale-[0.98]' 
                      : 'bg-white border-posy-purple/5 hover:border-posy-purple/10 shadow-sm'}
                  `}
                >
                  <span className="text-xl">{goal.icon}</span>
                  <span className={`text-[10px] font-medium uppercase tracking-widest ${activeGoals[goal.id] ? 'text-posy-purple' : 'text-posy-ink/55'}`}>
                    {goal.label}
                  </span>
                </button>
              )) : (
                <div className="col-span-full py-8 px-6 text-center border-2 border-dashed border-posy-purple/10 rounded-[24px]">
                  <p className="text-[10px] font-medium uppercase tracking-widest text-posy-ink/50">No tools enabled yet.</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*,video/*" className="hidden" />
            
            {media ? (
              <div className="relative rounded-[32px] overflow-hidden border-4 border-white shadow-xl aspect-video bg-posy-bg">
                {mediaType === 'video' ? (
                  <video src={media} className="w-full h-full object-cover" controls />
                ) : (
                  <img src={media || "/placeholder.svg"} className="w-full h-full object-cover" />
                )}
                <button onClick={() => setMedia(null)} className="absolute top-4 right-4 bg-posy-ink/60 text-white p-2 rounded-full backdrop-blur-md">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-6 rounded-[32px] border-2 border-dashed border-posy-purple/10 text-posy-purple/40 hover:border-posy-purple/30 hover:text-posy-purple transition-all flex items-center justify-center gap-3 group"
              >
                <span className="text-xl group-hover:scale-110 transition-transform">📸</span>
                <span className="text-[9px] font-medium uppercase tracking-widest">Attach a Memory</span>
              </button>
            )}

            <button
              onClick={handlePlant}
              className="w-full py-6 rounded-full bg-posy-purple text-white font-medium tracking-[0.4em] uppercase text-[11px] shadow-md mt-4 hover:bg-posy-ink transition-all"
            >
              Bloom This Moment
            </button>
          </div>
        </div>

        {/* Custom Goal Modal */}
        {isAddingGoal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12 animate-in fade-in duration-300">
            <div className="absolute inset-0 bg-posy-ink/20 backdrop-blur-xl" onClick={() => setIsAddingGoal(false)}></div>
            <div className="posy-card bg-posy-paper rounded-[48px] p-10 md:p-16 w-full max-w-xl relative z-[110] shadow-2xl space-y-12">
              <div className="text-center space-y-4">
                <p className="text-[10px] font-medium uppercase tracking-[0.6em] text-posy-purple">New Tool</p>
                <h3 className="text-4xl md:text-5xl font-serif text-posy-ink tracking-tight">Plant a Habit</h3>
              </div>

              <div className="space-y-10">
                <div className="space-y-4">
                  <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-posy-ink/50 ml-2">Icon Choice</p>
                  <div className="flex flex-wrap justify-center gap-4">
                    {SUGGESTED_ICONS.map(icon => (
                      <button
                        key={icon}
                        onClick={() => setNewGoalIcon(icon)}
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl transition-all border-2
                          ${newGoalIcon === icon ? 'bg-posy-purple/10 border-posy-purple scale-110' : 'bg-posy-bg border-transparent hover:border-posy-purple/20'}
                        `}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-posy-ink/50 ml-2">Tool Name</p>
                  <input
                    autoFocus
                    type="text"
                    placeholder="e.g. Morning Tea..."
                    value={newGoalLabel}
                    onChange={(e) => setNewGoalLabel(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddGoal()}
                    className="w-full bg-posy-bg p-8 rounded-[24px] text-xl font-serif italic outline-none focus:ring-4 focus:ring-posy-purple/5 border border-posy-purple/5"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => setIsAddingGoal(false)}
                    className="flex-1 py-6 rounded-full text-[10px] font-black uppercase tracking-widest text-posy-ink/50 hover:text-posy-ink/60 transition-colors"
                  >
                    Discard
                  </button>
                  <button
                    onClick={handleAddGoal}
                    disabled={!newGoalLabel.trim()}
                    className="flex-[2] py-6 rounded-full bg-posy-purple text-white font-black uppercase tracking-[0.4em] text-[10px] shadow-xl hover:bg-posy-ink transition-all disabled:opacity-30 disabled:pointer-events-none"
                  >
                    Bloom Habit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="py-4 md:py-8 space-y-6 md:space-y-10 float-up px-4 md:px-6 max-w-6xl mx-auto duration-200">
      <div className="text-center space-y-2 md:space-y-3">
        <h2 className="text-3xl md:text-5xl font-serif text-posy-ink tracking-tight font-light leading-tight">
          {targetDate ? `Planting for ${targetDate.toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}` : "How are you blooming?"}
        </h2>
        <p className="text-[9px] md:text-[10px] font-medium text-posy-ink/50 uppercase tracking-[0.5em]">Pick your heart's flower for today</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {moodList.map((mood) => {
          const config = MOOD_CONFIG[mood];
          return (
            <button
              key={mood}
              onClick={() => handleMoodSelect(mood)}
              className="flex flex-col items-center p-6 rounded-[32px] bg-white border border-posy-purple/5 hover:border-posy-purple/20 transition-all duration-300 hover:scale-105 active:scale-95 group shadow-sm hover:shadow-xl relative overflow-hidden"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 mb-4 transition-transform group-hover:scale-110">
                {config.icon("w-full h-full")}
              </div>
              <div className="text-center space-y-1">
                <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-posy-ink/55 group-hover:text-posy-purple block transition-colors">
                  {config.label}
                </span>
                <span className="text-sm font-serif italic text-posy-ink/50 group-hover:text-posy-ink/60 block transition-all">
                  {config.flower}
                </span>
              </div>
            </button>
          );
        })}
      </div>
      
      <div className="text-center pt-2">
        <button onClick={onCancel} className="text-[10px] font-medium uppercase text-posy-ink/50 tracking-[0.4em] hover:text-posy-ink transition-colors">Discard Seed</button>
      </div>
    </div>
  );
};

export default MoodCheckIn;
