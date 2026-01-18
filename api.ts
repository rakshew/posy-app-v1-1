import { MoodType } from "./types";

export async function getAffirmation(mood: MoodType, note: string): Promise<string> {
  try {
    const response = await fetch('/api/affirmation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mood, note }),
    });

    if (!response.ok) {
      throw new Error('Failed to get affirmation');
    }

    const data = await response.json();
    return data.affirmation || "The earth remembers your strength even when the frost feels permanent.";
  } catch (error) {
    console.error("Affirmation Error:", error);
    return "Soft moss gathers where you rest; your growth is quiet, steady, and true.";
  }
}
