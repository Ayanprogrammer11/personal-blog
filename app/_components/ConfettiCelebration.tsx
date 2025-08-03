"use client";

import { useState, useEffect } from "react";

export default function ConfettiCelebration({ blogSlug }) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [hasShownBefore, setHasShownBefore] = useState(false);

  useEffect(() => {
    // Check if user has already seen confetti for this blog post
    const storageKey = `confetti-shown-${blogSlug}`;
    const hasShown = localStorage.getItem(storageKey);

    if (hasShown) {
      setHasShownBefore(true);
      return;
    }

    const checkReadingCompletion = () => {
      if (hasShownBefore) return;

      const article =
        document.querySelector("article") ||
        document.querySelector("main") ||
        document.body;
      if (!article) return;

      const articleTop = article.offsetTop;
      const articleHeight = article.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY - articleTop;
      const progressPercentage = Math.max(
        0,
        Math.min(100, (scrolled / articleHeight) * 100)
      );

      // Trigger confetti when user reaches 95% or more
      if (progressPercentage >= 95 && !hasShownBefore) {
        setShowConfetti(true);
        setHasShownBefore(true);

        // Store in localStorage to prevent showing again
        localStorage.setItem(storageKey, "true");

        // Hide confetti after animation
        setTimeout(() => {
          setShowConfetti(false);
        }, 4000);
      }
    };

    // Throttled scroll handler
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          checkReadingCompletion();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [blogSlug, hasShownBefore]);

  // Generate random confetti pieces
  const generateConfetti = () => {
    const pieces = [];
    const colors = [
      "#ed8c4a",
      "#df7635",
      "#677767",
      "#849384",
      "#f1d4a2",
      "#ebc274",
    ];

    for (let i = 0; i < 50; i++) {
      pieces.push({
        id: i,
        color: colors[Math.floor(Math.random() * colors.length)],
        left: Math.random() * 100,
        animationDelay: Math.random() * 3,
        animationDuration: 3 + Math.random() * 2,
        size: Math.random() * 8 + 4,
        rotation: Math.random() * 360,
      });
    }

    return pieces;
  };

  if (!showConfetti) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {/* Celebration Message */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="bg-gradient-to-r from-brand-500 to-brand-600 text-cream-50 px-8 py-4 rounded-2xl shadow-2xl animate-bounce">
          <div className="flex items-center gap-3">
            <svg
              className="w-6 h-6 animate-spin"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-serif font-bold text-lg">
              🎉 Article Complete! 🎉
            </span>
            <svg
              className="w-6 h-6 animate-pulse"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Confetti Pieces */}
      {generateConfetti().map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-confetti-fall"
          style={{
            left: `${piece.left}%`,
            animationDelay: `${piece.animationDelay}s`,
            animationDuration: `${piece.animationDuration}s`,
            "--rotation": `${piece.rotation}deg`,
          }}
        >
          <div
            className="confetti-piece"
            style={{
              backgroundColor: piece.color,
              width: `${piece.size}px`,
              height: `${piece.size}px`,
              borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            }}
          />
        </div>
      ))}

      {/* Firework Effects */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-brand-400 rounded-full animate-firework-1"></div>
      <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-sage-400 rounded-full animate-firework-2"></div>
      <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-cream-400 rounded-full animate-firework-3"></div>
      <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-brand-500 rounded-full animate-firework-4"></div>

      <style jsx>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(var(--rotation));
            opacity: 0;
          }
        }

        @keyframes firework-1 {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          50% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(0);
            opacity: 0;
          }
        }

        @keyframes firework-2 {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          50% {
            transform: scale(1.5);
            opacity: 1;
          }
          100% {
            transform: scale(0);
            opacity: 0;
          }
        }

        @keyframes firework-3 {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 1;
          }
          100% {
            transform: scale(0);
            opacity: 0;
          }
        }

        @keyframes firework-4 {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          50% {
            transform: scale(0.8);
            opacity: 1;
          }
          100% {
            transform: scale(0);
            opacity: 0;
          }
        }

        .animate-confetti-fall {
          animation: confetti-fall linear forwards;
        }

        .animate-firework-1 {
          animation: firework-1 2s ease-out;
        }

        .animate-firework-2 {
          animation: firework-2 2.2s ease-out 0.3s;
        }

        .animate-firework-3 {
          animation: firework-3 1.8s ease-out 0.6s;
        }

        .animate-firework-4 {
          animation: firework-4 2.1s ease-out 0.9s;
        }

        .confetti-piece {
          animation: spin 2s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
