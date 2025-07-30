"use client";

import { useState, useEffect } from "react";

export default function ReadingProgress({ post }) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [estimatedMinutes, setEstimatedMinutes] = useState(0);

  useEffect(() => {
    const text = [
      ...document.querySelectorAll("p,h1,h2,h3,h4,code,em,strong,div,span"),
    ]
      .map((el) => el.textContent)
      .join(" ");

    setEstimatedMinutes(Math.ceil(text.split(" ").length / 200));
  }, []);
  useEffect(() => {
    const calculateProgress = () => {
      // Get the article element or main content container
      const article =
        document.querySelector("article") ||
        document.querySelector("main") ||
        document.body;

      if (!article) return;

      const articleTop = article.offsetTop;
      const articleHeight = Math.max(
        1,
        article.scrollHeight - window.innerHeight
      );

      const scrolled = window.scrollY - articleTop;

      // Calculate progress percentage
      const progressPercentage = Math.max(
        0,
        Math.min(100, (scrolled / articleHeight) * 100)
      );

      setProgress(progressPercentage);

      // Show progress bar when user starts scrolling into the article
      setIsVisible(window.scrollY > 100);
    };

    // Throttle the scroll event for better performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          calculateProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial calculation
    calculateProgress();

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", calculateProgress, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", calculateProgress);
    };
  }, []);

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-out ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-4 pointer-events-none"
      }`}
    >
      <div className="bg-cream-50/95 backdrop-blur-md border border-sage-200/60 rounded-full px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 min-w-[200px] sm:min-w-[240px]">
        {/* Reading Icon */}
        <div className="relative flex-shrink-0">
          <div
            className="w-6 h-6 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center transition-transform duration-300 hover:scale-110"
            style={{
              boxShadow: `0 0 0 ${Math.max(2, progress * 0.08)}px rgba(237, 140, 74, 0.2)`,
            }}
          >
            <svg
              className="w-3 h-3 text-cream-50 transition-transform duration-300"
              style={{
                transform: `rotate(${progress * 3.6}deg)`, // Full rotation at 100%
              }}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {/* Pulse effect when reading */}
          {progress > 0 && progress < 100 && (
            <div className="absolute inset-0 rounded-full bg-brand-400 opacity-20 animate-ping"></div>
          )}
        </div>

        {/* Progress Bar Container */}
        <div className="flex-1 relative">
          {/* Background track */}
          <div className="h-2 bg-sage-100 rounded-full overflow-hidden relative">
            {/* Animated background shimmer */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-sage-200/50 to-transparent transform -skew-x-12 animate-pulse"></div>

            {/* Progress fill */}
            <div
              className="h-full bg-gradient-to-r from-brand-400 via-brand-500 to-brand-600 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              {/* Animated shine effect */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 transition-transform duration-1000"
                style={{
                  transform: `translateX(${progress > 0 ? "100%" : "-100%"}) skewX(-12deg)`,
                }}
              ></div>
            </div>
          </div>

          {/* Progress percentage */}
          <div className="absolute -top-6 left-0 right-0 flex justify-center pointer-events-none">
            <span
              className={`text-xs font-semibold text-sage-600 bg-cream-50/80 px-2 py-0.5 rounded-full transition-all duration-300 ${
                progress > 5 ? "opacity-100 scale-100" : "opacity-0 scale-75"
              }`}
            >
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Completion indicator */}
        {progress >= 100 && (
          <div className="flex-shrink-0 animate-bounce">
            <svg
              className="w-4 h-4 text-brand-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Optional: Reading time estimate (you can remove this if not needed) */}
      {isVisible && (
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-70 hover:opacity-100 transition-opacity duration-300">
          <div className="bg-sage-800/90 text-cream-50 text-xs px-3 py-1 rounded-full whitespace-nowrap">
            {progress < 100 ? (
              <span className="flex items-center gap-1">
                <svg
                  className="w-3 h-3 animate-pulse"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                Reading...
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Complete!
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
