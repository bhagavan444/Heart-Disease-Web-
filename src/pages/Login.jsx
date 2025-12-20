import React, { useState, useEffect } from "react";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Enhanced with modern Tailwind-inspired or custom CSS

const Login = ({ handleLogin }) => {
  const [mode, setMode] = useState("login"); // login | signup | reset
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isAlreadyLoggedIn, setIsAlreadyLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAlreadyLoggedIn(true);
        handleLogin();
        navigate("/predict", { replace: true });
      }
    });
    return () => unsubscribe();
  }, [navigate, handleLogin]);

  const isValidGmail = (email) => /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);

  const isStrongPassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  const resetMessages = () => {
    setErrorMsg("");
    setSuccessMsg("");
  };

  const handleEmailSignup = async () => {
    resetMessages();
    if (!isValidGmail(email)) return setErrorMsg("Please use a valid Gmail address (@gmail.com)");
    if (!isStrongPassword(password))
      return setErrorMsg("Password must be 8+ chars with uppercase, lowercase, number & special character");
    if (password !== confirmPassword) return setErrorMsg("Passwords do not match");

    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccessMsg("Account created successfully! Redirecting...");
      setTimeout(() => navigate("/predict"), 1500);
    } catch (error) {
      setErrorMsg(error.message.includes("email-already-in-use")
        ? "This email is already registered. Try logging in."
        : "Signup failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async () => {
    resetMessages();
    if (!isValidGmail(email)) return setErrorMsg("Please use a valid Gmail address");

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      setSuccessMsg("Login successful! Welcome back...");
      setTimeout(() => navigate("/predict"), 1000);
    } catch (error) {
      setErrorMsg(
        error.message.includes("wrong-password") || error.message.includes("user-not-found")
          ? "Invalid email or password"
          : "Login failed: " + error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async () => {
    resetMessages();
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      setSuccessMsg(`Welcome ${result.user.displayName || "User"}!`);
      setTimeout(() => navigate("/predict"), 1000);
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user") {
        setErrorMsg("Sign-in cancelled. Please try again.");
      } else {
        setErrorMsg("Google sign-in failed: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    resetMessages();
    if (!isValidGmail(email)) return setErrorMsg("Enter your registered Gmail address");

    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      setSuccessMsg("Password reset link sent! Check your Gmail inbox/spam.");
      setTimeout(() => setMode("login"), 4000);
    } catch (error) {
      setErrorMsg("Failed to send reset link: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (isAlreadyLoggedIn) return null;

  return (
    <div className="login-page min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-6 py-12 overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-transparent to-purple-600/20 animate-pulse"></div>

      <div className="login-card max-w-md w-full bg-black/60 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-purple-500/30 relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-3">
            HeartCare Predictor
          </h1>
          <p className="text-gray-300 text-lg">
            {mode === "login" && "Welcome back! Access your AI-powered heart risk assessment"}
            {mode === "signup" && "Create your secure account to start predicting"}
            {mode === "reset" && "Reset your password securely"}
          </p>
        </div>

        {/* Mode Toggle */}
        {mode !== "reset" && (
          <div className="flex justify-center mb-8">
            <div className="bg-gray-800/50 rounded-full p-1 flex gap-2">
              <button
                onClick={() => setMode("login")}
                disabled={loading}
                className={`px-8 py-3 rounded-full font-semibold transition ${
                  mode === "login"
                    ? "bg-purple-600 text-white shadow-lg"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setMode("signup")}
                disabled={loading}
                className={`px-8 py-3 rounded-full font-semibold transition ${
                  mode === "signup"
                    ? "bg-purple-600 text-white shadow-lg"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>
        )}

        {/* Messages */}
        {errorMsg && (
          <div className="mb-6 p-4 bg-red-900/50 border border-red-500/50 rounded-xl text-red-300 text-center">
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="mb-6 p-4 bg-green-900/50 border border-green-500/50 rounded-xl text-green-300 text-center">
            {successMsg}
          </div>
        )}

        {/* Form */}
        <div className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-2">Gmail Address</label>
            <input
              type="email"
              placeholder="yourname@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
              disabled={loading}
              className="w-full px-5 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-purple-500 focus:outline-none text-white placeholder-gray-500 transition"
            />
          </div>

          {(mode === "login" || mode === "signup") && (
            <>
              <div>
                <label className="block text-gray-300 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    className="w-full px-5 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-purple-500 focus:outline-none text-white placeholder-gray-500 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xl"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              {mode === "signup" && (
                <div>
                  <label className="block text-gray-300 mb-2">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Re-enter password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      disabled={loading}
                      className="w-full px-5 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-purple-500 focus:outline-none text-white placeholder-gray-500 pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-xl"
                    >
                      {showConfirmPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 space-y-4">
          {mode === "signup" && (
            <button
              onClick={handleEmailSignup}
              disabled={loading}
              className="w-full py-4 bg-purple-600 hover:bg-purple-700 disabled:opacity-60 rounded-xl font-bold text-lg shadow-lg transition transform hover:-translate-y-1"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          )}

          {mode === "login" && (
            <>
              <button
                onClick={handleEmailLogin}
                disabled={loading}
                className="w-full py-4 bg-purple-600 hover:bg-purple-700 disabled:opacity-60 rounded-xl font-bold text-lg shadow-lg transition transform hover:-translate-y-1"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>

              <button
                onClick={() => setMode("reset")}
                disabled={loading}
                className="text-center text-purple-400 hover:text-purple-300 text-sm underline"
              >
                Forgot Password?
              </button>
            </>
          )}

          {mode === "reset" && (
            <>
              <button
                onClick={handleForgotPassword}
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl font-bold text-lg shadow-lg transition"
              >
                {loading ? "Sending Link..." : "Send Reset Link"}
              </button>
              <button
                onClick={() => setMode("login")}
                className="text-center text-gray-400 hover:text-white text-sm"
              >
                ← Back to Login
              </button>
            </>
          )}
        </div>

        {/* Divider */}
        {(mode === "login" || mode === "signup") && (
          <>
            <div className="my-8 flex items-center">
              <div className="flex-1 h-px bg-gray-700"></div>
              <span className="px-4 text-gray-500">or</span>
              <div className="flex-1 h-px bg-gray-700"></div>
            </div>

            {/* Google Sign-In */}
            <button
              onClick={handleSocialLogin}
              disabled={loading}
              className="w-full py-4 bg-white/10 hover:bg-white/20 border border-gray-600 rounded-xl font-semibold flex items-center justify-center gap-3 transition"
            >
              <img
                src="https://img.icons8.com/color/48/000000/google-logo.png"
                alt="Google"
                className="w-6 h-6"
              />
              Continue with Google
            </button>
          </>
        )}

        {/* Footer */}
        <div className="mt-10 text-center text-gray-500 text-sm">
          <p>By continuing, you agree to our <a href="/terms" className="text-purple-400 hover:underline">Terms</a> and <a href="/privacy" className="text-purple-400 hover:underline">Privacy Policy</a></p>
          <p className="mt-4">Protected with enterprise-grade Firebase Authentication</p>
        </div>
      </div>
    </div>
  );
};

export default Login;