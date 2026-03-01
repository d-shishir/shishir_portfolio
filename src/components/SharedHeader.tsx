import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

export function SharedHeader() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="projects-header">
        <button className="back-btn" onClick={() => navigate("/")} id="back-to-home">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M5 12l7-7M5 12l7 7" />
          </svg>
          <span className="desktop-only text">Home</span>
        </button>

        <div className="header-name">
          <span className="header-name-first">Shishir</span>
          <span className="header-name-last desktop-only">Lamichhane</span>
        </div>

        {/* Desktop Nav */}
        <nav className="header-nav desktop-nav">
          <button className="header-nav-link-btn" onClick={() => navigate("/about")}>About</button>
          <button className="header-nav-link-btn" onClick={() => navigate("/resume")}>Résumé</button>
          <button className="header-nav-link-btn" onClick={() => navigate("/projects")}>Projects</button>
          <button className="header-nav-link-btn" onClick={() => navigate("/contact")}>Contact</button>
        </nav>

        {/* Mobile Nav Toggle */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Dropdown */}
      <div className={`mobile-nav-dropdown ${menuOpen ? 'open' : ''}`}>
        <button className="mobile-nav-link" onClick={() => navigate("/about")}>About</button>
        <button className="mobile-nav-link" onClick={() => navigate("/resume")}>Résumé</button>
        <button className="mobile-nav-link" onClick={() => navigate("/projects")}>Projects</button>
        <button className="mobile-nav-link" onClick={() => navigate("/contact")}>Contact</button>
      </div>
    </>
  );
}
