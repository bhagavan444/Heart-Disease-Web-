import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { auth } from "../firebase";
import "./Navbar.css";

function Navbar({ handleLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar" role="navigation" aria-label="Primary Navigation">
      {/* ================= LOGO ================= */}
      <div className="navbar-logo">
        <Link to="/" onClick={closeMenu}>
          Heart AI
        </Link>
      </div>

      {/* ================= LINKS ================= */}
      <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <NavLink to="/" onClick={closeMenu}>
          Home
        </NavLink>

        <NavLink to="/about" onClick={closeMenu}>
          About
        </NavLink>

        <NavLink to="/plans" onClick={closeMenu}>
          plans
        </NavLink>

        <NavLink to="/contact" onClick={closeMenu}>
          Contact
        </NavLink>

        {/* Auth-only links */}
        {isAuthenticated && (
          <NavLink to="/predict" onClick={closeMenu}>
            Heart Analyzer
          </NavLink>
        )}

        {/* Auth Action */}
        {!isAuthenticated ? (
          <NavLink
            to="/login"
            className="navbar-btn"
            onClick={closeMenu}
          >
            Sign In
          </NavLink>
        ) : (
          <button
            type="button"
            className="navbar-btn"
            onClick={() => {
              handleLogout();
              closeMenu();
            }}
          >
            Sign Out
          </button>
        )}
      </div>

      {/* ================= MOBILE TOGGLE ================= */}
      <button
        className={`navbar-hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
}

export default Navbar;
