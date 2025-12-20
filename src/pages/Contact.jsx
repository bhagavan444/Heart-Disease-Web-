import React, { useState } from "react";
import "./Contact.css";
import { Helmet } from "react-helmet";

const Contact = () => {
  const currentYear = new Date().getFullYear();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulate form submission (replace with real backend in production)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>Contact G S S S Bhagavan | AI & Healthcare Developer</title>
        <meta
          name="description"
          content="Get in touch with G S S S Bhagavan for AI/ML collaborations, healthcare tech projects, internships, or professional opportunities."
        />
      </Helmet>

      <main className="contact-main" aria-labelledby="contact-heading">

        {/* ================= HERO / INTRO ================= */}
        <section className="contact-hero" aria-labelledby="contact-title">
          <div className="contact-hero-inner">
            <h1 id="contact-title" className="contact-title">
              <span className="contact-emoji">📬</span>
              Let’s Build the Future of Healthcare AI
            </h1>

            <p className="contact-intro">
              I specialize in <strong>Artificial Intelligence for Healthcare</strong> — developing real-time predictive systems like <strong>HeartCare Predictor</strong> using explainable ML and full-stack engineering.
              <br /><br />
              Open to collaborations with startups, researchers, hospitals, and tech teams driving innovation in preventive medicine.
            </p>

            <div className="contact-quick-actions">
              <a href="tel:+917569205626" className="quick-contact phone">
                <span className="quick-icon">📞</span>
                <span>+91 75692 05626</span>
              </a>
              <a href="mailto:g.sivasatyasaibhagavan@gmail.com" className="quick-contact email">
                <span className="quick-icon">✉️</span>
                <span>g.sivasatyasaibhagavan@gmail.com</span>
              </a>
            </div>

            <nav className="contact-socials">
              <a
                href="https://github.com/bhagavan444"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn github"
                aria-label="GitHub Profile"
              >
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                  alt=""
                />
                <span>GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/bhagavan444"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn linkedin"
                aria-label="LinkedIn Profile"
              >
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"
                  alt=""
                />
                <span>LinkedIn</span>
              </a>
            </nav>

            <a
              href="mailto:g.sivasatyasaibhagavan@gmail.com?subject=Collaboration%20Inquiry"
              className="contact-primary-cta"
            >
              Start a Conversation
            </a>
          </div>

          {/* Subtle ECG background */}
          <div className="ecg-background">
            <svg className="ecg-wave" viewBox="0 0 1000 200" preserveAspectRatio="none">
              <path d="M0,100 L100,100 L120,100 L125,40 L130,160 L135,100 L200,100 L1000,100" />
            </svg>
            <svg className="ecg-wave ecg-wave-2" viewBox="0 0 1000 200" preserveAspectRatio="none">
              <path d="M0,100 L100,100 L120,100 L125,40 L130,160 L135,100 L200,100 L1000,100" />
            </svg>
          </div>
        </section>

        {/* ================= ENHANCED CONTACT FORM ================= */}
        

        {/* ================= COLLABORATION INTERESTS ================= */}
        <section className="contact-interests">
          <div className="contact-card">
            <h2 className="contact-section-title">Areas of Collaboration</h2>
            <p className="contact-interests-intro">
              I’m particularly excited about projects involving:
            </p>

            <div className="interests-grid">
              <div className="interest-item">
                <span className="interest-emoji">🧠</span>
                <strong>Medical AI & Predictive Modeling</strong>
              </div>
              <div className="interest-item">
                <span className="interest-emoji">🏥</span>
                <strong>Clinical Decision Support Systems</strong>
              </div>
              <div className="interest-item">
                <span className="interest-emoji">📊</span>
                <strong>Population Health Analytics</strong>
              </div>
              <div className="interest-item">
                <span className="interest-emoji">🔬</span>
                <strong>Research & Academic Publications</strong>
              </div>
              <div className="interest-item">
                <span className="interest-emoji">⚡</span>
                <strong>Real-Time Health Monitoring</strong>
              </div>
              <div className="interest-item">
                <span className="interest-emoji">🌍</span>
                <strong>Global Health Initiatives</strong>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section className="contact-faq">
          <div className="contact-card">
            <h2 className="contact-section-title">Frequently Asked Questions</h2>

            <div className="faq-list">
              <details className="faq-item">
                <summary>What is your typical response time?</summary>
                <p>I usually respond within 24–48 hours on weekdays.</p>
              </details>

              <details className="faq-item">
                <summary>Do you accept freelance or consulting work?</summary>
                <p>Yes — selectively for impactful healthcare AI projects.</p>
              </details>

              <details className="faq-item">
                <summary>Are you open to internships or mentoring?</summary>
                <p>Absolutely. I enjoy guiding students passionate about AI in healthcare.</p>
              </details>

              <details className="faq-item">
                <summary>Can we schedule a call?</summary>
                <p>Yes! Just email me your availability and preferred platform (Google Meet, Zoom).</p>
              </details>
            </div>
          </div>
        </section>

        {/* ================= AVAILABILITY & LOCATION ================= */}
        <section className="contact-info-grid">
          <div className="contact-card availability-card">
            <h2 className="contact-section-title">Availability</h2>
            <p>
              <strong>General Inquiries:</strong> Mon–Sat, 10 AM – 6 PM IST<br />
              <strong>Urgent / Time-Sensitive:</strong> Anytime via phone
            </p>
          </div>

          <div className="contact-card location-card">
            <h2 className="contact-section-title">Location</h2>
            <p>
              <strong>Eluru, Andhra Pradesh, India</strong><br />
              Fully equipped for <strong>remote/global collaboration</strong>
            </p>
          </div>
        </section>

        {/* ================= FOOTER ================= */}
        <footer className="contact-footer">
          <p>
            © {currentYear} G S S S Bhagavan · AI Engineer & Healthcare Innovator
          </p>
          <p>Building ethical, impactful AI for preventive healthcare worldwide.</p>
        </footer>

      </main>
    </>
  );
};

export default Contact;