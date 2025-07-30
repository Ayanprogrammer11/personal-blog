"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function AnimatedHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Floating Elements */}
      <div
        className="absolute -top-10 -left-10 w-20 h-20 bg-gradient-to-br from-blue-400/30 to-cyan-400/30 rounded-full blur-xl animate-pulse"
        style={{
          transform: `translate(${mousePosition.x * 0.01}px, ${
            mousePosition.y * 0.01
          }px)`,
        }}
      ></div>
      <div
        className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-2xl animate-pulse delay-700"
        style={{
          transform: `translate(${mousePosition.x * -0.01}px, ${
            mousePosition.y * -0.01
          }px)`,
        }}
      ></div>

      {/* Main Image Container */}
      <div
        className="relative group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Backdrop with Gradient Border */}
        <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>

        {/* Image Frame */}
        <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-1 rounded-2xl">
          <div className="relative overflow-hidden rounded-xl">
            {/* Creative Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
            <div
              className={`absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 z-10 transition-opacity duration-500 ${
                isHovered ? "opacity-40" : "opacity-0"
              }`}
            ></div>

            {/* Geometric Overlay */}
            <div className="absolute top-4 right-4 w-16 h-16 border-2 border-cyan-400/30 rounded-lg z-20 rotate-12 group-hover:rotate-45 transition-transform duration-500"></div>
            <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full z-20 group-hover:scale-125 transition-transform duration-500"></div>

            {/* Main Image */}
            <Image
              src="/face-covering-intense.png"
              alt="Author Profile"
              width={400}
              height={600}
              className={`w-full h-auto object-cover transition-all duration-700 ${
                isHovered ? "scale-110 brightness-110" : "scale-100"
              }`}
              priority
              quality={90}
            />

            {/* Text Overlay */}
            <div className="absolute bottom-6 left-6 z-20">
              <div className="bg-black/40 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/10">
                <p className="text-white font-medium text-sm">Your Name</p>
                <p className="text-gray-300 text-xs">
                  Content Creator & Writer
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Badge */}
        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-400 to-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
          LIVE
        </div>
      </div>
    </div>
  );
}
