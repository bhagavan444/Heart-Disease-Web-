import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  /* ------------------ REAL-TIME DEMO STATE ------------------ */
  const [inputs, setInputs] = useState({
    age: 45,
    bp: 120,
    chol: 180,
  });
  const [risk, setRisk] = useState(0);

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

  return (
    <main className="home">

      {/* ================= HERO ================= */}
      <section className="hero">
        <div className="hero-left">
          <h1>
            AI-Powered <span>Heart Disease Prediction</span>
          </h1>
          <p>
            A real-time machine learning system that predicts heart disease
            risk using clinical parameters with explainable AI outputs.
          </p>

          <div className="hero-buttons">
            <button onClick={() => navigate("/predict")} className="primary">
              Start Prediction
            </button>
            <button onClick={() => navigate("/about")} className="secondary">
              View Architecture
            </button>
          </div>
        </div>

        <div className="hero-right">
          <div className="ai-card">
            <h3>Live Risk Preview</h3>
            <p className={`risk ${riskLabel.toLowerCase()}`}>
              {risk}% – {riskLabel} Risk
            </p>
          </div>
        </div>
      </section>

      {/* ================= LIVE DEMO ================= */}
      <section className="demo">
        <h2>Real-Time Risk Simulation</h2>
        <p>Move the sliders to see instant risk changes</p>

        <div className="sliders">
          <label>
            Age: <strong>{inputs.age}</strong>
            <input
              type="range"
              min="18"
              max="90"
              value={inputs.age}
              onChange={(e) =>
                setInputs({ ...inputs, age: e.target.value })
              }
            />
          </label>

          <label>
            Blood Pressure: <strong>{inputs.bp}</strong>
            <input
              type="range"
              min="80"
              max="200"
              value={inputs.bp}
              onChange={(e) =>
                setInputs({ ...inputs, bp: e.target.value })
              }
            />
          </label>

          <label>
            Cholesterol: <strong>{inputs.chol}</strong>
            <input
              type="range"
              min="100"
              max="400"
              value={inputs.chol}
              onChange={(e) =>
                setInputs({ ...inputs, chol: e.target.value })
              }
            />
          </label>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="features">
        <h2>Enterprise-Grade Features</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>Machine Learning Model</h3>
            <p>
              Trained using clinical heart disease datasets with
              preprocessing, feature scaling and evaluation.
            </p>
          </div>

          <div className="feature-card">
            <h3>Explainable Predictions</h3>
            <p>
              Outputs are interpretable — users understand why a
              prediction was made.
            </p>
          </div>

          <div className="feature-card">
            <h3>Real-Time Processing</h3>
            <p>
              Instant predictions using Flask REST API and React frontend.
            </p>
          </div>

          <div className="feature-card">
            <h3>Secure Architecture</h3>
            <p>
              Designed with role-based access, API security, and privacy
              considerations.
            </p>
          </div>

          {/* NEW FEATURES */}
          <div className="feature-card">
            <h3>Model Performance Metrics</h3>
            <p>
              Accuracy, precision, recall and confusion matrix
              validated during training phase.
            </p>
          </div>

          <div className="feature-card">
            <h3>Scalable Deployment</h3>
            <p>
              Can be deployed on cloud platforms with Docker and REST APIs
              for real-world usage.
            </p>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="features">
        <h2>How the System Works</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>1. Data Input</h3>
            <p>
              User provides medical attributes such as age, blood pressure
              and cholesterol levels.
            </p>
          </div>

          <div className="feature-card">
            <h3>2. Data Preprocessing</h3>
            <p>
              Input data is normalized and transformed to match the
              trained ML model format.
            </p>
          </div>

          <div className="feature-card">
            <h3>3. Model Prediction</h3>
            <p>
              Machine learning model predicts heart disease risk
              using trained patterns.
            </p>
          </div>

          <div className="feature-card">
            <h3>4. Result Visualization</h3>
            <p>
              Risk level is displayed with clear insights for
              user understanding.
            </p>
          </div>
        </div>
      </section>

      {/* ================= TECH STACK ================= */}
      <section className="stack">
        <h2>Technology Stack</h2>

        <ul>
          <li><strong>Frontend:</strong> React.js, CSS3</li>
          <li><strong>Backend:</strong> Flask (Python)</li>
          <li><strong>ML:</strong> Scikit-Learn / TensorFlow</li>
          <li><strong>Data:</strong> Heart Disease Dataset</li>
          <li><strong>API:</strong> RESTful JSON APIs</li>
        </ul>
      </section>

      {/* ================= USE CASES ================= */}
      <section className="usecases">
        <h2>Real-World Applications</h2>

        <div className="usecase-grid">
          <div>🏥 Hospital Pre-Screening</div>
          <div>📱 Telemedicine Platforms</div>
          <div>📊 Health Analytics Systems</div>
          <div>🧑‍⚕️ Doctor Decision Support</div>
          <div>🏢 Corporate Health Programs</div>
          <div>📚 Medical Research Assistance</div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="cta">
        <h2>Ready to Predict Heart Disease?</h2>
        <p>
          Built as a full-stack AI project for real-world healthcare
          applications and placement evaluations.
        </p>
        <button onClick={() => navigate("/predict")}>
          Run Full Prediction →
        </button>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <p>
          © {new Date().getFullYear()} Heart Disease Prediction System
        </p>
        <p>Developed using AI & Full-Stack Technologies</p>
      </footer>

    </main>
  );
};

export default Home;
