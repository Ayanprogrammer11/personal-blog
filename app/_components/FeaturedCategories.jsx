export default function FeaturedCategories() {
  return (
    <section className="py-16 bg-gradient-to-b from-cream-50 to-cream-100">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-serif text-brand-800 text-center mb-12">
          Explore Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Technology",
              desc: "Latest trends and tutorials",
              icon: "💻",
            },
            {
              title: "Lifestyle",
              desc: "Personal growth and wellness",
              icon: "🌱",
            },
            { title: "Creative", desc: "Design and inspiration", icon: "🎨" },
          ].map((category, index) => (
            <div
              key={index}
              className="card text-center hover:scale-105 transition-transform cursor-pointer"
            >
              <div className="text-4xl mb-4">{category.icon}</div>
              <h3 className="text-xl font-serif text-brand-800 mb-2">
                {category.title}
              </h3>
              <p className="text-sage-600">{category.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
