import React from "react";
import "./Contact.css";

const Contact = () => {
  const currentYear = new Date().getFullYear();

  return (
    <main className="contact-main" aria-labelledby="contact-heading">

      {/* ================= HERO / INTRO ================= */}
      <section className="contact-card" aria-labelledby="contact-title">
        <h1 id="contact-title" className="contact-title">
          <span className="contact-emoji" aria-hidden>📬</span>
          Let’s Connect
        </h1>

        <p className="contact-intro">
          I work at the intersection of <strong>Artificial Intelligence</strong> and
          <strong> Healthcare Technology</strong>, building scalable, real-world
          prediction systems like <strong>HeartCare Predictor</strong>.
          <br /><br />
          Whether you’re a recruiter, startup founder, researcher, or healthcare
          professional — I’m always open to meaningful discussions and collaborations.
        </p>

        <p className="contact-highlight">
          Let’s explore how AI can create measurable impact in preventive healthcare.
        </p>

        {/* ================= DIRECT CONTACT ================= */}
        <div className="contact-methods" aria-label="Direct contact methods">
          <a
            className="contact-method"
            href="tel:+917569205626"
            aria-label="Call G S S S Bhagavan"
          >
            <span className="contact-icon" aria-hidden>📞</span>
            <span className="contact-details">+91&nbsp;75692&nbsp;05626</span>
          </a>

          <a
            className="contact-method"
            href="mailto:g.sivasatyasaibhagavan@gmail.com"
            aria-label="Email G S S S Bhagavan"
          >
            <span className="contact-icon" aria-hidden>✉️</span>
            <span className="contact-details">
              g.sivasatyasaibhagavan@gmail.com
            </span>
          </a>
        </div>

        {/* ================= SOCIAL LINKS ================= */}
        <nav className="contact-socials" aria-label="Professional profiles">
          <a
            href="https://github.com/bhagavan444"
            className="contact-social-btn github"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
              alt="GitHub profile"
            />
            <span>GitHub</span>
          </a>

          <a
            href="https://linkedin.com/in/bhagavan444"
            className="contact-social-btn linkedin"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"
              alt="LinkedIn profile"
            />
            <span>LinkedIn</span>
          </a>
        </nav>

        {/* ================= PRIMARY CTA ================= */}
        <a
          href="mailto:g.sivasatyasaibhagavan@gmail.com"
          className="contact-primary-btn"
          aria-label="Send email"
        >
          Contact Me
        </a>
      </section>

      {/* ================= CONTACT FORM ================= */}
      <section className="contact-form-card" aria-labelledby="message-heading">
        <h2 id="message-heading" className="contact-section-title">
          Send a Quick Message
        </h2>

        <p className="contact-form-desc">
          Prefer a written message? Fill out the form below and I’ll respond as soon as possible.
        </p>

        <form
          className="contact-form"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Message submitted (demo)");
          }}
        >
          <label className="sr-only" htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Your Name"
            className="contact-input"
            required
          />

          <label className="sr-only" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Your Email"
            className="contact-input"
            required
          />

          <label className="sr-only" htmlFor="message">Message</label>
          <textarea
            id="message"
            placeholder="Your Message..."
            rows="4"
            className="contact-textarea"
            required
          />

          <button type="submit" className="contact-submit-btn">
            Send Message
          </button>
        </form>
      </section>

      {/* ================= COLLABORATION ================= */}
      <section className="contact-collab-card" aria-labelledby="collab-heading">
        <h2 id="collab-heading" className="contact-section-title">
          Collaboration & Opportunities
        </h2>

        <p className="contact-collab-text">
          I collaborate with <strong>AI startups</strong>, <strong>health-tech teams</strong>,
          <strong>research institutions</strong>, and <strong>clinical professionals</strong>.
        </p>

        <ul className="collab-list">
          <li>🤝 AI / ML Model Integration</li>
          <li>🏥 Clinical & Medical AI Research</li>
          <li>📊 Predictive Analytics Systems</li>
          <li>🧠 Deep Learning & Model Optimization</li>
          <li>🌐 MERN & Flask Full-Stack Development</li>
        </ul>

        <p className="contact-collab-bottom">
          If your work aligns with healthcare innovation, I’d love to explore collaboration.
        </p>
      </section>

      {/* ================= FAQ ================= */}
      <section className="contact-faq-card" aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="contact-section-title">
          Frequently Asked Questions
        </h2>

        <div className="faq-item">
          <strong>What is the usual response time?</strong>
          <p>Emails are typically answered within 24 hours.</p>
        </div>

        <div className="faq-item">
          <strong>Do you collaborate on academic research?</strong>
          <p>
            Yes — especially in AI-driven healthcare, predictive modeling, and data science.
          </p>
        </div>

        <div className="faq-item">
          <strong>Can we schedule a meeting?</strong>
          <p>
            Absolutely. Reach out via email or LinkedIn to schedule a call or Google Meet.
          </p>
        </div>
      </section>

      {/* ================= AVAILABILITY ================= */}
      <section className="contact-hours-card" aria-labelledby="hours-heading">
        <h2 id="hours-heading" className="contact-section-title">
          Availability
        </h2>

        <p className="contact-hours-text">
          <strong>Monday – Saturday:</strong> 10:00 AM – 6:00 PM
          <br />
          <strong>Sunday:</strong> Urgent queries only
        </p>
      </section>

      {/* ================= LOCATION ================= */}
      <section className="contact-location-card" aria-labelledby="location-heading">
        <h2 id="location-heading" className="contact-section-title">
          Location
        </h2>

        <p>
          Based in <strong>Eluru, Andhra Pradesh, India</strong>.  
          Open to <strong>remote opportunities</strong> and global collaboration.
        </p>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="contact-footer-note">
        © {currentYear} G S S S Bhagavan — AI & Health-Tech Developer  
        <br />
        Building intelligent systems for preventive healthcare.
      </footer>

    </main>
  );
};

export default Contact;
