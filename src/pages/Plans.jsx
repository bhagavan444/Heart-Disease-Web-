import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Plans.css";
import { Helmet } from "react-helmet";

const Plans = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState("monthly");

  /* ================= PLANS DATA - MNC & REAL-TIME FOCUSED ================= */
  const plans = [
    {
      id: "free",
      name: "Free",
      price: { monthly: 0, yearly: 0 },
      badge: "Free Forever",
      description:
        "Perfect for individual users, students, and initial health awareness checks.",
      features: [
        "Real-time basic risk prediction",
        "Core clinical parameter analysis",
        "Instant AI insights",
        "Mobile & web access",
        { text: "Prediction history & trends", disabled: true },
        { text: "Explainable AI reports", disabled: true },
        { text: "API access", disabled: true },
        { text: "Team collaboration", disabled: true },
      ],
      cta: { text: "Start Free Now", action: () => navigate("/predict") },
      featured: false,
    },
    {
      id: "pro",
      name: "Professional",
      price: { monthly: 29, yearly: 290 },
      badge: "Most Popular",
      description:
        "Designed for healthcare professionals, clinics, and teams needing advanced analytics and reporting.",
      features: [
        "Advanced real-time ML models (95%+ accuracy)",
        "Full prediction history & longitudinal trends",
        "Explainable AI (XAI) with feature importance",
        "Downloadable clinical-grade PDF/CSV reports",
        "Personalized risk recommendations",
        "Priority support (email + chat)",
        "Team collaboration (up to 10 users)",
        "Data export & integration ready",
      ],
      cta: { text: "Start Pro Trial", action: () => navigate("/signup?plan=pro") },
      featured: true,
      trial: "14-day free trial • No card required",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: { monthly: "Custom", yearly: "Custom" },
      badge: "Scale & Compliance",
      description:
        "Tailored for hospitals, insurance providers, corporate wellness programs, and large-scale deployments.",
      features: [
        "All Professional features",
        "Real-time API access (FHIR/HL7 compatible)",
        "EHR/EMR system integration",
        "Single Sign-On (SSO) & role-based access",
        "Full HIPAA, GDPR, SOC 2 compliance",
        "Dedicated account manager & SLA",
        "Custom model training & analytics",
        "On-premise or private cloud deployment",
        "Wearable & IoT device streaming",
        "Advanced population health dashboards",
      ],
      cta: { text: "Contact Sales", action: () => navigate("/contact?plan=enterprise") },
      featured: false,
      trial: "Custom pilot & proof-of-concept available",
    },
  ];

  /* ================= HELPERS ================= */
  const formatPrice = (v) => (v === 0 ? "Free" : v === "Custom" ? "Custom" : `$${v}`);

  const computedPlans = useMemo(
    () =>
      plans.map((p) => {
        const price = p.price[billingCycle];
        return {
          ...p,
          displayPrice:
            price === "Custom"
              ? "Custom Pricing"
              : billingCycle === "monthly"
              ? `${formatPrice(price)} /mo`
              : `${formatPrice(price)} /yr`,
          effectiveMonthly:
            billingCycle === "yearly" && typeof price === "number" && price > 0
              ? (price / 12).toFixed(0)
              : null,
        };
      }),
    [billingCycle]
  );

  return (
    <>
      <Helmet>
        <title>Pricing Plans | Cardiac-AI Enterprise Healthcare Platform</title>
        <meta
          name="description"
          content="Transparent pricing for real-time AI heart disease prediction. Free, Professional, and Enterprise plans with HIPAA compliance, API access, and advanced analytics."
        />
      </Helmet>

      <main className="plans-main">

        {/* ================= HERO ================= */}
        <section className="plans-hero">
          <h1>
            Enterprise-Grade <span className="plans-highlight">Pricing Plans</span>
          </h1>
          <p className="plans-subtitle">
            Real-time AI cardiovascular risk intelligence — from individual use to hospital-scale deployment.
          </p>

          {/* Billing Toggle */}
          <div className="pricing-toggle">
            <button
              className={billingCycle === "monthly" ? "active" : ""}
              onClick={() => setBillingCycle("monthly")}
            >
              Monthly Billing
            </button>
            <button
              className={billingCycle === "yearly" ? "active" : ""}
              onClick={() => setBillingCycle("yearly")}
            >
              Yearly Billing <small className="save-badge">Save ~17%</small>
            </button>
          </div>
        </section>

        {/* ================= PLAN CARDS ================= */}
        <section className="plans-cards">
          {computedPlans.map((plan) => (
            <article
              key={plan.id}
              className={`plan-card ${plan.featured ? "featured-plan" : ""}`}
            >
              <div className="plan-badge">{plan.badge}</div>

              <h2 className="plan-name">{plan.name}</h2>

              <div className="plan-price-wrapper">
                <div className="plan-price">{plan.displayPrice}</div>
                {plan.effectiveMonthly && (
                  <div className="price-equivalent">
                    ~${plan.effectiveMonthly}/mo when billed annually
                  </div>
                )}
                {plan.trial && <div className="plan-trial">{plan.trial}</div>}
              </div>

              <p className="plan-desc">{plan.description}</p>

              <ul className="plan-features">
                {plan.features.map((f, i) => {
                  const text = typeof f === "string" ? f : f.text;
                  const disabled = typeof f === "object" && f.disabled;
                  return (
                    <li
                      key={i}
                      className={disabled ? "disabled-feature" : "enabled-feature"}
                    >
                      <span className="feature-icon">{disabled ? "✕" : "✓"}</span>
                      {text}
                    </li>
                  );
                })}
              </ul>

              <div className="plan-cta-group">
                <button
                  className={`plan-cta primary-cta plan-${plan.id}`}
                  onClick={plan.cta.action}
                >
                  {plan.cta.text}
                </button>

                {plan.id === "enterprise" && (
                  <button
                    className="plan-cta secondary-cta"
                    onClick={() => navigate("/contact?reason=enterprise-demo")}
                  >
                    Schedule Demo
                  </button>
                )}
              </div>
            </article>
          ))}
        </section>

        {/* ================= TRUST & COMPLIANCE ================= */}
        <section className="plans-trust">
          <h2>Built for Healthcare Trust & Compliance</h2>
          <p>
            Deploy with confidence — designed from day one for sensitive health data and regulatory standards.
          </p>
          <div className="trust-grid">
            <div className="trust-item">
              <span>🔐</span> End-to-End Encryption
            </div>
            <div className="trust-item">
              <span>🛡️</span> HIPAA & GDPR Compliant
            </div>
            <div className="trust-item">
              <span>📊</span> SOC 2 Type II Audited
            </div>
            <div className="trust-item">
              <span>☁️</span> Private Cloud / On-Premise Options
            </div>
            <div className="trust-item">
              <span>🔍</span> Full Audit Trails & Logging
            </div>
            <div className="trust-item">
              <span>👥</span> SSO & Identity Federation
            </div>
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section className="plans-faq">
          <h2>Frequently Asked Questions</h2>

          <div className="faq-grid">
            <div className="faq-item">
              <h4>Is the AI model clinically validated?</h4>
              <p>
                Yes — trained and validated on large clinical datasets with >95% accuracy in internal testing. Full validation reports available for Enterprise clients.
              </p>
            </div>

            <div className="faq-item">
              <h4>Can we integrate with existing EHR systems?</h4>
              <p>
                Enterprise plans include full FHIR/HL7 API support and custom integration with Epic, Cerner, and other major EHR platforms.
              </p>
            </div>

            <div className="faq-item">
              <h4>Do you offer on-premise deployment?</h4>
              <p>
                Yes — available in Enterprise tier for maximum data control and regulatory compliance.
              </p>
            </div>

            <div className="faq-item">
              <h4>What support level is included?</h4>
              <p>
                Professional: Priority email/chat.<br />
                Enterprise: Dedicated technical account manager, 24/7 support, and guaranteed SLA.
              </p>
            </div>
          </div>
        </section>

        {/* ================= ENTERPRISE CTA ================= */}
        <section className="plans-cta-hr">
          <h3>Ready to Transform Preventive Healthcare at Scale?</h3>
          <p>
            Join leading hospitals, insurers, and corporate wellness programs using Cardiac-AI for real-time cardiovascular intelligence.
          </p>
          <div className="plans-cta-actions">
            <button className="cta-large" onClick={() => navigate("/contact?reason=enterprise")}>
              Talk to Our Healthcare Team
            </button>
            <button className="cta-outline" onClick={() => navigate("/demo")}>
              Book a Live Platform Demo
            </button>
          </div>
        </section>

      </main>
    </>
  );
};

export default Plans;