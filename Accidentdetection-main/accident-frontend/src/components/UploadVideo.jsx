import { useState } from "react";
import {
  Button,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { collection, addDoc } from "firebase/firestore";
import { db } from '../firebase';

const containerStyle = {
  width: "100%",
  height: "300px",
};

const center = {
  lat: 10.008,
  lng: 76.361,
};

function UploadVideo() {
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [marker, setMarker] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "Google API key", // Replace with your API key
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
      setResult(null);
      setError(null);
      setMarker(null);
    }
  };

  const handleUpload = async () => {
    if (!videoFile) return;

    setUploading(true);
    setResult(null);
    setError(null);

    const formData = new FormData();
    formData.append("video", videoFile);

    try {
      const res = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data);

      if (data.latitude && data.longitude) {
        setMarker({ lat: data.latitude, lng: data.longitude });
      }

      const incidentData = {
        location: data.location || "Unknown",
        timestamp: data.timestamp || new Date().toISOString(),
        latitude: data.latitude || null,
        longitude: data.longitude || null,
        camera: "Uploaded Video",
        severity: data.confidence > 0.7 ? "High" : "Medium",
        status: data.accident_detected ? "Pending" : "Clear",
        confidence: data.confidence || 0,
        screenshot_path: data.screenshot_path || "",
        alert_sent: data.alert_sent || false,
        accident_detected: data.accident_detected || false,
        filename: videoFile.name || "Unnamed",
        uploaded: true
      };

      await addDoc(collection(db, "incidents"), incidentData);

    } catch (err) {
      console.error(err);
      setError("Error while uploading or analyzing.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#1e1e1e",
        p: 4,
        borderRadius: 2,
        boxShadow: 3,
        color: "#fff",
        mt: 4,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Upload Video for Accident Detection
      </Typography>

      <input type="file" accept="video/*" onChange={handleFileChange} />

      {videoPreview && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Preview:
          </Typography>
          <video
            src={videoPreview}
            controls
            loop
            width="100%"
            style={{ borderRadius: "8px", maxHeight: "400px" }}
          />
        </Box>
      )}

      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          startIcon={<CloudUploadIcon />}
          onClick={handleUpload}
          disabled={uploading || !videoFile}
        >
          {uploading ? "Analyzing..." : "Upload and Analyze"}
        </Button>
      </Box>

      {uploading && <CircularProgress sx={{ mt: 2 }} />}

      {result && (
        <Alert
          severity={result.accident_detected ? "error" : "success"}
          sx={{ mt: 2 }}
        >
          {result.accident_detected
            ? `🚨 Accident Detected! Confidence: ${Math.round(
                result.confidence * 100
              )}%`
            : "✅ No Accident Detected!"}
        </Alert>
      )}

      {result && (
        <Card sx={{ mt: 3, backgroundColor: "#292929", color: "#fff" }}>
          {result.screenshot_path && (
            <CardMedia
              component="img"
              image={`http://localhost:8000/${result.screenshot_path}`}
              alt="Detected Frame"
              sx={{ maxHeight: 200, objectFit: "cover" }}
            />
          )}
          <CardContent>
            <Typography variant="body1">
              📍 Location: {result.location}
            </Typography>
            <Typography variant="body2" color="gray">
              🕒 Time: {new Date(result.timestamp).toLocaleString()}
            </Typography>
            {result.alert_sent && (
              <Typography variant="body2" color="error">
                🚨 Alert sent to nearest emergency center!
              </Typography>
            )}
          </CardContent>
        </Card>
      )}

      {isLoaded && marker && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Accident Location on Map:
          </Typography>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={marker}
            zoom={15}
          >
            <Marker position={marker} icon={{ url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png" }} />
          </GoogleMap>
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
}

export default UploadVideo;
