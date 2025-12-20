# app.py

from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import logging
from datetime import datetime

# -------------------- APP CONFIG --------------------
app = Flask(__name__)
CORS(app)  # Allows frontend (React) to connect

# Logging (saves to prediction_logs.log)
logging.basicConfig(
    filename="prediction_logs.log",
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

# -------------------- LOAD MODEL --------------------
try:
    model = joblib.load("heart_disease_model.pkl")
    scaler = joblib.load("scaler.pkl")
    print("Model and scaler loaded successfully.")
except Exception as e:
    print(f"Error loading model or scaler: {e}")
    raise

# Required features exactly as your model was trained
FEATURES = [
    "age", "sex", "cp", "trestbps", "chol", "fbs",
    "restecg", "thalach", "exang", "oldpeak",
    "slope", "ca", "thal"
]

# -------------------- HEALTH CHECK --------------------
@app.route("/health", methods=["GET"])
def health_check():
    return jsonify({
        "status": "UP",
        "model_loaded": True,
        "timestamp": datetime.utcnow().isoformat()
    }), 200

# -------------------- PREDICTION ENDPOINT --------------------
@app.route("/api/v1/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        # Validation: Check if JSON body exists
        if not data:
            return jsonify({"error": "No input data provided"}), 400

        # Check for missing required features
        missing = [f for f in FEATURES if f not in data]
        if missing:
            return jsonify({
                "error": "Missing required features",
                "missing_features": missing
            }), 400

        # Prepare input in correct order
        input_data = [float(data[f]) for f in FEATURES]
        input_array = np.array(input_data).reshape(1, -1)
        input_scaled = scaler.transform(input_array)

        # Make prediction
        prediction = int(model.predict(input_scaled)[0])
        probability = float(model.predict_proba(input_scaled)[0][prediction])

        # Basic explainability: return raw input values
        feature_impact = dict(zip(FEATURES, input_data))

        # Log the prediction
        logging.info({
            "input": feature_impact,
            "prediction": prediction,
            "probability": probability
        })

        # Response to frontend
        return jsonify({
            "prediction": prediction,  # 0 = No Disease, 1 = Disease
            "risk_label": "High Risk" if prediction == 1 else "Low Risk",
            "confidence": round(probability * 100, 2),
            "features_used": feature_impact,
            "timestamp": datetime.utcnow().isoformat()
        }), 200

    except Exception as e:
        logging.error(f"Prediction error: {str(e)}")
        return jsonify({
            "error": "Internal Server Error",
            "details": str(e)
        }), 500

# -------------------- RUN SERVER --------------------
if __name__ == "__main__":
    print("Starting Heart Disease Prediction API on http://127.0.0.1:5000")
    app.run(host="0.0.0.0", port=5000, debug=True)