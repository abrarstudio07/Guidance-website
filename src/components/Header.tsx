import { Link, useLocation } from "react-router-dom";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { useState } from "react";

interface HeaderProps {
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

export function Header({ theme, onToggleTheme }: HeaderProps) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Latest" },
    { to: "/category/ai", label: "AI" },
    { to: "/category/design", label: "Design" },
    { to: "/category/development", label: "Development" },
    { to: "/category/tools", label: "Tools" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <header className="border-b dark:border-base-800/60 border-base-200 sticky top-0 z-40 dark:bg-base-950/80 bg-white/80 backdrop-blur-[16px]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 flex items-center justify-between h-[4.5rem]">
        <Link to="/" className="flex items-center">
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm dark:text-base-300 text-base-600">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`transition-colors duration-200 ${
                isActive(link.to)
                  ? "dark:text-base-50 text-base-900 font-medium"
                  : "dark:hover:text-base-50 hover:text-base-900"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl dark:bg-base-800 bg-base-100 dark:hover:bg-base-700 hover:bg-base-200 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-4.5 h-4.5 dark:text-base-300 text-base-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-4.5 h-4.5 dark:text-base-300 text-base-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t dark:border-base-800/60 border-base-200 dark:bg-base-950/95 bg-white/95 backdrop-blur-[16px]">
          <nav className="max-w-[1200px] mx-auto px-6 py-4 flex flex-col gap-3 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`py-2 transition-colors duration-200 ${
                  isActive(link.to)
                    ? "dark:text-base-50 text-base-900 font-medium"
                    : "dark:text-base-300 text-base-600 dark:hover:text-base-50 hover:text-base-900"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
