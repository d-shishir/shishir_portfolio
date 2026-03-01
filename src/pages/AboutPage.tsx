import "../hero.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { SharedHeader } from "../components/SharedHeader";

const skills = [
  { category: "Languages", items: ["JavaScript", "TypeScript", "Python"] },
  { category: "Frontend", items: ["React", "React Native", "Expo"] },
  { category: "Backend", items: ["Django", "FastAPI", "RESTful APIs"] },
  { category: "State & Data", items: ["Redux", "Context API", "SQL", "NoSQL"] },
  { category: "Tools", items: ["Git", "CI/CD", "Linux", "macOS", "Windows"] },
  { category: "Practices", items: ["Agile", "Remote Work", "Technical Support", "Debugging"] },
];

const timeline = [
  {
    year: "May 2025 – Present",
    role: "Freelance Software Engineer",
    place: "Remote",
    desc: "Designing, developing, and publishing cross-platform mobile and web applications using React Native, React, Django, and FastAPI. Architecting backend APIs, integrating them with frontend interfaces, and optimising application performance across platforms.",
  },
  {
    year: "Apr 2023 – May 2025",
    role: "Jr. Software Engineer (Part Time)",
    place: "GivingbackAI · Remote, United States",
    desc: "Focused on software design and development while handling technical customer support — bridging engineering and user experience. Investigated user-reported issues, escalated complex bugs with detailed reproduction steps, and assisted in testing releases.",
  },
  {
    year: "2020 – 2023",
    role: "Freelance · Social Media & Digital Marketing",
    place: "Remote",
    desc: "Managed social media accounts, executed digital marketing strategies, created content, and optimised client presence through targeted campaigns and SEO.",
  },
  {
    year: "2020 – 2025",
    role: "Bachelor of Computer Applications (BCA)",
    place: "Ratna Rajyalaxmi Campus, Tribhuvan University · Kathmandu",
    desc: "GPA 3.5/4.0 — top 10% of class. Covered software engineering, algorithms, databases, and mobile/web development.",
  },
  {
    year: "Graduated 2020",
    role: "High School",
    place: "Trinity International College · Kathmandu",
    desc: "GPA 3.41. Foundation in Science and Computer Science.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: 0.1 + i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      <div className="projects-bg" />

      <SharedHeader />

      <main className="about-main">
        <div className="about-hero">
          <motion.div
            className="about-hero-text"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="about-title-row">
              <h1 className="about-title">
                <span className="about-title-line">About</span>
                <span className="about-title-line italic">Me</span>
              </h1>
              <motion.div
                className="about-portrait-small"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <img src="/oldhero-1.png" alt="Shishir Lamichhane" className="about-portrait-img" />
              </motion.div>
            </div>
            <div className="about-portrait-caption-new">Shishir Lamichhane · Kathmandu, Nepal</div>
            <div className="about-bio">
              <p>
                I'm <strong>Shishir Lamichhane</strong> a software engineer based in Kathmandu, Nepal,
                with a passion for building high-quality, scalable digital products across mobile and web.
              </p>
              <p>
                I specialize in full-stack and mobile application development building responsive UIs with
                <strong> React and React Native</strong> and designing robust backend architectures using
                <strong> Django and FastAPI</strong>. I'm driven by the challenge of bridging engineering
                and user experience to ship software that actually works.
              </p>
              <p>
                Previously a Jr. Software Engineer at{" "}
                <strong>GivingbackAI</strong> (US, remote), where I handled both software development and
                technical customer support. Currently freelancing building cross-platform apps and
                architecting backend systems for clients.
              </p>
              <p>
                I hold a <strong>BCA from Tribhuvan University</strong> (GPA 3.5/4.0, top 10% of class).
                Outside of code, I'm into software architecture, blockchain technology, open source, and sports.
              </p>
            </div>

            <div className="about-quick-links">
              <a href="mailto:dshishir13@gmail.com" className="about-link-pill">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,12 2,6"/></svg>
                dshishir13@gmail.com
              </a>
              <a href="https://www.linkedin.com/in/dshishir13" target="_blank" rel="noreferrer" className="about-link-pill">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M22.23 0H1.77C.794 0 0 .793 0 1.77v20.46c0 .977.794 1.77 1.77 1.77h20.46c.977 0 1.77-.793 1.77-1.77V1.77C24 .793 23.206 0 22.23 0zm-6.963 20.52h-3.515v-5.503c0-1.312-.022-2.998-1.828-2.998-1.828 0-2.108 1.426-2.108 2.894v5.607h-3.516V9.497h3.375v1.633h.048c.467-.885 1.597-1.67 3.29-1.67 3.515 0 4.16 2.314 4.16 5.338v5.722zm-9.207 0h-3.515v-11.02h3.515v11.02zm-1.757-12.68c-1.13 0-1.828-.821-1.828-1.847 0-1.013.688-1.847 1.828-1.847 1.14 0 1.828.834 1.828 1.847 0 1.026-.688 1.847-1.828 1.847z"/></svg>
                LinkedIn
              </a>
              <a href="https://github.com/d-shishir" target="_blank" rel="noreferrer" className="about-link-pill">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M12 .297c-6.627 0-12 5.373-12 12 0 5.302 3.438 9.8 8.205 11.385.6.112.82-.259.82-.577 0-.286-.01-1.042-.015-2.048-3.338.726-4.04-1.607-4.04-1.607-.546-1.388-1.334-1.758-1.334-1.758-1.09-.746.083-.73.083-.73 1.207.085 1.841 1.238 1.841 1.238 1.07 1.834 2.809 1.304 3.495.998.106-.773.418-1.303.763-1.604-2.664-.303-5.467-1.332-5.467-5.921 0-1.306.467-2.376 1.235-3.216-.124-.303-.535-1.527.116-3.175 0 0 1.008-.322 3.301 1.235a11.485 11.485 0 0 1 3.003-.404c1.02.004 2.04.139 3.003.404 2.293-1.557 3.301-1.235 3.301-1.235.651 1.648.24 2.872.116 3.175.768.84 1.235 1.91 1.235 3.216 0 4.601-2.805 5.617-5.471 5.921.432.373.817 1.103.817 2.224 0 1.605-.014 2.899-.014 3.286 0 .318.219.689.825.577C20.563 22.1 24 17.6 24 12c0-6.627-5.373-12-12-12z"/></svg>
                GitHub
              </a>
              <a href="https://x.com/shishirai_" target="_blank" rel="noreferrer" className="about-link-pill">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                X / Twitter
              </a>
            </div>
          </motion.div>
        </div>

        {/* Skills */}
        <motion.section className="about-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}>
          <h2 className="about-section-title">Skills & Technologies</h2>
          <div className="skills-grid">
            {skills.map((group, i) => (
              <motion.div key={group.category} className="skill-group" custom={i} variants={fadeUp} initial="hidden" animate="visible">
                <h3 className="skill-group-title">{group.category}</h3>
                <div className="skill-tags">
                  {group.items.map((item) => (
                    <span key={item} className="skill-tag">{item}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Timeline */}
        <motion.section className="about-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
          <h2 className="about-section-title">Experience & Education</h2>
          <div className="timeline">
            {timeline.map((entry, i) => (
              <motion.div key={i} className="timeline-entry" custom={i} variants={fadeUp} initial="hidden" animate="visible">
                <div className="timeline-year">{entry.year}</div>
                <div className="timeline-content">
                  <div className="timeline-role">{entry.role}</div>
                  <div className="timeline-place">{entry.place}</div>
                  <p className="timeline-desc">{entry.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Languages */}
        <motion.section className="about-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }}>
          <h2 className="about-section-title">Languages</h2>
          <div className="language-list">
            {[["Nepali", "Native"], ["English", "Advanced"], ["Hindi", "Intermediate"]].map(([lang, level]) => (
              <div key={lang} className="language-item">
                <span className="language-name">{lang}</span>
                <span className="language-level">{level}</span>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.div className="about-cta" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
          <button className="about-cta-btn" onClick={() => navigate("/resume")} id="about-view-resume">View Full Résumé →</button>
          <button className="about-cta-btn about-cta-btn--outline" onClick={() => navigate("/contact")} id="about-get-in-touch">Get in Touch →</button>
        </motion.div>
      </main>
    </div>
  );
}
