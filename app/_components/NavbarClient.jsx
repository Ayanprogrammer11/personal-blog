"use client";

import { useEffect, useState } from "react";
import { Menu, X, Rss, Search } from "lucide-react";

export default function NavbarClient() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-cream-50/95 backdrop-blur-md shadow-lg border-b border-sage-200"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="p-2 text-sage-800 hover:text-brand-600 transition-colors"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="py-4 space-y-4 border-t border-sage-200 bg-cream-50">
          <a
            href="#home"
            className="block text-sage-800 hover:text-brand-600 font-medium transition-colors"
          >
            Home
          </a>
          <a
            href="#categories"
            className="block text-sage-800 hover:text-brand-600 font-medium transition-colors"
          >
            Categories
          </a>
          <a
            href="#about"
            className="block text-sage-800 hover:text-brand-600 font-medium transition-colors"
          >
            About
          </a>
          <a
            href="#contact"
            className="block text-sage-800 hover:text-brand-600 font-medium transition-colors"
          >
            Contact
          </a>

          <div className="flex items-center space-x-4 pt-2">
            <button className="p-2 text-sage-800 hover:text-brand-600">
              <Search className="w-5 h-5" />
            </button>
            <button className="btn-primary flex items-center space-x-2">
              <Rss className="w-4 h-4" />
              <span>Subscribe</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
