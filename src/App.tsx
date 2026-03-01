import "./index.css";
import { Routes, Route } from "react-router-dom";
import { HeroPortfolio } from "./components/HeroPortfolio";
import { ProjectsPage } from "./pages/ProjectsPage";
import { ContactPage } from "./pages/ContactPage";
import { AboutPage } from "./pages/AboutPage";
import { ResumePage } from "./pages/ResumePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HeroPortfolio />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/resume" element={<ResumePage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  );
}

export default App;
