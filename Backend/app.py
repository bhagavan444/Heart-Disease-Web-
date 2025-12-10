from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import joblib
import numpy as np

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load trained model and scaler
model = joblib.load("heart_disease_model.pkl")
scaler = joblib.load("scaler.pkl")

# Define prediction route
@app.route("/predict", methods=["POST"])
def predict():
    try:
        # Get JSON data from request
        data = request.get_json()

        # Features in the same order as training
        features = [
            "age", "sex", "cp", "trestbps", "chol", "fbs",
            "restecg", "thalach", "exang", "oldpeak", "slope",
            "ca", "thal"
        ]
        
        # Extract feature values in order
        input_data = [data[feature] for feature in features]
        input_array = np.array(input_data).reshape(1, -1)
        
        # Scale the data
        input_scaled = scaler.transform(input_array)
        
        # Make prediction
        prediction = model.predict(input_scaled)[0]
        probability = model.predict_proba(input_scaled)[0][prediction]

        result = {
            "prediction": int(prediction),       # 0 = No Heart Disease, 1 = Heart Disease
            "probability": float(probability)
        }

        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)})

# Run app
if __name__ == "__main__":
    app.run(debug=True)
