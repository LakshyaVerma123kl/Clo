"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Section } from "../app/types";
import { Menu, X } from "lucide-react";

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
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const updateLayout = () => {
      setIsMobile(window.innerWidth < 768);
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  const handleClick = useCallback(
    (sectionId: string) => {
      if (sectionId !== currentSection) {
        if (isMobile && "vibrate" in navigator) {
          navigator.vibrate(10);
        }
        onSectionChange(sectionId);
        setMenuOpen(false);
      }
    },
    [currentSection, onSectionChange, isMobile]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, sectionId: string) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleClick(sectionId);
      }
    },
    [handleClick]
  );

  return (
    <nav
      aria-label="Section navigation"
      className={`fixed z-50 ${
        isMobile
          ? "bottom-4 right-4"
          : "top-1/2 right-4 transform -translate-y-1/2"
      }`}
    >
      {isMobile ? (
        <div className="relative">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="bg-pink-600 text-white p-3 rounded-full shadow-lg focus:outline-none"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          {menuOpen && (
            <div className="absolute bottom-16 right-0 w-48 bg-white text-pink-900 rounded-lg shadow-xl py-2 flex flex-col gap-1 transition-all">
              {sections.map(({ id, icon: Icon, label }) => {
                const isActive = currentSection === id;
                return (
                  <button
                    key={id}
                    onClick={() => handleClick(id)}
                    onKeyDown={(e) => handleKeyDown(e, id)}
                    className={`flex items-center px-4 py-2 rounded-md transition-all ${
                      isActive
                        ? "bg-pink-100 text-pink-800"
                        : "hover:bg-pink-50"
                    }`}
                    aria-pressed={isActive}
                  >
                    <Icon className="w-5 h-5 mr-2" />
                    {label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white border border-pink-200 shadow-lg rounded-xl p-2 flex flex-col gap-2">
          {sections.map(({ id, icon: Icon, label }) => {
            const isActive = currentSection === id;
            return (
              <button
                key={id}
                onClick={() => handleClick(id)}
                onKeyDown={(e) => handleKeyDown(e, id)}
                className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400 ${
                  isActive
                    ? "bg-pink-600 text-white scale-105 shadow-md"
                    : "text-pink-600 hover:text-pink-800 hover:bg-pink-100 hover:scale-105"
                }`}
                aria-pressed={isActive}
                aria-label={label}
              >
                <Icon className="w-6 h-6" aria-hidden="true" />
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default Navigation;
