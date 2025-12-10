import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Plans.css";

function Plans() {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState("monthly"); // monthly/yearly toggle

  // Enhanced plans with extra enterprise & corporate features
  const plans = [
    {
      id: "free",
      name: "Free",
      price: { monthly: 0, yearly: 0 },
      badge: "Free",
      description: "Instant on-screen predictions and basic insights — perfect to try the product.",
      features: [
        "Basic heart risk predictions",
        "General health insights & tips",
        "Live preview (limited daily checks)",
        "Mobile & desktop access",
        "Standard encryption in transit",
        { text: "No history tracking", disabled: true },
        { text: "No advanced AI models", disabled: true },
        { text: "No exports / reports", disabled: true },
      ],
      cta: { text: "Start for Free", action: () => navigate("/predict") },
      featured: false,
    },
    {
      id: "pro",
      name: "Pro",
      price: { monthly: 12, yearly: 120 }, // yearly shows discounted annual total
      badge: "Pro · Most Popular",
      description: "For individuals and small teams who want history, trends, and downloadable reports.",
      features: [
        "Advanced AI prediction models",
        "Save & track prediction history",
        "Trend analysis & weekly summaries",
        "Downloadable clinician-ready reports (PDF/Word)",
        "Multi-device sync & profile management",
        "Priority email support",
        "Health insights with personalized recommendations",
        "Team seats (up to 5) for shared accounts",
      ],
      cta: { text: "Get Pro", action: () => navigate("/signup?plan=pro") },
      featured: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: { monthly: 24, yearly: 240 },
      badge: "Enterprise",
      description: "Designed for clinics, hospitals and corporate wellness programs — secure, scalable, and integratable.",
      features: [
        "Everything in Pro",
        "API + EHR integrations (FHIR-ready)",
        "Clinic & team collaboration (roles & permissions)",
        "Single Sign-On (SAML / OIDC)",
        "Dedicated account manager & onboarding",
        "HIPAA / GDPR compliance support",
        "Custom SLAs, uptime guarantees, and performance tuning",
        "Wearable device & EHR data ingestion",
        "Custom analytics & exports (CSV / Excel / PDF)",
        "On-prem / private-cloud / data residency options",
        "Volume pricing & seat management",
        "Training & professional services available",
      ],
      cta: { text: "Contact Sales", action: () => navigate("/contact") },
      featured: false,
    },
  ];

  // helper to format price
  const formatPrice = (value) => (value === 0 ? "Free" : `$${value}`);

  // computed values for visible price label (e.g., show /mo or /yr)
  const computedPlans = useMemo(
    () =>
      plans.map((p) => {
        const price = p.price[billingCycle];
        const display = billingCycle === "monthly" ? `${formatPrice(price)} /mo` : `${formatPrice(price)} /yr`;
        // compute effective monthly for yearly (for UI: yearly / 12)
        const effectiveMonthly = billingCycle === "yearly" && price > 0 ? (price / 12).toFixed(2) : null;
        return { ...p, displayPrice: display, effectiveMonthly };
      }),
    [billingCycle, plans]
  );

  // simple discount label when yearly chosen (assumes yearly = monthly * 12 * 0.8 in your prices)
  const yearlyDiscountNote = useMemo(() => {
    if (billingCycle !== "yearly") return null;
    // compute percentage saved compared to monthly*12
    const proMonthly = plans.find((p) => p.id === "pro").price.monthly;
    const proYearly = plans.find((p) => p.id === "pro").price.yearly;
    const pct = Math.round((1 - proYearly / (proMonthly * 12)) * 100);
    return pct > 0 ? `Save ${pct}% vs monthly` : null;
  }, [billingCycle, plans]);

  // comparison matrix rows
  const comparisonRows = [
    { label: "Basic heart risk predictions", free: true, pro: true, ent: true },
    { label: "Advanced AI models", free: false, pro: true, ent: true },
    { label: "Prediction history & trends", free: false, pro: true, ent: true },
    { label: "Clinician-ready reports", free: false, pro: true, ent: true },
    { label: "API & EHR integration", free: false, pro: false, ent: true },
    { label: "Clinic & team collaboration", free: false, pro: false, ent: true },
    { label: "Single Sign-On (SSO)", free: false, pro: false, ent: true },
    { label: "HIPAA / GDPR compliance support", free: false, pro: false, ent: true },
    { label: "Dedicated onboarding & training", free: false, pro: false, ent: true },
    { label: "Wearable device syncing", free: false, pro: false, ent: true },
  ];

  return (
    <main className="plans-main">
      {/* Hero */}
      <section className="plans-hero" aria-labelledby="plansTitle">
        <h1 id="plansTitle">
          Choose the perfect <span className="plans-highlight">HeartCare</span> plan
        </h1>
        <p className="plans-subtitle">
          From free personal checks to enterprise-grade clinical integrations — predictable pricing and flexible deployment.
        </p>

        {/* Billing toggle */}
        <div className="pricing-toggle" role="tablist" aria-label="Billing cycle">
          <button
            role="tab"
            aria-selected={billingCycle === "monthly"}
            className={`toggle-btn ${billingCycle === "monthly" ? "active" : ""}`}
            onClick={() => setBillingCycle("monthly")}
          >
            Monthly
          </button>
          <button
            role="tab"
            aria-selected={billingCycle === "yearly"}
            className={`toggle-btn ${billingCycle === "yearly" ? "active" : ""}`}
            onClick={() => setBillingCycle("yearly")}
          >
            Yearly {billingCycle === "yearly" && yearlyDiscountNote ? <small className="save-note">({yearlyDiscountNote})</small> : <small className="save-note">(Save 20%)</small>}
          </button>
        </div>
      </section>

      {/* Plan cards */}
      <section className="plans-cards" aria-label="Pricing options">
        {computedPlans.map((plan) => (
          <article
            key={plan.id}
            className={`plan-card ${plan.featured ? "featured-plan" : ""}`}
            aria-labelledby={`plan-${plan.id}-title`}
          >
            <div className={`plan-badge ${plan.id}`}>{plan.badge}</div>

            <div className="plan-header">
              <h2 id={`plan-${plan.id}-title`} className="plan-name">{plan.name}</h2>
              <div className="plan-price">
                <span className="price-main">{plan.displayPrice}</span>
                {plan.effectiveMonthly && <span className="price-sub">({`$${plan.effectiveMonthly}/mo`})</span>}
              </div>
            </div>

            <p className="plan-desc">{plan.description}</p>

            <ul className="plan-features">
              {plan.features.map((f, i) => {
                const text = typeof f === "string" ? f : f.text;
                const disabled = typeof f === "object" && f.disabled;
                return (
                  <li
                    key={i}
                    className={`plan-feature ${disabled ? "disabled-feature" : "enabled-feature"}`}
                    aria-disabled={disabled}
                    title={typeof f === "object" && f.tooltip ? f.tooltip : ""}
                  >
                    <span className="feature-icon" aria-hidden>{disabled ? "✖" : "✔"}</span>
                    <span className="feature-text">{text}</span>
                  </li>
                );
              })}
            </ul>

            <div className="plan-actions">
              <button
                className={`plan-cta plan-cta-${plan.id}`}
                onClick={() => plan.cta.action()}
                aria-label={`${plan.cta.text} — ${plan.name}`}
              >
                {plan.cta.text}
              </button>

              {/* Enterprise quick contact (secondary) */}
              {plan.id === "enterprise" && (
                <button
                  className="plan-cta-outline"
                  onClick={() => navigate("/contact?reason=enterprise")}
                  aria-label="Request demo or enterprise quote"
                >
                  Request a demo
                </button>
              )}
            </div>
          </article>
        ))}
      </section>

      {/* Comparison table */}
      <section className="plans-comparison" aria-labelledby="compareTitle">
        <h2 id="compareTitle">Compare Plans</h2>
        <div className="comparison-wrapper" role="table" aria-label="Comparison of plan features">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Free</th>
                <th>Pro</th>
                <th>Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.label}</td>
                  <td className="center">{row.free ? "✔" : "—"}</td>
                  <td className="center">{row.pro ? "✔" : "—"}</td>
                  <td className="center">{row.ent ? "✔" : "—"}</td>
                </tr>
              ))}

              {/* extra rows highlighting enterprise perks */}
              <tr>
                <td>Dedicated account manager</td>
                <td className="center">—</td>
                <td className="center">—</td>
                <td className="center">✔</td>
              </tr>
              <tr>
                <td>Single Sign-On (SAML/OIDC)</td>
                <td className="center">—</td>
                <td className="center">—</td>
                <td className="center">✔</td>
              </tr>
              <tr>
                <td>On-site / remote training</td>
                <td className="center">—</td>
                <td className="center">—</td>
                <td className="center">✔</td>
              </tr>
              <tr>
                <td>HIPAA / GDPR support</td>
                <td className="center">—</td>
                <td className="center">—</td>
                <td className="center">✔</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA & HR-like section for corporate/HR */}
      <section className="plans-cta-hr" aria-labelledby="corporateTitle">
        <h3 id="corporateTitle">For HR, Wellness & Clinics</h3>
        <p>
          Running a corporate wellness program or managing a clinic? Ask about bulk
          pricing, employee wellness integrations, and clinical workflows designed to
          reduce admissions and improve preventive outcomes.
        </p>
        <div className="plans-cta-actions">
          <button className="homepage-btn" onClick={() => navigate("/contact?reason=wellness")}>
            Speak to an enterprise specialist
          </button>
          <button className="homepage-btn-outline" onClick={() => navigate("/demo")}>
            Request product demo
          </button>
        </div>
      </section>
    </main>
  );
}

export default Plans;
