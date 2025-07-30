// app/account/_components/Sidebar.jsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  Heart,
  Bookmark,
  History,
  Settings,
  Crown,
  BarChart3,
  LogOut,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";

const navigation = [
  {
    name: "Dashboard",
    href: "/account",
    icon: BarChart3,
    description: "Overview & analytics",
  },
  {
    name: "Profile",
    href: "/account/profile",
    icon: User,
    description: "Personal information",
  },
  {
    name: "Likes",
    href: "/account/likes",
    icon: Heart,
    description: "Liked content",
  },
  {
    name: "Bookmarks",
    href: "/account/bookmarks",
    icon: Bookmark,
    description: "Saved articles",
  },
  {
    name: "History",
    href: "/account/history",
    icon: History,
    description: "Reading history",
  },
  {
    name: "Settings",
    href: "/account/settings",
    icon: Settings,
    description: "Account preferences",
  },
  {
    name: "Subscription",
    href: "/account/subscription",
    icon: Crown,
    description: "Manage subscription",
  },
];

function NavigationItem({ item, isActive, isMobile }) {
  return (
    <Link
      href={item.href}
      className={`
        group relative flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200
        ${
          isActive
            ? "bg-brand-500 text-cream-50 shadow-lg shadow-brand-500/25"
            : "text-sage-700 hover:bg-brand-50 hover:text-brand-700"
        }
        ${isMobile ? "w-full" : ""}
      `}
    >
      <item.icon
        className={`h-5 w-5 transition-colors ${isActive ? "text-cream-50" : "text-sage-500 group-hover:text-brand-600"}`}
      />
      <div className="flex-1 min-w-0">
        <div className="font-semibold">{item.name}</div>
        {!isMobile && (
          <div
            className={`text-xs truncate ${isActive ? "text-brand-100" : "text-sage-500 group-hover:text-brand-500"}`}
          >
            {item.description}
          </div>
        )}
      </div>
      {isActive && <ChevronRight className="h-4 w-4 text-cream-50" />}

      {/* Active indicator */}
      {isActive && !isMobile && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-cream-50 rounded-r-full" />
      )}
    </Link>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false); // New state to track initial load

  useEffect(() => {
    // Only run on client side
    setIsLoaded(true);
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsOpen(!mobile); // Open by default on desktop, closed on mobile
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  if (!isLoaded) return null;

  return (
    <>
      {/* Mobile menu button */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="md:hidden fixed bottom-6 right-6 z-60 p-3 bg-brand-500 text-cream-50 rounded-full shadow-lg hover:bg-brand-600 transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      )}

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-40 bg-sage-900/50 backdrop-blur-sm"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-80 bg-cream-50/80 backdrop-blur-md border-r border-sage-200/50 shadow-xl transition-transform duration-300 ease-in-out ${
          isMobile ? (isOpen ? "translate-x-0" : "-translate-x-full") : ""
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-20 items-center justify-between px-6 border-b border-sage-200/50">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shadow-lg">
                <User className="h-5 w-5 text-cream-50" />
              </div>
              <div>
                <h2 className="text-lg font-serif font-bold text-brand-800">
                  Account
                </h2>
                <p className="text-xs text-sage-600">Manage your profile</p>
              </div>
            </div>
            {isMobile && (
              <button onClick={toggleSidebar} className="md:hidden p-1">
                <X className="h-5 w-5 text-sage-600" />
              </button>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            <div className="space-y-2">
              {navigation.map((item) => (
                <NavigationItem
                  key={item.name}
                  item={item}
                  isActive={pathname === item.href}
                  isMobile={isMobile}
                />
              ))}
            </div>

            {/* Premium Badge */}
            <div className="mt-8 mx-2 p-4 bg-gradient-to-br from-brand-500 to-brand-600 rounded-2xl text-cream-50 shadow-lg">
              <div className="flex items-center gap-3 mb-2">
                <Crown className="h-5 w-5" />
                <span className="font-semibold">Premium</span>
              </div>
              {!isMobile && (
                <p className="text-xs text-brand-100 mb-3">
                  Unlock unlimited access to all features
                </p>
              )}
              <Link
                href="/account/subscription"
                className={`block w-full text-center py-2 px-3 bg-cream-50 text-brand-700 rounded-xl text-sm font-semibold hover:bg-cream-100 transition-colors ${
                  isMobile ? "mt-2" : ""
                }`}
              >
                Upgrade Now
              </Link>
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-sage-200/50">
            <button className="flex items-center gap-3 w-full px-4 py-3 text-sm text-sage-600 hover:text-brand-600 hover:bg-brand-50 rounded-2xl transition-all">
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
