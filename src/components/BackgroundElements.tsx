"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const MotionDiv = motion.div;

export const BackgroundDecoration: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute top-3/4 left-1/2 w-48 h-48 bg-violet-500/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      />
    </div>
  );
};

export const FloatingHearts: React.FC = () => {
  const [clientOnly, setClientOnly] = useState(false);
  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    setClientOnly(true);
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!clientOnly || !windowSize) return <div />;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <MotionDiv
          key={i}
          className="absolute text-pink-300/30"
          initial={{
            x: Math.random() * windowSize.width,
            y: windowSize.height + 50,
            scale: 0,
          }}
          animate={{
            y: -50,
            scale: [0, 1, 0],
            rotate: 360,
          }}
          transition={{
            duration: Math.random() * 3 + 7,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        >
          <Heart className="w-6 h-6" />
        </MotionDiv>
      ))}
    </div>
  );
};
