import type { Guide } from "@/types/guide";
import { parseMarkdownFile } from "@/utils/parseMarkdown";

// Import all markdown files from the content/guides directory
// This uses Vite's glob import feature - files are loaded at build time
const guideFiles = import.meta.glob("../content/guides/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

// Parse all guide files
function loadGuides(): Guide[] {
  const guides: Guide[] = [];

  for (const [path, content] of Object.entries(guideFiles)) {
    // Extract filename from path
    const filename = path.split("/").pop() || "";
    
    // Skip template file
    if (filename.startsWith("_")) continue;

    const guide = parseMarkdownFile(filename, content);
    if (guide && !guide.draft) {
      guides.push(guide);
    }
  }

  // Sort by date (newest first)
  return guides.sort(
    (a, b) => new Date(b.pubDate).valueOf() - new Date(a.pubDate).valueOf()
  );
}

// Export the loaded guides
export const guides = loadGuides();

// Helper functions
export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getGuidesByCategory(category: string): Guide[] {
  return guides
    .filter((g) => g.category === category)
    .sort((a, b) => new Date(b.pubDate).valueOf() - new Date(a.pubDate).valueOf());
}

export function getFeaturedGuides(): Guide[] {
  return guides
    .filter((g) => g.featured)
    .sort((a, b) => new Date(b.pubDate).valueOf() - new Date(a.pubDate).valueOf());
}

export function getAllGuides(): Guide[] {
  return guides;
}

// Category metadata with dynamic counts
export const categories = [
  { slug: "ai", label: "AI" },
  { slug: "design", label: "Design" },
  { slug: "development", label: "Development" },
  { slug: "tools", label: "Tools" },
].map((cat) => ({
  ...cat,
  count: guides.filter((g) => g.category === cat.slug).length,
}));
