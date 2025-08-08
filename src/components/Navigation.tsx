"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Section } from "../app/types";
import { Menu } from "lucide-react";

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
        setMenuOpen(false); // close menu after selection
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

  const navConfig = {
    container: isMobile
      ? "fixed top-4 right-4 z-50"
      : "fixed right-4 top-1/2 transform -translate-y-1/2 z-50",
    wrapper: isMobile
      ? "bg-pink-900 text-white rounded-lg shadow-md"
      : "bg-white/15 backdrop-blur-lg rounded-xl p-2 border border-white/25 shadow-xl flex flex-col gap-2",
    buttonContainer: isMobile
      ? "flex flex-col p-2"
      : "flex flex-col items-center gap-2",
    button: {
      base: `flex items-center justify-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400 touch-manipulation`,
      size: isMobile ? "w-full py-2 px-4 text-left rounded-md" : "w-12 h-12",
      active: isMobile
        ? "bg-pink-600 text-white"
        : "bg-pink-500/70 text-white scale-105 shadow-lg",
      inactive: isMobile
        ? "hover:bg-pink-700 text-white"
        : "text-pink-200 hover:text-white hover:bg-white/10 hover:scale-105",
    },
    icon: isMobile ? "mr-2 w-5 h-5" : "w-6 h-6",
  };

  return (
    <nav aria-label="Section navigation" className={navConfig.container}>
      {isMobile ? (
        <div>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="bg-pink-600 text-white p-2 rounded-full shadow-md focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {menuOpen && (
            <div className={navConfig.wrapper}>
              <div className={navConfig.buttonContainer}>
                {sections.map(({ id, icon: Icon, label }) => {
                  const isActive = currentSection === id;
                  return (
                    <button
                      key={id}
                      onClick={() => handleClick(id)}
                      onKeyDown={(e) => handleKeyDown(e, id)}
                      className={`${navConfig.button.base} ${
                        navConfig.button.size
                      } ${
                        isActive
                          ? navConfig.button.active
                          : navConfig.button.inactive
                      }`}
                      aria-pressed={isActive}
                      aria-label={label}
                      title={label}
                    >
                      <Icon className={navConfig.icon} aria-hidden="true" />
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className={navConfig.wrapper}>
          <div className={navConfig.buttonContainer}>
            {sections.map(({ id, icon: Icon, label }) => {
              const isActive = currentSection === id;
              return (
                <button
                  key={id}
                  onClick={() => handleClick(id)}
                  onKeyDown={(e) => handleKeyDown(e, id)}
                  className={`${navConfig.button.base} ${
                    navConfig.button.size
                  } ${
                    isActive
                      ? navConfig.button.active
                      : navConfig.button.inactive
                  }`}
                  aria-pressed={isActive}
                  aria-label={label}
                  title={label}
                >
                  <Icon className={navConfig.icon} aria-hidden="true" />
                  <span className="sr-only">{label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
