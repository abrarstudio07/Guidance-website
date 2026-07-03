import { HashRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { HomePage } from "@/pages/HomePage";
import { GuidePage } from "@/pages/GuidePage";
import { CategoryPage } from "@/pages/CategoryPage";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/guides/:slug" element={<GuidePage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
