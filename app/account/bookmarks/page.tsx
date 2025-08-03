import { Bookmark } from "lucide-react";

export default function BookmarksPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg">
          <Bookmark className="h-8 w-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-serif font-bold text-brand-800">
            Bookmarks
          </h1>
          <p className="text-sage-600">Articles saved for later reading</p>
        </div>
      </div>

      <div className="card">
        <p className="text-sage-700">
          Bookmarked articles will be displayed here.
        </p>
      </div>
    </div>
  );
}
