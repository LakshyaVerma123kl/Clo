export const RETURN_DATE =
  process.env.NEXT_PUBLIC_RETURN_DATE || "2024-12-25T00:00:00";
export const HER_NAME = process.env.NEXT_PUBLIC_HER_NAME || "Beautiful";
export const YOUR_NAME =
  process.env.NEXT_PUBLIC_YOUR_NAME || "Your Secret Admirer";

export const MOODS = [
  { id: "homesick", label: "Missing Home", emoji: "🏠", color: "bg-blue-500" },
  {
    id: "stressed",
    label: "Feeling Stressed",
    emoji: "😰",
    color: "bg-red-500",
  },
  { id: "excited", label: "Excited!", emoji: "🎉", color: "bg-yellow-500" },
  { id: "lonely", label: "A Bit Lonely", emoji: "💙", color: "bg-purple-500" },
  {
    id: "motivated",
    label: "Ready to Conquer",
    emoji: "💪",
    color: "bg-green-500",
  },
  { id: "sleepy", label: "Need Energy", emoji: "😴", color: "bg-indigo-500" },
];

export const MOTIVATIONAL_QUOTES = [
  {
    content: "Distance means nothing when someone means everything.",
    author: "Anonymous",
  },
  {
    content: "The best is yet to come when you have someone to share it with.",
    author: "Unknown",
  },
  {
    content: "Every day apart makes the heart grow fonder.",
    author: "Proverb",
  },
  {
    content:
      "You're braver than you believe, stronger than you seem, and smarter than you think.",
    author: "A.A. Milne",
  },
  {
    content:
      "Missing someone gets easier every day because even though you are one day further from the last time you saw them, you are one day closer to the next time you will.",
    author: "Anonymous",
  },
  {
    content:
      "True love doesn't mean being inseparable; it means being separated and nothing changes.",
    author: "Unknown",
  },
];
