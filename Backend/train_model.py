import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import joblib
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

# =======================
# 1. Load Dataset
# =======================
df = pd.read_csv("C:\\Users\\gsiva\\Downloads\\Heart_Disease_Prediction.csv")

# Encode target column (Presence=1, Absence=0)
df["Heart Disease"] = df["Heart Disease"].map({"Presence": 1, "Absence": 0})

# Features and Target
X = df.drop("Heart Disease", axis=1)
y = df["Heart Disease"]

# Check balance
print("Target Distribution:\n", y.value_counts(), "\n")

# =======================
# 2. Train-Test Split
# =======================
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# =======================
# 3. Scaling
# =======================
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# =======================
# 4. Define Models with Tuning
# =======================
models = {
    "Logistic Regression": LogisticRegression(max_iter=1000, class_weight="balanced", random_state=42),
    "Random Forest": RandomForestClassifier(n_estimators=300, random_state=42),
    "SVM": SVC(kernel="rbf", probability=True, class_weight="balanced", random_state=42),
    "KNN": KNeighborsClassifier(n_neighbors=5)
}

# =======================
# 5. Train & Evaluate
# =======================
best_model = None
best_acc = 0

for name, model in models.items():
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    acc = accuracy_score(y_test, y_pred)
    
    # Cross Validation for stability
    cv_score = cross_val_score(model, X, y, cv=5).mean()
    
    print(f"{name} Accuracy: {acc:.2f}, CV Score: {cv_score:.2f}")
    
    if acc > best_acc:
        best_acc = acc
        best_model = model

print("\n✅ Best Model Selected:", type(best_model).__name__, "with Accuracy:", best_acc)

# =======================
# 6. Final Evaluation
# =======================
y_pred = best_model.predict(X_test)
print("\nClassification Report:\n", classification_report(y_test, y_pred))

plt.figure(figsize=(6, 5))
sns.heatmap(confusion_matrix(y_test, y_pred), annot=True, fmt="d", cmap="Blues", cbar=False)
plt.title("Confusion Matrix")
plt.xlabel("Predicted")
plt.ylabel("Actual")
plt.show()

# =======================
# 7. Save Model & Scaler
# =======================
joblib.dump(best_model, "heart_disease_model.pkl")
joblib.dump(scaler, "scaler.pkl")

print("🎯 Model and Scaler saved successfully!")
