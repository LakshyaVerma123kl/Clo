"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, Variants } from "framer-motion";
import { Gift } from "lucide-react";
import { CarePackageItem } from "../app/types";

const CARE_PACKAGE_API_URL = "/api/care-package"; // example API endpoint

// Animation variants for cards
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, type: "spring", stiffness: 100, damping: 20 },
  }),
  hover: { scale: 1.05, y: -5 },
  tap: { scale: 0.95 },
};

// Icon map memoized for performance
const useItemIcons = () =>
  useMemo(
    () => ({
      meme: "😄",
      note: "💌",
      tip: "💡",
      hug: "🤗",
      default: "💝",
    }),
    []
  );

const DEFAULT_CARE_ITEMS: CarePackageItem[] = [
  {
    id: "1",
    title: "Comfort Meme",
    type: "meme",
    content: "😂 When you realize pizza exists in Bangalore too!",
    revealed: false,
  },
  {
    id: "2",
    title: "Sweet Note",
    type: "note",
    content:
      "You're absolutely crushing it out there! I'm so proud of how brave and amazing you are. 💕",
    revealed: false,
  },
  {
    id: "3",
    title: "Study Tip",
    type: "tip",
    content:
      "Remember: Take breaks every 45 minutes, hydrate, and don't forget to eat! Your brain needs fuel! 🧠",
    revealed: false,
  },
  {
    id: "4",
    title: "Virtual Hug",
    type: "hug",
    content: "*Sending you the biggest, warmest hug across all the miles* 🤗💕",
    revealed: false,
  },
  {
    id: "5",
    title: "Motivation Boost",
    type: "note",
    content:
      "Every challenge you face there is making you stronger and more amazing. You've got this! 💪✨",
    revealed: false,
  },
  {
    id: "6",
    title: "Funny Reminder",
    type: "meme",
    content:
      "🤔 Fun fact: Distance is just a number, but my feelings for you are infinite!",
    revealed: false,
  },
];

const CarePackage: React.FC = () => {
  const [careItems, setCareItems] =
    useState<CarePackageItem[]>(DEFAULT_CARE_ITEMS);
  const [loading, setLoading] = useState(false);
  const itemIcons = useItemIcons();

  // Optional: Fetch care items dynamically from API
  useEffect(() => {
    const fetchCareItems = async () => {
      setLoading(true);
      try {
        const res = await fetch(CARE_PACKAGE_API_URL);
        if (res.ok) {
          const data: CarePackageItem[] = await res.json();
          // Make sure items have revealed=false initially
          const initialized = data.map((item) => ({
            ...item,
            revealed: false,
          }));
          setCareItems(initialized);
        }
      } catch (err) {
        // Fallback silently if API fails, use default
      } finally {
        setLoading(false);
      }
    };

    fetchCareItems();
  }, []);

  const revealItem = useCallback((id: string) => {
    setCareItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, revealed: true } : item))
    );
  }, []);

  const getItemIcon = useCallback(
    (type: string) =>
      itemIcons[type as keyof typeof itemIcons] || itemIcons.default,
    [itemIcons]
  );

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      className="space-y-8 px-4 max-w-6xl mx-auto"
      aria-live="polite"
      aria-label="Digital care package"
    >
      <header className="text-center">
        <h2 className="text-3xl font-extrabold text-white mb-2 flex items-center justify-center gap-2 select-none">
          <Gift className="w-8 h-8 text-pink-400" aria-hidden="true" />
          Digital Care Package
        </h2>
        <p className="text-pink-300 select-none">
          {loading
            ? "Loading surprises..."
            : "Click on any card to reveal a surprise! 🎁"}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {careItems.map((item, i) => (
          <motion.article
            key={item.id}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
            tabIndex={0}
            role="button"
            aria-pressed={item.revealed}
            aria-label={`${item.title} ${
              item.revealed ? "revealed" : "hidden"
            }`}
            onClick={() => !item.revealed && revealItem(item.id)}
            onKeyDown={(e) => {
              if ((e.key === "Enter" || e.key === " ") && !item.revealed) {
                e.preventDefault();
                revealItem(item.id);
              }
            }}
            className={`relative overflow-hidden rounded-xl cursor-pointer transition-all duration-500 focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-400 ${
              item.revealed
                ? "bg-white/20"
                : "bg-gradient-to-br from-pink-500/30 to-purple-500/30"
            } backdrop-blur-sm border border-white/30 p-6 min-h-[200px] flex flex-col justify-center items-center`}
          >
            {!item.revealed ? (
              <motion.div whileHover={{ scale: 1.1 }} className="text-center">
                <div
                  className="text-6xl mb-4"
                  aria-hidden="true"
                  title="Gift box emoji"
                >
                  🎁
                </div>
                <h3 className="text-xl font-bold text-white mb-2 select-none">
                  {item.title}
                </h3>
                <p className="text-pink-200 select-none">Click to reveal!</p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div
                  className="text-4xl mb-4"
                  aria-hidden="true"
                  title={`${item.type} icon`}
                >
                  {getItemIcon(item.type)}
                </div>
                <h3 className="text-lg font-bold text-white mb-3 select-text">
                  {item.title}
                </h3>
                <p className="text-pink-100 leading-relaxed select-text">
                  {item.content}
                </p>
              </motion.div>
            )}
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
};

export default CarePackage;
