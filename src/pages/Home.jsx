import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [predictorInput, setPredictorInput] = useState({
    age: 50,
    bloodPressure: 120,
    cholesterol: 200,
  });
  const [riskScore, setRiskScore] = useState(null);

  useEffect(() => {
    // run initial calculation once on mount
    calculateRisk(predictorInput);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const handleInputChange = (e) => {
    const updated = { ...predictorInput, [e.target.name]: e.target.value };
    setPredictorInput(updated);
    calculateRisk(updated);
  };

  const calculateRisk = (data) => {
    // Simple demo formula for real-time risk calculation
    const { age, bloodPressure, cholesterol } = data;
    if (age === "" || bloodPressure === "" || cholesterol === "") {
      setRiskScore(null);
      return;
    }
    // parse values safely
    const a = parseInt(age, 10);
    const bp = parseInt(bloodPressure, 10);
    const chol = parseInt(cholesterol, 10);

    // simple weighted formula for demo; clamp to 0-100
    const raw =
      (Math.max(18, a) * 0.2 + Math.max(80, bp) * 0.3 + Math.max(100, chol) * 0.5) /
      2;
    const risk = Math.round(Math.min(Math.max(raw, 0), 100));
    setRiskScore(risk);
  };

  const riskCategory = (score) => {
    if (score === null) return { label: "—", className: "risk-none" };
    if (score < 30) return { label: "Low", className: "risk-low" };
    if (score < 60) return { label: "Moderate", className: "risk-medium" };
    return { label: "High", className: "risk-high" };
  };

  const useCases = [
    {
      title: "Personal Health Check",
      emoji: "❤️",
      description:
        "Quickly screen yourself and track changes over time. Great for routine monitoring.",
    },
    {
      title: "Clinical Triage Aid",
      emoji: "🏥",
      description:
        "Triage support for clinicians — fast, consistent secondary screening at intake.",
    },
    {
      title: "Wellness Programs",
      emoji: "📈",
      description:
        "Integrate into wellness platforms to motivate lifestyle change and follow-up.",
    },
    {
      title: "Family Health",
      emoji: "👨‍👩‍👧‍👦",
      description:
        "Share non-sensitive risk summaries with loved ones and encourage preventive care.",
    },
  ];

  const faqs = [
    {
      question: "Is my health data safe?",
      answer:
        "Yes. This demo assumes encrypted transmission and secure storage. For production, use end-to-end encryption, secure authentication, and follow HIPAA/GDPR requirements where applicable.",
    },
    {
      question: "How accurate is the predictor?",
      answer:
        "This demo uses a simplified scoring formula. Real clinical-grade models require validated datasets, peer review, and regulatory approvals.",
    },
    {
      question: "What inputs are required?",
      answer:
        "Age, blood pressure and cholesterol are minimum inputs here. A production model would include more features (e.g., smoking, diabetes, family history).",
    },
    {
      question: "Can I export my results?",
      answer:
        "Yes — Pro users can download PDF reports and share them with healthcare providers. Free tier offers instant on-screen summaries.",
    },
  ];

  const footerYear = new Date().getFullYear();
  const { label: riskLabel, className: riskClass } = riskCategory(riskScore);

  return (
    <main className="homepage-main">
      {/* Hero Section */}
      <section className="homepage-hero-section">
        <div className="homepage-hero-content">
          <h1 className="homepage-hero-title">
            Protect your heart with{" "}
            <span className="homepage-highlight">AI-backed clarity</span>
          </h1>
          <p className="homepage-hero-subtitle">
            Fast, explainable heart-disease risk insights — designed for individuals,
            clinicians, and wellness programs. Enter simple health metrics and get an
            instant, easy-to-understand risk summary and actionable next steps.
          </p>
          <div className="homepage-hero-buttons">
            <button
              type="button"
              className="homepage-btn homepage-get-started"
              onClick={() => navigate("/predict")}
            >
              Try Predictor
            </button>
            <button
              type="button"
              className="homepage-btn homepage-plans"
              onClick={() => navigate("/plans")}
            >
              View Plans & Integrations
            </button>
          </div>
        </div>

        <div className="homepage-hero-visual" aria-hidden="true">
          {/* Illustration placeholder — replace with an <img alt="..." /> or SVG */}
          <div className="hero-illustration">❤️📊</div>
        </div>
      </section>

      {/* Real-Time Predictor Preview */}
      <section className="homepage-realtime-predictor" aria-labelledby="predictorTitle">
        <h2 id="predictorTitle" className="homepage-section-title">
          Live Predictor — Try It Now
        </h2>

        <form
          className="predictor-form"
          onSubmit={(e) => {
            e.preventDefault();
            navigate("/predict");
          }}
          aria-describedby="predictorDesc"
        >
          <p id="predictorDesc" className="sr-only">
            Move sliders to update the live risk score. This preview uses a simplified
            scoring formula.
          </p>

          <label htmlFor="age">
            Age: <strong>{predictorInput.age}</strong>
          </label>
          <input
            aria-label="Age"
            type="range"
            id="age"
            name="age"
            min="18"
            max="100"
            value={predictorInput.age}
            onChange={handleInputChange}
          />

          <label htmlFor="bloodPressure">
            Blood Pressure: <strong>{predictorInput.bloodPressure}</strong> mmHg
          </label>
          <input
            aria-label="Blood Pressure"
            type="range"
            id="bloodPressure"
            name="bloodPressure"
            min="80"
            max="200"
            value={predictorInput.bloodPressure}
            onChange={handleInputChange}
          />

          <label htmlFor="cholesterol">
            Cholesterol: <strong>{predictorInput.cholesterol}</strong> mg/dL
          </label>
          <input
            aria-label="Cholesterol"
            type="range"
            id="cholesterol"
            name="cholesterol"
            min="100"
            max="400"
            value={predictorInput.cholesterol}
            onChange={handleInputChange}
          />

          <div className="predictor-result" role="status" aria-live="polite">
            <div className={`risk-pill ${riskClass}`}>
              <span className="risk-label">{riskLabel} Risk</span>
              <span className="risk-value">{riskScore !== null ? `${riskScore}%` : "—"}</span>
            </div>

            {/* Simple gauge (visual) */}
            <div className="risk-gauge-container" aria-hidden="true">
              <div className="risk-gauge">
                <div
                  className="risk-gauge-fill"
                  style={{ transform: `rotate(${riskScore !== null ? riskScore * 1.8 : 0}deg)` }}
                />
                <div
                  className="risk-gauge-needle"
                  style={{ transform: `rotate(${riskScore !== null ? riskScore * 1.8 : 0}deg)` }}
                />
                <div className="risk-gauge-center" />
              </div>
            </div>
          </div>
        </form>

        <div className="predictor-actions">
          <button
            type="button"
            className="homepage-btn homepage-get-started"
            onClick={() => navigate("/predict")}
          >
            Open Full Predictor
          </button>
          <button
            type="button"
            className="homepage-btn homepage-learn-more"
            onClick={() => navigate("/about")}
          >
            Learn How It Works
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="homepage-features-section" aria-labelledby="featuresTitle">
        <h2 id="featuresTitle" className="homepage-section-title">
          Why HeartCare Predictor?
        </h2>

        <p className="homepage-features-intro">
          Built to be simple, actionable, and privacy-first — useful for individuals,
          clinicians and organizations that prioritize timely preventive care.
        </p>

        <div className="homepage-features-list">
          <article className="homepage-feature-card">
            <div className="homepage-feature-icon" aria-hidden>❤️</div>
            <h3>Explainable AI</h3>
            <p>
              Every prediction includes a clear explanation and the top contributing
              factors — so users and clinicians know why the score moved.
            </p>
          </article>

          <article className="homepage-feature-card">
            <div className="homepage-feature-icon" aria-hidden>🔒</div>
            <h3>Privacy-First</h3>
            <p>
              Data encryption, role-based access, and the ability to export or delete
              your information on demand.
            </p>
          </article>

          <article className="homepage-feature-card">
            <div className="homepage-feature-icon" aria-hidden>⚡</div>
            <h3>Instant, Real-Time</h3>
            <p>
              Live slider preview and instant full-model predictions — ideal for quick
              screenings and follow-ups.
            </p>
          </article>

          <article className="homepage-feature-card">
            <div className="homepage-feature-icon" aria-hidden>🧾</div>
            <h3>Clinician-Ready Reports</h3>
            <p>
              Pro plans include downloadable, printable summaries to share directly with
              healthcare professionals.
            </p>
          </article>

          <article className="homepage-feature-card">
            <div className="homepage-feature-icon" aria-hidden>🔗</div>
            <h3>Integrations</h3>
            <p>
              Easy API and EHR integration options for clinics and wellness partners.
            </p>
          </article>

          <article className="homepage-feature-card">
            <div className="homepage-feature-icon" aria-hidden>📊</div>
            <h3>Trend Tracking</h3>
            <p>
              Track your risk over time and receive tailored lifestyle recommendations
              to reduce your score.
            </p>
          </article>
        </div>
      </section>

      {/* Use Cases */}
      <section className="homepage-usecases-section">
        <h2 className="homepage-section-title">Use Cases</h2>
        <div className="homepage-usecases-list">
          {useCases.map((uc, i) => (
            <div key={i} className="homepage-usecase-card" title={uc.description}>
              <div className="uc-emoji" aria-hidden>{uc.emoji}</div>
              <div>
                <strong>{uc.title}</strong>
                <div className="uc-desc">{uc.description}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="homepage-how-section" aria-labelledby="howTitle">
        <h2 id="howTitle" className="homepage-section-title">How It Works</h2>
        <ol className="homepage-how-steps">
          <li><strong>Sign up / Login</strong> — secure account with role-based controls.</li>
          <li><strong>Enter health data</strong> — or connect device/EHR data for clinics.</li>
          <li><strong>Get prediction</strong> — instantly see score, causes, and next steps.</li>
          <li><strong>Track & improve</strong> — receive tips, set goals, and monitor trends.</li>
          <li><strong>Share securely</strong> — export a clinician-ready report (Pro/Plus).</li>
        </ol>
      </section>

      {/* Testimonials */}
      <section className="homepage-testimonials-section">
        <h2 className="homepage-section-title">What Users Say</h2>
        <div className="homepage-testimonials-list">
          <blockquote>
            “Clear, fast, and motivating — I finally understood what to change.” – Patient
          </blockquote>
          <blockquote>
            “A reliable triage tool during busy clinics.” – Cardiologist
          </blockquote>
          <blockquote>
            “Great for our corporate wellness program — employees track progress.” – Wellness Lead
          </blockquote>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="homepage-pricing-section">
        <h2 className="homepage-section-title">Plans</h2>
        <div className="homepage-pricing-list">
          <div className="homepage-pricing-card">
            <h3>Free</h3>
            <p>Basic on-screen predictions, weekly tips</p>
            <ul>
              <li>Live preview</li>
              <li>Basic explanations</li>
            </ul>
          </div>

          <div className="homepage-pricing-card featured-plan">
            <h3>Pro</h3>
            <p>Clinician-ready reports, trend tracking</p>
            <ul>
              <li>Downloadable reports (PDF)</li>
              <li>Advanced insights</li>
            </ul>
          </div>

          <div className="homepage-pricing-card">
            <h3>Enterprise</h3>
            <p>API & EHR integrations for clinics and organizations</p>
            <ul>
              <li>Custom integration</li>
              <li>Bulk onboarding</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="homepage-faq-section" aria-labelledby="faqTitle">
        <h2 id="faqTitle" className="homepage-section-title">FAQ</h2>
        <div className="homepage-faq-list" role="list">
          {faqs.map((faq, index) => (
            <div
              key={index}
              role="listitem"
              className={`homepage-faq-item ${activeFAQ === index ? "active" : ""}`}
            >
              <button
                type="button"
                aria-expanded={activeFAQ === index}
                aria-controls={`faq-panel-${index}`}
                className="faq-question"
                onClick={() => toggleFAQ(index)}
              >
                <strong>{faq.question}</strong>
              </button>
              <div
                id={`faq-panel-${index}`}
                className="faq-answer"
                hidden={activeFAQ !== index}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="homepage-cta-section">
        <h2>Ready to take control of your heart health?</h2>
        <div className="cta-actions">
          <button
            type="button"
            className="homepage-btn homepage-get-started"
            onClick={() => navigate("/predict")}
          >
            Try Predictor Now →
          </button>
          <button
            type="button"
            className="homepage-btn homepage-learn-more"
            onClick={() => navigate("/about")}
          >
            How it Works
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="homepage-footer" role="contentinfo">
        <div className="footer-top">
          <div className="footer-brand">
            <strong>HeartCare Predictor</strong>
            <div className="footer-tagline">Actionable heart risk insights — privacy first</div>
          </div>

          <div className="footer-links">
            <nav aria-label="Footer">
              <a href="/about">About</a>
              <a href="/predict">Predictor</a>
              <a href="/plans">Plans</a>
              <a href="/contact">Contact</a>
              <a href="/privacy">Privacy</a>
            </nav>
          </div>

          <div className="footer-newsletter" aria-labelledby="newsletterTitle">
            <h3 id="newsletterTitle">Stay updated</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // integrate newsletter signup
                alert("Thanks — newsletter signup demo");
              }}
            >
              <label htmlFor="email" className="sr-only">Email</label>
              <input id="email" type="email" placeholder="you@example.com" required />
              <button type="submit" className="homepage-btn">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            © {footerYear} HeartCare Predictor. All rights reserved.
          </div>
          <div className="footer-legal">
            <a href="/terms">Terms</a> | <a href="/privacy">Privacy</a>
          </div>
          <div className="footer-contact">
            <a href="mailto:support@heartcare.example" rel="noopener noreferrer">support@heartcare.example</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default Home;
