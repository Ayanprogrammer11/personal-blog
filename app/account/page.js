import { BarChart3, TrendingUp, Users, Eye } from "lucide-react";

export default function AccountDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-brand-800 mb-2">
          Dashboard
        </h1>
        <p className="text-sage-600">
          Welcome back! Here&apos;s an overview of your account activity.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Articles Read", value: "127", icon: Eye, trend: "+12%" },
          { label: "Bookmarks", value: "43", icon: BarChart3, trend: "+5%" },
          {
            label: "Likes Given",
            value: "89",
            icon: TrendingUp,
            trend: "+18%",
          },
          { label: "Following", value: "24", icon: Users, trend: "+3%" },
        ].map((stat) => (
          <div key={stat.label} className="card">
            <div className="flex items-center justify-between mb-4">
              <stat.icon className="h-8 w-8 text-brand-500" />
              <span className="text-sm font-medium text-emerald-600">
                {stat.trend}
              </span>
            </div>
            <div className="text-2xl font-bold text-sage-900 mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-sage-600">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
