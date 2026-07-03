import { getAllGuides, getFeaturedGuides } from "@/data/guides";
import { GuideCard } from "@/components/GuideCard";

export function HomePage() {
  const allGuides = getAllGuides();
  const featuredGuides = getFeaturedGuides();
  const regularGuides = allGuides.filter((g) => !g.featured);

  return (
    <div>
      {/* Hero section */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-display font-bold dark:text-base-50 text-base-900 mb-2">
          Latest Guides
        </h1>
        <p className="dark:text-base-400 text-base-500 text-base md:text-lg">
          Step-by-step technical guides, published daily.
        </p>
      </div>

      {/* Empty state */}
      {allGuides.length === 0 && (
        <div className="dark:bg-base-900/60 bg-white dark:border-base-700/50 border-base-200 border dark:backdrop-blur-[16px] rounded-2xl p-12 text-center dark:shadow-glass shadow-sm">
          <div className="text-5xl mb-5">✍️</div>
          <h3 className="text-xl font-display font-semibold dark:text-base-100 text-base-900 mb-2">
            No guides published yet
          </h3>
          <p className="text-sm dark:text-base-400 text-base-500 max-w-md mx-auto">
            Guides are on the way. Check back soon!
          </p>
        </div>
      )}

      {/* Featured guides */}
      {featuredGuides.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-accent">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Featured
            </span>
            <div className="flex-1 h-px dark:bg-base-800 bg-base-200" />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {featuredGuides.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} featured />
            ))}
          </div>
        </div>
      )}

      {/* All guides */}
      <div className="pt-6">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-xs font-medium uppercase tracking-widest dark:text-base-400 text-base-500">
            All Guides
          </span>
          <div className="flex-1 h-px dark:bg-base-800 bg-base-200" />
          <span className="text-xs dark:text-base-500 text-base-400">
            {allGuides.length} guides
          </span>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {regularGuides.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
      </div>
    </div>
  );
}
