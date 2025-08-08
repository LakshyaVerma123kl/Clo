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
  const handleClick = useCallback(
    (sectionId: string) => {
      if (sectionId !== currentSection) onSectionChange(sectionId);
    },
    [currentSection, onSectionChange]
  );

  return (
    <nav
      aria-label="Section navigation"
      className="fixed bottom-[env(safe-area-inset-bottom,1.5rem)] inset-x-4 z-50"
    >
      <div className="bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20 shadow-lg">
        <div className="flex justify-center items-center gap-4 sm:gap-5">
          {sections.map(({ id, icon: Icon, label }) => {
            const isActive = currentSection === id;
            return (
              <button
                key={id}
                onClick={() => handleClick(id)}
                className={`flex items-center justify-center
                  w-12 h-12 sm:w-14 sm:h-14 rounded-full
                  transition-all duration-300
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
                <Icon className="w-6 h-6 sm:w-6 sm:h-6" aria-hidden="true" />
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
