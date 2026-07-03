import { useParams, Link } from "react-router-dom";
import { getGuidesByCategory, categories } from "@/data/guides";
import { GuideCard } from "@/components/GuideCard";
import { useEffect } from "react";

const categoryDescriptions: Record<string, string> = {
  ai: "Guides on AI tools, workflows, prompting techniques, and integrating AI into your creative process.",
  design: "Visual design principles, layout systems, typography, color theory, and UI/UX best practices.",
  development: "Frontend and backend development guides, coding patterns, frameworks, and technical deep dives.",
  tools: "Reviews, tutorials, and workflow tips for the tools that power modern design and development.",
};

export function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const guides = category ? getGuidesByCategory(category) : [];
  const categoryInfo = categories.find((c) => c.slug === category);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category]);

  if (!categoryInfo) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-display font-bold dark:text-base-50 text-base-900 mb-4">
          Category not found
        </h1>
        <p className="dark:text-base-400 text-base-500 mb-6">
          The category you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="bg-accent hover:bg-accent-hover text-white font-medium px-5 py-2.5 rounded-xl transition-colors duration-200 inline-block"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs dark:text-base-500 text-base-400 mb-6">
        <Link to="/" className="hover:text-accent transition-colors">Home</Link>
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
        <span className="dark:text-base-300 text-base-600">{categoryInfo.label}</span>
      </div>

      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-display font-bold dark:text-base-50 text-base-900 mb-2">
          {categoryInfo.label}
        </h1>
        <p className="dark:text-base-400 text-base-500 text-base md:text-lg">
          {categoryDescriptions[category || ""] || "Guides and tutorials for this category."}
        </p>
        <div className="flex items-center gap-2 mt-4">
          <span className="text-xs px-3 py-1 rounded-lg bg-accent/10 text-accent font-medium">
            {guides.length} {guides.length === 1 ? "guide" : "guides"}
          </span>
        </div>
      </div>

      {guides.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {guides.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
      ) : (
        <div className="dark:bg-base-900/60 bg-white dark:border-base-700/50 border-base-200 border rounded-2xl p-10 text-center">
          <div className="text-4xl mb-4">📝</div>
          <h3 className="text-lg font-display font-semibold dark:text-base-200 text-base-800 mb-2">
            No guides yet
          </h3>
          <p className="text-sm dark:text-base-400 text-base-500">
            Guides for this category are coming soon. Check back later!
          </p>
        </div>
      )}
    </div>
  );
}
