export interface ReviewFrontmatter {
  title: string;
  slug: string;
  date: string;
  rating: number; // e.g. 4.5
  category: "Bollywood" | "Hollywood" | "Web Series" | "South Cinema" | "Anime";
  director: string;
  cast: string[];
  releaseDate: string;
  runtime: string;
  genre: string[];
  verdict: "Must Watch" | "Blockbuster" | "Masterpiece" | "One-Time Watch" | "Average" | "Skip";
  platform: string; // e.g. "Theatres", "Netflix", "Prime Video", "Hotstar"
  pros: string[];
  cons: string[];
  image: string; // poster / banner
  backdrop?: string;
  description: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  boxOfficeOrBudget?: string;
  scoreBreakdown?: {
    story: number; // out of 10
    acting: number;
    direction: number;
    musicVfx: number;
  };
  featured?: boolean;
  trending?: boolean;
}

export interface ReviewPost extends ReviewFrontmatter {
  content: string;
  readingTime: string;
}

export interface CategoryInfo {
  name: string;
  slug: string;
  description: string;
  count: number;
}
