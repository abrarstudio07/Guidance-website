import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t dark:border-base-800/60 border-base-200 mt-20">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="opacity-70">
          <Logo className="h-6" />
        </div>
        <p className="text-xs dark:text-base-500 text-base-400">
          Built and maintained by Abrar Ahmed. Updated daily via Git.
        </p>
      </div>
    </footer>
  );
}
