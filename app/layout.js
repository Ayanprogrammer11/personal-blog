import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css"; // <-- fixed import
import Navbar from "./_components/Navbar";
import { auth } from "./_lib/auth";
import SessionProvider from "./_components/SessionProvider";
import NavbarShell from "./_components/NavbarShell";
import NavbarClient from "./_components/NavbarClient";

// import NavbarShell from "./components/NavbarShell";
// import NavbarClient from "./components/NavbarClient";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: "variable",
});
const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: "variable",
});

export const metadata = {
  title: "Your Blog Name",
  description:
    "Personal blog about technology, life, and everything in between",
  authors: [{ name: "Your Name" }],
  keywords: ["blog", "technology", "personal", "writing"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourdomain.com",
    title: "Your Blog Name",
    description: "Personal blog...",
    siteName: "Your Blog Name",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Blog Name",
    description: "Personal blog...",
    creator: "@yourusername",
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

export default async function RootLayout({ children }) {
  const session = await auth();
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${inter.variable} ${jetBrainsMono.variable}`}
    >
      <body className="font-sans antialiased">
        <Navbar />
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
