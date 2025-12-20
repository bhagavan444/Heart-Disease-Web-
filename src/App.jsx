import React, { useState, useEffect, Component } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Plans from "./pages/Plans";
import Predict from "./pages/Predict";
import Admin from "./pages/Admin"; // New Admin Dashboard Page

import { auth } from "./firebase"; // Firebase auth

// Error Boundary
class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Something went wrong.</h2>
            <p className="text-red-400 mb-6">Error: {this.state.error?.message}</p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-full font-semibold transition"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setCurrentUser({
          email: user.email,
          uid: user.uid,
          name: user.displayName || user.email?.split("@")[0],
          photo: user.photoURL,
        });

        // Store in localStorage
        localStorage.setItem("user", JSON.stringify({
          email: user.email,
          uid: user.uid,
          name: user.displayName || user.email?.split("@")[0],
          photo: user.photoURL,
        }));

        // Simple admin check: replace with your actual admin logic (e.g., custom claim, Firestore role, or hardcoded emails)
        const adminEmails = ["g.sivasatyasaibhagavan@gmail.com", "admin@heartcare.com"]; // Update with real admin emails
        setIsAdmin(adminEmails.includes(user.email));
      } else {
        setIsLoggedIn(false);
        setIsAdmin(false);
        setCurrentUser(null);
        localStorage.removeItem("user");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        setIsLoggedIn(false);
        setIsAdmin(false);
        localStorage.removeItem("user");
        window.location.href = "/login";
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    window.location.href = "/predict";
  };

  return (
    <Router>
      <Navbar
        handleLogout={handleLogout}
        isLoggedIn={isLoggedIn}
        isAdmin={isAdmin}
        currentUser={currentUser}
      />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/plans" element={<Plans />} />

          {/* Public Login */}
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/predict" replace /> : <Login handleLogin={handleLogin} />}
          />

          {/* Protected User Route */}
          <Route
            path="/predict"
            element={isLoggedIn ? <Predict /> : <Navigate to="/login" replace />}
          />

          {/* Protected Admin Route - Only visible/accessible to admins */}
          <Route
            path="/admin"
            element={
              isLoggedIn && isAdmin ? (
                <Admin />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Optional: Fallback for unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
}

export default App;