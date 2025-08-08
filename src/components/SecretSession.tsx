// components/SecretSection.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

interface SecretSectionProps {
  isUnlocked: boolean;
}

const SecretSection: React.FC<SecretSectionProps> = ({ isUnlocked }) => {
  if (!isUnlocked) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-16"
      >
        <div className="text-6xl mb-6">🔒</div>
        <h2 className="text-3xl font-bold text-white mb-4">Secret Section</h2>
        <p className="text-pink-200 max-w-2xl mx-auto">
          This special section will unlock when you're back home! Something
          extra special is waiting for you... 💕
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center space-y-8"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 1 }}
      >
        <h2 className="text-4xl font-bold text-white mb-4">Welcome Home! 🎉</h2>
        <div className="text-6xl mb-6">🎊</div>
        <p className="text-xl text-pink-200 max-w-2xl mx-auto">
          You made it! I'm so proud of everything you've accomplished. Here's
          your special surprise... 💕
        </p>
      </motion.div>

      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
        <div className="text-4xl mb-4">📹</div>
        <p className="text-pink-100">
          Your personal video message would be here!
        </p>
        <p className="text-sm text-pink-300 mt-2">
          (Upload your video/message)
        </p>
      </div>
    </motion.div>
  );
};

export default SecretSection;
