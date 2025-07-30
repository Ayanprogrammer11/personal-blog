import { BookOpen, Users, Award, TrendingUp } from "lucide-react";

export default function AboutSection() {
  const features = [
    {
      icon: BookOpen,
      title: "In-Depth Articles",
      description:
        "Comprehensive pieces that dive deep into topics that matter, providing valuable insights and actionable takeaways.",
    },
    {
      icon: Users,
      title: "Community Driven",
      description:
        "Join a growing community of readers who engage with content, share perspectives, and learn together.",
    },
    {
      icon: Award,
      title: "Quality Content",
      description:
        "Every article is carefully crafted, researched, and edited to ensure the highest quality reading experience.",
    },
    {
      icon: TrendingUp,
      title: "Latest Trends",
      description:
        "Stay ahead of the curve with content covering the latest trends, innovations, and thought-provoking ideas.",
    },
  ];

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-black/80"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
            Why Choose This Blog?
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            More than just articles – it's a curated experience designed to
            inform, inspire, and ignite meaningful conversations.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border border-gray-700/50 backdrop-blur-sm hover:border-gray-600/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              {/* Icon */}
              <div className="mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                {feature.description}
              </p>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col sm:flex-row gap-4 items-center">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold text-white hover:scale-105 transition-transform duration-300 hover:shadow-2xl hover:shadow-blue-500/25">
              Explore Articles
            </button>
            <button className="px-8 py-4 border border-gray-600 rounded-xl font-semibold text-gray-300 hover:border-gray-500 hover:text-white transition-all duration-300 hover:bg-gray-800/50">
              Subscribe to Newsletter
            </button>
          </div>
        </div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-gray-900/80 to-transparent"></div>
      </div>
    </section>
  );
}
