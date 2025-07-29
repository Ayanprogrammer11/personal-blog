import { BookOpen, Feather, Heart } from "lucide-react";

export function BlogsHero() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-cream-50 via-cream-100 to-brand-50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-brand-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-sage-400 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center">
          {/* Icon cluster */}
          <div className="flex justify-center items-center space-x-4 mb-8">
            <div className="p-3 bg-brand-100 rounded-full">
              <BookOpen className="w-6 h-6 text-brand-600" />
            </div>
            <div className="p-3 bg-sage-100 rounded-full">
              <Feather className="w-6 h-6 text-sage-600" />
            </div>
            <div className="p-3 bg-cream-200 rounded-full">
              <Heart className="w-6 h-6 text-brand-600" />
            </div>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-brand-gradient mb-6 leading-tight">
            Stories Worth
            <br />
            <span className="text-sage-700">Sharing</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-sage-600 mb-8 leading-relaxed max-w-2xl mx-auto">
            Discover thoughtful articles, insights, and stories crafted with
            care. Each piece is written to inspire, inform, and connect.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div className="group">
              <div className="text-2xl font-bold text-brand-600 group-hover:text-brand-700 transition-colors">
                50+
              </div>
              <div className="text-sm text-sage-500 uppercase tracking-wide">
                Articles
              </div>
            </div>
            <div className="group">
              <div className="text-2xl font-bold text-brand-600 group-hover:text-brand-700 transition-colors">
                12
              </div>
              <div className="text-sm text-sage-500 uppercase tracking-wide">
                Categories
              </div>
            </div>
            <div className="group">
              <div className="text-2xl font-bold text-brand-600 group-hover:text-brand-700 transition-colors">
                2.5k+
              </div>
              <div className="text-sm text-sage-500 uppercase tracking-wide">
                Readers
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-12 fill-cream-50"
        >
          <path d="M0,0V120H1200V0C1200,0,1050,60,900,60C750,60,600,0,450,0C300,0,150,60,0,60Z" />
        </svg>
      </div>
    </section>
  );
}
