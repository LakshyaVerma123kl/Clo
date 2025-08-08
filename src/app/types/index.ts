// types/index.ts
export interface Mood {
  id: string;
  label: string;
  emoji: string;
  color: string;
}

export interface CountdownData {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
export interface Meme {
  title: string;
  url: string;
  postLink: string;
  author: string;
}

export interface CarePackageItem {
  id: string;
  title: string;
  type: "meme" | "note" | "tip" | "hug";
  content: string;
  revealed: boolean;
}

export interface Quote {
  content: string;
  author: string;
}

export interface Section {
  id: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
}
