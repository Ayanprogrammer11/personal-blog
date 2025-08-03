"use client";

import { useSession } from "next-auth/react";
import { Bookmark } from "lucide-react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState, useEffect } from "react";

function BookmarkBlog({ blogId }: { blogId: string }) {
  const { data: session, status } = useSession();
  const [bookmarked, setBookmarked] = useState(false);

  const initialBookmark = useQuery(api.bookmarks.getBookmark, {
    postId: blogId,
    userId: session?.user?.id,
  });

  const bookmarkMutation = useMutation(api.bookmarks.bookmark);

  useEffect(() => {
    if (initialBookmark) {
      setBookmarked(true);
    }
  }, [initialBookmark]);

  const handleBookmark = async () => {
    if (status !== "authenticated") {
      window.location.href = "/signin";
      return;
    }

    const optimisticBookmarked = !bookmarked;
    setBookmarked(optimisticBookmarked);

    try {
      await bookmarkMutation({ postId: blogId, userId: session.user.id! });
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      setBookmarked(!optimisticBookmarked);
    }
  };

  return (
    <div>
      <button
        className={`rounded-full p-2 shadow-sm hover:shadow-md cursor-pointer ${
          bookmarked ? "bg-brand-100" : "bg-white"
        }`}
        onClick={handleBookmark}
      >
        <Bookmark
          className={`w-6 h-6 transition-colors ${
            bookmarked ? "text-brand-600 fill-current" : "text-brand-600"
          }`}
        />
      </button>
    </div>
  );
}

export default BookmarkBlog;
