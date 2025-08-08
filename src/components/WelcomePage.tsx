"use client";

import React, { useMemo, useCallback } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { Mood } from "../app/types";

interface WelcomePageProps {
  onMoodSelect: (mood: Mood) => void;
  selectedMood: Mood | null;
}

const moodsData: (Mood & { message: string })[] = [
  {
    id: "homesick",
    label: "Missing Home",
    emoji: "🏠",
    color: "bg-blue-500",
    message:
      "It's okay to miss home your heart knows where it belongs and what you gotta do. 🏡💕",
  },
  {
    id: "stressed",
    label: "Feeling Stressed",
    emoji: "😰",
    color: "bg-red-500",
    message: "Take a deep breath. You've faced harder days. You got this. 🌈",
  },
  {
    id: "excited",
    label: "Excited!",
    emoji: "🎉",
    color: "bg-yellow-500",
    message: "Yay! I love seeing you excited! You got this! ⚡",
  },
  {
    id: "lonely",
    label: "A Bit Lonely",
    emoji: "💙",
    color: "bg-purple-500",
    message: "Even from afar, I’m here with you. You're never truly alone. 💫",
  },
  {
    id: "motivated",
    label: "Ready to Conquer",
    emoji: "💪",
    color: "bg-green-500",
    message: "Go conquer your dreams! You’re unstoppable. 💥",
  },
  {
    id: "sleepy",
    label: "Need Energy",
    emoji: "😴",
    color: "bg-indigo-500",
    message: "You’ve earned a break. Rest up, lovely soul. 🌙💤",
  },
];

// Animation variants
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.5,
    },
  },
};

const buttonVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const emojiSelectedAnimation = {
  rotate: [0, 15, -15, 10, -10, 0],
  scale: 1.25,
  transition: { duration: 0.8, ease: "easeInOut" as const },
};

const emojiIdleAnimation = { scale: 1 };

const WelcomePage: React.FC<WelcomePageProps> = ({
  onMoodSelect,
  selectedMood,
}) => {
  // Memoized lookup for selected mood data
  const selectedMoodData = useMemo(
    () => moodsData.find((m) => m.id === selectedMood?.id) ?? null,
    [selectedMood]
  );

  // Stable callback for keyboard handling
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>, mood: Mood) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onMoodSelect(mood);
      }
    },
    [onMoodSelect]
  );

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center space-y-12 px-4 sm:px-6 max-w-5xl mx-auto"
      aria-label="Welcome and mood selection"
    >
      <section className="space-y-6 max-w-3xl mx-auto">
        <motion.h1
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-pink-300 to-violet-300 bg-clip-text text-transparent select-none"
          tabIndex={-1}
        >
          Hey Beautiful 💕
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="text-xl sm:text-2xl text-pink-100 max-w-xl mx-auto select-text"
        >
          I know Bangalore feels far from home, but you're always right here in
          my heart. How are you feeling today?
        </motion.p>
      </section>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        role="list"
        aria-label="Mood options"
      >
        {moodsData.map((mood) => {
          const isSelected = selectedMood?.id === mood.id;
          return (
            <motion.button
              key={mood.id}
              type="button"
              role="listitem"
              aria-pressed={isSelected}
              aria-label={`${mood.label} mood${isSelected ? ", selected" : ""}`}
              tabIndex={0}
              onClick={() => onMoodSelect(mood)}
              onKeyDown={(e) => handleKeyDown(e, mood)}
              variants={buttonVariants}
              whileHover={{ scale: 1.08, y: -4 }}
              whileTap={{ scale: 0.95 }}
              className={`relative p-6 rounded-xl backdrop-blur-sm border border-white/20 transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-300 shadow-md ${
                isSelected
                  ? "bg-white/30 ring-2 ring-pink-300 shadow-lg"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              <motion.div
                animate={
                  isSelected ? emojiSelectedAnimation : emojiIdleAnimation
                }
                className="text-5xl sm:text-6xl mb-2 select-none"
                aria-hidden="true"
              >
                {mood.emoji}
              </motion.div>
              <div
                className="text-white font-semibold text-lg sm:text-xl select-text"
                aria-live={isSelected ? "polite" : undefined}
              >
                {mood.label}
              </div>
            </motion.button>
          );
        })}
      </motion.section>

      <AnimatePresence mode="wait">
        {selectedMoodData && (
          <motion.section
            key={selectedMoodData.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
            className="text-pink-200 text-lg max-w-xl mx-auto select-text"
            aria-live="polite"
            aria-atomic="true"
          >
            {selectedMoodData.message}
          </motion.section>
        )}
      </AnimatePresence>
    </motion.main>
  );
};

export default WelcomePage;
