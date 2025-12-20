import React, { useEffect } from "react";
import "./About.css";
import { Helmet } from "react-helmet"; // For meta title & favicon

const About = () => {
  const currentYear = new Date().getFullYear();

  // Animation logic for counters and skill bars
  useEffect(() => {
    const counters = document.querySelectorAll('.stat-value[data-target]');
    const skills = document.querySelectorAll('.skill-fill');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Counter animation for stats
            if (entry.target.hasAttribute('data-target')) {
              const target = parseInt(entry.target.getAttribute('data-target'));
              const suffix = entry.target.textContent.includes('%') ? '%' : '+';
              let count = 0;
              const increment = target / 100; // Smooth increment
              const timer = setInterval(() => {
                count += increment;
                if (count >= target) {
                  entry.target.textContent = target + suffix;
                  clearInterval(timer);
                } else {
                  entry.target.textContent = Math.floor(count) + suffix;
                }
              }, 20);
            }

            // Skill bar animation
            if (entry.target.classList.contains('skill-fill')) {
              const width = entry.target.getAttribute('data-width');
              const delay = entry.target.getAttribute('data-delay') || 0;
              setTimeout(() => {
                entry.target.style.width = width;
              }, delay);
            }
          }
        });
      },
      { threshold: 0.3 } // Trigger when 30% of element is visible
    );

    // Observe all counters and skill bars
    counters.forEach((counter) => observer.observe(counter));
    skills.forEach((skill) => observer.observe(skill));

    // Cleanup observer on unmount
    return () => observer.disconnect();
  }, []); // Empty dependency array → runs once on mount

  return (
    <>
      {/* ================= META TITLE & FAVICON ================= */}
      <Helmet>
        <title>G S S S Bhagavan | AI & Healthcare Developer Portfolio</title>
        <link rel="icon" href="/favicon.ico" />
      </Helmet>

      <main className="abt-main" aria-labelledby="about-heading">

        {/* ================= HERO / PROFILE ================= */}
        <section className="abt-hero" aria-labelledby="profile-heading">
          <div className="abt-hero-inner">

            {/* ===== ENHANCED AI IDENTITY PANEL WITH FLOAT ANIMATION ===== */}
            <div className="abt-avatar-card animate-float">
              <div className="ai-identity-glow" />
              <h3 className="ai-identity-title">AI Developer Identity</h3>

              <ul className="ai-identity-list">
                <li>🧠 Domain: Healthcare Artificial Intelligence</li>
                <li>📊 Focus: Predictive Analytics & Risk Modeling</li>
                <li>⚙️ Stack: ML + Full-Stack Engineering</li>
                <li>🔍 Strength: Explainable & Ethical AI</li>
                <li>🚀 Goal: Real-World Clinical Impact</li>
              </ul>

              <div className="abt-badges">
                <span className="badge">B.Tech — AI & Data Science</span>
                <span className="badge">Lead Developer — HeartCare Predictor</span>
                <span className="badge">Healthcare AI Research</span>
              </div>
            </div>

            {/* ================= INTRO ================= */}
            <div className="abt-intro">
              <h1 id="profile-heading" className="abt-name">
                G S S S Bhagavan
              </h1>

              <p className="abt-subtitle">
                Artificial Intelligence & Data Science Engineer ·
                Full-Stack & Machine Learning Developer
              </p>

              <p className="abt-location">
                <strong>Ramachandra College of Engineering</strong>
                <span> · Eluru, Andhra Pradesh, India</span>
              </p>

              <blockquote className="abt-quote">
                “Designing responsible AI systems to support early disease
                detection and preventive healthcare decisions.”
              </blockquote>

              <div className="abt-cta-row">
                <a href="/predict" className="abt-cta-btn primary">
                  Try HeartCare Predictor
                </a>
                <a href="/assets/GSSS_Bhagavan_CV.pdf" className="abt-cta-btn secondary" download>
                  Download Resume
                </a>
              </div>

              <nav className="abt-socials">
                <a href="https://github.com/YourGitHub" target="_blank" rel="noreferrer" aria-label="GitHub">
                  GitHub
                </a>
                <a href="https://www.linkedin.com/in/YourLinkedIn" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  LinkedIn
                </a>
                <a href="mailto:gs@example.com" aria-label="Email">
                  Email
                </a>
              </nav>
            </div>
          </div>

          {/* Subtle ECG wave background in hero */}
          <div className="ecg-background">
            <svg className="ecg-wave" viewBox="0 0 1000 200" preserveAspectRatio="none">
              <path d="M0,100 L100,100 L120,100 L125,40 L130,160 L135,100 L200,100 L1000,100" />
            </svg>
            <svg className="ecg-wave ecg-wave-2" viewBox="0 0 1000 200" preserveAspectRatio="none">
              <path d="M0,100 L100,100 L120,100 L125,40 L130,160 L135,100 L200,100 L1000,100" />
            </svg>
          </div>
        </section>

        {/* ================= PROJECT OVERVIEW ================= */}
        <section className="abt-card">
          <h2 className="abt-section-title">About HeartCare Predictor</h2>
          <p>
            HeartCare Predictor is an intelligent healthcare analytics platform
            developed to estimate heart disease risk using machine learning.
            It transforms clinical parameters into actionable insights through
            an explainable, full-stack AI system.
          </p>
        </section>

        {/* ================= QUICK STATS WITH COUNTER ANIMATION ================= */}
        <section className="abt-card abt-stats-card">
          <h2 className="abt-section-title">Project Impact — At a Glance</h2>
          <div className="abt-stats-grid">
            <div className="stat">
              <div className="stat-value" data-target="1200">0+</div>
              <div className="stat-label">Predictions Tested</div>
            </div>
            <div className="stat">
              <div className="stat-value" data-target="95">0%</div>
              <div className="stat-label">Validation Accuracy</div>
            </div>
            <div className="stat">
              <div className="stat-value" data-target="12">0+</div>
              <div className="stat-label">Clinical Parameters</div>
            </div>
            <div className="stat">
              <div className="stat-value">End-to-End</div>
              <div className="stat-label">ML + API + UI</div>
            </div>
          </div>
        </section>

        {/* ================= CORE FEATURES ================= */}
        <section className="abt-card">
          <h2 className="abt-section-title">Core System Features</h2>
          <ul className="abt-feature-list">
            <li>🧠 ML-based heart disease risk prediction engine</li>
            <li>📊 Probability-based outputs instead of binary results</li>
            <li>🔍 Explainable AI highlighting key risk factors</li>
            <li>⚙️ Flask REST API with React frontend integration</li>
            <li>🔐 Stateless prediction with privacy-first design</li>
            <li>📈 Feature scaling, cross-validation & optimization</li>
          </ul>
        </section>

        {/* ================= SKILLS WITH ANIMATED BARS ================= */}
        <section className="abt-card abt-skills-card">
          <h2 className="abt-section-title">Skills & Technology Stack</h2>
          <div className="abt-skills-grid">
            {[
              ["React.js", "85%"],
              ["HTML / CSS / Tailwind", "80%"],
              ["Python", "90%"],
              ["Scikit-learn", "85%"],
              ["TensorFlow / Keras", "78%"],
              ["Flask & REST APIs", "88%"],
              ["Pandas & NumPy", "90%"],
            ].map(([skill, level], index) => (
              <div className="skill" key={skill}>
                <div className="skill-header">
                  <span className="skill-title">{skill}</span>
                  <span className="skill-percent">{level}</span>
                </div>
                <div className="skill-bar">
                  <div 
                    className="skill-fill" 
                    style={{ width: "0%" }}
                    data-width={level}
                    data-delay={index * 100}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= PROJECTS ================= */}
        <section className="abt-card abt-project-card">
          <h2 className="abt-section-title">Featured Projects</h2>

          <article className="project highlight-project">
            <h3>❤️ HeartCare Predictor</h3>
            <p>
              Full-stack AI healthcare system predicting heart disease risk
              using structured medical data with explainable outputs.
            </p>
            <div className="project-links">
              <a href="/predict">Live Demo</a>
              <a href="https://github.com/YourGitHub/heartcare-predictor" target="_blank" rel="noreferrer">Source Code</a>
            </div>
          </article>

          <article className="project">
            <h3>🍎 Fruit & Vegetable Rotten Detection</h3>
            <p>
              CNN-based classification using MobileNetV2 and transfer learning
              to detect fresh vs rotten produce.
            </p>
          </article>

          <article className="project">
            <h3>📄 ATS-Optimized Resume Builder (MERN)</h3>
            <p>
              Resume creation platform with ATS scoring, OAuth login,
              and PDF/Word download support.
            </p>
          </article>
        </section>

        {/* ================= ROADMAP ================= */}
        <section className="abt-card abt-roadmap">
          <h2 className="abt-section-title">Roadmap & Future Vision</h2>
          <ol className="roadmap-list">
            <li><strong>Q1 {currentYear + 1}:</strong> Larger datasets & feature engineering</li>
            <li><strong>Q2 {currentYear + 1}:</strong> Wearable & EHR integration</li>
            <li><strong>Q3 {currentYear + 1}:</strong> Bias analysis & privacy-preserving ML</li>
            <li><strong>Q4 {currentYear + 1}:</strong> Hospital-scale deployment dashboard</li>
          </ol>
        </section>

        {/* ================= ETHICS ================= */}
        <section className="abt-card abt-ethics">
          <h2 className="abt-section-title">Ethics, Privacy & Disclaimer</h2>
          <p>
            This system is developed for educational and research purposes only.
            Predictions are not a substitute for professional medical diagnosis.
            Future versions will comply with HIPAA & GDPR standards.
          </p>
        </section>

        {/* ================= CONTACT ================= */}
        <section className="abt-card abt-contact-card">
          <h2 className="abt-section-title">Contact & Collaboration</h2>
          <p>
            Open to AI/ML internships, healthcare research collaborations,
            and software engineering roles.
          </p>
          <div className="contact-actions">
            <a className="homepage-btn primary" href="mailto:gs@example.com">Email Me</a>
            <a className="homepage-btn secondary" href="/contact">Request Demo</a>
          </div>
        </section>

        <footer className="abt-footer-note">
          © {currentYear} G S S S Bhagavan · Advancing Healthcare with Responsible AI
        </footer>

      </main>
    </>
  );
};

export default About;