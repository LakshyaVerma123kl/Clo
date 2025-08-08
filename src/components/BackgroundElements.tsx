"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const MotionDiv = motion.div;

/**
 * BackgroundDecoration
 * Renders soft glowing blurred circles that pulse gently.
 */
export const BackgroundDecoration: React.FC = () => {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDuration: "6s" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1.5s", animationDuration: "6.5s" }}
      />
      <div
        className="absolute top-3/4 left-1/2 w-48 h-48 bg-violet-500/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "3s", animationDuration: "7s" }}
      />
    </div>
  );
};

/**
 * Generates a random number between min and max inclusive
 */
const randomBetween = (min: number, max: number) =>
  Math.random() * (max - min) + min;

/**
 * FloatingHearts
 * Displays floating heart icons that animate upwards with varied speed, scale, and rotation.
 */
export const FloatingHearts: React.FC = () => {
  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  // Update window size on mount and resize
  useEffect(() => {
    const updateSize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Generate hearts data once, memoized for performance
  const hearts = React.useMemo(() => {
    return Array.from({ length: 8 }).map(() => ({
      x: randomBetween(0, windowSize.width),
      duration: randomBetween(6, 12),
      delay: randomBetween(0, 6),
      scale: randomBetween(0.6, 1.2),
      opacity: randomBetween(0.15, 0.4),
      rotate: randomBetween(-180, 180),
    }));
  }, [windowSize.width]);

  if (windowSize.width === 0 || windowSize.height === 0) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {hearts.map(({ x, duration, delay, scale, opacity, rotate }, i) => (
        <MotionDiv
          key={`heart-${i}`}
          className="absolute text-pink-400"
          initial={{
            x,
            y: windowSize.height + 40,
            scale: 0,
            opacity: 0,
            rotate,
          }}
          animate={{
            y: -60,
            scale: [0, scale, 0],
            opacity: [0, opacity, 0],
            rotate: rotate + 360,
          }}
          transition={{
            duration,
            delay,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ left: 0 }} // position via initial x for better animation
        >
          <Heart className="w-6 h-6" />
        </MotionDiv>
      ))}
    </div>
  );
};
