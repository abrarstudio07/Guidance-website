export type Category =
  | "ai"
  | "design"
  | "development"
  | "tools";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface Guide {
  slug: string;
  title: string;
  description: string;
  pubDate: string;
  updatedDate?: string;
  category: Category;
  tags: string[];
  difficulty: Difficulty;
  duration: number;
  coverImage?: string;
  draft: boolean;
  featured: boolean;
  content: string;
}
