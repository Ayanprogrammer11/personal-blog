// app/account/profile/AvatarUpload.js
"use client";

import { User, Upload } from "lucide-react";
import { useState } from "react";

export function AvatarUpload({ initialAvatar }) {
  const [avatar, setAvatar] = useState(initialAvatar);
  const [isHovered, setIsHovered] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shadow-lg overflow-hidden">
        {avatar ? (
          <img
            src={avatar}
            alt="User avatar"
            className="w-full h-full object-cover"
          />
        ) : (
          <User className="h-10 w-10 text-cream-50" />
        )}
      </div>

      <div
        className={`absolute inset-0 bg-black bg-opacity-40 rounded-2xl flex items-center justify-center transition-opacity ${isHovered ? "opacity-100" : "opacity-0"}`}
      >
        <label className="cursor-pointer p-2 bg-cream-50 bg-opacity-90 rounded-full text-brand-600 hover:text-brand-800 transition-colors">
          <Upload className="h-5 w-5" />
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>
      </div>
    </div>
  );
}
