import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
} from "recharts";
import "./Predict.css";

const COLORS = ["#00C49F", "#FF4D4F", "#FFC107", "#1890FF", "#722ED1"];

// Fields that should be numeric before sending
const numericFields = [
  "age",
  "trestbps",
  "chol",
  "thalach",
  "oldpeak",
  "ca",
  "bmi",
  "triglycerides",
  "hdl",
  "ldl",
  "resting_hr",
  "systolic_bp",
  "diastolic_bp",
  "waist_cm",
  "hba1c",
  "sleep_hours",
  "echocardiogram_score",
  "calcium_score",
];

// default form state factory (keeps code tidy)
const defaultForm = () => ({
  // Demographics & Lifestyle
  age: "",
  sex: "1",
  smoking: "0",
  alcohol: "0",
  exercise: "1",
  bmi: "",
  diet: "1",
  stress: "1",
  sleep_hours: "",
  // Family & Lab
  family_history: "0",
  triglycerides: "",
  hdl: "",
  ldl: "",
  bp_med: "0",
  fbs: "0",
  hba1c: "",
  creatinine: "",
  // Medical History
  diabetes: "0",
  hypertension: "0",
  high_cholesterol: "0",
  prev_heart_attack: "0",
  stroke_history: "0",
  // Vital Signs
  resting_hr: "",
  systolic_bp: "",
  diastolic_bp: "",
  waist_cm: "",
  // Core cardiology features
  cp: "0",
  trestbps: "",
  chol: "",
  thalach: "",
  exang: "0",
  oldpeak: "",
  slope: "0",
  ca: "0",
  thal: "1",
  restecg: "0",
  // Advanced Measures
  echocardiogram_score: "",
  calcium_score: "",
  // Medication
  statins: "0",
  antihypertensives: "0",
  aspirin: "0",
});

const sampleFeatureImportanceFallback = [
  { feature: "Chest Pain Type", value: 0.15 },
  { feature: "Max Heart Rate", value: 0.14 },
  { feature: "Age", value: 0.12 },
  { feature: "Cholesterol", value: 0.10 },
  { feature: "Family History", value: 0.08 },
  { feature: "ST Depression", value: 0.07 },
  { feature: "Smoking", value: 0.06 },
  { feature: "BMI", value: 0.05 },
  { feature: "Other Labs", value: 0.12 },
];

const RiskPill = ({ score }) => {
  if (score === null) return <span className="risk-pill none">—</span>;
  if (score < 30) return <span className="risk-pill low">Low — {score}%</span>;
  if (score < 60) return <span className="risk-pill med">Moderate — {score}%</span>;
  return <span className="risk-pill high">High — {score}%</span>;
};

const Predict = () => {
  const [formData, setFormData] = useState(defaultForm());
  const [result, setResult] = useState(null);
  const [featureImportance, setFeatureImportance] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [history, setHistory] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [preset, setPreset] = useState("");

  // Load history from localStorage
  useEffect(() => {
    const raw = localStorage.getItem("hc_predict_history");
    if (raw) {
      try {
        setHistory(JSON.parse(raw));
      } catch (e) {
        console.warn("Failed to parse history", e);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem("hc_predict_history", JSON.stringify(history));
  }, [history]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const validateForm = (payload) => {
    // Basic validations: age and key vitals required
    if (!payload.age || Number(payload.age) <= 0) return "Please enter a valid age.";
    if (!payload.trestbps || Number(payload.trestbps) <= 0) return "Please enter resting systolic blood pressure.";
    if (!payload.chol || Number(payload.chol) <= 0) return "Please enter cholesterol value.";
    return null;
  };

  const computePayload = () => {
    const payload = { ...formData };
    numericFields.forEach((f) => {
      payload[f] = payload[f] === "" || payload[f] === null ? 0 : Number(payload[f]);
    });
    return payload;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setResult(null);
    setFeatureImportance(null);

    const payload = computePayload();
    const validationError = validateForm(payload);
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post("http://127.0.0.1:5000/predict", payload, { timeout: 20000 });
      const data = res.data;
      // expect { prediction: 0/1, probability: 0-1, feature_importance: [...] } from backend
      setResult({
        prediction: data.prediction !== undefined ? data.prediction : data.pred,
        probability: typeof data.probability === "number" ? data.probability : data.proba || 0,
        raw: data,
      });

      if (Array.isArray(data.feature_importance) && data.feature_importance.length > 0) {
        setFeatureImportance(data.feature_importance);
      } else if (Array.isArray(data.featureImportance) && data.featureImportance.length > 0) {
        setFeatureImportance(data.featureImportance);
      } else {
        setFeatureImportance(sampleFeatureImportanceFallback);
      }

      // Append to history
      const record = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        payload,
        result: {
          prediction: data.prediction ?? data.pred,
          probability: data.probability ?? data.proba ?? 0,
        },
      };
      setHistory((h) => [record, ...h].slice(0, 50)); // keep last 50
    } catch (err) {
      console.error(err);
      setErrorMessage(
        err?.response?.data?.error ||
          err?.message ||
          "Prediction failed. Please try again later."
      );
      // Provide fallback demo result so UI remains helpful (optional)
      setResult({
        prediction: 0,
        probability: 0.12,
        raw: null,
      });
      setFeatureImportance(sampleFeatureImportanceFallback);
    } finally {
      setIsLoading(false);
    }
  };

  // UI helpers
  const barData = result
    ? [
        { name: "No Heart Disease", value: Math.max(0, 1 - (result.probability ?? 0)) },
        { name: "Heart Disease", value: Math.max(0, result.probability ?? 0) },
      ]
    : [];

  const pieData = barData;

  const resetForm = () => {
    setFormData(defaultForm());
    setResult(null);
    setFeatureImportance(null);
    setErrorMessage("");
    setPreset("");
  };

  const applyPreset = (key) => {
    setPreset(key);
    if (key === "healthy") {
      setFormData((p) => ({
        ...p,
        age: 30,
        bmi: 22,
        smoking: "0",
        exercise: "2",
        diet: "2",
        cholesterol: 160,
        trestbps: 110,
        thalach: 170,
        sleep_hours: 7,
      }));
    } else if (key === "elder-smoker") {
      setFormData((p) => ({
        ...p,
        age: 68,
        bmi: 28.5,
        smoking: "1",
        exercise: "0",
        diet: "0",
        cholesterol: 250,
        trestbps: 150,
        thalach: 120,
        sleep_hours: 5,
      }));
    } else if (key === "at-risk") {
      setFormData((p) => ({
        ...p,
        age: 55,
        bmi: 30,
        smoking: "1",
        exercise: "0",
        diet: "0",
        cholesterol: 240,
        trestbps: 140,
        thalach: 130,
        sleep_hours: 6,
      }));
    } else {
      // clear
      resetForm();
    }
  };

  const clearHistory = () => {
    if (window.confirm("Clear all saved predictions from this browser?")) {
      setHistory([]);
    }
  };

  const loadHistoryItem = (item) => {
    setFormData(item.payload);
    setResult({
      prediction: item.result.prediction,
      probability: item.result.probability,
      raw: item.result.raw ?? null,
    });
    setFeatureImportance(sampleFeatureImportanceFallback);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteHistoryItem = (id) => {
    setHistory((h) => h.filter((r) => r.id !== id));
  };

  const exportReportJSON = () => {
    if (!result) return;
    const report = {
      timestamp: new Date().toISOString(),
      formData,
      result,
      featureImportance,
    };
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `heartcare_report_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportReportCSV = () => {
    if (!result) return;
    // Flatten simple CSV: key,value rows
    const rows = [];
    rows.push(["-- Metadata", ""]);
    rows.push(["timestamp", new Date().toISOString()]);
    rows.push(["prediction", result.prediction]);
    rows.push(["probability", result.probability]);
    rows.push(["", ""]);
    rows.push(["-- Inputs", ""]);
    Object.entries(formData).forEach(([k, v]) => rows.push([k, v]));
    rows.push(["", ""]);
    rows.push(["-- Feature Importance", ""]);
    (featureImportance || []).forEach((f) => rows.push([f.feature, f.value]));
    const csv = rows.map((r) => r.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `heartcare_report_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyShareLink = async () => {
    if (!result) return;
    const payload = {
      formData,
      result,
    };
    const encoded = encodeURIComponent(btoa(unescape(encodeURIComponent(JSON.stringify(payload)))));
    const url = `${window.location.origin}${window.location.pathname}?share=${encoded}`;
    try {
      await navigator.clipboard.writeText(url);
      alert("Share link copied to clipboard.");
    } catch (e) {
      // fallback
      prompt("Copy this link:", url);
    }
  };

  // If app supports reading share param, you can decode and load results; not implemented here
  // Small helper for computing rounded score
  const riskScoreRounded = result && typeof result.probability === "number" ? Math.round(result.probability * 100) : null;

  return (
    <main className="predict-main">
      <div className="predict-form-container">
        <header className="predict-header">
          <h2>Heart Disease Risk Assessment</h2>
          <div className="predict-actions-top">
            <button onClick={() => applyPreset("healthy")} className="small-btn">Preset: Healthy</button>
            <button onClick={() => applyPreset("at-risk")} className="small-btn">Preset: At-risk</button>
            <button onClick={() => applyPreset("elder-smoker")} className="small-btn">Preset: Elderly Smoker</button>
            <button onClick={resetForm} className="small-btn">Reset</button>
            <label className="advanced-toggle">
              <input type="checkbox" checked={showAdvanced} onChange={() => setShowAdvanced((s) => !s)} />
              Show Advanced
            </label>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="predict-form" noValidate>
          {errorMessage && <div className="form-error" role="alert">{errorMessage}</div>}

          <section className="section">
            <h3>Demographics & Lifestyle</h3>
            <div className="grid">
              <div className="form-group">
                <label>Age (years) *</label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} min="0" required />
              </div>

              <div className="form-group">
                <label>Gender</label>
                <select name="sex" value={formData.sex} onChange={handleChange}>
                  <option value="1">Male</option>
                  <option value="0">Female</option>
                </select>
              </div>

              <div className="form-group">
                <label>Smoking</label>
                <select name="smoking" value={formData.smoking} onChange={handleChange}>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>

              <div className="form-group">
                <label>Alcohol</label>
                <select name="alcohol" value={formData.alcohol} onChange={handleChange}>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>

              <div className="form-group">
                <label>Exercise Level</label>
                <select name="exercise" value={formData.exercise} onChange={handleChange}>
                  <option value="0">Low</option>
                  <option value="1">Moderate</option>
                  <option value="2">High</option>
                </select>
              </div>

              <div className="form-group">
                <label>BMI</label>
                <input type="number" step="0.1" name="bmi" value={formData.bmi} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Diet Pattern</label>
                <select name="diet" value={formData.diet} onChange={handleChange}>
                  <option value="0">Poor</option>
                  <option value="1">Moderate</option>
                  <option value="2">Healthy</option>
                </select>
              </div>

              <div className="form-group">
                <label>Stress Level</label>
                <select name="stress" value={formData.stress} onChange={handleChange}>
                  <option value="0">Low</option>
                  <option value="1">Moderate</option>
                  <option value="2">High</option>
                </select>
              </div>

              <div className="form-group">
                <label>Sleep Hours</label>
                <input type="number" step="0.1" name="sleep_hours" value={formData.sleep_hours} onChange={handleChange} />
              </div>
            </div>
          </section>

          <section className="section">
            <h3>Family & Labs</h3>
            <div className="grid">
              <div className="form-group">
                <label>Family History</label>
                <select name="family_history" value={formData.family_history} onChange={handleChange}>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>

              <div className="form-group">
                <label>Triglycerides (mg/dL)</label>
                <input type="number" name="triglycerides" value={formData.triglycerides} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>HDL (mg/dL)</label>
                <input type="number" name="hdl" value={formData.hdl} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>LDL (mg/dL)</label>
                <input type="number" name="ldl" value={formData.ldl} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Blood Pressure Meds</label>
                <select name="bp_med" value={formData.bp_med} onChange={handleChange}>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>

              <div className="form-group">
                <label>Fasting Blood Sugar</label>
                <select name="fbs" value={formData.fbs} onChange={handleChange}>
                  <option value="0">Normal</option>
                  <option value="1">High</option>
                </select>
              </div>

              <div className="form-group">
                <label>HbA1c (%)</label>
                <input type="number" step="0.1" name="hba1c" value={formData.hba1c} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Creatinine (mg/dL)</label>
                <input type="number" step="0.01" name="creatinine" value={formData.creatinine} onChange={handleChange} />
              </div>
            </div>
          </section>

          <section className="section">
            <h3>Medical History</h3>
            <div className="grid">
              <div className="form-group">
                <label>Diabetes</label>
                <select name="diabetes" value={formData.diabetes} onChange={handleChange}>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>

              <div className="form-group">
                <label>Hypertension</label>
                <select name="hypertension" value={formData.hypertension} onChange={handleChange}>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>

              <div className="form-group">
                <label>High Cholesterol</label>
                <select name="high_cholesterol" value={formData.high_cholesterol} onChange={handleChange}>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>

              <div className="form-group">
                <label>Previous Heart Attack</label>
                <select name="prev_heart_attack" value={formData.prev_heart_attack} onChange={handleChange}>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>

              <div className="form-group">
                <label>Stroke History</label>
                <select name="stroke_history" value={formData.stroke_history} onChange={handleChange}>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>
            </div>
          </section>

          <section className="section">
            <h3>Vital Signs & Cardio Features</h3>
            <div className="grid">
              <div className="form-group">
                <label>Resting Heart Rate (bpm)</label>
                <input type="number" name="resting_hr" value={formData.resting_hr} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Systolic BP</label>
                <input type="number" name="systolic_bp" value={formData.systolic_bp} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Diastolic BP</label>
                <input type="number" name="diastolic_bp" value={formData.diastolic_bp} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Waist (cm)</label>
                <input type="number" name="waist_cm" value={formData.waist_cm} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Chest Pain Type (cp)</label>
                <select name="cp" value={formData.cp} onChange={handleChange}>
                  <option value="0">Typical Angina</option>
                  <option value="1">Atypical Angina</option>
                  <option value="2">Non-anginal Pain</option>
                  <option value="3">Asymptomatic</option>
                </select>
              </div>

              <div className="form-group">
                <label>Resting BP (trestbps)</label>
                <input type="number" name="trestbps" value={formData.trestbps} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Serum Cholesterol (mg/dL)</label>
                <input type="number" name="chol" value={formData.chol} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Max Heart Rate Achieved (thalach)</label>
                <input type="number" name="thalach" value={formData.thalach} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Exercise-induced Angina (exang)</label>
                <select name="exang" value={formData.exang} onChange={handleChange}>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>

              <div className="form-group">
                <label>ST Depression (oldpeak)</label>
                <input type="number" step="0.1" name="oldpeak" value={formData.oldpeak} onChange={handleChange} />
              </div>
            </div>
          </section>

          {showAdvanced && (
            <section className="section advanced">
              <h3>Advanced Measures</h3>
              <div className="grid">
                <div className="form-group">
                  <label>Echocardiogram Score</label>
                  <input type="number" step="0.1" name="echocardiogram_score" value={formData.echocardiogram_score} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Calcium Score</label>
                  <input type="number" step="0.1" name="calcium_score" value={formData.calcium_score} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Number of Major Vessels (ca)</label>
                  <input type="number" name="ca" value={formData.ca} onChange={handleChange} min="0" max="4" />
                </div>
                <div className="form-group">
                  <label>Thalassemia (thal)</label>
                  <select name="thal" value={formData.thal} onChange={handleChange}>
                    <option value="1">Normal</option>
                    <option value="2">Fixed Defect</option>
                    <option value="3">Reversible Defect</option>
                  </select>
                </div>
              </div>
            </section>
          )}

          <footer className="form-footer">
            <div className="form-controls">
              <button type="submit" className="primary-btn" disabled={isLoading}>
                {isLoading ? "Predicting..." : "Predict Risk"}
              </button>
              <button type="button" className="secondary-btn" onClick={resetForm} disabled={isLoading}>
                Clear Form
              </button>
            </div>

            <div className="form-meta">
              <small>Tip: Use presets for quick examples — predictions are illustrative. For clinical use, integrate validated models and secure workflows.</small>
            </div>
          </footer>
        </form>

        {/* Result area */}
        <aside className="predict-result-area" aria-live="polite">
          <div className="result-summary">
            <h3>Result</h3>
            <div className="result-top">
              <div className="risk-pill-wrap">
                <RiskPill score={riskScoreRounded} />
              </div>

              <div className="result-actions">
                <button onClick={exportReportJSON} disabled={!result} className="small-btn">Download JSON</button>
                <button onClick={exportReportCSV} disabled={!result} className="small-btn">Download CSV</button>
                <button onClick={copyShareLink} disabled={!result} className="small-btn">Copy Share Link</button>
              </div>
            </div>

            {result && (
              <>
                <div className="probability">
                  <strong>Probability:</strong> {(result.probability * 100).toFixed(2)}%
                </div>

                {/* Charts */}
                <div className="charts">
                  <div style={{ width: "100%", height: 220 }}>
                    <ResponsiveContainer>
                      <BarChart data={barData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 1]} />
                        <Tooltip formatter={(value) => `${(value * 100).toFixed(2)}%`} />
                        <Bar dataKey="value">
                          {barData.map((entry, idx) => (
                            <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div style={{ width: "100%", height: 220 }}>
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                          {pieData.map((entry, index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Legend />
                        <Tooltip formatter={(value) => `${(value * 100).toFixed(2)}%`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Feature importance */}
                {featureImportance && (
                  <div className="feature-importance">
                    <h4>Feature Contribution</h4>
                    <div className="fi-list">
                      {featureImportance.slice(0, 12).map((f, i) => (
                        <div key={i} className="fi-item">
                          <div className="fi-name">{f.feature}</div>
                          <div className="fi-bar-wrap" aria-hidden>
                            <div className="fi-bar" style={{ width: `${Math.min(100, (f.value || 0) * 100)}%`, background: COLORS[i % COLORS.length] }} />
                          </div>
                          <div className="fi-value">{((f.value || 0) * 100).toFixed(1)}%</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {!result && !isLoading && <div className="no-result">No prediction yet — fill inputs and click <strong>Predict Risk</strong>.</div>}
            {result && result.error && <div className="prediction-error">{result.error}</div>}
          </div>

          {/* History & saved predictions */}
          <div className="history-panel">
            <h4>Saved Predictions</h4>
            <div className="history-actions">
              <button className="small-btn" onClick={() => navigator.clipboard && navigator.clipboard.writeText(JSON.stringify(history.slice(0, 10)))}>Copy recent</button>
              <button className="small-btn danger" onClick={clearHistory}>Clear history</button>
            </div>

            {history.length === 0 && <div className="history-empty">No saved predictions yet. Results are saved locally in your browser.</div>}

            <ul className="history-list">
              {history.map((h) => (
                <li key={h.id} className="history-item">
                  <div className="history-meta">
                    <div className="history-ts">{new Date(h.timestamp).toLocaleString()}</div>
                    <div className="history-pred">{h.result.probability ? `${Math.round(h.result.probability * 100)}%` : "—"}</div>
                  </div>
                  <div className="history-actions">
                    <button className="tiny-btn" onClick={() => loadHistoryItem(h)}>Load</button>
                    <button className="tiny-btn" onClick={() => {
                      // quick export single report
                      const blob = new Blob([JSON.stringify(h, null, 2)], { type: "application/json" });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = `heartcare_history_${h.id}.json`;
                      a.click();
                      URL.revokeObjectURL(url);
                    }}>Export</button>
                    <button className="tiny-btn danger" onClick={() => deleteHistoryItem(h.id)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Predict;
