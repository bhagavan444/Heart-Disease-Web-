import React, { useState, useEffect } from "react";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ handleLogin }) => {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAlreadyLoggedIn, setIsAlreadyLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user && storedUser) {
        localStorage.removeItem("user");
      } else if (user && storedUser) {
        setIsAlreadyLoggedIn(true);
        navigate("/predict");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const isValidGmail = (email) =>
    /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);

  const isStrongPassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/.test(password);

  const resetMessages = () => {
    setErrorMsg("");
    setSuccessMsg("");
  };

  const handleEmailSignup = async () => {
    resetMessages();
    if (!isValidGmail(email)) return setErrorMsg("❗ Please use a valid Gmail address");
    if (!isStrongPassword(password))
      return setErrorMsg("❗ Password must be 8+ characters with uppercase, lowercase, number, and special character");

    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccessMsg("✅ Signup successful! Redirecting to Predict...");
      handleLogin();
      navigate("/predict");
    } catch (error) {
      setErrorMsg("❌ Signup failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async () => {
    resetMessages();
    if (!isValidGmail(email)) return setErrorMsg("❗ Please use a valid Gmail address");
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      setSuccessMsg("✅ Login successful! Redirecting to Predict...");
      handleLogin();
      navigate("/predict");
    } catch (error) {
      setErrorMsg("❌ Login error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider, providerName) => {
    resetMessages();
    if (loading) return;
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const formattedUser = {
        name: user.displayName || user.email?.split("@")[0],
        email: user.email,
        uid: user.uid,
        photo: user.photoURL,
      };
      localStorage.setItem("user", JSON.stringify(formattedUser));
      setSuccessMsg(`🎉 Welcome ${formattedUser.name}! Redirecting to Predict...`);
      handleLogin();
      navigate("/predict");
    } catch (error) {
      setErrorMsg(`❌ ${providerName} login failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    resetMessages();
    if (!isValidGmail(email)) return setErrorMsg("❗ Please enter a valid Gmail address");
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      setSuccessMsg("✅ Password reset email sent! Check your inbox.");
    } catch (error) {
      setErrorMsg("❌ Failed to send reset email: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (isAlreadyLoggedIn) return null;

  return (
    <div className="login-container">
      {loading && <div className="loading-overlay">Loading...</div>}
      <div className="login-card">
        <h1 className="login-title">HeartCare Access</h1>
        <p className="login-subtitle">
          Sign in or sign up to unlock personalized heart health predictions
        </p>

        <div className="mode-toggle">
          <button
            className={`mode-btn ${mode === "login" ? "active" : ""}`}
            onClick={() => setMode("login")}
            disabled={loading}
          >
            Login
          </button>
          <button
            className={`mode-btn ${mode === "signup" ? "active" : ""}`}
            onClick={() => setMode("signup")}
            disabled={loading}
          >
            Sign Up
          </button>
        </div>

        <div className="form-group">
          <input
            type="email"
            placeholder="Enter your Gmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
            disabled={loading}
            className="input-field"
          />
          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password (8+ chars, aA1@)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="input-field"
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
        </div>

        {errorMsg && <div className="error-msg">{errorMsg}</div>}
        {successMsg && <div className="success-msg">{successMsg}</div>}

        {mode === "signup" ? (
          <button
            className="primary-btn"
            onClick={handleEmailSignup}
            disabled={loading}
          >
            {loading ? <span className="spinner"></span> : "Sign Up with Email"}
          </button>
        ) : (
          <>
            <button
              className="primary-btn"
              onClick={handleEmailLogin}
              disabled={loading}
            >
              {loading ? <span className="spinner"></span> : "Login with Email"}
            </button>
            <button
              className="forgot-btn"
              onClick={handleForgotPassword}
              disabled={loading}
            >
              Forgot Password?
            </button>
          </>
        )}

        <div className="divider">or</div>

        <button
          className="google-btn"
          onClick={() => handleSocialLogin(googleProvider, "Google")}
          disabled={loading}
        >
          {loading ? (
            <span className="spinner"></span>
          ) : (
            <>
              <img
                src="https://img.icons8.com/color/16/000000/google-logo.png"
                alt="Google"
                className="google-icon"
              />
              Continue with Google
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Login;