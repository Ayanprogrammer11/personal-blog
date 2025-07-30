// app/account/profile/ProfileForm.js
"use client";

import { PenLine } from "lucide-react";
import { useState } from "react";

export function ProfileForm() {
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(
    "Writer, photographer, and coffee enthusiast. Sharing thoughts on technology, creativity, and the human experience."
  );

  return (
    <div className="card group relative">
      {isEditing ? (
        <div className="space-y-4">
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full p-3 border border-sage-300 rounded-lg focus:ring-2 focus:ring-brand-400 focus:border-transparent"
            rows="4"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsEditing(false)}
              className="btn-secondary py-1.5 px-4 text-sm"
            >
              Cancel
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="btn-primary py-1.5 px-4 text-sm"
            >
              Save Changes
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setIsEditing(true)}
              className="text-sage-500 hover:text-brand-600 transition-colors"
            >
              <PenLine className="h-5 w-5" />
            </button>
          </div>
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
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            About
          </h2>
          <p className="text-sage-700">{bio}</p>
        </>
      )}
    </div>
  );
}
