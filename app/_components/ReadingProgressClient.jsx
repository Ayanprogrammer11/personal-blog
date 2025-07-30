"use client";

import { useState, useEffect } from "react";

export default function ReadingProgressClient({
  estimatedMinutes,
  estimatedWords,
  codeBlocks,
  breakdown,
}) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [currentSection, setCurrentSection] = useState("");

  useEffect(() => {
    const calculateProgress = () => {
      const article =
        document.querySelector("article") ||
        document.querySelector("main") ||
        document.querySelector(".prose") || // Common for dev blogs
        document.body;

      if (!article) return;

      const articleTop = article.offsetTop;
      const articleHeight = Math.max(
        1,
        article.scrollHeight - window.innerHeight
      );
      const scrolled = window.scrollY - articleTop;
      const progressPercentage = Math.max(
        0,
        Math.min(100, (scrolled / articleHeight) * 100)
      );

      setProgress(progressPercentage);
      setIsVisible(window.scrollY > 100);

      // Detect current section (useful for dev blogs with many headings)
      const headings = article.querySelectorAll("h1, h2, h3");
      let currentHeading = "";

      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i];
        if (heading.getBoundingClientRect().top <= 100) {
          currentHeading = heading.textContent?.slice(0, 30) || "";
          break;
        }
      }

      setCurrentSection(currentHeading);
    };

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

    calculateProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", calculateProgress, { passive: true });

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
      <div className="bg-cream-50/95 backdrop-blur-md border border-sage-200/60 rounded-full px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 min-w-[240px] sm:min-w-[280px]">
        {/* Dev-focused Reading Icon */}
        <div className="relative flex-shrink-0">
          <div
            className="w-6 h-6 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center transition-transform duration-300 hover:scale-110"
            style={{
              boxShadow: `0 0 0 ${Math.max(2, progress * 0.08)}px rgba(237, 140, 74, 0.2)`,
            }}
          >
            {/* Code-focused icon */}
            <svg
              className="w-3 h-3 text-cream-50 transition-transform duration-300"
              style={{ transform: `rotate(${progress * 3.6}deg)` }}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M12.316 3.051a1 1 0 01.633 1.265L11.37 9.698a1 1 0 11-1.898-.632l1.58-4.746a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          {progress > 0 && progress < 100 && (
            <div className="absolute inset-0 rounded-full bg-brand-400 opacity-20 animate-ping"></div>
          )}
        </div>

        {/* Progress Bar Container */}
        <div className="flex-1 relative">
          <div className="h-2 bg-sage-100 rounded-full overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-sage-200/50 to-transparent transform -skew-x-12 animate-pulse"></div>
            <div
              className="h-full bg-gradient-to-r from-brand-400 via-brand-500 to-brand-600 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 transition-transform duration-1000"
                style={{
                  transform: `translateX(${progress > 0 ? "100%" : "-100%"}) skewX(-12deg)`,
                }}
              ></div>
            </div>
          </div>

          {/* Progress percentage & Reading time with dev stats */}
          <div className="absolute -top-6 left-0 right-0 flex justify-center pointer-events-none">
            <div className="flex items-center gap-2">
              <span
                className={`text-xs font-semibold text-sage-600 bg-cream-50/80 px-2 py-0.5 rounded-full transition-all duration-300 ${
                  progress > 5 ? "opacity-100 scale-100" : "opacity-0 scale-75"
                }`}
              >
                {Math.round(progress)}%
              </span>
              <span
                className={`text-xs text-sage-500 bg-cream-50/80 px-2 py-0.5 rounded-full transition-all duration-300 ${
                  progress > 5 ? "opacity-100 scale-100" : "opacity-0 scale-75"
                }`}
              >
                {estimatedMinutes} min
              </span>
              {codeBlocks > 0 && (
                <span
                  className={`text-xs text-orange-600 bg-orange-50/80 px-2 py-0.5 rounded-full transition-all duration-300 flex items-center gap-1 ${
                    progress > 5
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-75"
                  }`}
                >
                  <svg
                    className="w-2 h-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.316 3.051a1 1 0 01.633 1.265L11.37 9.698a1 1 0 11-1.898-.632l1.58-4.746a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {codeBlocks}
                </span>
              )}
            </div>
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

      {/* Enhanced status for dev blogs */}
      {isVisible && (
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-70 hover:opacity-100 transition-opacity duration-300">
          <div className="bg-sage-800/90 text-cream-50 text-xs px-3 py-1 rounded-full whitespace-nowrap max-w-xs truncate">
            {progress < 100 ? (
              <span className="flex items-center gap-1">
                <svg
                  className="w-3 h-3 animate-pulse flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                {currentSection
                  ? currentSection + "..."
                  : `${estimatedWords} words`}
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <svg
                  className="w-3 h-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Tutorial Complete!
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
