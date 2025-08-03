"use client";

import { useState, useEffect } from "react";

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Show button when scrolled more than 1000px
      setIsVisible(scrolled > 1000);

      // Calculate scroll progress for the circular progress indicator
      const totalScrollable = documentHeight - windowHeight;
      const progress = (scrolled / totalScrollable) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    // Throttled scroll handler for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", throttledScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 transition-all duration-500 ease-out transform ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-4 scale-75 pointer-events-none"
      }`}
    >
      <button
        onClick={scrollToTop}
        className="group relative w-14 h-14 bg-gradient-to-br from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-cream-50 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-brand-400/50"
        aria-label="Back to top"
      >
        {/* Circular Progress Ring */}
        <svg
          className="absolute inset-0 w-full h-full transform -rotate-90"
          viewBox="0 0 56 56"
        >
          {/* Background circle */}
          <circle
            cx="28"
            cy="28"
            r="26"
            fill="none"
            stroke="rgba(254, 252, 249, 0.2)"
            strokeWidth="2"
          />
          {/* Progress circle */}
          <circle
            cx="28"
            cy="28"
            r="26"
            fill="none"
            stroke="rgba(254, 252, 249, 0.8)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 26}`}
            strokeDashoffset={`${2 * Math.PI * 26 * (1 - scrollProgress / 100)}`}
            className="transition-all duration-300 ease-out"
          />
        </svg>

        {/* Button Content */}
        <div className="relative flex items-center justify-center w-full h-full">
          {/* Background glow effect */}
          <div className="absolute inset-2 bg-gradient-to-br from-white/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Arrow Icon */}
          <svg
            className="w-6 h-6 transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-0.5 relative z-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>

          {/* Pulse effect when near bottom */}
          {scrollProgress > 90 && (
            <div className="absolute inset-0 rounded-full bg-brand-400 opacity-20 animate-ping"></div>
          )}
        </div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 bg-cream-200 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500`}
              style={{
                left: `${30 + i * 15}%`,
                top: `${25 + i * 20}%`,
                animationDelay: `${i * 0.2}s`,
              }}
            >
              <div className="w-full h-full bg-cream-200 rounded-full animate-bounce"></div>
            </div>
          ))}
        </div>

        {/* Tooltip */}
        <div className="absolute bottom-full mb-3 left-1/2 transform -translate-x-1/2 bg-sage-800 text-cream-50 text-xs px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
          Back to top
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-sage-800"></div>
        </div>

        {/* Progress percentage (subtle) */}
        {scrollProgress > 20 && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-sage-600 font-medium opacity-0 group-hover:opacity-100 transition-all duration-300">
            {Math.round(scrollProgress)}%
          </div>
        )}
      </button>

      {/* Additional visual enhancement - floating ring */}
      <div className="absolute inset-0 rounded-full border-2 border-brand-300/30 scale-125 opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500 pointer-events-none"></div>
    </div>
  );
}
