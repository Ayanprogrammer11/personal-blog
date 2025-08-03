import { Heart } from "lucide-react";

export default function LikesPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center shadow-lg">
          <Heart className="h-8 w-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-serif font-bold text-brand-800">
            Likes
          </h1>
          <p className="text-sage-600">
            Content you&apos;ve liked and appreciated
          </p>
        </div>
      </div>

      <div className="card">
        <p className="text-sage-700">Liked content will be displayed here.</p>
      </div>
    </div>
  );
}
