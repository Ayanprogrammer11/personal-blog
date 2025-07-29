import { MessageCircle } from "lucide-react";

export default function CommentsRepresent() {
  return (
    <a href="#comment-section">
      <div className="flex items-center gap-2 cursor-pointer">
        <div className="flex items-center gap-1 px-3 py-2 rounded-full transition-all duration-200 bg-gray-100 text-gray-600 hover:bg-gray-200">
          <MessageCircle />
          <span className="text-[16px] font-medium">10</span>
        </div>
      </div>
    </a>
  );
}
