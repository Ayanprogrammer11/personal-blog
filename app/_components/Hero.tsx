import {
  Menu,
  X,
  Search,
  BookOpen,
  User,
  Rss,
  ChevronDown,
} from "lucide-react";
import LoadingSpinner from "./LoadingSpinner";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="pt-20 md:pt-24 pb-16 md:pb-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-brand-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-sage-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cream-400 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-4xl relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Welcome Badge */}
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-brand-100 to-sage-100 px-4 py-2 rounded-full text-sm font-medium text-brand-800 mb-8 border border-brand-200">
            <User className="w-4 h-4" />
            <span>Welcome to my digital space</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-brand-800 mb-6 leading-tight">
            Crafting Stories,
            <br />
            <span className="text-brand-gradient">Sharing Ideas</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-sage-700 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed">
            Join me on a journey through technology, creativity, and life
            lessons. Discover insights, tutorials, and stories that inspire and
            inform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
            <button className="btn-primary text-lg px-8 py-3 w-full sm:w-auto">
              <Link href={"/blogs"} className="text-inherit">
                Start Reading
              </Link>
            </button>

            <button className="btn-secondary text-lg px-8 py-3 w-full sm:w-auto">
              <Link href="/about" className="text-inherit">
                About Me
              </Link>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 pt-8 border-t border-sage-200">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-serif text-brand-800 font-bold mb-2">
                50+
              </div>
              <div className="text-sage-600 font-medium">
                Articles Published
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-serif text-brand-800 font-bold mb-2">
                10k+
              </div>
              <div className="text-sage-600 font-medium">Monthly Readers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-serif text-brand-800 font-bold mb-2">
                5+
              </div>
              <div className="text-sage-600 font-medium">Years Writing</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-sage-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-sage-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
