// app/layout.js
import "./globals.css";
import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "700"],
});

// 🔥 Global metadata
export const metadata = {
  title: {
    default: "Think Different — Ayan’s Blog",
    template: "%s | Ayan’s Blog",
  },
  description:
    "Ayan’s personal blog: raw insights, deep ideas, and unique takes on life, tech, and creativity.",
  keywords: [
    "ayan",
    "personal blog",
    "deep thinking",
    "writing",
    "technology",
    "philosophy",
  ],
  metadataBase: new URL("https://yourdomain.com"), // replace with real domain
  openGraph: {
    title: "Think Different — Ayan’s Blog",
    description:
      "Explore ideas that challenge the status quo. Join thousands who think beyond the ordinary.",
    url: "https://yourdomain.com",
    siteName: "Ayan’s Blog",
    images: [
      {
        url: "/opengraph-image.jpg", // should exist in /public
        width: 1200,
        height: 630,
        alt: "Ayan’s Blog — Think Different",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Think Different — Ayan’s Blog",
    description:
      "Explore ideas that challenge the status quo. Join thousands who think beyond the ordinary.",
    creator: "@yourhandle", // optional
    images: ["/opengraph-image.jpg"],
  },
  themeColor: "#000000",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
