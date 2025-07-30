// app/account/profile/page.js
import { User, PenLine, Lock, Mail, Calendar, Globe } from "lucide-react";
import { AvatarUpload } from "./_components/AvatarUpload";
export const revalidate = 0;
export default function ProfilePage() {
  // Mock user data - in a real app, this would come from your database
  const user = {
    name: "Alex Johnson",
    username: "alexwriter",
    email: "alex@example.com",
    bio: "Writer, photographer, and coffee enthusiast. Sharing thoughts on technology, creativity, and the human experience.",
    location: "Portland, OR",
    website: "https://alexjohnson.blog",
    joinDate: "March 2022",
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <AvatarUpload initialAvatar={user.avatar} />
        <div>
          <h1 className="text-3xl font-serif font-bold text-brand-800">
            {user.name}
          </h1>
          <p className="text-sage-600">
            @{user.username} · Member since {user.joinDate}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Profile Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* About Card */}
          <div className="card group relative">
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="text-sage-500 hover:text-brand-600 transition-colors">
                <PenLine className="h-5 w-5" />
              </button>
            </div>
            <h2 className="text-xl font-serif font-bold text-brand-800 mb-4 flex items-center gap-2">
              <User className="h-5 w-5 text-brand-600" />
              About
            </h2>
            <p className="text-sage-700 mb-6">{user.bio}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-sage-500 mt-0.5" />
                <div>
                  <p className="text-sage-600 text-sm">Email</p>
                  <p className="text-sage-800">{user.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Globe className="h-5 w-5 text-sage-500 mt-0.5" />
                <div>
                  <p className="text-sage-600 text-sm">Website</p>
                  <a
                    href={user.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-600 hover:underline"
                  >
                    {user.website.replace(/^https?:\/\//, "")}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-sage-500 mt-0.5" />
                <div>
                  <p className="text-sage-600 text-sm">Joined</p>
                  <p className="text-sage-800">{user.joinDate}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-sage-500 mt-0.5"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <div>
                  <p className="text-sage-600 text-sm">Location</p>
                  <p className="text-sage-800">{user.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Preferences Card */}
          <div className="card">
            <h2 className="text-xl font-serif font-bold text-brand-800 mb-4 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-brand-600"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
              Preferences
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sage-800">Dark Mode</p>
                  <p className="text-sm text-sage-600">
                    Switch between light and dark theme
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" />
                  <div className="w-11 h-6 bg-sage-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-sage-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-500"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sage-800">
                    Email Notifications
                  </p>
                  <p className="text-sm text-sage-600">Receive email updates</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    checked
                  />
                  <div className="w-11 h-6 bg-sage-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-sage-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-500"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Section */}
        <div className="space-y-6">
          {/* Account Security Card */}
          <div className="card">
            <h2 className="text-xl font-serif font-bold text-brand-800 mb-4 flex items-center gap-2">
              <Lock className="h-5 w-5 text-brand-600" />
              Account Security
            </h2>
            <div className="space-y-4">
              <div>
                <p className="font-medium text-sage-800">Password</p>
                <p className="text-sm text-sage-600 mb-2">
                  Last changed 3 months ago
                </p>
                <button className="btn-secondary text-sm py-1.5 px-3">
                  Change Password
                </button>
              </div>
              <div>
                <p className="font-medium text-sage-800">
                  Two-Factor Authentication
                </p>
                <p className="text-sm text-sage-600 mb-2">
                  Add an extra layer of security
                </p>
                <button className="btn-primary text-sm py-1.5 px-3">
                  Enable 2FA
                </button>
              </div>
            </div>
          </div>

          {/* Danger Zone Card */}
          <div className="card border border-brand-200 bg-brand-50">
            <h2 className="text-xl font-serif font-bold text-brand-800 mb-4">
              Danger Zone
            </h2>
            <div className="space-y-4">
              <div>
                <p className="font-medium text-brand-800">Delete Account</p>
                <p className="text-sm text-brand-700 mb-2">
                  Permanently remove your account and all associated data
                </p>
                <button className="text-sm py-1.5 px-3 rounded-lg border border-brand-300 text-brand-700 hover:bg-brand-100 transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
