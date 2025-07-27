import AboutSection from "./components/AboutSection";
import Hero from "./components/Hero";

export const metadata = {
  title: "Your Personal Blog | Insights, Stories & Expertise",
  description:
    "Discover thoughtful articles, personal insights, and expert perspectives on topics that matter. Join our community of curious minds.",
  keywords:
    "blog, articles, insights, stories, personal development, expertise",
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "Your Personal Blog | Insights, Stories & Expertise",
    description:
      "Discover thoughtful articles, personal insights, and expert perspectives on topics that matter.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Personal Blog | Insights, Stories & Expertise",
    description:
      "Discover thoughtful articles, personal insights, and expert perspectives on topics that matter.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <Hero />
      <AboutSection />
    </main>
  );
}
