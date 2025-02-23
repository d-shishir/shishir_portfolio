"use client";

import React from "react";
import { Meteors } from "@/components/ui/meteors";
import { motion } from "framer-motion";

interface Project {
  id: number;
  title: string;
  description: string;
  link?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Meteor Effect Showcase",
    description: "A cool demo of animated meteors using Tailwind and React.",
    link: "#",
  },
  {
    id: 2,
    title: "Portfolio Website",
    description: "My personal portfolio showcasing my best projects.",
    link: "#",
  },
  {
    id: 3,
    title: "AI Chatbot UI",
    description:
      "An interactive chatbot interface built with React & Tailwind.",
    link: "#",
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
      className="relative min-h-screen w-full  overflow-hidden bg-[#030303]"
    >
      <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-8 tracking-tight text-center ">
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
            <div className="absolute inset-0 h-full w-full bg-transparent  rounded-full " />

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
                className="font-bold text-xl text-white mb-3 relative z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                {project.title}
              </motion.h2>

              {/* Project Description */}
              <motion.p
                className="font-normal text-base text-slate-300 mb-4 relative z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                {project.description}
              </motion.p>

              {/* Explore Button */}
              {project.link && (
                <motion.a
                  href={project.link}
                  className="border px-4 py-1 rounded-lg border-gray-500 text-gray-300 hover:bg-[#4B86FF] hover:text-white transition"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  Explore
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
