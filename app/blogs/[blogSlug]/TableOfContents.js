"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowUp } from "lucide-react";

export default function TableOfContents() {
  const [activeId, setActiveId] = useState("");
  const [headings, setHeadings] = useState([]);
  const lastScrollY = useRef(0);
  const scrollDirection = useRef("down");

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll("h2, h3, h4"))
      .filter((el) => el.textContent.trim())
      .map((el, i) => {
        if (!el.id) el.id = `heading-${i}`;
        return {
          id: el.id,
          text: el.textContent,
          level: parseInt(el.tagName.charAt(1)),
          element: el,
        };
      });

    setHeadings(elements);
  }, []);

  useEffect(() => {
    if (!headings.length) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollDirection.current =
        currentScrollY > lastScrollY.current ? "down" : "up";
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          // When scrolling down, activate when entering viewport from top
          if (
            scrollDirection.current === "down" &&
            entry.boundingClientRect.top < window.innerHeight * 0.5
          ) {
            setActiveId(entry.target.id);
          }
          // When scrolling up, activate when 25% from top of viewport
          else if (
            scrollDirection.current === "up" &&
            entry.boundingClientRect.top < window.innerHeight * 0.25
          ) {
            setActiveId(entry.target.id);
          }
        });

        // Handle last heading case
        const lastHeading = headings[headings.length - 1];
        if (
          lastHeading &&
          window.innerHeight + window.scrollY >=
            document.body.offsetHeight - 100
        ) {
          setActiveId(lastHeading.id);
        }
      },
      {
        rootMargin: "-20% 0% -50% 0%",
        threshold: 0,
      }
    );

    headings.forEach((h) => observer.observe(h.element));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <div className="fixed right-6 top-1/2 hidden -translate-y-1/2 xl:block">
      <div className="scrollbar-thin scrollbar-thumb-white/10 w-84 flex max-h-[70vh] min-h-[50vh] flex-col justify-around overflow-y-auto rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-lg">
        <h3 className="mb-8 flex items-center gap-2 text-3xl font-bold text-white">
          Contents
        </h3>

        <nav className="flex-1 space-y-2 border-l border-white/10">
          {headings.map((h) => (
            <a
              key={h.id}
              href={`#${h.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(h.id)?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
              className={`block py-1.5 text-sm transition-all hover:text-white
                ${
                  activeId === h.id
                    ? "text-white font-medium border-l-2 border-purple-500"
                    : "text-gray-400"
                }
                ${h.level === 3 ? "pl-5" : "pl-3"}
                ${h.level === 4 ? "pl-7" : ""}
              `}
              style={{
                marginLeft: `${(h.level - 2) * 8}px`,
              }}
            >
              {h.text}
            </a>
          ))}
        </nav>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-gray-400 transition-all hover:bg-white/10 hover:text-white"
        >
          <ArrowUp className="h-3.5 w-3.5" />
          Back to top
        </button>
      </div>
    </div>
  );
}
