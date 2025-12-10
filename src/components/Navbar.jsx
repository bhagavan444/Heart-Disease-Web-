import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate("/login");
      setIsMobileMenuOpen(false);
    }).catch((error) => {
      console.error("Logout error:", error);
    });
  };

  const handlePredictClick = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert("Please log in to access the Predict feature.");
    } else {
      navigate("/predict");
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="nav-main">
      <div className="nav-container">
        {/* Logo */}
        <div className="nav-logo">
          <Link to="/" className="nav-logo-text" onClick={() => setIsMobileMenuOpen(false)}>
            Heart Disease with ML
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className={`nav-hamburger ${isMobileMenuOpen ? "active" : ""}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* Navigation Links */}
        <ul className={`nav-links ${isMobileMenuOpen ? "open" : ""}`}>
          <li>
            <Link to="/" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              About
            </Link>
            <Link to="/plans" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              Plans
            </Link>
          </li>
          <li>
            <button className="nav-link predict-link" onClick={handlePredictClick}>
              Predict
            </button>
          </li>
          <li>
            <Link to="/contact" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              Contact
            </Link>
          </li>
          <li>
            {isLoggedIn ? (
              <button onClick={handleLogout} className="nav-link logout-btn">
                Logout
              </button>
            ) : (
              <Link to="/login" className="nav-link login-btn" onClick={() => setIsMobileMenuOpen(false)}>
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;