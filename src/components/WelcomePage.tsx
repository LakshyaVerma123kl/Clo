"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mood } from "../app/types";

interface WelcomePageProps {
  onMoodSelect: (mood: Mood) => void;
  selectedMood: Mood | null;
}

const WelcomePage: React.FC<WelcomePageProps> = ({
  onMoodSelect,
  selectedMood,
}) => {
  const moods: (Mood & { message: string })[] = [
    {
      id: "homesick",
      label: "Missing Home",
      emoji: "🏠",
      color: "bg-blue-500",
      message:
        "It's okay to miss home — your heart knows where it belongs. 🏡💕",
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
      message:
        "Yay! I love seeing you excited! Let’s ride that energy together! ⚡",
    },
    {
      id: "lonely",
      label: "A Bit Lonely",
      emoji: "💙",
      color: "bg-purple-500",
      message:
        "Even from afar, I’m here with you. You're never truly alone. 💫",
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

  const selectedMoodData = moods.find((mood) => mood.id === selectedMood?.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center space-y-10 px-4"
    >
      <div className="space-y-5">
        <motion.h1
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-300 to-violet-300 bg-clip-text text-transparent"
        >
          Hey Beautiful 💕
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl md:text-2xl text-pink-100 max-w-2xl mx-auto"
        >
          I know Bangalore feels far from home, but you're always right here in
          my heart. How are you feeling today?
        </motion.p>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.6,
            },
          },
        }}
        className="grid grid-cols-2 md:grid-cols-3 gap-5 max-w-4xl mx-auto"
      >
        {moods.map((mood) => (
          <motion.button
            key={mood.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.08, y: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onMoodSelect(mood)}
            aria-pressed={selectedMood?.id === mood.id}
            className={`p-6 rounded-xl backdrop-blur-sm border border-white/20 transition-all duration-300 focus:outline-none ${
              selectedMood?.id === mood.id
                ? "bg-white/30 ring-2 ring-pink-300 shadow-lg"
                : "bg-white/10 hover:bg-white/20"
            }`}
          >
            <motion.div
              animate={
                selectedMood?.id === mood.id
                  ? { rotate: [0, 15, -15, 10, -10, 0], scale: 1.2 }
                  : { scale: 1 }
              }
              transition={{ duration: 0.5 }}
              className="text-4xl mb-2"
            >
              {mood.emoji}
            </motion.div>
            <div className="text-white font-medium">{mood.label}</div>
          </motion.button>
        ))}
      </motion.div>

      {selectedMoodData && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-pink-200 text-lg max-w-xl mx-auto"
        >
          {selectedMoodData.message}
        </motion.div>
      )}
    </motion.div>
  );
};

export default WelcomePage;
