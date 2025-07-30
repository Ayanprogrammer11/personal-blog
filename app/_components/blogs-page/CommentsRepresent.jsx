import prisma from "@/app/_lib/prisma";
import { PrismaClient } from "@prisma/client";
import { MessageCircle } from "lucide-react";

export default async function CommentsRepresent({ blogId }) {
  const length = await prisma.comment.findMany({
    where: {
      postId: blogId,
    },
  });
  console.log(length);
  return (
    <a href="#comment-section">
      <div className="flex items-center gap-2 cursor-pointer">
        <div className="flex items-center gap-1 px-3 py-2 rounded-full transition-all duration-200 bg-gray-100 text-gray-600 hover:bg-gray-200">
          <MessageCircle />
          <span className="text-[16px] font-medium">{length.length}</span>
        </div>
      </div>
    </a>
  );
}
