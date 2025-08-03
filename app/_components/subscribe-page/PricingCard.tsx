"use client";

import { useState } from "react";
import { Check } from "lucide-react";

export default function PricingCard({ plan, isYearly, onSelectPlan }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const IconComponent = plan.icon;
  const monthlyPrice = parseInt(plan.price.replace("$", ""));
  const yearlyPrice = Math.round(monthlyPrice * 12 * 0.8); // 20% discount
  const currentPrice = isYearly ? yearlyPrice : monthlyPrice;
  const period = isYearly ? "year" : "month";
  const monthlyEquivalent = isYearly
    ? Math.round(yearlyPrice / 12)
    : monthlyPrice;

  const handleSelectPlan = async () => {
    setIsLoading(true);
    await onSelectPlan(plan.name, isYearly);
    setIsLoading(false);
  };

  return (
    <div
      className={`card relative overflow-hidden transition-all duration-300 transform ${
        plan.popular
          ? "border-2 border-brand-300 shadow-xl scale-105 lg:scale-110"
          : "hover:shadow-xl"
      } ${isHovered ? "scale-105 shadow-2xl" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {plan.popular && (
        <div className="absolute -top-1 -right-1 bg-gradient-to-r from-brand-500 to-brand-600 text-cream-50 px-4 py-2 text-sm font-medium rounded-bl-2xl rounded-tr-2xl shadow-lg">
          <span className="flex items-center gap-1">⭐ Most Popular</span>
        </div>
      )}

      {isYearly && (
        <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 text-xs font-medium rounded-full shadow-md">
          Save ${monthlyPrice * 12 - yearlyPrice}
        </div>
      )}

      <div className="text-center mb-8">
        <div
          className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${plan.gradient} rounded-xl mb-4 shadow-lg transition-transform duration-300 ${
            isHovered ? "transform rotate-6 scale-110" : ""
          }`}
        >
          <IconComponent className="w-8 h-8 text-cream-50" />
        </div>

        <h3 className="text-2xl font-serif mb-2">{plan.name}</h3>
        <p className="text-sage-600 mb-4 min-h-[3rem] flex items-center justify-center">
          {plan.description}
        </p>

        <div className="mb-6">
          <div className="transition-all duration-300">
            <span className="text-4xl font-bold text-brand-800">
              ${currentPrice}
            </span>
            <span className="text-sage-600 ml-1">/{period}</span>
          </div>
          {isYearly && (
            <div className="text-sm text-sage-500 mt-1">
              ${monthlyEquivalent}/month billed annually
            </div>
          )}
        </div>
      </div>

      <ul className="space-y-4 mb-8">
        {plan.features.map((feature, featureIndex) => (
          <li key={featureIndex} className="flex items-start gap-3 group">
            <Check className="w-5 h-5 text-brand-500 mt-0.5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110" />
            <span className="text-sage-700 group-hover:text-sage-900 transition-colors">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <button
        onClick={handleSelectPlan}
        disabled={isLoading}
        className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 relative overflow-hidden ${
          plan.popular
            ? "btn-primary hover:scale-105 shadow-lg"
            : "btn-secondary hover:scale-105"
        } ${isLoading ? "opacity-75 cursor-not-allowed" : "hover:shadow-xl"}`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
            Processing...
          </span>
        ) : (
          <span className="relative z-10">
            {plan.popular ? "Get Started" : "Choose Plan"}
          </span>
        )}

        {!isLoading && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        )}
      </button>
    </div>
  );
}
