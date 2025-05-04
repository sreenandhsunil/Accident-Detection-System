# 🚧 AI Accident Detection System

A real-time AI-powered platform that detects road accidents using computer vision and sends instant alerts to emergency services to reduce response time. Built with a full-stack architecture combining frontend, backend, and machine learning.

---

## 🔍 Features

- Real-time accident detection using video input
- Intelligent alert system with push notifications and SMS
- Secure user authentication and role-based dashboard
- Incident visualization using maps
- Scalable architecture with AI and web services

---

## 🧰 Tech Stack

- **Frontend:** React
- **Backend:** Node.js (Express), FastAPI (Python)
- **AI:** YOLOv8, PyTorch
- **Database:** Firebase Firestore
- **Authentication:** Firebase Auth
- **Notifications:** Firebase Cloud Messaging, SMS API
- **Mapping:** Google Maps API

---

## 📁 Project Structure

<details>
<summary>Click to view</summary>

</details>

---

## 🧠 Skills Demonstrated

- End-to-end full-stack development
- Real-time AI inference pipeline
- RESTful API design and integration
- Secure user management
- Scalable cloud-based architecture

---

## 🚀 Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/sreenandh/ai-accident-detection.git
cd ai-accident-detection

# 2. Install frontend dependencies
cd frontend
npm install
npm start  # Runs the frontend React app

# 3. In a new terminal, start the Node.js backend
cd ../backend
npm install
node server.js

# 4. In a third terminal, run the Python AI service
cd ../ai_service
pip install -r requirements.txt
uvicorn main:app --reload  # Runs the FastAPI server
