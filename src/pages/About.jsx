import React from "react";
import "./About.css";

function About() {
  const currentYear = new Date().getFullYear();

  return (
    <main className="abt-main" aria-labelledby="aboutHeading">
      {/* Hero Intro / Profile */}
      <section className="abt-hero" aria-labelledby="profileHeading">
        <div className="abt-hero-inner">
          <div className="abt-avatar-card">
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              alt="G S S S Bhagavan — Developer"
              className="abt-avatar"
            />
            <div className="abt-badges" aria-hidden>
              <span className="badge">B.Tech — AI & Data Science</span>
              <span className="badge">Founder — HeartCare Predictor</span>
            </div>
          </div>

          <div className="abt-intro">
            <h1 id="profileHeading" className="abt-name">G S S S Bhagavan</h1>

            <div className="abt-subtitle">
              B.Tech (Artificial Intelligence & Data Science) · HeartCare Predictor — Lead Developer
            </div>

            <div className="abt-location">
              <strong>Ramachandra College of Engineering</strong>
              <span> • Eluru, Andhra Pradesh, India</span>
            </div>

            <blockquote className="abt-quote" aria-label="Personal mission">
              “Dedicated to making preventive cardiology accessible — combining robust ML with human-centered design.”
            </blockquote>

            <div className="abt-cta-row">
              <a href="/predict" className="abt-cta-btn">Try HeartCare Predictor</a>
              <a href="/assets/GSSS_Bhagavan_CV.pdf" className="abt-cta-link" download>
                Download CV
              </a>
            </div>

            <div className="abt-socials" aria-label="Social links">
              <a href="https://github.com/YourGitHub" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://www.linkedin.com/in/YourLinkedIn" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="mailto:gs@example.com">Email</a>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics / Quick Facts */}
      <section className="abt-card abt-stats-card" aria-labelledby="statsHeading">
        <h2 id="statsHeading" className="abt-section-title">By the numbers</h2>
        <div className="abt-stats-grid">
          <div className="stat">
            <div className="stat-value">1.2K+</div>
            <div className="stat-label">Predictions run (demo)</div>
          </div>
          <div className="stat">
            <div className="stat-value">95%</div>
            <div className="stat-label">Model validation accuracy (prototype)</div>
          </div>
          <div className="stat">
            <div className="stat-value">4</div>
            <div className="stat-label">Weeks from idea → MVP</div>
          </div>
          <div className="stat">
            <div className="stat-value">3</div>
            <div className="stat-label">Integrations planned (EHR, Wearables, API)</div>
          </div>
        </div>
      </section>

      {/* Skills / Tech Stack with proficiency */}
      <section className="abt-card abt-skills-card" aria-labelledby="skillsHeading">
        <h2 id="skillsHeading" className="abt-section-title">Skills & Tech Stack</h2>

        <div className="abt-skills-grid">
          <div className="skill">
            <div className="skill-title">React</div>
            <div className="skill-bar" role="progressbar" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100">
              <div className="skill-fill" style={{ width: "85%" }} />
            </div>
          </div>

          <div className="skill">
            <div className="skill-title">Tailwind / CSS</div>
            <div className="skill-bar">
              <div className="skill-fill" style={{ width: "80%" }} />
            </div>
          </div>

          <div className="skill">
            <div className="skill-title">Python</div>
            <div className="skill-bar">
              <div className="skill-fill" style={{ width: "90%" }} />
            </div>
          </div>

          <div className="skill">
            <div className="skill-title">TensorFlow / Keras</div>
            <div className="skill-bar">
              <div className="skill-fill" style={{ width: "78%" }} />
            </div>
          </div>

          <div className="skill">
            <div className="skill-title">Scikit-learn</div>
            <div className="skill-bar">
              <div className="skill-fill" style={{ width: "82%" }} />
            </div>
          </div>

          <div className="skill">
            <div className="skill-title">Flask & REST APIs</div>
            <div className="skill-bar">
              <div className="skill-fill" style={{ width: "88%" }} />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects / Demos */}
      <section className="abt-card abt-project-card" aria-labelledby="projectsHeading">
        <h2 id="projectsHeading" className="abt-section-title">Featured Projects & Demos</h2>

        <div className="project-list">
          <article className="project">
            <h3>HeartCare Predictor — MVP</h3>
            <p>
              End-to-end demo combining a Flask backend (ML inference + scoring), a React/Tailwind frontend,
              and a lightweight MongoDB store for user metadata. Features include live slider preview,
              clinician-ready PDF exports, and role-based access for Pro users.
            </p>
            <div className="project-links">
              <a href="/predict">Open demo</a>
              <a href="https://github.com/YourGitHub/heartcare-predictor" target="_blank" rel="noopener noreferrer">Source</a>
            </div>
          </article>

          <article className="project">
            <h3>Fruit & Vegetable Rotten Detector (Transfer Learning)</h3>
            <p>
              Transfer-learning using MobileNetV2 to classify healthy vs rotten produce. Built as
              a separate web tool during internship — used for image preprocessing and model pipeline examples.
            </p>
            <div className="project-links">
              <a href="https://github.com/YourGitHub/fruit-detect" target="_blank" rel="noopener noreferrer">Source</a>
            </div>
          </article>

          <article className="project">
            <h3>Resume Builder — MERN</h3>
            <p>
              A full MERN stack resume builder that scores resumes for ATS compatibility, supporting Google/GitHub login
              and dynamic template downloads (PDF/Word).
            </p>
            <div className="project-links">
              <a href="/resume-builder">Try</a>
              <a href="https://github.com/YourGitHub/resume-builder" target="_blank" rel="noopener noreferrer">Source</a>
            </div>
          </article>
        </div>
      </section>

      {/* Publications, Certifications & Awards */}
      <section className="abt-card abt-pubs-card" aria-labelledby="pubsHeading">
        <h2 id="pubsHeading" className="abt-section-title">Publications, Certifications & Awards</h2>

        <ul className="pubs-list">
          <li>
            <strong>Certificate:</strong> TensorFlow Developer Certificate — (practical ML & transfer learning).
          </li>
          <li>
            <strong>Award:</strong> 1st place — College Hackathon (Community Recycling Marketplace).
          </li>
          <li>
            <strong>Paper / Report:</strong> "Prototype pipeline for heart disease risk scoring using ensemble methods" — internal report (2024).
          </li>
        </ul>
      </section>

      {/* Testimonials / Mentions */}
      <section className="abt-card abt-testimonials" aria-labelledby="testimonialsHeading">
        <h2 id="testimonialsHeading" className="abt-section-title">Testimonials</h2>

        <div className="testimonial-list">
          <blockquote>
            “The predictor is clear and clinically sensible — a helpful screening tool.” — Dr. Ramesh, Cardiologist
          </blockquote>
          <blockquote>
            “Great UI and instant feedback — our team used it for a pilot wellness program.” — Wellness Lead, TechCorp
          </blockquote>
        </div>
      </section>

      {/* Collaborators & Acknowledgements */}
      <section className="abt-card abt-collab-card" aria-labelledby="collabHeading">
        <h2 id="collabHeading" className="abt-section-title">Team & Collaborators</h2>
        <p>
          Project collaborators and contributors:
        </p>
        <ul className="collab-list">
          <li>M Dhana Pujitha — Team Lead</li>
          <li>Jyothi Jakkamsetti — Frontend</li>
          <li>Seelam Divya Sree — Data Collection & Testing</li>
          <li>G S S S Bhagavan — Model development & Backend</li>
        </ul>
        <p className="ack">
          Special thanks to mentors, faculty, and the Brainovision workshop team for support during the hackathon and development.
        </p>
      </section>

      {/* Roadmap */}
      <section className="abt-card abt-roadmap" aria-labelledby="roadmapHeading">
        <h2 id="roadmapHeading" className="abt-section-title">Roadmap</h2>
        <ol className="roadmap-list">
          <li><strong>Q1 — Model validation:</strong> Expand dataset, cross-site validation, and clinical partner evaluation.</li>
          <li><strong>Q2 — Integrations:</strong> FHIR-ready API, wearable ingestion, and EHR connectors.</li>
          <li><strong>Q3 — Privacy & Compliance:</strong> HIPAA/GDPR readiness, data residency features, and audits.</li>
          <li><strong>Q4 — Scalability:</strong> Enterprise onboarding, SLA packages, and advanced analytics dashboard.</li>
        </ol>
      </section>

      {/* Privacy & Ethics note */}
      <section className="abt-card abt-ethics" aria-labelledby="ethicsHeading">
        <h2 id="ethicsHeading" className="abt-section-title">Privacy, Ethics & Safety</h2>
        <p className="abt-description">
          HeartCare Predictor is a research & demo product. Predictions are illustrative and not a substitute for professional medical advice.
          For production deployments we plan to implement strict privacy safeguards: end-to-end encryption, data minimization,
          role-based access control, audit logging, and support for regulatory compliance (HIPAA/GDPR) where required.
        </p>
      </section>

      {/* Contact / Call to action */}
      <section className="abt-card abt-contact-card" aria-labelledby="contactHeading">
        <h2 id="contactHeading" className="abt-section-title">Contact & Next Steps</h2>
        <p>
          Interested in collaboration, research validation, or enterprise pilots? Reach out — I’m open to partnerships with clinics, wellness programs, and research groups.
        </p>

        <div className="contact-actions">
          <a className="homepage-btn" href="mailto:gs@example.com">Email Me</a>
          <a className="homepage-btn-outline" href="/contact">Request a Demo</a>
        </div>

        <div className="mini-profile">
          <div><strong>Name:</strong> G S S S Bhagavan</div>
          <div><strong>Role:</strong> B.Tech Student, AI & Data Science Specialist</div>
          <div><strong>Institution:</strong> Ramachandra College of Engineering</div>
          <div><strong>Location:</strong> Eluru, Andhra Pradesh, India</div>
        </div>
      </section>

      {/* Footer-like small note */}
      <section className="abt-footer-note" aria-hidden>
        <p>© {currentYear} G S S S Bhagavan — Built with ❤️ for health & learning.</p>
      </section>
    </main>
  );
}

export default About;
