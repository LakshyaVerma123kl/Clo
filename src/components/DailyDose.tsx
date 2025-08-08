"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Quote, Music } from "lucide-react";
import { Quote as QuoteType } from "../app/types";

const DailyDose: React.FC = () => {
  const [quote, setQuote] = useState<QuoteType>({
    content: "Distance means nothing when someone means everything.",
    author: "Anonymous",
  });
  const [isLoading, setIsLoading] = useState(false);

  const quotes: QuoteType[] = [
    {
      content: "Distance means nothing when someone means everything.",
      author: "Anonymous",
    },
    {
      content:
        "The best is yet to come when you have someone to share it with.",
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
  ];

  const fetchNewQuote = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <Sparkles className="w-8 h-8 text-yellow-400" />
          Your Daily Dose of Love
        </h2>
        <p className="text-pink-200">
          Some motivation and music to brighten your day
        </p>
      </div>

      {/* Quote Section */}
      <motion.div
        layout
        className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
      >
        <div className="flex items-start gap-4">
          <Quote className="w-8 h-8 text-pink-300 flex-shrink-0 mt-1" />
          <div className="space-y-4">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={quote.content}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-lg text-white italic"
              >
                "{quote.content}"
              </motion.blockquote>
            </AnimatePresence>
            <p className="text-pink-200">— {quote.author}</p>
            <button
              onClick={fetchNewQuote}
              disabled={isLoading}
              className="px-4 py-2 bg-pink-500/30 hover:bg-pink-500/50 rounded-lg transition-colors disabled:opacity-50"
            >
              {isLoading ? "Loading..." : "New Quote ✨"}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Spotify Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
      >
        <div className="flex items-center gap-2 mb-4">
          <Music className="w-6 h-6 text-green-400" />
          <h3 className="text-xl font-bold text-white">Today's Playlist</h3>
        </div>
        <div className="bg-black/30 rounded-lg p-4 text-center">
          <iframe
            src="https://open.spotify.com/embed/playlist/4mjSqHg0dBAyx07ZQz0Te4?si=c90b75b745da4f18"
            width="100%"
            height="380"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Spotify Playlist"
            className="rounded-lg"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DailyDose;
