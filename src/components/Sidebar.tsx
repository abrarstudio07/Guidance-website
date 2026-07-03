import { Link, useLocation } from "react-router-dom";
import { categories } from "@/data/guides";

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="hidden lg:block w-56 shrink-0">
      <div className="dark:bg-base-900/60 bg-white/80 backdrop-blur-[16px] dark:border-base-700/50 border-base-200 border dark:shadow-glass shadow-sm rounded-2xl p-5 sticky top-24">
        <p className="text-xs uppercase tracking-widest dark:text-base-400 text-base-500 mb-4 font-medium">
          Categories
        </p>
        <ul className="space-y-1">
          {categories.map((cat) => {
            const isActive = location.pathname === `/category/${cat.slug}`;
            return (
              <li key={cat.slug}>
                <Link
                  to={`/category/${cat.slug}`}
                  className={`flex items-center justify-between py-2 px-3 rounded-xl text-sm transition-all duration-200 ${
                    isActive
                      ? "dark:bg-accent-muted bg-accent/10 text-accent font-medium"
                      : "dark:text-base-300 text-base-600 dark:hover:text-accent hover:text-accent dark:hover:bg-base-800/50 hover:bg-base-100"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-xs ${isActive ? "text-accent/70" : "dark:text-base-500 text-base-400"}`}>
                    {cat.count}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 pt-5 border-t dark:border-base-700/50 border-base-200">
          <p className="text-xs uppercase tracking-widest dark:text-base-400 text-base-500 mb-3 font-medium">
            Difficulty
          </p>
          <div className="flex flex-wrap gap-2">
            {["beginner", "intermediate", "advanced"].map((diff) => (
              <span
                key={diff}
                className="text-xs px-2.5 py-1 rounded-lg dark:bg-base-800 bg-base-100 dark:text-base-400 text-base-500 capitalize"
              >
                {diff}
              </span>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
