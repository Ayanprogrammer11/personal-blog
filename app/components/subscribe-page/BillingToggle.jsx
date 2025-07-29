"use client";

import { useState } from "react";

export default function BillingToggle({ onBillingChange }) {
  const [isYearly, setIsYearly] = useState(false);

  const handleToggle = (yearly) => {
    setIsYearly(yearly);
    onBillingChange(yearly);
  };

  return (
    <div className="inline-flex items-center bg-cream-100/80 backdrop-blur-sm rounded-xl p-1 mb-8 shadow-sm border border-cream-200">
      <button
        onClick={() => handleToggle(false)}
        className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
          !isYearly
            ? "bg-brand-500 text-cream-50 shadow-md transform scale-105"
            : "text-sage-700 hover:text-sage-900 hover:bg-cream-50/50"
        }`}
      >
        Monthly
      </button>
      <button
        onClick={() => handleToggle(true)}
        className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 relative ${
          isYearly
            ? "bg-brand-500 text-cream-50 shadow-md transform scale-105"
            : "text-sage-700 hover:text-sage-900 hover:bg-cream-50/50"
        }`}
      >
        Yearly
        <span className="ml-2 text-xs bg-brand-100 text-brand-700 px-2 py-1 rounded-full animate-pulse">
          Save 20%
        </span>
      </button>
    </div>
  );
}
