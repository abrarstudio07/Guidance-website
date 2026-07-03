import { useParams, Link, useNavigate } from "react-router-dom";
import { getGuideBySlug, getAllGuides } from "@/data/guides";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { useEffect } from "react";

const categoryLabels: Record<string, string> = {
  ai: "AI",
  design: "Design",
  development: "Development",
  tools: "Tools",
};

const difficultyConfig: Record<string, { label: string; color: string }> = {
  beginner: { label: "Beginner", color: "dark:bg-emerald-500/10 bg-emerald-50 dark:text-emerald-400 text-emerald-600" },
  intermediate: { label: "Intermediate", color: "dark:bg-amber-500/10 bg-amber-50 dark:text-amber-400 text-amber-600" },
  advanced: { label: "Advanced", color: "dark:bg-red-500/10 bg-red-50 dark:text-red-400 text-red-600" },
};

export function GuidePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const guide = slug ? getGuideBySlug(slug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!guide) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-display font-bold dark:text-base-50 text-base-900 mb-4">
          Guide not found
        </h1>
        <p className="dark:text-base-400 text-base-500 mb-6">
          The guide you're looking for doesn't exist or has been removed.
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

  const allGuides = getAllGuides();
  const currentIndex = allGuides.findIndex((g) => g.slug === guide.slug);
  const prevGuide = currentIndex < allGuides.length - 1 ? allGuides[currentIndex + 1] : null;
  const nextGuide = currentIndex > 0 ? allGuides[currentIndex - 1] : null;

  const formattedDate = new Date(guide.pubDate).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const diff = difficultyConfig[guide.difficulty];

  return (
    <article className="max-w-[720px]">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs dark:text-base-500 text-base-400 mb-6">
        <Link to="/" className="hover:text-accent transition-colors">Home</Link>
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
        <Link to={`/category/${guide.category}`} className="hover:text-accent transition-colors">
          {categoryLabels[guide.category] || guide.category}
        </Link>
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
        <span className="dark:text-base-300 text-base-600 truncate">{guide.title}</span>
      </div>

      {/* Meta */}
      <div className="flex items-center flex-wrap gap-3 mb-4 text-xs dark:text-base-400 text-base-500">
        <span className="uppercase tracking-wide text-accent font-medium">
          {categoryLabels[guide.category] || guide.category}
        </span>
        <span className="dark:text-base-600 text-base-300">·</span>
        <span className={`px-2 py-0.5 rounded-md text-[11px] font-medium ${diff.color}`}>
          {diff.label}
        </span>
        <span className="dark:text-base-600 text-base-300">·</span>
        <span>{guide.duration} min read</span>
        <span className="dark:text-base-600 text-base-300">·</span>
        <span>{formattedDate}</span>
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-display font-bold dark:text-base-50 text-base-900 mb-4 leading-tight">
        {guide.title}
      </h1>

      {/* Description */}
      <p className="text-lg dark:text-base-400 text-base-500 mb-8 leading-relaxed">
        {guide.description}
      </p>

      {/* Tags */}
      {guide.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10">
          {guide.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-lg dark:bg-base-800 bg-base-100 dark:text-base-400 text-base-500"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Divider */}
      <div className="h-px dark:bg-base-800 bg-base-200 mb-10" />

      {/* Content */}
      <MarkdownRenderer content={guide.content} />

      {/* Navigation */}
      <div className="mt-16 pt-8 border-t dark:border-base-800 border-base-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {prevGuide && (
            <button
              onClick={() => navigate(`/guides/${prevGuide.slug}`)}
              className="group text-left dark:bg-base-900/60 bg-white dark:border-base-700/50 border-base-200 border rounded-2xl p-5 hover:shadow-glow-accent transition-all duration-300"
            >
              <span className="text-xs dark:text-base-500 text-base-400 flex items-center gap-1 mb-2">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                Previous guide
              </span>
              <span className="text-sm font-display font-medium dark:text-base-200 text-base-800 group-hover:text-accent transition-colors">
                {prevGuide.title}
              </span>
            </button>
          )}
          {nextGuide && (
            <button
              onClick={() => navigate(`/guides/${nextGuide.slug}`)}
              className={`group text-right dark:bg-base-900/60 bg-white dark:border-base-700/50 border-base-200 border rounded-2xl p-5 hover:shadow-glow-accent transition-all duration-300 ${
                !prevGuide ? "md:col-start-2" : ""
              }`}
            >
              <span className="text-xs dark:text-base-500 text-base-400 flex items-center justify-end gap-1 mb-2">
                Next guide
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </span>
              <span className="text-sm font-display font-medium dark:text-base-200 text-base-800 group-hover:text-accent transition-colors">
                {nextGuide.title}
              </span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
