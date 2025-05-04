const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const FormData = require("form-data");
const admin = require("firebase-admin");

const app = express();
const PORT = 5000;

// Firebase Admin SDK Initialization
const serviceAccount = require("./serviceAccountKey.json"); // Make sure this file exists

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

app.use(cors());
app.use(express.json());

// Ensure upload directory exists
const uploadDir = "./uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Root route
app.get("/", (req, res) => {
  res.send("🚀 Accident Detection Backend is running!");
});

app.get('/api/incidents', async (req, res) => {
  try {
    const snapshot = await db.collection("incidents").get(); // ✅ Correct collection
    const incidents = snapshot.docs.map(doc => doc.data());
    res.json(incidents);
  } catch (error) {
    console.error("Error fetching incidents:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Analyze and Save Incident Route
app.post("/api/analyze", upload.single("video"), async (req, res) => {
  try {
    const videoPath = req.file.path;

    // Send to FastAPI model
    const formData = new FormData();
    formData.append("video", fs.createReadStream(videoPath));

    const response = await axios.post("http://localhost:8000/analyze", formData, {
      headers: formData.getHeaders(),
    });

    const result = response.data;

    // Optional cleanup
    fs.unlinkSync(videoPath);

    // Build the incident object
    const incidentData = {
      timestamp: new Date().toISOString(),
      latitude: parseFloat(result.latitude) || null,
      longitude: parseFloat(result.longitude) || null,
      location: result.location || "Unknown",
      accident_detected: result.accident_detected || false,
      confidence: result.confidence || 0,
      screenshot_path: result.screenshot_path || "",
      camera_id: result.camera_id || "Unknown",
      severity: result.severity || "Unknown",
      status: "Reported",
    };

    // Save to Firebase Firestore
    await db.collection("incidents").add(incidentData);

    res.json({
      success: true,
      message: "Video analyzed and incident saved",
      result: incidentData,
    });
  } catch (err) {
    console.error("❌ Error analyzing video:", err.message);
    res.status(500).json({ success: false, error: "Analysis failed" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
