// components/SignInPage.tsx
// import { signIn } from "@/lib/auth";
import { Chrome, Zap, Shield, Star } from "lucide-react";
import { signIn } from "../_lib/auth";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-cream-100 to-sage-50">
      <div className="container py-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-brand-400 to-brand-600 rounded-2xl mb-8 shadow-lg">
              <Star className="w-10 h-10 text-cream-50" />
            </div>

            <h1 className="text-5xl md:text-6xl font-serif mb-6 text-brand-gradient">
              Premium Content
            </h1>

            <p className="text-xl md:text-2xl text-sage-700 mb-8 max-w-2xl mx-auto leading-relaxed">
              Unlock exclusive insights, in-depth tutorials, and premium content
              that will accelerate your journey
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="card text-center group hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-400 to-brand-500 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:shadow-lg transition-shadow">
                <Zap className="w-8 h-8 text-cream-50" />
              </div>
              <h3 className="text-xl font-serif mb-3">Lightning Fast Access</h3>
              <p className="text-sage-600">
                Instant access to all premium content the moment you subscribe
              </p>
            </div>

            <div className="card text-center group hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-sage-400 to-sage-500 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:shadow-lg transition-shadow">
                <Shield className="w-8 h-8 text-cream-50" />
              </div>
              <h3 className="text-xl font-serif mb-3">Secure & Private</h3>
              <p className="text-sage-600">
                Your data is protected with enterprise-grade security
              </p>
            </div>

            <div className="card text-center group hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-500 to-sage-500 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:shadow-lg transition-shadow">
                <Star className="w-8 h-8 text-cream-50" />
              </div>
              <h3 className="text-xl font-serif mb-3">Premium Quality</h3>
              <p className="text-sage-600">
                Carefully crafted content that delivers real value
              </p>
            </div>
          </div>

          {/* Authentication Section */}
          <div className="max-w-md mx-auto">
            <div className="card bg-gradient-to-br from-cream-50 to-cream-100 border-2 border-brand-200 shadow-xl">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-serif mb-3">Get Started Today</h2>
                <p className="text-sage-600">
                  Sign in with your Google account to continue
                </p>
              </div>

              <form
                action={async () => {
                  "use server";
                  await signIn("google", { redirectTo: "/subscribe" });
                }}
              >
                <button
                  type="submit"
                  className="w-full bg-white hover:bg-gray-50 text-gray-900 font-semibold py-4 px-6 border border-gray-300 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-3 group"
                >
                  <Chrome className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
                  Continue with Google
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-sage-200">
                <p className="text-xs text-sage-500 text-center">
                  By continuing, you agree to our Terms of Service and Privacy
                  Policy
                </p>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 text-center">
            <p className="text-sage-500 mb-4">
              Trusted by developers worldwide
            </p>
            <div className="flex justify-center items-center gap-8 opacity-60">
              <div className="w-8 h-8 bg-sage-300 rounded"></div>
              <div className="w-8 h-8 bg-sage-300 rounded"></div>
              <div className="w-8 h-8 bg-sage-300 rounded"></div>
              <div className="w-8 h-8 bg-sage-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
