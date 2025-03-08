"use client";
import { Meteors } from "@/components/ui/meteors";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Circle } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  link?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Vedastra: Astrology Communication Mobile App",
    description:
      "A mobile application built with React Native for astrology communication. It allows users to get astrology readings, communicate with astrologers, and track their daily horoscope.",
    techStack: ["ReactNative", "NodeJS", "MongoDB"],
    link: "https://github.com/d-shishir/Vedastra",
  },
  {
    id: 2,
    title: "Stock Portfolio Management System",
    description:
      "A PHP-based system for managing stock portfolios, allowing users to track their investments, analyze trends, and manage assets efficiently.",
    techStack: ["PHP", "MySQL", "HTML", "CSS"],
    link: "https://github.com/dshishir13/Stock-Portfolio-Management-System",
  },
  {
    id: 3,
    title: "Job Portal",
    description:
      "A job portal application built using React Native that allows users to browse job listings, apply for positions, and track their job search.",
    techStack: ["ReactNative", "JavaScript"],
    link: "https://github.com/dshishir13/React-Native-Job-Portal",
  },
];

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delay: 0.5 + i * 0.2,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
};

export function ProjectList() {
  return (
    <section
      id="projects"
      className="relative w-full overflow-hidden bg-[#030303]"
    >
      <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 mt-4 md:mb-8 tracking-tight text-center ">
        <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
          My Projects
        </span>
        <br />
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 p-6 backdrop-blur-xs">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            className="relative max-w-sm mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Background Glow Effect */}
            <div className="absolute inset-0 h-full w-full bg-transparent rounded-full " />

            {/* Project Card */}
            <motion.div
              className="relative shadow-sm bg-transparent backdrop-blur-[2px] border-2 border-white/[0.15] px-6 py-8 overflow-hidden rounded-2xl flex flex-col justify-between items-start"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
              {/* Icon (Project-related icon or placeholder) */}
              <div className="h-6 w-6 rounded-full border border-gray-500 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-3 w-3 text-gray-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
                  />
                </svg>
              </div>

              {/* Project Title */}
              <motion.h2
                className="font-bold text-xl text-white mb-3 relative z-50 title-clamp"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                {project.title}
              </motion.h2>

              {/* Project Description */}
              <motion.p
                className="font-normal text-base text-slate-300 mb-4 relative z-50 description-clamp"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                {project.description}
              </motion.p>

              {/* Tech Stack */}
              <div className="flex flex-wrap space-x-3 mb-4 text-sm text-gray-400">
                {project.techStack.map((tech, index) => (
                  <motion.div
                    key={index} // Added a key to improve performance and avoid React warnings
                    custom={0}
                    variants={fadeUpVariants}
                    initial="hidden"
                    animate="visible"
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-2 sm:mb-2"
                  >
                    <Circle className="h-2 w-2 fill-rose-500/80" />
                    <span className="text-sm text-white/60">{tech}</span>
                  </motion.div>
                ))}
              </div>

              {/* Explore Button */}
              {project.link && (
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  <Button
                    size="lg"
                    className="gap-4 border-gray-600 text-gray-300 hover:border-white hover:text-white"
                    variant="outline"
                  >
                    Explore
                  </Button>
                </motion.a>
              )}

              {/* Meteor Effect */}
              <Meteors number={15} />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
