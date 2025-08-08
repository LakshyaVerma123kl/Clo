"use client";

import React from "react";
import { motion, Variants, easeOut } from "framer-motion";

interface SecretSectionProps {
  isUnlocked: boolean;
}

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
};

const scaleVariants: Variants = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
};

const SecretSection: React.FC<SecretSectionProps> = ({ isUnlocked }) => {
  if (!isUnlocked) {
    return (
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-20 px-4 max-w-xl mx-auto select-none"
        aria-live="polite"
        role="region"
        aria-label="Locked secret section"
      >
        <div
          className="text-7xl mb-6"
          aria-hidden="true"
          title="Locked section icon"
        >
          🔒
        </div>
        <h2 className="text-3xl font-extrabold text-white mb-4">
          Secret Section
        </h2>
        <p className="text-pink-300 leading-relaxed">
          This special section will unlock when you're back home! Something
          extra special is waiting for you... 💕
        </p>
      </motion.section>
    );
  }

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="text-center space-y-10 px-6 max-w-3xl mx-auto select-text"
      aria-live="polite"
      role="region"
      aria-label="Unlocked secret section"
    >
      <motion.div variants={scaleVariants} className="space-y-4">
        <h2 className="text-4xl font-extrabold text-white">
          Welcome Home! <span aria-hidden="true">🎉</span>
        </h2>
        <div
          className="text-7xl"
          aria-hidden="true"
          title="Celebration emoji"
          role="img"
        >
          🎊
        </div>
        <p className="text-xl text-pink-300 leading-relaxed">
          You made it! All of us are so proud of everything you've accomplished.
          Here's your special surprise... 💕
        </p>
      </motion.div>

      <div
        className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20"
        role="region"
        aria-label="Personal video message placeholder"
      >
        <div
          className="text-5xl mb-5"
          aria-hidden="true"
          title="Video camera emoji"
        >
          📹
        </div>
        <p className="text-pink-100 font-medium">
          Your personal video message would be here!
        </p>
        <p className="text-sm text-pink-400 mt-2 italic">
          (Upload your video/message)
        </p>
      </div>
    </motion.section>
  );
};

export default SecretSection;
