import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Plans.css";

const Plans = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState("monthly");

  /* ================= PLANS DATA ================= */
  const plans = [
    {
      id: "free",
      name: "Free",
      price: { monthly: 0, yearly: 0 },
      badge: "Free",
      description:
        "Quick access to basic heart-risk insights. Ideal for first-time users and students.",
      features: [
        "Basic heart risk prediction",
        "General health insights",
        "Limited daily checks",
        "Mobile & desktop access",
        { text: "Prediction history", disabled: true },
        { text: "Advanced AI models", disabled: true },
        { text: "Reports & exports", disabled: true },
      ],
      cta: { text: "Start Free", action: () => navigate("/predict") },
      featured: false,
    },
    {
      id: "pro",
      name: "Pro",
      price: { monthly: 12, yearly: 120 },
      badge: "Most Popular",
      description:
        "Best for individuals and teams who want tracking, reports and deeper AI insights.",
      features: [
        "Advanced AI prediction models",
        "Prediction history & trend analysis",
        "Weekly health summaries",
        "Downloadable PDF / Word reports",
        "Personalized recommendations",
        "Priority email support",
        "Up to 5 team members",
      ],
      cta: { text: "Upgrade to Pro", action: () => navigate("/signup?plan=pro") },
      featured: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: { monthly: 24, yearly: 240 },
      badge: "Enterprise",
      description:
        "Built for hospitals, clinics and corporate wellness programs with compliance & scale.",
      features: [
        "All Pro features",
        "API & EHR integrations (FHIR)",
        "Role-based access & SSO",
        "HIPAA / GDPR readiness",
        "Dedicated onboarding & support",
        "Custom analytics & exports",
        "Wearable device integrations",
      ],
      cta: { text: "Contact Sales", action: () => navigate("/contact") },
      featured: false,
    },
  ];

  /* ================= HELPERS ================= */
  const formatPrice = (v) => (v === 0 ? "Free" : `$${v}`);

  const computedPlans = useMemo(
    () =>
      plans.map((p) => {
        const price = p.price[billingCycle];
        return {
          ...p,
          displayPrice:
            billingCycle === "monthly"
              ? `${formatPrice(price)} /mo`
              : `${formatPrice(price)} /yr`,
          effectiveMonthly:
            billingCycle === "yearly" && price > 0
              ? (price / 12).toFixed(2)
              : null,
        };
      }),
    [billingCycle]
  );

  /* ================= UI ================= */
  return (
    <main className="plans-main">

      {/* ================= HERO ================= */}
      <section className="plans-hero">
        <h1>
          Simple & Transparent <span className="plans-highlight">Pricing</span>
        </h1>
        <p className="plans-subtitle">
          Choose a plan that fits individuals, professionals, or enterprise healthcare needs.
        </p>

        {/* Billing Toggle */}
        <div className="pricing-toggle">
          <button
            className={billingCycle === "monthly" ? "active" : ""}
            onClick={() => setBillingCycle("monthly")}
          >
            Monthly
          </button>
          <button
            className={billingCycle === "yearly" ? "active" : ""}
            onClick={() => setBillingCycle("yearly")}
          >
            Yearly <small>(Save 20%)</small>
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
            <div className="plan-price">
              {plan.displayPrice}
              {plan.effectiveMonthly && (
                <span className="price-sub">
                  (${plan.effectiveMonthly}/mo billed yearly)
                </span>
              )}
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
                    {disabled ? "✖" : "✔"} {text}
                  </li>
                );
              })}
            </ul>

            <button
              className={`plan-cta plan-${plan.id}`}
              onClick={plan.cta.action}
            >
              {plan.cta.text}
            </button>

            {plan.id === "enterprise" && (
              <button
                className="plan-cta-outline"
                onClick={() => navigate("/contact?reason=enterprise")}
              >
                Request Demo
              </button>
            )}
          </article>
        ))}
      </section>

      {/* ================= TRUST & SECURITY ================= */}
      <section className="plans-trust">
        <h2>Security & Compliance</h2>
        <p>
          Built with healthcare-grade security practices to protect sensitive data.
        </p>
        <div className="trust-grid">
          <div>🔒 Encrypted Data</div>
          <div>🛡 HIPAA / GDPR Ready</div>
          <div>📄 Audit Logs</div>
          <div>☁ Secure Cloud / On-Prem</div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="plans-faq">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-item">
          <h4>Is this a medical diagnosis?</h4>
          <p>
            No. The system provides AI-based risk insights and does not replace
            professional medical advice.
          </p>
        </div>

        <div className="faq-item">
          <h4>Can I upgrade or downgrade anytime?</h4>
          <p>
            Yes. Plans are flexible and can be changed at any time.
          </p>
        </div>

        <div className="faq-item">
          <h4>Do you support enterprise pilots?</h4>
          <p>
            Yes. We offer demos, pilots and custom integrations for hospitals
            and corporate wellness programs.
          </p>
        </div>
      </section>

      {/* ================= ENTERPRISE CTA ================= */}
      <section className="plans-cta-hr">
        <h3>For Clinics, HR & Wellness Teams</h3>
        <p>
          Reduce risk, improve preventive care and empower employees or patients
          with AI-driven insights.
        </p>
        <div className="plans-cta-actions">
          <button onClick={() => navigate("/contact?reason=enterprise")}>
            Talk to Sales
          </button>
          <button onClick={() => navigate("/demo")}>
            Request Live Demo
          </button>
        </div>
      </section>

    </main>
  );
};

export default Plans;
