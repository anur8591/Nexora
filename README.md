# 🚦 Nexora – Smart Public Transport Crowd Indicator

Nexora is a **Smart City–focused web application** that predicts **public transport crowd levels** (Low / Medium / High) using historical transport patterns, weather conditions, event data, and time-based factors.  
The system is designed to support **commuters** and **transport authorities** with proactive, data-driven decisions.

---

## 📌 Problem Statement

In highly populated cities like **Mumbai**, public transport systems frequently face overcrowding due to:
- Peak travel hours
- Weather disruptions (especially rainfall)
- Public events (festivals, concerts, protests)

Most existing systems react *after* congestion occurs, causing delays, safety risks, and commuter dissatisfaction.  
There is a need for a **predictive, explainable, and scalable crowd management solution**.

---

## 💡 Solution Overview

Nexora provides a **crowd prediction and decision-support system** that:
- Predicts crowd levels in advance  
- Displays simple, color-based indicators  
- Assists authorities with early alerts  

### 🎯 Output Classes
- 🟢 Low Crowd  
- 🟡 Medium Crowd  
- 🔴 High Crowd  

---

## 🧠 How It Works

1. **Data Input**
   - Historical transport data (delays / congestion proxies)
   - Weather data
   - Event information (none, festival, concert, etc.)
   - Time and day type (weekday / holiday)

2. **Data Processing**
   - Data cleaning and normalization
   - Feature engineering
   - Crowd label generation (Low / Medium / High)

3. **Prediction Engine**
   - Rule-based weighted scoring
   - Decision Tree Classifier for pattern learning

4. **Output Layer**
   - Crowd level indicator
   - Explanation of prediction
   - Simulated alerts for transport authorities

---

## 🤖 Machine Learning Approach

- **Problem Type:** Multiclass Classification  
- **Model Used:** Decision Tree Classifier  

### Why Decision Tree?
- Explainable and transparent logic
- Works well with mixed categorical and numerical data
- Suitable for public-sector decision systems

> Crowd labels are created using **domain-driven rules (label engineering)** because real-world crowd labels are not directly available in open datasets.

---

## 🛠️ Technology Stack

### Frontend
- HTML  
- CSS  
- JavaScript  

### Backend
- Python (Flask)

### Data & ML
- Pandas  
- NumPy  
- scikit-learn  

### Visualization
- Charts and color-based indicators

### Data Sources
- Open public datasets (transport & weather)
- Simulated event data for modeling

---

## 🗺️ Use Case: Mumbai Public Transport

During peak hours (8–10 AM, 6–9 PM), routes such as **Andheri–Churchgate** experience heavy congestion.  
Rainfall or public events significantly increase crowd density.

Nexora predicts such conditions in advance and:
- Informs commuters
- Suggests proactive actions to authorities (e.g., deploy additional services)

---

## 🌍 Innovation & Impact

### Innovation
- Predictive crowd management instead of reactive handling
- Explainable decision logic
- Multi-source data integration

### Impact
- Reduced overcrowding
- Improved commuter safety
- Better transport planning
- Smarter Smart City infrastructure

---

## 🔮 Future Scope

- IoT sensors at bus stops for real-time footfall counting
- CCTV-based crowd estimation using computer vision
- Integration with official transport authority dashboards
- SMS / mobile alerts for commuters

> These features are part of the **future deployment vision**.

---

## 👥 Team

**Team Name:** Nexora  
**Vision:** *Connecting data to smarter urban decisions.*

---

## ⚠️ Disclaimer

This project uses **open and simulated datasets** to model historical patterns.  
The system architecture is designed to integrate **real-time government data** when deployed in a real-world Smart City environment.

---

## 📄 License

This project is developed for **educational and hackathon purposes**.
