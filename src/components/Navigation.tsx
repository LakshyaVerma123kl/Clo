"use client";

import React, { useCallback } from "react";
import { Section } from "../app/types";

interface NavigationProps {
  sections: Section[];
  currentSection: string;
  onSectionChange: (sectionId: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  sections,
  currentSection,
  onSectionChange,
}) => {
  // Memoize click handler to avoid unnecessary re-renders on buttons
  const handleClick = useCallback(
    (sectionId: string) => {
      if (sectionId !== currentSection) onSectionChange(sectionId);
    },
    [currentSection, onSectionChange]
  );

  return (
    <nav
      aria-label="Section navigation"
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
    >
      <div className="bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20 shadow-md">
        <div className="flex items-center gap-3">
          {sections.map(({ id, icon: Icon, label }) => {
            const isActive = currentSection === id;
            return (
              <button
                key={id}
                onClick={() => handleClick(id)}
                className={`
                  p-3 rounded-full transition-transform duration-300
                  focus:outline-none focus:ring-2 focus:ring-pink-400
                  ${
                    isActive
                      ? "bg-pink-500/60 text-white scale-110 shadow-lg"
                      : "text-pink-200 hover:text-white hover:bg-white/10"
                  }
                `}
                aria-pressed={isActive}
                aria-label={label}
                title={label}
                type="button"
              >
                <Icon className="w-5 h-5" aria-hidden="true" />
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
