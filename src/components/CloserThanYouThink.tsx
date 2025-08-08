// components/CloserThanYouThink.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Calendar, Gift, Sparkles, Star } from "lucide-react";

// Import types
import { Mood, Section } from "../app/types";

// Import components
import WelcomePage from "./WelcomePage";
import CountdownTimer from "./CountdownTimer";
import DailyDose from "./DailyDose";
import CarePackage from "./CarePackage";
import SecretSection from "./SecretSession";
import Navigation from "./Navigation";
import { BackgroundDecoration, FloatingHearts } from "./BackgroundElements";

const CloserThanYouThink: React.FC = () => {
  const [currentSection, setCurrentSection] = useState("welcome");
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [isSecretUnlocked] = useState(false); // Set to true to test secret section

  // Set your target return date here
  const returnDate = "2025-09-01T00:00:00";

  const sections: Section[] = [
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
      <BackgroundDecoration />

      {/* Navigation */}
      <Navigation
        sections={sections}
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
      />

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
      <FloatingHearts />
    </div>
  );
};

export default CloserThanYouThink;
