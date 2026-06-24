import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import "./Navbar.css";

const navLinks = [
  { path: "/", label: "Tasks" },
  { path: "/todo-app", label: "Todos" },
  { path: "/recipe-app", label: "Recipes" },
];

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <span className="navbar-logo">⚡</span>
          <span className="navbar-title">Incture</span>
        </Link>

        <button
          className="navbar-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>

        <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`navbar-link ${location.pathname === link.path ? "active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};
