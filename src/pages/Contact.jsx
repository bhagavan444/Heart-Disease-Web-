import React from "react";
import "./Contact.css";

function Contact() {
  return (
    <main className="contact-main">

      {/* Contact Card */}
      <section className="contact-card">
        <h1 className="contact-title">
          <span className="contact-emoji">📬</span> Let's Connect
        </h1>

        <p className="contact-intro">
          Innovating at the intersection of <strong>AI and Health-Tech</strong>.  
          Whether you're exploring collaborations, want to integrate AI predictions into healthcare workflows,
          or simply wish to learn more about the HeartCare Predictor, I'm always open to meaningful conversations.
          <br /><br />
          <span className="contact-highlight">
            Reach out today — together we can build impactful solutions for better heart health.
          </span>
        </p>

        {/* Direct Contact Methods */}
        <div className="contact-methods">
          <a
            className="contact-method"
            href="tel:+917569205626"
            aria-label="Call G S S S Bhagavan at +91 7569205626"
          >
            <span className="contact-icon">📞</span>
            <span className="contact-details">+91 7569205626</span>
          </a>

          <a
            className="contact-method"
            href="mailto:g.sivasatyasaibhagavan@gmail.com"
            aria-label="Email G S S S Bhagavan"
          >
            <span className="contact-icon">✉️</span>
            <span className="contact-details">g.sivasatyasaibhagavan@gmail.com</span>
          </a>
        </div>

        {/* Social Buttons */}
        <div className="contact-socials">
          <a
            href="https://github.com/bhagavan444"
            className="contact-social-btn github"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
              alt="GitHub"
            />
            <span className="contact-social-text">GitHub</span>
          </a>

          <a
            href="https://linkedin.com/in/bhagavan444"
            className="contact-social-btn linkedin"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"
              alt="LinkedIn"
            />
            <span className="contact-social-text">LinkedIn</span>
          </a>
        </div>

        {/* CTA Button */}
        <a
          href="mailto:g.sivasatyasaibhagavan@gmail.com"
          className="abt-cta-btn contact-primary-btn"
        >
          Contact Me Now
        </a>
      </section>

      {/* Mini Contact Form */}
      <section className="contact-form-card">
        <h2 className="contact-section-title">Send a Quick Message</h2>
        <p className="contact-form-desc">
          Prefer to send a direct message? Fill out this short form and I'll get back to you as soon as possible.
        </p>
        <form className="contact-form">
          <input type="text" placeholder="Your Name" className="contact-input" required />
          <input type="email" placeholder="Your Email" className="contact-input" required />
          <textarea placeholder="Your Message..." rows="4" className="contact-textarea" required />
          <button type="submit" className="contact-submit-btn">
            Send Message
          </button>
        </form>
      </section>

      {/* Collaboration Section */}
      <section className="contact-collab-card">
        <h2 className="contact-section-title">Collaboration & Opportunities</h2>
        <p className="contact-collab-text">
          I'm open to working with <strong>health-tech startups</strong>, 
          <strong>research groups</strong>, <strong>AI innovation teams</strong>, and 
          <strong>healthcare professionals</strong> interested in predictive modeling.
        </p>

        <ul className="collab-list">
          <li>🤝 AI/ML Model Integration</li>
          <li>🏥 Clinical Research Collaboration</li>
          <li>📊 Predictive Analytics Projects</li>
          <li>🧠 Deep Learning Model Development</li>
          <li>🌐 MERN & Flask Full-Stack Development</li>
        </ul>

        <p className="contact-collab-bottom">
          If your project aligns with health, innovation, or AI — let's explore working together!
        </p>
      </section>

      {/* Contact FAQ */}
      <section className="contact-faq-card">
        <h2 className="contact-section-title">Frequently Asked Questions</h2>

        <div className="faq-item">
          <strong>📌 What is the response time?</strong>
          <p>Usually within 24 hours for email and instant for calls (during working hours).</p>
        </div>

        <div className="faq-item">
          <strong>📌 Do you collaborate on academic research?</strong>
          <p>Yes, especially in healthcare AI, ML model optimization, and data science projects.</p>
        </div>

        <div className="faq-item">
          <strong>📌 Can I schedule a meeting?</strong>
          <p>Yes — message me via email or LinkedIn to book a call or Google Meet session.</p>
        </div>
      </section>

      {/* Availability / Support Hours */}
      <section className="contact-hours-card">
        <h2 className="contact-section-title">Availability</h2>
        <p className="contact-hours-text">
          <strong>Monday – Saturday:</strong> 10:00 AM – 6:00 PM  
          <br />
          <strong>Sunday:</strong> Available for urgent queries only
        </p>
      </section>

      {/* Location Info */}
      <section className="contact-location-card">
        <h2 className="contact-section-title">Location</h2>
        <p>
          Based in <strong>Eluru, Andhra Pradesh, India</strong>.  
          Open to <strong>remote collaboration</strong> across India and worldwide.
        </p>
      </section>

      {/* Footer Note */}
      <footer className="contact-footer-note">
        © {new Date().getFullYear()} G S S S Bhagavan — AI & Health-Tech Developer.  
        <br />
        Built with ❤️ to improve heart health through intelligent predictions.
      </footer>
    </main>
  );
}

export default Contact;
