"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { useCountdown } from "../hooks/useCountdown";

interface CountdownTimerProps {
  targetDate: string;
}

const unitsOrder = ["days", "hours", "minutes", "seconds"] as const;

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const timeLeft = useCountdown(targetDate);

  // Defensive fallback in case useCountdown returns undefined or incomplete data
  const displayTime = unitsOrder.map((unit) => ({
    unit,
    value: timeLeft?.[unit] ?? 0,
  }));

  return (
    <motion.section
      aria-label="Countdown Timer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center space-y-6 px-4"
    >
      <div className="flex items-center justify-center gap-2 text-2xl font-bold text-pink-200 select-none">
        <Calendar className="w-8 h-8" aria-hidden="true" />
        <span>Days Until You're Back Home</span>
      </div>

      <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
        {displayTime.map(({ unit, value }) => (
          <motion.div
            key={unit}
            whileHover={{ scale: 1.1 }}
            className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30 flex flex-col items-center"
            role="timer"
            aria-live="polite"
            aria-atomic="true"
          >
            <motion.div
              key={value}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-4xl font-bold text-white mb-2 tabular-nums"
            >
              {value.toString().padStart(2, "0")}
            </motion.div>
            <div className="text-pink-200 capitalize font-medium select-text">
              {unit}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-pink-100 text-lg select-none"
      >
        Every second brings u closer! 💕
      </motion.p>
    </motion.section>
  );
};

export default CountdownTimer;
