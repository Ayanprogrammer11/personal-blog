// app/components/NavbarShell.tsx
import Link from "next/link";
import { BookOpen, ChevronDown, Rss, Search } from "lucide-react";

export default function NavbarShell() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-transparent transition-all duration-300">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-brand-400 to-brand-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-cream-50" />
            </div>
            <span className="text-xl md:text-2xl font-serif text-brand-800 font-bold">
              AYAN
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#home"
              className="text-sage-800 hover:text-brand-600 font-medium transition-colors"
            >
              Home
            </a>

            <div className="relative group">
              <button className="flex items-center space-x-1 text-sage-800 hover:text-brand-600 font-medium transition-colors">
                <span>Categories</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-cream-50 border border-sage-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <a
                  href="#tech"
                  className="block px-4 py-3 text-sage-800 hover:bg-sage-100 hover:text-brand-600"
                >
                  Technology
                </a>
                <a
                  href="#lifestyle"
                  className="block px-4 py-3 text-sage-800 hover:bg-sage-100 hover:text-brand-600"
                >
                  Lifestyle
                </a>
                <a
                  href="#tutorials"
                  className="block px-4 py-3 text-sage-800 hover:bg-sage-100 hover:text-brand-600"
                >
                  Tutorials
                </a>
              </div>
            </div>

            <a
              href="#about"
              className="text-sage-800 hover:text-brand-600 font-medium transition-colors"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-sage-800 hover:text-brand-600 font-medium transition-colors"
            >
              Contact
            </a>

            <button className="p-2 text-sage-800 hover:text-brand-600">
              <Search className="w-5 h-5" />
            </button>

            <Link
              href="/subscribe"
              className="btn-primary flex items-center space-x-2"
            >
              <Rss className="w-4 h-4" />
              <span>Subscribe</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
