import React, { useState, useEffect } from "react";
import "./Predict.css"; // Your pure CSS file
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
  Legend,
  LineChart,
  Line,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

/* -------------------- CONSTANTS -------------------- */
const COLORS = ["#22c55e", "#ef4444", "#f59e0b", "#3b82f6", "#8b5cf6", "#10b981"];

/* Only the 13 features your backend requires */
const REQUIRED_FEATURES = [
  "age", "sex", "cp", "trestbps", "chol", "fbs",
  "restecg", "thalach", "exang", "oldpeak",
  "slope", "ca", "thal"
];

/* -------------------- DEFAULT FORM -------------------- */
const defaultForm = () => ({
  age: "",
  sex: "1",
  cp: "0",
  trestbps: "",
  chol: "",
  fbs: "0",
  restecg: "0",
  thalach: "",
  exang: "0",
  oldpeak: "",
  slope: "0",
  ca: "0",
  thal: "3", // Common default in UCI dataset
  // Extra fields kept for UI, but not sent if empty
  smoking: "0",
  exercise: "1",
  family_history: "0",
  bmi: "",
  hba1c: "",
  calcium_score: "",
});

/* -------------------- RISK COMPONENTS -------------------- */
const RiskBadge = ({ score }) => {
  if (score === null) return <div className="risk-badge none">Awaiting Prediction</div>;
  const level = score < 30 ? "low" : score < 60 ? "moderate" : "high";
  const label = score < 30 ? "Low Risk" : score < 60 ? "Moderate Risk" : "High Risk";
  return (
    <div className={`risk-badge ${level} text-3xl font-bold`}>
      {label} — {score}%
    </div>
  );
};

const GaugeChart = ({ score }) => {
  const data = [{ value: score || 0 }];
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadialBarChart cx="50%" cy="50%" innerRadius="40%" outerRadius="90%" data={data}>
        <RadialBar dataKey="value" cornerRadius={10} fill="#8b5cf6" background={{ fill: "#1f2937" }} />
        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-5xl font-bold fill-white">
          {score || 0}%
        </text>
      </RadialBarChart>
    </ResponsiveContainer>
  );
};

/* -------------------- MAIN COMPONENT -------------------- */
const Predict = () => {
  const [formData, setFormData] = useState(defaultForm());
  const [result, setResult] = useState(null);
  const [featureImportance, setFeatureImportance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [advanced, setAdvanced] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);
  const [autoUpdate, setAutoUpdate] = useState(false);
  const [liveScore, setLiveScore] = useState(null);

  /* -------------------- HISTORY & STORAGE -------------------- */
  useEffect(() => {
    const saved = localStorage.getItem("heart_predict_history");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("heart_predict_history", JSON.stringify(history));
  }, [history]);

  /* -------------------- REAL-TIME PREDICTION -------------------- */
  useEffect(() => {
    if (!autoUpdate) return;

    const allRequiredFilled = REQUIRED_FEATURES.every(f => formData[f] !== "" && formData[f] !== null);
    if (!allRequiredFilled) {
      setLiveScore(null);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await axios.post("http://127.0.0.1:5000/api/v1/predict", preparePayload());
        setLiveScore(Math.round(res.data.confidence));
      } catch (err) {
        // Silent
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [formData, autoUpdate]);

  /* -------------------- HANDLERS -------------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setResult(null);
    setLiveScore(null);
  };

  const preparePayload = () => {
    const payload = {};
    REQUIRED_FEATURES.forEach((key) => {
      const val = formData[key];
      payload[key] = val === "" ? 0 : Number(val);
    });
    return payload;
  };

  const submitPrediction = async (e) => {
    e?.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    setFeatureImportance([]);

    try {
      const res = await axios.post("http://127.0.0.1:5000/api/v1/predict", preparePayload());

      const score = Math.round(res.data.confidence);

      setResult({
        prediction: res.data.prediction,
        risk_label: res.data.risk_label,
        confidence: res.data.confidence,
        score,
      });

      // Use actual input values as "importance" (since backend only returns raw values)
      const importanceData = Object.entries(res.data.features_used)
        .sort(([, a], [, b]) => Math.abs(b) - Math.abs(a))
        .slice(0, 10)
        .map(([feature, value]) => ({
          feature: feature.replace(/_/g, " ").toUpperCase(),
          value: Math.abs(value), // Visual magnitude
          impact: value > 100 ? "high" : "normal", // Simple heuristic
        }));

      setFeatureImportance(importanceData);

      setHistory((prev) => [
        { id: Date.now(), timestamp: new Date().toISOString(), score },
        ...prev,
      ].slice(0, 20));

    } catch (err) {
      if (err.response?.data?.error) {
        setError(
          err.response.data.error +
            (err.response.data.missing_features
              ? `: ${err.response.data.missing_features.join(", ")}`
              : "")
        );
      } else {
        setError("Backend not running or connection failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  /* -------------------- CHART DATA -------------------- */
  const pieData = result
    ? [
        { name: "No Risk", value: 1 - result.confidence / 100 },
        { name: "Risk Present", value: result.confidence / 100 },
      ]
    : [];

  const lineData = history.map((h, i) => ({ name: `Pred ${i + 1}`, score: h.score }));

  const radarData = featureImportance.map((f) => ({
    subject: f.feature,
    A: f.value > 200 ? 80 : f.value > 100 ? 60 : 40, // Rough scaling for radar
    fullMark: 100,
  }));

  const modelAccuracies = [
    { model: "Random Forest", accuracy: 95 },
    { model: "XGBoost", accuracy: 94 },
    { model: "Logistic Regression", accuracy: 92 },
    { model: "Neural Network", accuracy: 93 },
  ];

  /* -------------------- UI -------------------- */
  return (
    <main className="predict-page">
      <div className="grid">
        {/* ==================== INPUT FORM ==================== */}
        <section className="form-panel">
          <h1>HeartCare Predictor — Enterprise Risk Engine</h1>

          {error && <div className="error">{error}</div>}

          <form onSubmit={submitPrediction}>
            {/* Core Required Fields */}
            <div className="grid md-grid-cols-2">
              <div>
                <label>Age *</label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} required className="input-field" />
              </div>
              <div>
                <label>Sex</label>
                <select name="sex" value={formData.sex} onChange={handleChange} className="input-field">
                  <option value="1">Male</option>
                  <option value="0">Female</option>
                </select>
              </div>
              <div>
                <label>Chest Pain Type (cp)</label>
                <select name="cp" value={formData.cp} onChange={handleChange} className="input-field">
                  <option value="0">Typical Angina</option>
                  <option value="1">Atypical Angina</option>
                  <option value="2">Non-Anginal Pain</option>
                  <option value="3">Asymptomatic</option>
                </select>
              </div>
              <div>
                <label>Resting BP (trestbps) *</label>
                <input type="number" name="trestbps" value={formData.trestbps} onChange={handleChange} required className="input-field" />
              </div>
              <div>
                <label>Cholesterol (chol) *</label>
                <input type="number" name="chol" value={formData.chol} onChange={handleChange} required className="input-field" />
              </div>
              <div>
                <label>Max Heart Rate (thalach)</label>
                <input type="number" name="thalach" value={formData.thalach} onChange={handleChange} className="input-field" />
              </div>
            </div>

            {/* Lifestyle (optional - not used by model but shown) */}
            <div className="grid md-grid-cols-3">
              <div>
                <label>Smoking</label>
                <select name="smoking" value={formData.smoking} onChange={handleChange} className="input-field">
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>
              <div>
                <label>Exercise</label>
                <select name="exercise" value={formData.exercise} onChange={handleChange} className="input-field">
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>
              </div>
              <div>
                <label>Family History</label>
                <select name="family_history" value={formData.family_history} onChange={handleChange} className="input-field">
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>
            </div>

            {/* Advanced Toggle */}
            <div className="flex items-center gap-4 mb-6">
              <input type="checkbox" id="advanced" checked={advanced} onChange={() => setAdvanced(!advanced)} />
              <label htmlFor="advanced" className="text-xl">Show Advanced Clinical Fields</label>
            </div>

            {advanced && (
              <div className="grid md-grid-cols-3 border-t pt-6">
                <div>
                  <label>ST Depression (oldpeak)</label>
                  <input type="number" step="0.1" name="oldpeak" value={formData.oldpeak} onChange={handleChange} className="input-field" />
                </div>
                <div>
                  <label>Calcium Score</label>
                  <input type="number" name="calcium_score" value={formData.calcium_score} onChange={handleChange} className="input-field" />
                </div>
                <div>
                  <label>HbA1c (%)</label>
                  <input type="number" step="0.1" name="hba1c" value={formData.hba1c} onChange={handleChange} className="input-field" />
                </div>
              </div>
            )}

            {/* Controls */}
            <div className="flex items-center justify-between pt-8">
              <div className="flex items-center gap-4">
                <input type="checkbox" id="live" checked={autoUpdate} onChange={() => setAutoUpdate(!autoUpdate)} />
                <label htmlFor="live" className="text-xl">Real-Time Mode</label>
                {autoUpdate && liveScore !== null && (
                  <span className="text-2xl font-bold">Live: {liveScore}%</span>
                )}
              </div>

              <button type="submit" disabled={loading} className="predict-btn">
                {loading ? "Analyzing..." : "Run Prediction"}
              </button>
            </div>
          </form>
        </section>

        {/* ==================== RESULT DASHBOARD ==================== */}
        <section className="result-dashboard">
          <div>
            <h2>Risk Assessment Result</h2>
            <div className="flex items-center justify-center mb-8">
              <div className="live-heart">
                <svg viewBox="0 0 24 24" className="heart-icon">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
              <RiskBadge score={result?.score ?? liveScore} />
            </div>

            {(result || liveScore !== null) && (
              <div className="grid md-grid-cols-2 gap-8 mt-10">
                <div>
                  <h4>Risk Gauge</h4>
                  <GaugeChart score={result?.score ?? liveScore ?? 0} />
                </div>
                <div>
                  <h4>Probability Breakdown</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label={({ value }) => `${(value * 100).toFixed(1)}%`}
                      >
                        {pieData.map((_, i) => (
                          <Cell key={i} fill={COLORS[i]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(v) => `${(v * 100).toFixed(1)}%`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>

          {featureImportance.length > 0 && (
            <div>
              <h3>Key Input Factors</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={featureImportance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="feature" stroke="#94a3b8" angle={-45} textAnchor="end" height={80} />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip formatter={(v) => v.toFixed(1)} />
                  <Bar dataKey="value" fill="#8b5cf6" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          <div>
            <h3>Model Accuracy Comparison</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={modelAccuracies}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="model" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip formatter={(v) => `${v}%`} />
                <Bar dataKey="accuracy" fill="#3b82f6" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div>
            <h3>Risk Radar (Input Magnitude)</h3>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" stroke="#94a3b8" />
                <PolarRadiusAxis stroke="#94a3b8" />
                <Radar name="Value" dataKey="A" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div>
            <h3>Prediction History Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip formatter={(v) => `${v}%`} />
                <Line type="monotone" dataKey="score" stroke="#22c55e" strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div>
            <h3>Recent Predictions</h3>
            <ul className="space-y-3 text-lg">
              {history.length === 0 && <li>No predictions yet</li>}
              {history.map((h) => (
                <li key={h.id} className="flex justify-between">
                  <span>{new Date(h.timestamp).toLocaleString()}</span>
                  <span className="font-bold">{h.score}% Risk</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Predict;