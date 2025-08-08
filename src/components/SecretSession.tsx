"use client";

import React, { useState } from "react";
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

const confettiVariants: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

const cuteMessages = [
  "You're a shining star! 🌟",
  "Keep smiling, beautiful soul! 😊",
  "You're loved more than you know. 💖",
  "Magic happens when you believe! ✨",
  "Sending you all the warm hugs! 🤗",
];

const gifUrls = [
  "https://media.tenor.com/7WPM3K3MbAwAAAAd/cute-love.gif",
  "https://media.tenor.com/uQXxMvQSLQEAAAAC/love-hearts.gif",
  "https://media.tenor.com/3ZPA6_w5v8sAAAAC/puppy-love.gif",
  "https://media.tenor.com/4tvjWZk8-mcAAAAC/cute-heart.gif",
  "https://media.tenor.com/ZEEk9nk8H20AAAAC/heart-flowers.gif",
];

const getRandomItem = <T,>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

const SecretSection: React.FC<SecretSectionProps> = ({ isUnlocked }) => {
  const [peeked, setPeeked] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [gifUrl, setGifUrl] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handlePeek = () => {
    if (peeked) return;
    setGifUrl(getRandomItem(gifUrls));
    setMessage(getRandomItem(cuteMessages));
    setPeeked(true);
    setConfetti(true);

    setTimeout(() => setConfetti(false), 3000); // confetti disappears after 3s
  };

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
        <p className="text-pink-300 leading-relaxed mb-6">
          This special section will unlock when you're back home! Something
          extra special is waiting for you... 💕
        </p>

        <button
          onClick={handlePeek}
          className="px-5 py-3 bg-pink-500/70 hover:bg-pink-600 rounded-lg text-white font-semibold transition"
          aria-pressed={peeked}
          aria-label="Peek at the secret teaser"
        >
          {peeked ? "Peeked!" : "Peek"}
        </button>

        {peeked && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8"
          >
            {confetti && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                variants={confettiVariants}
                initial="hidden"
                animate="visible"
                aria-hidden="true"
              >
                {/* Simple confetti dots */}
                {[...Array(30)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="absolute bg-pink-400 rounded-full"
                    style={{
                      width: 8,
                      height: 8,
                      top: Math.random() * 100 + "%",
                      left: Math.random() * 100 + "%",
                      opacity: 0.8,
                    }}
                    animate={{
                      y: [-10, 10, -10],
                      x: [-10, 10, -10],
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 1,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: i * 0.05,
                    }}
                  />
                ))}
              </motion.div>
            )}

            <img
              src={gifUrl!}
              alt="Cute love GIF"
              className="mx-auto rounded-lg max-w-xs shadow-lg"
              loading="lazy"
            />
            <p className="mt-4 text-pink-100 italic text-lg select-text">
              {message}
            </p>
          </motion.div>
        )}
      </motion.section>
    );
  }

  // Unlocked section (same as before)
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
      </motion.div>
    </motion.section>
  );
};

export default SecretSection;
