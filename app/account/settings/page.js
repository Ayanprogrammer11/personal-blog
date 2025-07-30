import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center shadow-lg">
          <Settings className="h-8 w-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-serif font-bold text-brand-800">
            Settings
          </h1>
          <p className="text-sage-600">
            Configure your account preferences and privacy
          </p>
        </div>
      </div>

      <div className="card">
        <p className="text-sage-700">
          Account settings and preferences will be configured here.
        </p>
      </div>
    </div>
  );
}
