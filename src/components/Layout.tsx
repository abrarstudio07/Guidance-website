import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Sidebar } from "./Sidebar";
import { useTheme } from "@/hooks/useTheme";

export function Layout() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col">
      <Header theme={theme} onToggleTheme={toggleTheme} />

      <div className="max-w-[1200px] w-full mx-auto px-6 md:px-10 flex gap-10 py-10 flex-1">
        <Sidebar />
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}
