import { Crown } from "lucide-react";

export default function SubscriptionPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shadow-lg">
          <Crown className="h-8 w-8 text-cream-50" />
        </div>
        <div>
          <h1 className="text-3xl font-serif font-bold text-brand-800">
            Subscription
          </h1>
          <p className="text-sage-600">
            Manage your premium membership and billing
          </p>
        </div>
      </div>

      <div className="card">
        <p className="text-sage-700">
          Subscription management interface will be implemented here.
        </p>
      </div>
    </div>
  );
}
