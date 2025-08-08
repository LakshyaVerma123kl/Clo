// components/Navigation.tsx
"use client";

import React from "react";
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
  return (
    <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
        <div className="flex items-center gap-2">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => onSectionChange(section.id)}
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
  );
};

export default Navigation;
