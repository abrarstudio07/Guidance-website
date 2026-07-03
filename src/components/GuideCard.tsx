import { Link } from "react-router-dom";
import type { Guide } from "@/types/guide";

interface GuideCardProps {
  guide: Guide;
  featured?: boolean;
}

const categoryColors: Record<string, string> = {
  ai: "text-violet-400",
  design: "text-blue-400",
  development: "text-emerald-400",
  tools: "text-amber-400",
};

const difficultyConfig: Record<string, { label: string; color: string }> = {
  beginner: { label: "Beginner", color: "dark:bg-emerald-500/10 bg-emerald-50 dark:text-emerald-400 text-emerald-600" },
  intermediate: { label: "Intermediate", color: "dark:bg-amber-500/10 bg-amber-50 dark:text-amber-400 text-amber-600" },
  advanced: { label: "Advanced", color: "dark:bg-red-500/10 bg-red-50 dark:text-red-400 text-red-600" },
};

export function GuideCard({ guide, featured }: GuideCardProps) {
  const catColor = categoryColors[guide.category] || "text-accent";
  const diff = difficultyConfig[guide.difficulty];

  const formattedDate = new Date(guide.pubDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link
      to={`/guides/${guide.slug}`}
      className={`group block dark:bg-base-900/60 bg-white dark:backdrop-blur-[16px] dark:border-base-700/50 border-base-200 border dark:shadow-glass-sm shadow-sm rounded-2xl p-6 hover:shadow-glow-accent transition-all duration-300 ${
        featured ? "md:col-span-2 md:p-8" : ""
      }`}
    >
      {featured && (
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-accent/10 text-accent text-xs font-medium mb-4">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          Featured
        </div>
      )}

      <div className="flex items-center gap-3 mb-3 text-xs dark:text-base-400 text-base-500">
        <span className={`uppercase tracking-wide font-medium ${catColor}`}>
          {guide.category.replace("-", " ")}
        </span>
        <span className="dark:text-base-600 text-base-300">·</span>
        <span className={`px-2 py-0.5 rounded-md text-[11px] font-medium ${diff.color}`}>
          {diff.label}
        </span>
        <span className="dark:text-base-600 text-base-300">·</span>
        <span>{guide.duration} min</span>
      </div>

      <h2
        className={`font-display font-semibold mb-2 dark:text-base-50 text-base-900 group-hover:text-accent transition-colors duration-200 ${
          featured ? "text-2xl md:text-3xl" : "text-xl"
        }`}
      >
        {guide.title}
      </h2>

      <p className={`text-sm dark:text-base-400 text-base-500 line-clamp-2 ${featured ? "md:text-base md:line-clamp-3" : ""}`}>
        {guide.description}
      </p>

      <div className="flex items-center gap-4 mt-4 pt-4 border-t dark:border-base-700/30 border-base-100">
        <span className="text-xs dark:text-base-500 text-base-400">{formattedDate}</span>
        {guide.tags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            {guide.tags.slice(0, featured ? 4 : 2).map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-2 py-0.5 rounded-md dark:bg-base-800 bg-base-100 dark:text-base-400 text-base-500"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
