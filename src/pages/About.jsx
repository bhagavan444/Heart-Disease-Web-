import React from "react";
import "./About.css";

const About = () => {
  const currentYear = new Date().getFullYear();

  return (
    <main className="abt-main" aria-labelledby="about-heading">

      {/* ================= HERO / PROFILE ================= */}
      <section className="abt-hero" aria-labelledby="profile-heading">
        <div className="abt-hero-inner">

          {/* Profile Card */}
          <div className="abt-avatar-card">
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              alt="G S S S Bhagavan — AI & Data Science Developer"
              className="abt-avatar"
            />

            <div className="abt-badges" aria-hidden="true">
              <span className="badge">B.Tech — AI & Data Science</span>
              <span className="badge">Lead Developer — HeartCare Predictor</span>
            </div>
          </div>

          {/* Intro */}
          <div className="abt-intro">
            <h1 id="profile-heading" className="abt-name">
              G S S S Bhagavan
            </h1>

            <p className="abt-subtitle">
              B.Tech (Artificial Intelligence & Data Science) ·
              Full-Stack & Machine Learning Developer
            </p>

            <p className="abt-location">
              <strong>Ramachandra College of Engineering</strong>
              <span> · Eluru, Andhra Pradesh, India</span>
            </p>

            <blockquote className="abt-quote">
              “Focused on building scalable, ethical AI systems that enable
              early disease detection and better preventive healthcare.”
            </blockquote>

            {/* CTA */}
            <div className="abt-cta-row">
              <a href="/predict" className="abt-cta-btn">
                Try HeartCare Predictor
              </a>
              <a
                href="/assets/GSSS_Bhagavan_CV.pdf"
                className="abt-cta-link"
                download
              >
                Download Resume
              </a>
            </div>

            {/* Socials */}
            <nav className="abt-socials" aria-label="Social links">
              <a
                href="https://github.com/YourGitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/YourLinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a href="mailto:gs@example.com">Email</a>
            </nav>
          </div>
        </div>
      </section>

      {/* ================= QUICK STATS ================= */}
      <section className="abt-card abt-stats-card" aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="abt-section-title">
          Project Impact — At a Glance
        </h2>

        <div className="abt-stats-grid">
          <div className="stat">
            <div className="stat-value">1.2K+</div>
            <div className="stat-label">Prediction runs (demo)</div>
          </div>
          <div className="stat">
            <div className="stat-value">95%</div>
            <div className="stat-label">Model validation accuracy</div>
          </div>
          <div className="stat">
            <div className="stat-value">4</div>
            <div className="stat-label">Weeks from idea to MVP</div>
          </div>
          <div className="stat">
            <div className="stat-value">3</div>
            <div className="stat-label">Planned enterprise integrations</div>
          </div>
        </div>
      </section>

      {/* ================= SKILLS ================= */}
      <section className="abt-card abt-skills-card" aria-labelledby="skills-heading">
        <h2 id="skills-heading" className="abt-section-title">
          Skills & Technology Stack
        </h2>

        <div className="abt-skills-grid">
          {[
            ["React.js", "85%"],
            ["CSS / Tailwind", "80%"],
            ["Python", "90%"],
            ["TensorFlow / Keras", "78%"],
            ["Scikit-learn", "82%"],
            ["Flask & REST APIs", "88%"],
          ].map(([skill, level]) => (
            <div className="skill" key={skill}>
              <div className="skill-title">{skill}</div>
              <div className="skill-bar" role="progressbar">
                <div className="skill-fill" style={{ width: level }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= PROJECTS ================= */}
      <section className="abt-card abt-project-card" aria-labelledby="projects-heading">
        <h2 id="projects-heading" className="abt-section-title">
          Featured Projects
        </h2>

        <div className="project-list">
          <article className="project">
            <h3>HeartCare Predictor — Full-Stack AI System</h3>
            <p>
              End-to-end healthcare prediction system using a Flask-based ML
              backend and React frontend. Includes live risk simulation,
              explainable outputs, and clinician-ready reporting.
            </p>
            <div className="project-links">
              <a href="/predict">Live Demo</a>
              <a
                href="https://github.com/YourGitHub/heartcare-predictor"
                target="_blank"
                rel="noopener noreferrer"
              >
                Source Code
              </a>
            </div>
          </article>

          <article className="project">
            <h3>Fruit & Vegetable Rotten Detection</h3>
            <p>
              Transfer-learning solution using MobileNetV2 to classify fresh
              vs rotten produce. Built during internship to demonstrate CNN
              pipelines and deployment workflows.
            </p>
            <div className="project-links">
              <a
                href="https://github.com/YourGitHub/fruit-detect"
                target="_blank"
                rel="noopener noreferrer"
              >
                Source Code
              </a>
            </div>
          </article>

          <article className="project">
            <h3>ATS-Optimized Resume Builder (MERN)</h3>
            <p>
              Full MERN stack application enabling resume creation, ATS scoring,
              and dynamic PDF/Word downloads with OAuth authentication.
            </p>
            <div className="project-links">
              <a href="/resume-builder">Try App</a>
              <a
                href="https://github.com/YourGitHub/resume-builder"
                target="_blank"
                rel="noopener noreferrer"
              >
                Source Code
              </a>
            </div>
          </article>
        </div>
      </section>

      {/* ================= ROADMAP ================= */}
      <section className="abt-card abt-roadmap" aria-labelledby="roadmap-heading">
        <h2 id="roadmap-heading" className="abt-section-title">
          Roadmap & Vision
        </h2>

        <ol className="roadmap-list">
          <li><strong>Q1:</strong> Dataset expansion & cross-validation</li>
          <li><strong>Q2:</strong> Wearable & EHR integrations</li>
          <li><strong>Q3:</strong> Privacy, compliance & audit readiness</li>
          <li><strong>Q4:</strong> Enterprise-scale deployment & analytics</li>
        </ol>
      </section>

      {/* ================= ETHICS ================= */}
      <section className="abt-card abt-ethics" aria-labelledby="ethics-heading">
        <h2 id="ethics-heading" className="abt-section-title">
          Ethics, Privacy & Safety
        </h2>
        <p>
          This system is designed for educational and research purposes.
          Predictions are illustrative and not a replacement for professional
          medical diagnosis. Future deployments will follow strict privacy,
          encryption and regulatory compliance standards (HIPAA/GDPR).
        </p>
      </section>

      {/* ================= CONTACT ================= */}
      <section className="abt-card abt-contact-card" aria-labelledby="contact-heading">
        <h2 id="contact-heading" className="abt-section-title">
          Contact & Collaboration
        </h2>

        <p>
          Open to internships, research collaboration, healthcare pilots and
          software engineering roles.
        </p>

        <div className="contact-actions">
          <a className="homepage-btn" href="mailto:gs@example.com">
            Email Me
          </a>
          <a className="homepage-btn-outline" href="/contact">
            Request Demo
          </a>
        </div>
      </section>

      {/* ================= FOOTER NOTE ================= */}
      <footer className="abt-footer-note">
        © {currentYear} G S S S Bhagavan · Built with ❤️ for healthcare innovation
      </footer>

    </main>
  );
};

export default About;
