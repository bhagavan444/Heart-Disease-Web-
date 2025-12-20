import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { Helmet } from "react-helmet"; // Add this for meta title & favicon

const Home = () => {
  const navigate = useNavigate();

  /* ------------------ REAL-TIME DEMO STATE ------------------ */
  const [inputs, setInputs] = useState({
    age: 45,
    bp: 120,
    chol: 180,
  });
  const [risk, setRisk] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const { age, bp, chol } = inputs;
    const score = Math.min(
      100,
      Math.round(age * 0.25 + bp * 0.35 + chol * 0.4)
    );
    setRisk(score);
  }, [inputs]);

  const riskLabel =
    risk < 30 ? "Low" : risk < 60 ? "Moderate" : "High";

  const riskColor =
    risk < 30 ? "#10b981" : risk < 60 ? "#f59e0b" : "#ef4444";

  const handleInputChange = (key, value) => {
    setInputs({ ...inputs, [key]: Number(value) });
  };

  return (
    <>
      {/* ================= META TITLE & FAVICON ================= */}
      <Helmet>
        <title>Cardiac-AI | AI-Powered Heart Disease Prediction</title>
        <link rel="icon" href="/favicon.ico" />
        {/* If you have a favicon in public/favicon.ico, it will be used */}
      </Helmet>

      <main className="home">
        {/* ================= HERO WITH SUBTLE ECG BACKGROUND ================= */}
        <section className="hero">
          {/* Subtle animated ECG wave background */}
          <div className="ecg-background">
            <svg className="ecg-wave" viewBox="0 0 1000 200" preserveAspectRatio="none">
              <path
                d="M0,100 L100,100 L120,100 L125,40 L130,160 L135,100 L200,100 L1000,100"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <svg className="ecg-wave ecg-wave-2" viewBox="0 0 1000 200" preserveAspectRatio="none">
              <path
                d="M0,100 L100,100 L120,100 L125,40 L130,160 L135,100 L200,100 L1000,100"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>

          <div className="hero-left">
            <h1>
              AI-Powered <span>Heart Disease Prediction</span>
            </h1>
            <p>
              Enterprise-grade real-time AI system for predicting cardiovascular
              risk using explainable machine learning models.
            </p>

            <div className="hero-buttons">
              <button onClick={() => navigate("/predict")} className="primary">
                Start Prediction
              </button>
              <button onClick={() => navigate("/about")} className="secondary">
                View System Architecture
              </button>
            </div>
          </div>

          <div className="hero-right">
            <div
              className="ai-card animate-float"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <h3>Live Risk Preview</h3>
              <div className="risk-display">
                <div className="risk-circle" style={{ "--risk": risk }}>
                  <span className="risk-value">{risk}%</span>
                </div>
                <p className="risk-label" style={{ color: riskColor }}>
                  {riskLabel} Risk
                </p>
              </div>
              <small>Auto-updates in real time • Hover for details</small>

              {showTooltip && (
                <div className="risk-tooltip">
                  <p>
                    <strong>Age:</strong> {inputs.age} years (+{Math.round(inputs.age * 0.25)}%)
                  </p>
                  <p>
                    <strong>BP:</strong> {inputs.bp} mmHg (+{Math.round(inputs.bp * 0.35)}%)
                  </p>
                  <p>
                    <strong>Cholesterol:</strong> {inputs.chol} mg/dL (+{Math.round(inputs.chol * 0.4)}%)
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ================= LIVE DEMO ================= */}
        <section className="demo">
          <h2>Real-Time Risk Simulation</h2>
          <p>Modify patient vitals to see instant AI-driven risk changes</p>

          <div className="sliders">
            <label>
              <div className="slider-header">
                <span>Age</span>
                <strong>{inputs.age} years</strong>
              </div>
              <input
                type="range"
                min="18"
                max="90"
                step="1"
                value={inputs.age}
                onChange={(e) => handleInputChange("age", e.target.value)}
                className="styled-slider"
              />
              <div className="slider-labels">
                <span>18</span>
                <span>90</span>
              </div>
            </label>

            <label>
              <div className="slider-header">
                <span>Blood Pressure</span>
                <strong>{inputs.bp} mmHg</strong>
              </div>
              <input
                type="range"
                min="80"
                max="200"
                step="5"
                value={inputs.bp}
                onChange={(e) => handleInputChange("bp", e.target.value)}
                className="styled-slider"
              />
              <div className="slider-labels">
                <span>80</span>
                <span>200</span>
              </div>
            </label>

            <label>
              <div className="slider-header">
                <span>Cholesterol</span>
                <strong>{inputs.chol} mg/dL</strong>
              </div>
              <input
                type="range"
                min="100"
                max="400"
                step="10"
                value={inputs.chol}
                onChange={(e) => handleInputChange("chol", e.target.value)}
                className="styled-slider"
              />
              <div className="slider-labels">
                <span>100</span>
                <span>400</span>
              </div>
            </label>
          </div>

          <div className="demo-summary">
            <p>
              Current simulated risk:{' '}
              <strong style={{ color: riskColor }}>
                {risk}% – {riskLabel}
              </strong>
            </p>
            <p className="demo-note">
              This is a simplified demo model. The actual system uses advanced ML
              algorithms with 15+ clinical features.
            </p>
          </div>
        </section>

        {/* ================= ENTERPRISE FEATURES ================= */}
        <section className="features">
          <h2>Enterprise-Grade Capabilities</h2>

          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">🔐</div>
              <h3>Authentication & Roles</h3>
              <p>JWT-based login with Patient, Doctor and Admin access control.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🧠</div>
              <h3>Explainable AI (XAI)</h3>
              <p>Feature importance insights showing how each parameter impacts risk.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📈</div>
              <h3>Prediction History</h3>
              <p>All predictions stored securely with trend analytics and reports.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Model Performance</h3>
              <p>Accuracy, precision, recall and confusion matrix visualization.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>Secure API Layer</h3>
              <p>REST APIs with validation, rate limiting and encrypted data flow.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">☁️</div>
              <h3>Cloud & Docker Ready</h3>
              <p>Deployable using Docker, CI/CD pipelines and cloud infrastructure.</p>
            </div>
          </div>
        </section>

        {/* ================= SYSTEM FLOW ================= */}
        <section className="features workflow">
          <h2>End-to-End System Workflow</h2>

          <div className="feature-grid workflow-grid">
            <div className="feature-card workflow-card">
              <div className="step-number">1</div>
              <h3>User Input</h3>
              <p>Patient vitals and clinical data collected securely.</p>
            </div>
            <div className="workflow-arrow">→</div>

            <div className="feature-card workflow-card">
              <div className="step-number">2</div>
              <h3>Preprocessing</h3>
              <p>Normalization, feature scaling and validation.</p>
            </div>
            <div className="workflow-arrow">→</div>

            <div className="feature-card workflow-card">
              <div className="step-number">3</div>
              <h3>AI Inference</h3>
              <p>ML model computes risk with confidence scores.</p>
            </div>
            <div className="workflow-arrow">→</div>

            <div className="feature-card workflow-card">
              <div className="step-number">4</div>
              <h3>Visualization</h3>
              <p>Clear risk levels, insights and downloadable reports.</p>
            </div>
          </div>
        </section>

        {/* ================= TECH STACK ================= */}
        <section className="stack">
          <h2>Technology Stack</h2>
          <div className="stack-grid">
            <div className="stack-item">
              <strong>Frontend:</strong>
              <span>React.js with Custom CSS3</span>
            </div>
            <div className="stack-item">
              <strong>Backend:</strong>
              <span>Flask Framework & REST APIs</span>
            </div>
            <div className="stack-item">
              <strong>Machine Learning:</strong>
              <span>Scikit-Learn • TensorFlow</span>
            </div>
            <div className="stack-item">
              <strong>Database:</strong>
              <span>MongoDB • PostgreSQL</span>
            </div>
            <div className="stack-item">
              <strong>Deployment:</strong>
              <span>Docker • AWS / GCP / Azure</span>
            </div>
          </div>
        </section>

        {/* ================= USE CASES ================= */}
        <section className="usecases">
          <h2>Real-World Applications</h2>
          <div className="usecase-grid">
            <div className="usecase-card">
              <span className="usecase-emoji">🏥</span>
              <span>Hospital Screening</span>
            </div>
            <div className="usecase-card">
              <span className="usecase-emoji">📱</span>
              <span>Medical Platforms</span>
            </div>
            <div className="usecase-card">
              <span className="usecase-emoji">📊</span>
              <span>Population Health Analytics</span>
            </div>
            <div className="usecase-card">
              <span className="usecase-emoji">🧑‍⚕️</span>
              <span>Clinical Decision Support</span>
            </div>
            <div className="usecase-card">
              <span className="usecase-emoji">🏢</span>
              <span>Corporate Wellness Programs</span>
            </div>
            <div className="usecase-card">
              <span className="usecase-emoji">📚</span>
              <span>Medical Research & Trials</span>
            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="cta">
          <h2>Experience Real-Time AI Healthcare</h2>
          <p>
            Designed as a production-grade AI system for enterprise healthcare
            environments and MNC evaluations.
          </p>
          <button onClick={() => navigate("/predict")} className="cta-button">
            Launch Prediction Engine →
          </button>
        </section>

        {/* ================= ENTERPRISE FOOTER ================= */}
        <footer className="footer">
          <div className="footer-grid">
            <div>
              <h4>Heart AI</h4>
              <p>Real-time cardiovascular risk intelligence powered by AI.</p>
            </div>

            <div>
              <h4>Platform</h4>
              <p>Prediction Engine</p>
              <p>Explainable AI</p>
              <p>Secure APIs</p>
            </div>

            <div>
              <h4>Technology</h4>
              <p>React • Flask • ML</p>
              <p>Docker • Cloud</p>
            </div>

            <div>
              <h4>Compliance</h4>
              <p>HIPAA-Ready Design</p>
              <p>Security First Architecture</p>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Heart Disease Prediction System</p>
            <p>Built for Enterprise AI & Full-Stack Excellence</p>
          </div>
        </footer>
      </main>
    </>
  );
};

export default Home;