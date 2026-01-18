export enum MoodType {
  HAPPY = 'HAPPY',
  GRATEFUL = 'GRATEFUL',
  PEACEFUL = 'PEACEFUL',
  JOYFUL = 'JOYFUL',
  LOVED = 'LOVED',
  HOPEFUL = 'HOPEFUL',
  CALM = 'CALM',
  EXCITED = 'EXCITED',
  CONTENT = 'CONTENT',
  PROUD = 'PROUD',
  ENERGIZED = 'ENERGIZED',
  INSPIRED = 'INSPIRED',
  THOUGHTFUL = 'THOUGHTFUL',
  QUIET = 'QUIET',
  REFLECTIVE = 'REFLECTIVE',
  ANXIOUS = 'ANXIOUS',
  SAD = 'SAD',
  TIRED = 'TIRED',
  LONELY = 'LONELY',
  OVERWHELMED = 'OVERWHELMED'
}

export interface DayEntry {
  date: string; // YYYY-MM-DD
  mood: MoodType;
  note: string;
  affirmation?: string;
  media?: string; // Data URI for photo/video
  mediaType?: 'image' | 'video';
  goals?: Record<string, boolean>;
}

export interface UserGoal {
  id: string;
  label: string;
  enabled: boolean;
  icon: string;
}

export type ThemePalette = 'classic' | 'rose' | 'forest';

export interface UserSettings {
  goals: UserGoal[];
  palette: ThemePalette;
  isDarkMode: boolean;
  isHighContrast: boolean;
  isLargeText: boolean;
}

export interface GardenState {
  entries: DayEntry[];
}

export type GrowthStage = 'sprout' | 'bush' | 'tree';

export function getGrowthStage(count: number): GrowthStage {
  if (count >= 10) return 'tree';
  if (count >= 4) return 'bush';
  return 'sprout';
}
