"use client";

import { useState } from "react";
import { Check, Crown, Star, Zap, BookOpen, Users, LogOut } from "lucide-react";
import { signOut } from "../_lib/auth";
import { signOutAction } from "@/app/features/user/actions/auth-actions";

export default function SubscriptionPlans({ user }) {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Starter",
      monthlyPrice: 9,
      yearlyPrice: 86, // ~20% discount
      description: "Perfect for getting started with premium content",
      features: [
        "Access to premium articles",
        "Weekly newsletter",
        "Community access",
        "Mobile app access",
      ],
      icon: BookOpen,
      popular: false,
      gradient: "from-sage-400 to-sage-500",
    },
    {
      name: "Pro",
      monthlyPrice: 19,
      yearlyPrice: 182, // ~20% discount
      description: "Best value for serious learners and professionals",
      features: [
        "Everything in Starter",
        "Exclusive video content",
        "1-on-1 monthly Q&A",
        "Priority support",
        "Early access to new content",
        "Downloadable resources",
      ],
      icon: Crown,
      popular: true,
      gradient: "from-brand-400 to-brand-600",
    },
    {
      name: "Enterprise",
      monthlyPrice: 49,
      yearlyPrice: 470, // ~20% discount
      description: "For teams and organizations",
      features: [
        "Everything in Pro",
        "Team dashboard",
        "Custom integrations",
        "Dedicated account manager",
        "Advanced analytics",
        "Custom content requests",
        "White-label options",
      ],
      icon: Users,
      popular: false,
      gradient: "from-sage-500 to-brand-500",
    },
  ];

  const getCurrentPrice = (plan) => {
    return isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  };

  const getSavings = (plan) => {
    const monthlyCost = plan.monthlyPrice * 12;
    const yearlyCost = plan.yearlyPrice;
    return Math.round(((monthlyCost - yearlyCost) / monthlyCost) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-cream-100 to-sage-50">
      <div className="container py-16">
        {/* Header with User Info */}
        <div className="flex justify-between items-center mb-12 bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-sage-100 mt-4">
          <div className="flex items-center justify-center gap-4 p-6">
            <div className="relative">
              <img
                src={user.image || "/placeholder-avatar.png"}
                alt={user.name || "User"}
                className="w-14 h-14 rounded-full border-3 border-brand-200 shadow-md"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <h2 className="text-xl font-serif text-brand-800">
                Welcome back, <span className="font-bold">{user.name}</span>
              </h2>
              <p className="text-sage-500 text-sm">Choose your perfect plan</p>
            </div>
          </div>

          <form action={signOutAction}>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 mr-6 text-sage-600 hover:text-sage-800 hover:bg-sage-50 rounded-lg transition-all duration-200 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </form>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-brand-400 to-brand-600 rounded-2xl mb-8 shadow-xl">
              <Star className="w-10 h-10 text-cream-50" />
            </div>

            <h1 className="text-4xl md:text-5xl font-serif mb-6 text-brand-gradient">
              Choose Your Plan
            </h1>

            <p className="text-lg md:text-xl text-sage-700 mb-8 max-w-2xl mx-auto leading-relaxed">
              Unlock premium content and take your skills to the next level.
              Cancel anytime, no questions asked.
            </p>

            {/* Enhanced Billing Toggle */}
            <div className="inline-flex items-center bg-white/80 backdrop-blur-md rounded-2xl p-2 mb-8 shadow-lg border border-sage-100">
              <button
                onClick={() => setIsYearly(false)}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  !isYearly
                    ? "bg-brand-500 text-cream-50 shadow-md transform scale-105"
                    : "text-sage-700 hover:text-sage-900 hover:bg-sage-50"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 relative ${
                  isYearly
                    ? "bg-brand-500 text-cream-50 shadow-md transform scale-105"
                    : "text-sage-700 hover:text-sage-900 hover:bg-sage-50"
                }`}
              >
                Yearly
                <span className="absolute -top-2 -right-2 text-xs bg-gradient-to-r from-green-400 to-green-500 text-white px-2 py-1 rounded-full shadow-md animate-pulse">
                  Save 20%
                </span>
              </button>
            </div>

            {isYearly && (
              <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-2 mb-4">
                <Zap className="w-4 h-4 text-green-600" />
                <span className="text-green-700 text-sm font-medium">
                  🎉 You're saving up to 20% with yearly billing!
                </span>
              </div>
            )}
          </div>

          {/* Pricing Cards */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => {
              const IconComponent = plan.icon;
              const currentPrice = getCurrentPrice(plan);
              const originalMonthlyPrice = isYearly
                ? Math.round(plan.yearlyPrice / 12)
                : plan.monthlyPrice;
              const savings = getSavings(plan);

              return (
                <div
                  key={plan.name}
                  className={`card relative overflow-hidden transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${
                    plan.popular
                      ? "border-2 border-brand-300 shadow-2xl bg-gradient-to-b from-white to-brand-50/30"
                      : "hover:shadow-xl bg-white/80 backdrop-blur-md"
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  {plan.popular && (
                    <>
                      <div className="absolute top-0 right-0 bg-gradient-to-r from-brand-500 to-brand-600 text-cream-50 px-6 py-2 text-sm font-semibold rounded-bl-xl shadow-lg">
                        ⭐ Most Popular
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-brand-400/5 to-transparent pointer-events-none"></div>
                    </>
                  )}

                  <div className="text-center mb-8 relative z-10">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${plan.gradient} rounded-xl mb-6 shadow-lg transform hover:rotate-12 transition-transform duration-300`}
                    >
                      <IconComponent className="w-8 h-8 text-cream-50" />
                    </div>

                    <h3 className="text-2xl font-serif mb-3 text-brand-800">
                      {plan.name}
                    </h3>
                    <p className="text-sage-600 mb-6 leading-relaxed">
                      {plan.description}
                    </p>

                    <div className="mb-6">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="text-4xl font-bold text-brand-800">
                          ${currentPrice}
                        </span>
                        <div className="text-left">
                          <span className="text-sage-600 text-sm">
                            /{isYearly ? "year" : "month"}
                          </span>
                          {isYearly && (
                            <div className="text-xs text-sage-500">
                              (${originalMonthlyPrice}/mo)
                            </div>
                          )}
                        </div>
                      </div>

                      {isYearly && (
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-sm text-sage-500 line-through">
                            ${plan.monthlyPrice * 12}/year
                          </span>
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                            Save {savings}%
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-start gap-3 group"
                      >
                        <div className="flex-shrink-0 w-5 h-5 bg-brand-100 rounded-full flex items-center justify-center mt-0.5 group-hover:bg-brand-200 transition-colors">
                          <Check className="w-3 h-3 text-brand-600" />
                        </div>
                        <span className="text-sage-700 leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                      plan.popular
                        ? "btn-primary shadow-xl hover:shadow-2xl bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700"
                        : "btn-secondary bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700 shadow-lg hover:shadow-xl"
                    }`}
                  >
                    {plan.popular ? "🚀 Get Started" : "Choose Plan"}
                  </button>

                  {isYearly && (
                    <div className="text-center mt-3">
                      <span className="text-xs text-sage-500">
                        Billed annually • Cancel anytime
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Enhanced FAQ Section */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-serif text-center mb-12 text-brand-800">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <div className="card hover:border-brand-200 transition-all duration-300">
                <h3 className="text-lg font-serif mb-3 text-brand-800 flex items-center gap-2">
                  <div className="w-2 h-2 bg-brand-400 rounded-full"></div>
                  Can I cancel anytime?
                </h3>
                <p className="text-sage-700 leading-relaxed">
                  Yes! You can cancel your subscription at any time. You'll
                  continue to have access until the end of your current billing
                  period, with no hidden fees or penalties.
                </p>
              </div>

              <div className="card hover:border-brand-200 transition-all duration-300">
                <h3 className="text-lg font-serif mb-3 text-brand-800 flex items-center gap-2">
                  <div className="w-2 h-2 bg-brand-400 rounded-full"></div>
                  What payment methods do you accept?
                </h3>
                <p className="text-sage-700 leading-relaxed">
                  We accept all major credit cards (Visa, MasterCard, American
                  Express), PayPal, and bank transfers for enterprise plans. All
                  payments are secured with enterprise-grade encryption.
                </p>
              </div>

              <div className="card hover:border-brand-200 transition-all duration-300">
                <h3 className="text-lg font-serif mb-3 text-brand-800 flex items-center gap-2">
                  <div className="w-2 h-2 bg-brand-400 rounded-full"></div>
                  Is there a free trial?
                </h3>
                <p className="text-sage-700 leading-relaxed">
                  Yes! All plans come with a 7-day free trial with full access
                  to premium features. No credit card required to start your
                  trial.
                </p>
              </div>

              <div className="card hover:border-brand-200 transition-all duration-300">
                <h3 className="text-lg font-serif mb-3 text-brand-800 flex items-center gap-2">
                  <div className="w-2 h-2 bg-brand-400 rounded-full"></div>
                  Can I switch plans later?
                </h3>
                <p className="text-sage-700 leading-relaxed">
                  Absolutely! You can upgrade or downgrade your plan at any
                  time. Changes will be prorated and reflected in your next
                  billing cycle.
                </p>
              </div>
            </div>
          </div>

          {/* Enhanced Trust Indicators */}
          <div className="mt-20 text-center">
            <p className="text-sage-500 mb-8 text-lg">
              Trusted by over{" "}
              <span className="font-semibold text-brand-600">10,000+</span>{" "}
              professionals worldwide
            </p>
            <div className="flex justify-center items-center gap-12 opacity-60">
              <div className="flex flex-col items-center">
                <div className="w-20 h-10 bg-gradient-to-r from-sage-200 to-sage-300 rounded-lg mb-2 animate-pulse"></div>
                <span className="text-xs text-sage-400">Enterprise</span>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className="w-20 h-10 bg-gradient-to-r from-sage-200 to-sage-300 rounded-lg mb-2 animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <span className="text-xs text-sage-400">Startup</span>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className="w-20 h-10 bg-gradient-to-r from-sage-200 to-sage-300 rounded-lg mb-2 animate-pulse"
                  style={{ animationDelay: "0.4s" }}
                ></div>
                <span className="text-xs text-sage-400">Agency</span>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className="w-20 h-10 bg-gradient-to-r from-sage-200 to-sage-300 rounded-lg mb-2 animate-pulse"
                  style={{ animationDelay: "0.6s" }}
                ></div>
                <span className="text-xs text-sage-400">Freelancer</span>
              </div>
            </div>
          </div>

          {/* Money Back Guarantee */}
          <div className="mt-12 text-center bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-green-100">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-serif text-green-800 mb-2">
              30-Day Money Back Guarantee
            </h3>
            <p className="text-green-700">
              Not satisfied? Get a full refund within 30 days, no questions
              asked.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
