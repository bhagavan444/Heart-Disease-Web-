🚀 Heart Disease Prediction System


📌 1. Project Vision

This is not just a classification model.

It is a machine learning–powered clinical decision support system designed to predict the likelihood of heart disease based on patient health parameters.

The system:

Accepts structured medical inputs

Performs feature preprocessing

Applies a trained ML model

Outputs probability-based risk prediction

Assists in early detection and preventive care

In production terms, this is:

A healthcare ML inference microservice with an interactive web-based diagnostic interface.

⚙️ 2. End-to-End System Flow (Real-Time Execution)
Runtime Workflow

User enters patient details (age, cholesterol, BP, etc.)

Frontend sends structured JSON to backend API

Backend validates and preprocesses features

Features are scaled and transformed

Trained ML model predicts heart disease risk

Probability score calculated

Backend returns structured JSON response

Frontend displays prediction result with risk percentage

🏗 3. High-Level System Architecture
4
Architecture Layers
1️⃣ Presentation Layer (Frontend)

React.js

Medical input form UI

Validation and error handling

Risk visualization dashboard (charts)

2️⃣ Application Layer (Backend API)

Flask REST API

Input validation

Feature preprocessing

Model inference endpoint

JSON response formatting

3️⃣ Machine Learning Layer

Dataset preprocessing

Feature scaling (StandardScaler)

Trained classification model

Probability scoring

4️⃣ Data & Infrastructure Layer

Model serialization (Pickle / Joblib)

Environment variable configuration

Deployment-ready structure

Logging & monitoring

🧠 4. Machine Learning Pipeline
🔹 Input Features (Example)

Age

Sex

Chest pain type

Resting blood pressure

Cholesterol level

Fasting blood sugar

Maximum heart rate

Exercise-induced angina

🔹 Data Processing Steps

Handle missing values

Encode categorical variables

Scale numerical features

Split dataset (Train/Test)

🔹 Model Training

Possible algorithms used:

Logistic Regression

Random Forest

Support Vector Machine

K-Nearest Neighbors

Neural Networks

🔹 Backend Prediction Endpoint Example
@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    
    features = preprocess(data)
    scaled_features = scaler.transform([features])
    
    prediction = model.predict(scaled_features)
    probability = model.predict_proba(scaled_features)
    
    return jsonify({
        "prediction": int(prediction[0]),
        "risk_probability": float(probability[0][1])
    })

Internal Backend Execution Steps

Request parsing

Feature extraction

Encoding & scaling

Model inference

Probability calculation

JSON response generation

📊 5. Model Evaluation & Performance

To strengthen credibility, include:

Accuracy

Precision

Recall

F1 Score

ROC-AUC Score

Example:

Accuracy: 88%
ROC-AUC: 0.91
F1 Score: 0.86

If you don’t show metrics, interviewers will assume the model is weak.

💻 6. Frontend Interaction Logic
const handleSubmit = async () => {
  const response = await axios.post("/predict", patientData);

  setPrediction(response.data.prediction);
  setRisk(response.data.risk_probability);
};

Frontend Responsibilities

Collect patient parameters

Validate medical inputs

Display prediction results

Show probability-based risk

Visualize results using charts

📊 7. System Diagrams
🏛 7.1 System Architecture Diagram
<img width="239" height="686" alt="image" src="https://github.com/user-attachments/assets/93bfd89b-f8c1-4165-ba54-a049aece047d" />
🔄 7.2 Sequence Diagram
<img width="554" height="355" alt="image" src="https://github.com/user-attachments/assets/b97331c6-e643-43d6-9b99-6c36c0d67dbf" />
🚀 7.3 Deployment Diagram
<img width="246" height="356" alt="image" src="https://github.com/user-attachments/assets/aa41706e-36f6-4e40-aecf-9bd202a12460" />
📸 8. User Interface Screenshots

After creating a screenshots/ folder:

## 🏥 Medical Input Form

![Input Form](./screenshots/input-form.png)

Users enter health parameters for risk prediction.

## 📊 Risk Prediction Dashboard

![Result Page](./screenshots/result.png)

Displays prediction result with probability score and visual charts.
🔥 9. Current Limitations

❌ Limited dataset scope

❌ Not clinically validated

❌ No real-time patient monitoring integration

❌ No explainable AI visualization

🚀 10. Future Enhancements

Implement Deep Learning model

Add Explainable AI (SHAP values)

Integrate wearable health data

Add patient history tracking

Deploy as cloud-based healthcare API

Add multi-class heart condition prediction

🎓 Learning Outcomes

Medical dataset preprocessing

Feature engineering

Model evaluation & validation

ML deployment with REST APIs

Full-stack healthcare application development

👨‍💻 Author

Siva Satya Sai Bhagavan Gopalajosyula
B.Tech – Artificial Intelligence & Data Science


