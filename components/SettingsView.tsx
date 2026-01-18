'use client';

import React, { useState } from 'react';
import { UserSettings, UserGoal, ThemePalette } from '../types';

interface SettingsViewProps {
  settings: UserSettings;
  onUpdateSettings: (settings: UserSettings) => void;
}

const THEMES: { id: ThemePalette; label: string; color: string }[] = [
  { id: 'classic', label: 'Classic Paper', color: '#fde2b2' },
  { id: 'rose', label: 'Rose Garden', color: '#ffcad4' },
  { id: 'forest', label: 'Deep Forest', color: '#d8e2dc' }
];

const SUGGESTED_ICONS = ['✨', '📖', '🧘', '🍵', '🛌', '🚶', '✍️', '🎹', '🎨', '🧼', '🌱', '🍎', '🌊', '☀️', '🌙', '🧠', '🥗', '👟'];

const SettingsView: React.FC<SettingsViewProps> = ({ settings, onUpdateSettings }) => {
  const [modalMode, setModalMode] = useState<'add' | 'edit' | null>(null);
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);
  const [goalLabel, setGoalLabel] = useState('');
  const [goalIcon, setGoalIcon] = useState('✨');

  const toggleGoal = (id: string) => {
    const newGoals = settings.goals.map(g => 
      g.id === id ? { ...g, enabled: !g.enabled } : g
    );
    onUpdateSettings({ ...settings, goals: newGoals });
  };

  const openAddModal = () => {
    setGoalLabel('');
    setGoalIcon('✨');
    setModalMode('add');
  };

  const openEditModal = (goal: UserGoal) => {
    setEditingGoalId(goal.id);
    setGoalLabel(goal.label);
    setGoalIcon(goal.icon);
    setModalMode('edit');
  };

  const handleSaveGoal = () => {
    if (!goalLabel.trim()) return;

    if (modalMode === 'add') {
      const id = 'custom-' + Date.now();
      const newGoal: UserGoal = {
        id,
        label: goalLabel.trim(),
        enabled: true,
        icon: goalIcon
      };
      onUpdateSettings({ ...settings, goals: [...settings.goals, newGoal] });
    } else if (modalMode === 'edit' && editingGoalId) {
      const newGoals = settings.goals.map(g => 
        g.id === editingGoalId ? { ...g, label: goalLabel.trim(), icon: goalIcon } : g
      );
      onUpdateSettings({ ...settings, goals: newGoals });
    }
    closeModal();
  };

  const handleDeleteGoal = () => {
    if (editingGoalId) {
      const newGoals = settings.goals.filter(g => g.id !== editingGoalId);
      onUpdateSettings({ ...settings, goals: newGoals });
      closeModal();
    }
  };

  const closeModal = () => {
    setModalMode(null);
    setEditingGoalId(null);
    setGoalLabel('');
    setGoalIcon('✨');
  };

  const setPalette = (palette: ThemePalette) => {
    onUpdateSettings({ ...settings, palette });
  };

  const toggleDarkMode = () => {
    onUpdateSettings({ ...settings, isDarkMode: !settings.isDarkMode });
  };

  const toggleHighContrast = () => {
    onUpdateSettings({ ...settings, isHighContrast: !settings.isHighContrast });
  };

  const toggleLargeText = () => {
    onUpdateSettings({ ...settings, isLargeText: !settings.isLargeText });
  };

  // Helper to check if a goal is a "custom" one
  const isCustomGoal = (id: string) => id.startsWith('custom-');

  return (
    <div className="py-10 md:py-24 space-y-24 md:space-y-40 float-up max-w-6xl mx-auto px-6">
      <div className="text-center space-y-8">
        <p className="text-[11px] font-medium text-posy-purple uppercase tracking-[0.6em]">Your Garden Toolbox</p>
        <h2 className="text-6xl md:text-9xl font-serif text-posy-ink tracking-tight leading-none font-light">Your <span className="italic opacity-20">Tools</span></h2>
      </div>

      <div className="space-y-24">
        {/* Appearance & Themes */}
        <section className="space-y-16">
          <div className="text-center md:text-left space-y-4">
            <h3 className="text-4xl md:text-7xl font-serif text-posy-ink tracking-tight font-light">Appearance</h3>
            <p className="text-posy-ink/55 font-serif italic text-xl md:text-2xl leading-relaxed font-light">Choose the colors that bring you peace today.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Toggles */}
            <div className="space-y-6">
              <button
                onClick={toggleDarkMode}
                className="w-full flex items-center justify-between p-10 rounded-[32px] posy-card hover:border-posy-purple/10 group"
              >
                <div className="flex items-center gap-8">
                  <span className="text-5xl group-hover:scale-110 transition-transform">{settings.isDarkMode ? '🌙' : '☀️'}</span>
                  <div className="text-left">
                    <p className="font-medium uppercase tracking-[0.4em] text-[10px] text-posy-ink/60">Midnight Mode</p>
                    <p className="text-posy-ink/55 font-serif italic text-lg font-light">A soft glow for evening rest.</p>
                  </div>
                </div>
                <div className={`w-14 h-7 rounded-full relative transition-colors ${settings.isDarkMode ? 'bg-posy-purple' : 'bg-posy-ink/10'}`}>
                  <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${settings.isDarkMode ? 'left-8' : 'left-1'}`}></div>
                </div>
              </button>

              {/* Accessibility Section */}
              <div className="posy-card p-10 rounded-[32px] space-y-8">
                <p className="text-[10px] font-medium uppercase tracking-[0.6em] text-posy-purple text-center">Accessibility Options</p>
                <div className="space-y-4">
                  <button
                    onClick={toggleLargeText}
                    className="w-full flex items-center justify-between p-6 rounded-[24px] bg-posy-bg/30 hover:bg-posy-bg/50 transition-all group"
                  >
                    <div className="text-left">
                      <p className="font-medium uppercase tracking-[0.3em] text-[9px] text-posy-ink/60">Large Typography</p>
                    </div>
                    <div className={`w-10 h-5 rounded-full relative transition-colors ${settings.isLargeText ? 'bg-posy-purple' : 'bg-posy-ink/10'}`}>
                      <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${settings.isLargeText ? 'left-6' : 'left-1'}`}></div>
                    </div>
                  </button>

                  <button
                    onClick={toggleHighContrast}
                    className="w-full flex items-center justify-between p-6 rounded-[24px] bg-posy-bg/30 hover:bg-posy-bg/50 transition-all group"
                  >
                    <div className="text-left">
                      <p className="font-medium uppercase tracking-[0.3em] text-[9px] text-posy-ink/60">High Contrast</p>
                    </div>
                    <div className={`w-10 h-5 rounded-full relative transition-colors ${settings.isHighContrast ? 'bg-posy-purple' : 'bg-posy-ink/10'}`}>
                      <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${settings.isHighContrast ? 'left-6' : 'left-1'}`}></div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Palette Grid */}
            <div className="posy-card p-12 rounded-[32px] space-y-10">
              <p className="text-[10px] font-medium uppercase tracking-[0.6em] text-posy-ink/50 text-center">MOOD PALETTES</p>
              <div className="flex flex-wrap justify-center gap-12">
                {THEMES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setPalette(t.id)}
                    className="flex flex-col items-center gap-4 group"
                  >
                    <div 
                      className={`w-16 h-16 rounded-[14px] border transition-all transform group-hover:scale-110 shadow-inner
                        ${settings.palette === t.id ? 'border-posy-purple scale-110 ring-8 ring-posy-purple/5' : 'border-transparent'}
                      `}
                      style={{ backgroundColor: t.color }}
                    />
                    <span className={`text-[9px] font-medium uppercase tracking-[0.4em] ${settings.palette === t.id ? 'text-posy-purple' : 'text-posy-ink/55'}`}>
                      {t.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Daily Nurture Checklist */}
        <section className="space-y-16">
          <div className="text-center md:text-left space-y-4">
            <h3 className="text-4xl md:text-7xl font-serif text-posy-ink tracking-tight font-light">Daily Nurture</h3>
            <p className="text-posy-ink/55 font-serif italic text-xl md:text-2xl leading-relaxed font-light">
              Equip your garden with tools that remind you to care for yourself.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {settings.goals.map((goal) => (
              <div key={goal.id} className="relative group">
                <button
                  onClick={() => toggleGoal(goal.id)}
                  className={`w-full flex flex-col items-center p-12 rounded-[32px] border transition-all posy-card
                    ${goal.enabled 
                      ? 'bg-posy-purple/5 border-posy-purple/20' 
                      : 'bg-white border-transparent text-posy-ink/50 hover:border-posy-purple/10'}
                  `}
                >
                  <span className={`text-5xl mb-8 transition-transform group-hover:scale-105 ${goal.enabled ? 'opacity-100' : 'grayscale opacity-5'}`}>
                    {goal.icon}
                  </span>
                  <span className={`font-medium uppercase tracking-[0.5em] text-[10px] text-center leading-relaxed ${goal.enabled ? 'text-posy-purple' : ''}`}>
                    {goal.label}
                  </span>
                  <div className={`mt-8 w-10 h-1 bg-current rounded-full transition-opacity ${goal.enabled ? 'opacity-30' : 'opacity-0'}`}></div>
                </button>
                
                {/* Edit Button overlay */}
                <button
                  onClick={() => openEditModal(goal)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-posy-bg text-posy-ink/55 hover:text-posy-purple hover:bg-white transition-all opacity-0 group-hover:opacity-100 shadow-sm"
                  title="Edit Tool"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
              </div>
            ))}
            
            <button
              onClick={openAddModal}
              className="flex flex-col items-center justify-center p-12 rounded-[32px] border-2 border-dashed border-posy-purple/10 text-posy-purple/30 hover:border-posy-purple/30 hover:bg-posy-purple/5 transition-all group bg-white/40 shadow-sm"
            >
              <span className="text-5xl mb-8 group-hover:scale-110 transition-transform">＋</span>
              <span className="font-medium uppercase tracking-[0.5em] text-[10px] text-center">Custom Option</span>
            </button>
          </div>
        </section>
      </div>

      {/* Tool Management Modal (Add/Edit) */}
      {modalMode && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-posy-ink/20 backdrop-blur-xl" onClick={closeModal}></div>
          <div className="posy-card bg-posy-paper rounded-[48px] p-10 md:p-16 w-full max-w-xl relative z-[110] shadow-2xl space-y-12">
            <div className="text-center space-y-4">
              <p className="text-[10px] font-medium uppercase tracking-[0.6em] text-posy-purple">
                {modalMode === 'add' ? 'New Tool' : 'Refine Tool'}
              </p>
              <h3 className="text-4xl md:text-5xl font-serif text-posy-ink tracking-tight">
                {modalMode === 'add' ? 'Add to Toolbox' : 'Modify Tool'}
              </h3>
            </div>

            <div className="space-y-10">
              <div className="space-y-4">
                <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-posy-ink/50 ml-2">Icon Choice</p>
                <div className="flex flex-wrap justify-center gap-4 max-h-40 overflow-y-auto pr-2 scrollbar-hide">
                  {SUGGESTED_ICONS.map(icon => (
                    <button
                      key={icon}
                      onClick={() => setGoalIcon(icon)}
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl transition-all border-2
                        ${goalIcon === icon ? 'bg-posy-purple/10 border-posy-purple scale-110' : 'bg-posy-bg border-transparent hover:border-posy-purple/20'}
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
                  value={goalLabel}
                  onChange={(e) => setGoalLabel(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveGoal()}
                  className="w-full bg-posy-bg p-8 rounded-[24px] text-xl font-serif italic outline-none focus:ring-4 focus:ring-posy-purple/5 border border-posy-purple/5"
                />
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex gap-4">
                  <button
                    onClick={closeModal}
                    className="flex-1 py-6 rounded-full text-[10px] font-black uppercase tracking-widest text-posy-ink/50 hover:text-posy-ink/60 transition-colors"
                  >
                    Discard
                  </button>
                  <button
                    onClick={handleSaveGoal}
                    disabled={!goalLabel.trim()}
                    className="flex-[2] py-6 rounded-full bg-posy-purple text-white font-black uppercase tracking-[0.4em] text-[10px] shadow-xl hover:bg-posy-ink transition-all disabled:opacity-30 disabled:pointer-events-none"
                  >
                    {modalMode === 'add' ? 'Add Tool' : 'Save Changes'}
                  </button>
                </div>
                
                {/* Delete button only for custom tools in edit mode */}
                {modalMode === 'edit' && editingGoalId && isCustomGoal(editingGoalId) && (
                  <button
                    onClick={handleDeleteGoal}
                    className="w-full py-4 text-[9px] font-bold uppercase tracking-[0.4em] text-posy-ink/50 hover:text-red-400/60 transition-colors"
                  >
                    Remove Tool Forever
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="text-center pt-24 border-t border-posy-purple/10">
        <p className="text-posy-ink/50 font-serif italic text-3xl md:text-5xl leading-relaxed max-w-4xl mx-auto px-6 font-light">
          "Your heart is a soil of infinite potential, always blooming at exactly the right pace."
        </p>
      </div>
    </div>
  );
};

export default SettingsView;
