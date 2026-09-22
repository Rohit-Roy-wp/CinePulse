import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { ReviewPost, ReviewFrontmatter, CategoryInfo } from "./types";
import { calculateReadingTime } from "./utils";

const reviewsDirectory = path.join(process.cwd(), "content/reviews");

export function getAllReviews(): ReviewPost[] {
  if (!fs.existsSync(reviewsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(reviewsDirectory);
  const allReviews = fileNames
    .filter((fileName) => fileName.endsWith(".mdx") || fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.(mdx|md)$/, "");
      const fullPath = path.join(reviewsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const { data, content } = matter(fileContents);
      const frontmatter = data as ReviewFrontmatter;

      return {
        ...frontmatter,
        slug: frontmatter.slug || slug,
        content,
        readingTime: calculateReadingTime(content),
      };
    });

  // Sort reviews by date descending
  return allReviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getReviewBySlug(slug: string): ReviewPost | null {
  try {
    const mdxPath = path.join(reviewsDirectory, `${slug}.mdx`);
    const mdPath = path.join(reviewsDirectory, `${slug}.md`);

    const fullPath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null;
    if (!fullPath) return null;

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const frontmatter = data as ReviewFrontmatter;

    return {
      ...frontmatter,
      slug: frontmatter.slug || slug,
      content,
      readingTime: calculateReadingTime(content),
    };
  } catch (e) {
    console.error(`Error reading review ${slug}:`, e);
    return null;
  }
}

export function getReviewsByCategory(categorySlug: string): ReviewPost[] {
  const allReviews = getAllReviews();
  return allReviews.filter((review) => {
    const slug = review.category.toLowerCase().replace(/\s+/g, "-");
    return slug === categorySlug.toLowerCase();
  });
}

export function getFeaturedReviews(): { hero: ReviewPost | null; trending: ReviewPost[]; latest: ReviewPost[] } {
  const allReviews = getAllReviews();
  const hero = allReviews.find((r) => r.featured) || allReviews[0] || null;
  const trending = allReviews.filter((r) => r.trending && r.slug !== hero?.slug);
  const latest = allReviews.slice(0, 6);

  return { hero, trending, latest };
}

export function getRelatedReviews(currentSlug: string, category: string, limit = 3): ReviewPost[] {
  const allReviews = getAllReviews();
  return allReviews
    .filter((r) => r.slug !== currentSlug && r.category.toLowerCase() === category.toLowerCase())
    .slice(0, limit);
}

export function getAllCategories(): CategoryInfo[] {
  const allReviews = getAllReviews();
  const categoryMap = new Map<string, { count: number; name: string }>();

  // Pre-define standard categories for rich navigation
  const standardCategories: Record<string, { name: string; description: string }> = {
    bollywood: {
      name: "Bollywood",
      description: "In-depth reviews, box office tracking, and verdicts on the latest Hindi cinema releases.",
    },
    hollywood: {
      name: "Hollywood",
      description: "Critical analysis of global blockbusters, Academy Award contenders, and indie masterpieces.",
    },
    "web-series": {
      name: "Web Series",
      description: "Episodic breakdowns and comprehensive season reviews across Netflix, Prime Video, Hotstar & more.",
    },
    "south-cinema": {
      name: "South Cinema",
      description: "Coverage of groundbreaking Telugu, Tamil, Malayalam, and Kannada films making pan-India waves.",
    },
  };

  allReviews.forEach((review) => {
    const slug = review.category.toLowerCase().replace(/\s+/g, "-");
    const existing = categoryMap.get(slug);
    if (existing) {
      existing.count += 1;
    } else {
      categoryMap.set(slug, { count: 1, name: review.category });
    }
  });

  return Object.entries(standardCategories).map(([slug, meta]) => {
    const match = categoryMap.get(slug);
    return {
      slug,
      name: meta.name,
      description: meta.description,
      count: match ? match.count : 0,
    };
  });
}
