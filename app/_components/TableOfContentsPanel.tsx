"use client";

import { useState, useEffect } from "react";

export default function TableOfContentsPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [headings, setHeadings] = useState([]);
  const [activeHeading, setActiveHeading] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Extract headings from the page
    const extractHeadings = () => {
      const headingElements = document.querySelectorAll(
        "article h1, article h2, article h3, article h4"
      );
      const headingsData = Array.from(headingElements).map((heading, index) => {
        // Create an ID if it doesn't exist
        if (!heading.id) {
          heading.id = `heading-${index}`;
        }

        return {
          id: heading.id,
          text: heading.textContent,
          level: parseInt(heading.tagName.charAt(1)),
          element: heading,
          offsetTop: heading.offsetTop,
        };
      });

      setHeadings(headingsData);
    };

    // Show TOC button when we have content
    const checkVisibility = () => {
      setIsVisible(window.scrollY > 200);
    };

    // Track active heading based on scroll position
    const handleScroll = () => {
      checkVisibility();

      if (headings.length === 0) return;

      const scrollPosition = window.scrollY + 100; // Offset for better UX

      // Find the current active heading
      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i];
        if (scrollPosition >= heading.offsetTop) {
          setActiveHeading(heading.id);
          break;
        }
      }
    };

    // Initial setup
    setTimeout(() => {
      extractHeadings();
      checkVisibility();
    }, 1000);

    // Throttled scroll handler
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
    window.addEventListener("resize", extractHeadings, { passive: true });

    return () => {
      window.removeEventListener("scroll", throttledScroll);
      window.removeEventListener("resize", extractHeadings);
    };
  }, [headings]);

  const scrollToHeading = (headingId) => {
    const element = document.getElementById(headingId);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for fixed header
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
      setIsOpen(false); // Close panel after navigation
    }
  };

  const getIndentClass = (level) => {
    switch (level) {
      case 1:
        return "pl-0";
      case 2:
        return "pl-4";
      case 3:
        return "pl-8";
      case 4:
        return "pl-12";
      default:
        return "pl-0";
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 1:
        return "text-brand-800 font-semibold";
      case 2:
        return "text-brand-700 font-medium";
      case 3:
        return "text-sage-700";
      case 4:
        return "text-sage-600 text-sm";
      default:
        return "text-sage-600";
    }
  };

  return (
    <>
      {/* Hook Button */}
      <div
        className={`fixed right-0 top-1/2 transform -translate-y-1/2 z-50 transition-all duration-500 ease-out ${
          isVisible
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-4 pointer-events-none"
        }`}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`group relative bg-gradient-to-br from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-cream-50 p-3 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 ${
            isOpen
              ? "rounded-l-2xl rounded-r-none translate-x-0"
              : "rounded-l-2xl rounded-r-none -translate-x-0 hover:-translate-x-1"
          }`}
          aria-label="Table of Contents"
        >
          {/* Background gradient animation */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-l-2xl"></div>

          {/* Button content */}
          <div className="relative flex flex-col items-center gap-1">
            <svg
              className={`w-5 h-5 transition-all duration-300 ${
                isOpen ? "rotate-180 scale-110" : "rotate-0"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h8a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>

            {/* Active indicator dots */}
            <div className="flex gap-0.5">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`w-1 h-1 rounded-full transition-all duration-300 ${
                    activeHeading && i === 1
                      ? "bg-cream-100 scale-125"
                      : "bg-cream-200/60 scale-100"
                  }`}
                ></div>
              ))}
            </div>
          </div>

          {/* Tooltip */}
          <div
            className={`absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-sage-800 text-cream-50 text-xs px-3 py-2 rounded-lg whitespace-nowrap transition-all duration-300 ${
              isOpen
                ? "opacity-0 scale-75 pointer-events-none"
                : "opacity-0 group-hover:opacity-100 scale-100"
            }`}
          >
            Table of Contents
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-sage-800"></div>
          </div>
        </button>
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-sage-900/20 backdrop-blur-sm z-40 transition-all duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Panel */}
      <div
        className={`fixed right-0 top-0 h-full w-80 sm:w-96 bg-cream-50/95 backdrop-blur-md border-l border-sage-200/60 shadow-2xl z-50 transition-all duration-500 ease-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Panel Header */}
        <div className="relative p-6 border-b border-sage-200/60 bg-gradient-to-br from-brand-50 to-cream-50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-serif font-bold text-brand-800 mb-1">
                Table of Contents
              </h3>
              <p className="text-sm text-sage-600">
                {headings.length} sections found
              </p>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full bg-sage-100 hover:bg-sage-200 text-sage-600 hover:text-sage-800 transition-all duration-200 hover:scale-110"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-brand-100/30 to-transparent rounded-full -translate-y-10 translate-x-10"></div>
        </div>

        {/* Headings List */}
        <div className="flex-1 overflow-y-auto py-4 px-6 max-h-[calc(100vh-140px)]">
          {headings.length === 0 ? (
            <div className="flex items-center justify-center h-32 text-sage-500">
              <div className="text-center">
                <svg
                  className="w-8 h-8 mx-auto mb-2 opacity-50"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h8a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-sm">Loading sections...</p>
              </div>
            </div>
          ) : (
            <nav className="space-y-1">
              {headings.map((heading, index) => (
                <button
                  key={heading.id}
                  onClick={() => scrollToHeading(heading.id)}
                  className={`group w-full text-left py-2 px-3 rounded-lg transition-all duration-200 hover:bg-sage-50 border-l-2 ${
                    activeHeading === heading.id
                      ? "bg-brand-50 border-l-brand-500 shadow-sm transform scale-[1.02]"
                      : "border-l-transparent hover:border-l-sage-300"
                  } ${getIndentClass(heading.level)}`}
                >
                  <div className="flex items-start gap-2">
                    {/* Level indicator */}
                    <div
                      className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 transition-all duration-200 ${
                        activeHeading === heading.id
                          ? "bg-brand-500 scale-125"
                          : "bg-sage-300 group-hover:bg-sage-400"
                      }`}
                    ></div>

                    {/* Heading text */}
                    <span
                      className={`${getLevelColor(heading.level)} transition-colors duration-200 leading-relaxed ${
                        activeHeading === heading.id ? "text-brand-800" : ""
                      }`}
                    >
                      {heading.text}
                    </span>
                  </div>

                  {/* Active indicator */}
                  {activeHeading === heading.id && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="w-2 h-2 bg-brand-500 rounded-full animate-pulse"></div>
                    </div>
                  )}
                </button>
              ))}
            </nav>
          )}
        </div>

        {/* Panel Footer */}
        <div className="p-4 border-t border-sage-200/60 bg-gradient-to-t from-sage-50/50 to-transparent">
          <div className="flex items-center gap-2 text-xs text-sage-500">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <span>Click any section to jump there</span>
          </div>
        </div>
      </div>
    </>
  );
}
