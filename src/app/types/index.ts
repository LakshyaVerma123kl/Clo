export interface Mood {
  id: string;
  label: string;
  emoji: string;
  color: string;
}

export interface Quote {
  content: string;
  author: string;
}

export interface CarePackageItem {
  id: string;
  title: string;
  type: "meme" | "note" | "tip" | "hug";
  content: string;
  imageUrl?: string;
}

export interface CountdownData {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
