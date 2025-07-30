"use client";

import { Bookmark } from "lucide-react";
import { toggleBookmark } from "../_lib/actions/bookmark-actions";

function BookmarkBlog({ blogId }) {
  return (
    <div>
      <button
        className="rounded-full bg-white p-2 shadow-sm hover:shadow-md cursor-pointer"
        onClick={() => toggleBookmark(blogId)}
      >
        <Bookmark className="text-brand-600 w-6 h-6" />
      </button>
    </div>
  );
}

export default BookmarkBlog;
