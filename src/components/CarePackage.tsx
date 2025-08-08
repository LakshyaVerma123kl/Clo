// components/CarePackage.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Gift } from "lucide-react";
import { CarePackageItem } from "../app/types";

const CarePackage: React.FC = () => {
  const [careItems, setCareItems] = useState<CarePackageItem[]>([
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
      content:
        "*Sending you the biggest, warmest hug across all the miles* 🤗💕",
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
  ]);

  const revealItem = (id: string) => {
    setCareItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, revealed: true } : item))
    );
  };

  const getItemIcon = (type: string) => {
    switch (type) {
      case "meme":
        return "😄";
      case "note":
        return "💌";
      case "tip":
        return "💡";
      case "hug":
        return "🤗";
      default:
        return "💝";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <Gift className="w-8 h-8 text-pink-400" />
          Digital Care Package
        </h2>
        <p className="text-pink-200">
          Click on any card to reveal a surprise! 🎁
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {careItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => !item.revealed && revealItem(item.id)}
            className={`relative overflow-hidden rounded-xl cursor-pointer transition-all duration-500 ${
              item.revealed
                ? "bg-white/20"
                : "bg-gradient-to-br from-pink-500/30 to-purple-500/30"
            } backdrop-blur-sm border border-white/30 p-6 min-h-[200px] flex flex-col justify-center items-center`}
          >
            {!item.revealed ? (
              <motion.div whileHover={{ scale: 1.1 }} className="text-center">
                <div className="text-6xl mb-4">🎁</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-pink-200">Click to reveal!</p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="text-4xl mb-4">{getItemIcon(item.type)}</div>
                <h3 className="text-lg font-bold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-pink-100 leading-relaxed">{item.content}</p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CarePackage;
