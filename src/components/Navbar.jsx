import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import "./Navbar.css";

function Navbar({ handleLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  /* ================= AUTH STATE ================= */
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  /* ================= CLOSE PROFILE ON OUTSIDE CLICK ================= */
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isLoggedIn = Boolean(user);
  const closeMenu = () => setMenuOpen(false);

  const getInitials = () =>
    user?.email ? user.email.charAt(0).toUpperCase() : "U";

  /* ================= ADMIN CHECK ================= */
  const isAdmin =
    user?.email === "g.sivasatyasaibhagavan@gmail.com";

  return (
    <nav className="navbar">
      {/* ================= BRAND ================= */}
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          Cardiac<span>-AI</span>
        </Link>
      </div>

      {/* ================= LINKS ================= */}
      <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <NavLink to="/" onClick={closeMenu}>Cardiac-AI Core</NavLink>
        <NavLink to="/about" onClick={closeMenu}>Cardiac-Intelligence</NavLink>
        <NavLink to="/plans" onClick={closeMenu}>Cardiac-AI Plans</NavLink>
        <NavLink to="/contact" onClick={closeMenu}>Connect</NavLink>

        {isLoggedIn && (
          <NavLink to="/predict" onClick={closeMenu} className="highlight">
            Cardiac-AI Prediction
          </NavLink>
        )}

        {/* ================= ADMIN LINK (ONLY FOR YOU) ================= */}
        {isLoggedIn && isAdmin && (
          <NavLink
            to="/admin"
            onClick={closeMenu}
            className="highlight admin-link"
          >
            Admin
          </NavLink>
        )}

        {/* ================= PROFILE DROPDOWN ================= */}
        {isLoggedIn && (
          <div className="navbar-profile-wrapper" ref={profileRef}>
            <button
              className="navbar-profile-btn"
              onClick={() => setProfileOpen(!profileOpen)}
              aria-label="Open profile menu"
            >
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="profile-avatar"
                />
              ) : (
                <div className="profile-avatar fallback">
                  {getInitials()}
                </div>
              )}
            </button>

            {profileOpen && (
              <div className="profile-dropdown">
                <div className="profile-info">
                  <strong>{user.displayName || "User"}</strong>
                  <span>{user.email}</span>
                </div>

                <div className="profile-divider" />

                <button
                  onClick={() => {
                    navigate("/profile");
                    setProfileOpen(false);
                    closeMenu();
                  }}
                >
                  Profile
                </button>

                <button
                  onClick={() => {
                    navigate("/history");
                    setProfileOpen(false);
                    closeMenu();
                  }}
                >
                  My Recommendations
                </button>

                <div className="profile-divider" />

                <button
                  className="logout-btn"
                  onClick={() => {
                    handleLogout();
                    setProfileOpen(false);
                    closeMenu();
                  }}
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        )}

        {/* ================= AUTH CTA ================= */}
        {!isLoggedIn && (
          <button
            className="navbar-profile-btn login-avatar"
            onClick={() => {
              navigate("/login");
              closeMenu();
            }}
            aria-label="Login or Sign up"
            title="Login / Sign up"
          >
            <div className="profile-avatar fallback">🔐</div>
          </button>
        )}
      </div>

      {/* ================= HAMBURGER ================= */}
      <button
        className={`navbar-toggle ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
}

export default Navbar;
