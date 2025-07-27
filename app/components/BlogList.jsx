// BlogList.jsx
import Link from "next/link";
import { client } from "../sanity/client";
import BlogCard from "./BlogCard";

const BLOG_QUERY = `*[
  _type == "blog" && defined(slug.current)
]|order(publishedAt desc)[0...12]{
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  coverImage {
    asset-> {
      _id,
      url,
      metadata {
        lqip
      }
    }
  },
  categories[]->{
    title,
    color
  }
}`;

export default async function BlogList() {
  const blogs = await client.fetch(BLOG_QUERY);

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
      {blogs.map((blog) => (
        <Link
          key={blog._id}
          href={`/blogs/${blog.slug.current}`}
          className="group transition-transform hover:-translate-y-1"
        >
          <BlogCard blog={blog} />
        </Link>
      ))}
    </div>
  );
}
