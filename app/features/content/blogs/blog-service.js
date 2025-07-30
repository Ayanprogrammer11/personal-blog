import { groq } from "next-sanity";
import { client } from "@/app/features/content/services/sanity-client";

const POSTS_PER_PAGE = 6;

export async function getBlogs({ search = "", category = "", page = 1 } = {}) {
  try {
    const start = (page - 1) * POSTS_PER_PAGE;
    const end = start + POSTS_PER_PAGE;

    const query = groq`*[_type == "blog"] {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      featured,
      "coverImage": coverImage.asset->url,
      "categories": categories[]->{
        title,
        slug
      }
    } | order(featured desc, publishedAt desc)`;

    const allBlogs = await client.fetch(query);

    let filtered = allBlogs;

    if (search) {
      const searchQuery = search.toLowerCase().trim();
      filtered = filtered.filter((blog) => {
        const titleMatch = blog.title?.toLowerCase().includes(searchQuery);
        const excerptMatch = blog.excerpt?.toLowerCase().includes(searchQuery);
        const categoryMatch = blog.categories?.some((category) =>
          category.title?.toLowerCase().includes(searchQuery)
        );
        return titleMatch || excerptMatch || categoryMatch;
      });
    }

    if (category && category !== "All") {
      filtered = filtered.filter((blog) =>
        blog.categories?.some((cat) => cat.title === category)
      );
    }

    const totalPosts = filtered.length;
    const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

    return {
      blogs: filtered.slice(start, end),
      pagination: {
        currentPage: page,
        totalPages,
        totalPosts,
        hasMore: page < totalPages,
      },
    };
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return {
      blogs: [],
      pagination: {
        currentPage: 1,
        totalPages: 0,
        totalPosts: 0,
        hasMore: false,
      },
    };
  }
}

export async function getCategories() {
  try {
    const query = groq`*[_type == "category"] {
      title,
      slug,
      description
    } | order(title asc)`;

    return await client.fetch(query);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}