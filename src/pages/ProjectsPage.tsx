import { useState } from "react";
import "../hero.css";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Circle } from "lucide-react";
import { SharedHeader } from "../components/SharedHeader";

interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  link: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Baghchal Royale",
    description:
      "Full-stack digital adaptation of Baghchal — a traditional Nepali board game. Features a Double Q-Learning AI opponent with 15+ dimensional state representation, multiple difficulty levels, and real-time gameplay. React Native frontend with a FastAPI + PostgreSQL backend.",
    techStack: ["React Native", "FastAPI", "PostgreSQL", "Python", "Expo"],
    link: "https://github.com/d-shishir/Baghchal-Royale",
  },
  {
    id: 2,
    title: "InsightStack",
    description:
      "A modern productivity and analytics web application built with React and Vite. Focuses on clean data visualisation and an intuitive user experience.",
    techStack: ["React", "TypeScript", "Vite"],
    link: "https://github.com/d-shishir/InsightStack",
  },
  {
    id: 3,
    title: "Finance Sathi",
    description:
      "Personal finance management app to track expenses, income, and savings goals. Designed to give users a clear picture of their financial health at a glance.",
    techStack: ["React Native", "JavaScript", "Expo"],
    link: "https://github.com/d-shishir/Finanace-Sathi",
  },
  {
    id: 4,
    title: "Kanban Board",
    description:
      "A production-quality Kanban board with drag-and-drop task management, priority tagging, due dates, search & filtering, and local data persistence.",
    techStack: ["React", "TypeScript", "Vite"],
    link: "https://github.com/d-shishir/Kanban-Board",
  },
  {
    id: 5,
    title: "Money Mentor",
    description:
      "A financial guidance and budgeting companion app helping users set budgets, monitor spending habits, and reach their savings targets.",
    techStack: ["React Native", "JavaScript"],
    link: "https://github.com/d-shishir/MoneyMentor",
  },
  {
    id: 6,
    title: "ShadeScape",
    description:
      "A creative colour and theme exploration tool for designers and developers to generate, preview, and export beautiful colour palettes.",
    techStack: ["React", "TypeScript"],
    link: "https://github.com/d-shishir/ShadeScape",
  },
];

export function ProjectsPage() {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div className="projects-page">
      <div className="projects-bg" />

      <SharedHeader />

      <main className="projects-main">
        <motion.div
          className="projects-title-block"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
        >
          <h1 className="projects-title">
            <span className="projects-title-line">Selected</span>
            <span className="projects-title-line italic">Work</span>
          </h1>
          <p className="projects-subtitle">
            A collection of things I've built — mobile apps, web tools, AI systems, and experiments.
          </p>
        </motion.div>

        <div className="projects-grid">
          <AnimatePresence>
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                className={`project-card ${hoveredId === project.id ? "project-card--hovered" : ""}`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease: "easeOut" }}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="project-card-inner">
                  <div className="project-card-top">
                    <span className="project-num">0{project.id}</span>
                    <div className="project-tech-mini">
                      {project.techStack.slice(0, 2).map((t) => (
                        <span key={t} className="project-tech-tag">{t}</span>
                      ))}
                    </div>
                  </div>

                  <h2 className="project-card-title">{project.title}</h2>
                  <p className="project-card-desc">{project.description}</p>

                  <div className="project-card-footer">
                    <div className="project-stack">
                      {project.techStack.map((tech) => (
                        <div key={tech} className="project-stack-item">
                          <Circle className="stack-dot" />
                          <span>{tech}</span>
                        </div>
                      ))}
                    </div>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-explore-btn"
                      id={`explore-project-${project.id}`}
                    >
                      <span>View</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    </a>
                  </div>
                </div>
                <div className="project-card-glow" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>

      <motion.footer
        className="projects-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <span>Want to work together?</span>
        <button className="footer-contact-btn" onClick={() => navigate("/contact")} id="footer-contact">
          Get in touch →
        </button>
      </motion.footer>
    </div>
  );
}
