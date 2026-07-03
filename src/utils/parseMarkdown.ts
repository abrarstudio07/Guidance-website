import type { Guide, Category, Difficulty } from "@/types/guide";

interface FrontMatter {
  title: string;
  description: string;
  pubDate: string;
  category: Category;
  tags: string[];
  difficulty: Difficulty;
  duration: number;
  featured?: boolean;
  draft?: boolean;
  updatedDate?: string;
  coverImage?: string;
}

export function parseMarkdownFile(
  filename: string,
  rawContent: string
): Guide | null {
  // Extract frontmatter
  const frontmatterMatch = rawContent.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  
  if (!frontmatterMatch) {
    console.warn(`No frontmatter found in ${filename}`);
    return null;
  }

  const [, frontmatterStr, content] = frontmatterMatch;
  
  // Parse YAML frontmatter (simple parser)
  const frontmatter = parseYamlFrontmatter(frontmatterStr);
  
  if (!frontmatter.title || !frontmatter.category) {
    console.warn(`Missing required fields in ${filename}`);
    return null;
  }

  // Generate slug from filename
  // Expected format: 2026-07-03-guide-title.md
  const slug = filename
    .replace(/\.md$/, "")
    .replace(/^\d{4}-\d{2}-\d{2}-/, ""); // Remove date prefix

  return {
    slug,
    title: frontmatter.title,
    description: frontmatter.description || "",
    pubDate: formatDate(frontmatter.pubDate),
    updatedDate: frontmatter.updatedDate ? formatDate(frontmatter.updatedDate) : undefined,
    category: frontmatter.category as Category,
    tags: frontmatter.tags || [],
    difficulty: (frontmatter.difficulty as Difficulty) || "beginner",
    duration: Number(frontmatter.duration) || 5,
    coverImage: frontmatter.coverImage,
    draft: frontmatter.draft === true,
    featured: frontmatter.featured === true,
    content: content.trim(),
  };
}

function parseYamlFrontmatter(yaml: string): FrontMatter {
  const result: Record<string, unknown> = {};
  const lines = yaml.split("\n");
  let currentKey = "";
  let inArray = false;
  let arrayItems: string[] = [];

  for (const line of lines) {
    // Check for array item
    if (line.match(/^\s+-\s+/)) {
      const value = line.replace(/^\s+-\s+/, "").trim();
      arrayItems.push(value);
      continue;
    }

    // If we were collecting array items, save them
    if (inArray && arrayItems.length > 0) {
      result[currentKey] = arrayItems;
      arrayItems = [];
      inArray = false;
    }

    // Check for key: value
    const match = line.match(/^(\w+):\s*(.*)$/);
    if (match) {
      const [, key, value] = match;
      currentKey = key;
      
      if (value === "" || value === undefined) {
        // This might be an array
        inArray = true;
      } else {
        // Clean up the value
        let cleanValue: string | boolean | number = value.trim();
        
        // Remove quotes
        if ((cleanValue.startsWith('"') && cleanValue.endsWith('"')) ||
            (cleanValue.startsWith("'") && cleanValue.endsWith("'"))) {
          cleanValue = cleanValue.slice(1, -1);
        }
        
        // Parse booleans
        if (cleanValue === "true") cleanValue = true as unknown as string;
        if (cleanValue === "false") cleanValue = false as unknown as string;
        
        // Parse numbers (but not dates)
        if (/^\d+$/.test(cleanValue as string)) {
          cleanValue = parseInt(cleanValue as string, 10);
        }
        
        result[key] = cleanValue;
      }
    }
  }

  // Handle trailing array
  if (inArray && arrayItems.length > 0) {
    result[currentKey] = arrayItems;
  }

  return result as unknown as FrontMatter;
}

function formatDate(date: string | number | Date): string {
  if (typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return date;
  }
  const d = new Date(date);
  return d.toISOString().split("T")[0];
}
