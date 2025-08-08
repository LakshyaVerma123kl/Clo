"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Calendar,
  Gift,
  Sparkles,
  Music,
  Quote,
  Smile,
  Moon,
  Sun,
  Coffee,
  Star,
} from "lucide-react";

// Types
interface Mood {
  id: string;
  label: string;
  emoji: string;
  color: string;
}

interface CountdownData {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CarePackageItem {
  id: string;
  title: string;
  type: "meme" | "note" | "tip" | "hug";
  content: string;
  revealed: boolean;
}

// Custom Hooks
const useCountdown = (targetDate: string) => {
  const [timeLeft, setTimeLeft] = useState<CountdownData>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
};

// Components
const WelcomePage = ({
  onMoodSelect,
  selectedMood,
}: {
  onMoodSelect: (mood: Mood) => void;
  selectedMood: Mood | null;
}) => {
  const moods: Mood[] = [
    {
      id: "homesick",
      label: "Missing Home",
      emoji: "🏠",
      color: "bg-blue-500",
    },
    {
      id: "stressed",
      label: "Feeling Stressed",
      emoji: "😰",
      color: "bg-red-500",
    },
    { id: "excited", label: "Excited!", emoji: "🎉", color: "bg-yellow-500" },
    {
      id: "lonely",
      label: "A Bit Lonely",
      emoji: "💙",
      color: "bg-purple-500",
    },
    {
      id: "motivated",
      label: "Ready to Conquer",
      emoji: "💪",
      color: "bg-green-500",
    },
    { id: "sleepy", label: "Need Energy", emoji: "😴", color: "bg-indigo-500" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center space-y-8"
    >
      <div className="space-y-4">
        <motion.h1
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-300 to-violet-300 bg-clip-text text-transparent"
        >
          Hey Beautiful! 💕
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-pink-100 max-w-2xl mx-auto"
        >
          I know Bangalore feels far from home, but you're closer to my heart
          than ever. Let me know how you're feeling today?
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto"
      >
        {moods.map((mood, index) => (
          <motion.button
            key={mood.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onMoodSelect(mood)}
            className={`p-6 rounded-xl backdrop-blur-sm border border-white/20 transition-all duration-300 ${
              selectedMood?.id === mood.id
                ? "bg-white/30 ring-2 ring-pink-300"
                : "bg-white/10 hover:bg-white/20"
            }`}
          >
            <div className="text-4xl mb-2">{mood.emoji}</div>
            <div className="text-white font-medium">{mood.label}</div>
          </motion.button>
        ))}
      </motion.div>

      {selectedMood && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-pink-200"
        >
          Perfect choice! Let's make your day brighter ✨
        </motion.div>
      )}
    </motion.div>
  );
};

const CountdownTimer = ({ targetDate }: { targetDate: string }) => {
  const timeLeft = useCountdown(targetDate);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center space-y-6"
    >
      <div className="flex items-center justify-center gap-2 text-2xl font-bold text-pink-200">
        <Calendar className="w-8 h-8" />
        <span>Days Until You're Back Home</span>
      </div>

      <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <motion.div
            key={unit}
            whileHover={{ scale: 1.1 }}
            className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30"
          >
            <motion.div
              key={value}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-4xl font-bold text-white mb-2"
            >
              {value.toString().padStart(2, "0")}
            </motion.div>
            <div className="text-pink-200 capitalize font-medium">{unit}</div>
          </motion.div>
        ))}
      </div>

      <motion.p
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-pink-100 text-lg"
      >
        Every second brings us closer! 💕
      </motion.p>
    </motion.div>
  );
};

const DailyDose = () => {
  const [quote, setQuote] = useState({
    content: "Distance means nothing when someone means everything.",
    author: "Anonymous",
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchNewQuote = async () => {
    setIsLoading(true);
    // Simulate API call - in real app, use actual quotes API
    const quotes = [
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
          <div className="text-4xl mb-2">🎵</div>
          <p className="text-pink-200">
            Your favorite songs to keep you company
          </p>
          <p className="text-sm text-pink-300 mt-2">
            (Spotify embed would go here)
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const CarePackage = () => {
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

const SecretSection = ({ isUnlocked }: { isUnlocked: boolean }) => {
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

// Main App Component
export default function CloserThanYouThink() {
  const [currentSection, setCurrentSection] = useState("welcome");
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [isSecretUnlocked] = useState(false); // Set to true to test secret section

  // Set your target return date here
  const returnDate = "2024-12-25T00:00:00";

  const sections = [
    { id: "welcome", label: "Home", icon: Heart },
    { id: "countdown", label: "Countdown", icon: Calendar },
    { id: "daily", label: "Daily Dose", icon: Sparkles },
    { id: "care", label: "Care Package", icon: Gift },
    { id: "secret", label: "Secret", icon: Star },
  ];

  const renderSection = () => {
    switch (currentSection) {
      case "welcome":
        return (
          <WelcomePage
            onMoodSelect={setSelectedMood}
            selectedMood={selectedMood}
          />
        );
      case "countdown":
        return <CountdownTimer targetDate={returnDate} />;
      case "daily":
        return <DailyDose />;
      case "care":
        return <CarePackage />;
      case "secret":
        return <SecretSection isUnlocked={isSecretUnlocked} />;
      default:
        return (
          <WelcomePage
            onMoodSelect={setSelectedMood}
            selectedMood={selectedMood}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-purple-900 relative overflow-hidden">
      {/* Background decoration */}
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

      {/* Navigation */}
      <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
          <div className="flex items-center gap-2">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setCurrentSection(section.id)}
                  className={`p-3 rounded-full transition-all duration-300 ${
                    currentSection === section.id
                      ? "bg-pink-500/50 text-white scale-110"
                      : "text-pink-200 hover:text-white hover:bg-white/10"
                  }`}
                  title={section.label}
                >
                  <Icon className="w-5 h-5" />
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 min-h-screen flex items-center justify-center relative z-10">
        <div className="w-full max-w-6xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderSection()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Floating hearts animation */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-300/30"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 50,
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
          </motion.div>
        ))}
      </div>
    </div>
  );
}
